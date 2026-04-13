# Security Policy

## Supported Versions

We currently provide active security support for the following versions of PhishGuard:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | ✅ Yes             |
| 1.0.x   | ❌ No              |
| < 1.0.0 | ❌ No              |

## Reporting a Vulnerability

**PhishGuard is a security education platform.** If you discover a vulnerability in the platform itself or its threat detection logic, please report it through the following channel:

1. **Email**: [support@phishdefend.intel](mailto:support@phishdefend.intel)
2. **Details**: Please include a detailed description of the vulnerability, steps to reproduce, and potential impact.

### Our Commitment
- We will acknowledge receipt of your report within 48 hours.
- We will provide an estimated timeframe for a fix.
- We will notify you once the fix is deployed.

## Security Hardening Standards

The PhishGuard codebase adheres to strict **Secure Coding** principles:
- **Zero Telemetry**: We do not store or transmit user analysis data.
- **Local Execution**: All URL/Email analysis happens client-side to prevent server-side request forgery (SSRF).
- **Hardened CSP**: Content Security Policy is enforced to prevent XSS and data exfiltration.

**Thank you for helping keep the PhishGuard community safe.**

---
*Coded by Lucky // Secured Platform Initiative*
