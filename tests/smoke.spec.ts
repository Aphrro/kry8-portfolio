import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('page loads and displays hero content', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/KRY8/);

    // Check hero section is visible
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Développeur Web');

    // Check gradient text is present
    await expect(page.locator('.gradient-text').first()).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/');

    // Test navigation to projects section
    await page.click('a[href="#projets"]');
    await expect(page.locator('#projets')).toBeInViewport();

    // Test navigation to services section
    await page.click('a[href="#services"]');
    await expect(page.locator('#services')).toBeInViewport();

    // Test navigation to pricing section
    await page.click('a[href="#tarifs"]');
    await expect(page.locator('#tarifs')).toBeInViewport();

    // Test navigation to contact section
    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('CTA buttons are clickable', async ({ page }) => {
    await page.goto('/');

    // Check primary CTA button exists and is clickable
    const ctaButton = page.locator('a[href="#projets"]').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
  });
});

test.describe('Contact Form', () => {
  test('form displays all required fields', async ({ page }) => {
    await page.goto('/#contact');

    // Check form fields exist
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    // Check submit button exists
    await expect(page.getByRole('button', { name: /envoyer/i })).toBeVisible();
  });

  test('form validates required fields', async ({ page }) => {
    await page.goto('/#contact');

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /envoyer/i });
    await submitButton.click();

    // Form should not submit (HTML5 validation)
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required', '');
  });

  test('form submission works with mocked API', async ({ page }) => {
    // Mock the API endpoint
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/#contact');

    // Fill the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.');

    // Submit the form
    await page.getByRole('button', { name: /envoyer/i }).click();

    // Check success message appears
    await expect(page.getByText(/message envoyé/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Accessibility', () => {
  test('all sections have proper headings', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check h2 headings exist for sections
    const h2Headings = page.locator('h2');
    await expect(h2Headings.first()).toBeVisible();
  });

  test('form inputs have labels', async ({ page }) => {
    await page.goto('/#contact');

    // Check that inputs have associated labels
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through the page and check focus is visible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
