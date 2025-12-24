import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(254),
  message: z.string().min(10).max(2000),
  subject: z.string().max(120).optional(),
  // Anti-spam fields
  company: z.string().optional(), // honeypot
  ts: z.number().optional(), // timestamp
});

// Simple in-memory rate limiter (fallback if no Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;

async function checkRateLimit(key: string): Promise<boolean> {
  const now = Date.now();

  // Try Upstash if configured
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const windowKey = `ratelimit:${key}:${Math.floor(now / RATE_LIMIT_WINDOW)}`;

      const incrResponse = await fetch(`${upstashUrl}/incr/${windowKey}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
      const incrData = await incrResponse.json();
      const count = incrData.result;

      // Set expiry on first request
      if (count === 1) {
        await fetch(`${upstashUrl}/expire/${windowKey}/60`, {
          headers: { Authorization: `Bearer ${upstashToken}` },
        });
      }

      return count <= RATE_LIMIT_MAX;
    } catch {
      // Fallback to in-memory if Upstash fails
    }
  }

  // In-memory fallback
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  record.count++;
  return record.count <= RATE_LIMIT_MAX;
}

// Count URLs in message
function countUrls(text: string): number {
  const urlPattern = /https?:\/\/[^\s]+/gi;
  const matches = text.match(urlPattern);
  return matches ? matches.length : 0;
}

// Neutral response (don't help bots)
function neutralResponse() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      // Return neutral response on validation failure
      return neutralResponse();
    }

    const { name, email, message, subject, company, ts } = result.data;

    // Anti-spam checks (all return neutral response)

    // 1. Honeypot: if company field is filled, it's a bot
    if (company && company.trim() !== "") {
      return neutralResponse();
    }

    // 2. Timing trap: form submitted too fast (< 1.5s)
    if (ts && Date.now() - ts < 1500) {
      return neutralResponse();
    }

    // 3. Too many URLs in message (>= 3)
    if (countUrls(message) >= 3) {
      return neutralResponse();
    }

    // 4. Rate limiting
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const rateLimitKey = `${clientIp}:${email}`;
    const allowed = await checkRateLimit(rateLimitKey);
    if (!allowed) {
      return neutralResponse();
    }

    // Check required env vars
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendApiKey || !toEmail || !fromEmail) {
      console.error("[contact] Missing env vars");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // Send email via Resend
    const resend = new Resend(resendApiKey);

    const emailSubject = subject || `Contact KRY8: ${name}`;
    const emailText = `Nouveau message de contact

Nom: ${name}
Email: ${email}

Message:
${message}

---
Envoyé depuis le formulaire de contact kry8.dev`;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
    });

    // Log success (no sensitive data)
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] Email sent successfully");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[contact] Error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Block other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
