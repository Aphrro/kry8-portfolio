# Checklist Déploiement Vercel (Preview → Prod)

## A) Variables d'environnement (Vercel)

**Vercel → Project → Settings → Environment Variables**

### Obligatoires (Production + Preview)

| Variable | Valeur | Exemple |
|----------|--------|---------|
| `RESEND_API_KEY` | Secret Resend | `re_xxxxxxxxxxxx` |
| `CONTACT_TO_EMAIL` | Email de réception | `contact@kry8labs.com` |
| `CONTACT_FROM_EMAIL` | Email d'envoi (vérifié Resend) | `Kry8 Labs <no-reply@kry8labs.com>` |
| `NEXT_PUBLIC_SITE_URL` | URL du site | `https://kry8.dev` |

### Recommandées (Rate Limiting Upstash)

| Variable | Valeur |
|----------|--------|
| `UPSTASH_REDIS_REST_URL` | `https://xxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Token Upstash |

### Vérification

- [ ] Variables définies en **Preview**
- [ ] Variables définies en **Production**
- [ ] Domaine `CONTACT_FROM_EMAIL` vérifié chez Resend

---

## B) Redeploy

Après ajout/modification des ENV VARS :

- [ ] Déclencher un redeploy (Vercel → Deployments → Redeploy)

---

## C) Test Headers

### Commande

```bash
# Preview
curl -sI https://<URL_PREVIEW> | grep -iE "content-security-policy|strict-transport-security|x-content-type-options|referrer-policy|permissions-policy|x-frame-options"

# Production
curl -sI https://kry8.dev | grep -iE "content-security-policy|strict-transport-security|x-content-type-options|referrer-policy|permissions-policy|x-frame-options"
```

### Attendus

- [ ] `Content-Security-Policy` présent
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy` présent
- [ ] `X-Frame-Options: DENY`
- [ ] `Strict-Transport-Security` présent (PROD uniquement)

---

## D) Test API Contact

### Script automatisé

```bash
# Local
./scripts/test-api.sh http://localhost:3000

# Preview
./scripts/test-api.sh https://<URL_PREVIEW>

# Production
./scripts/test-api.sh https://kry8.dev
```

### Tests manuels

#### 1. Appel valide (doit envoyer email)

```bash
curl -X POST https://<URL>/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello from curl, this is a test message.","company":"","ts":0}'
```

- [ ] Retourne `200 {"ok":true}`
- [ ] Email reçu dans la boîte

#### 2. Test Honeypot (NE doit PAS envoyer email)

```bash
curl -X POST https://<URL>/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@example.com","message":"spam message here","company":"FILLED","ts":0}'
```

- [ ] Retourne `200 {"ok":true}` (réponse neutre)
- [ ] Aucun email reçu

#### 3. Test Timing Trap

```bash
# ts = timestamp actuel (soumission trop rapide)
curl -X POST https://<URL>/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Fast","email":"fast@bot.com","message":"Too fast submission","company":"","ts":'$(date +%s)000'}'
```

- [ ] Retourne `200 {"ok":true}` (réponse neutre)
- [ ] Aucun email reçu

#### 4. Test Rate Limit (si Upstash activé)

```bash
# Envoyer 6+ requêtes en <60s avec même email
for i in {1..7}; do
  curl -s -X POST https://<URL>/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Rate","email":"rate@test.com","message":"Rate limit test message","company":"","ts":0}'
  echo " - Request $i"
  sleep 2
done
```

- [ ] ~5 premiers emails reçus
- [ ] Suivants ignorés silencieusement

---

## E) Resend - Délivrabilité

- [ ] Domaine "From" vérifié dans Resend Dashboard
- [ ] SPF configuré (DNS)
- [ ] DKIM configuré (DNS)
- [ ] DMARC configuré (optionnel mais recommandé)
- [ ] Test envoi → vérifier que l'email n'arrive pas en spam

---

## F) Logs & Observabilité

**Vercel → Deployments → Functions Logs**

- [ ] `/api/contact` ne log PAS le contenu du message
- [ ] `/api/contact` ne log PAS l'email en clair
- [ ] Erreurs 500 indiquent "Missing env vars" sans exposer les secrets

---

## G) CSP - Debug

Si violations CSP dans la console :

1. Identifier la ressource bloquée (script/font/img/connect)
2. Ajouter le domaine spécifique dans `next.config.ts` :

```typescript
// Exemples d'ajouts CSP
"script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
"connect-src 'self' https: https://www.google-analytics.com",
"frame-src https://www.youtube.com",
```

3. Éviter les wildcards (`*`) et `'unsafe-eval'`
4. Retester preview puis prod

---

## H) Go Live - Checklist finale

- [ ] Code mergé sur `main`
- [ ] Deployment Vercel **green**
- [ ] Tests curl OK (script `./scripts/test-api.sh`)
- [ ] Test UI formulaire OK
- [ ] Headers sécurité OK
- [ ] Rate limit Upstash OK (recommandé)
- [ ] Lighthouse Perf ≥90
- [ ] Lighthouse SEO ≥90
- [ ] Lighthouse A11y ≥90

---

## Commandes utiles

```bash
# Build local
npm run build

# Dev server
npm run dev

# Tests Playwright
npx playwright test

# Lint + security
npm run lint

# Test API
./scripts/test-api.sh http://localhost:3000
```
