# Security and Privacy

Status: APPROVED FOR PHASE 0

## Phase-0 boundary

- No first-party booking/contact form or customer database.
- No inspiration upload, payment or automated notification.
- Analytics port is no-op unless separately approved; fixed events contain no PII.
- WhatsApp, phone, Instagram and directions are explicit external handoffs.
- No secret is exposed to browser code, repository, logs or screenshots.

## Required controls

- Runtime/build schemas reject blocked content and invalid configuration.
- Booking fails closed to `manual-handoff`.
- Outbound destinations are fixed or HTTPS/origin-allowlisted; unsafe schemes and open redirects are rejected.
- Use semantic output encoding, restrictive CSP and no PII in URLs/storage.
- Use a frozen lockfile, dependency/license review and secret scan.
- Structured logs contain coarse operational metadata only; redact contacts, free text, tokens, URLs/query strings, image content and payment data.
- Production headers include HSTS, content-type protection, appropriate referrer/permissions policy and anti-framing policy.
- Timeouts and fallbacks preserve first-party content.

## Future capabilities

Forms require server validation, limits, rate controls, accessible abuse protection and CSRF controls where applicable. Webhooks require raw-body signatures, replay protection, unique event IDs, idempotency and state validation. Uploads require private storage, content validation/scanning, expiring access and approved retention. Admin accounts require least privilege, named identities, MFA where supported, audit and deprovisioning.

Payments and notifications remain separate interfaces. Payment state never proves appointment state; notification failure never creates/cancels an appointment. Marketing consent stays separate from transactional authority.

Public privacy and booking-policy text must match implemented data flows and clear owner/legal review before any production data collection.
