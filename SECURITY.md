# Security Policy

Thank you for your interest in the security of **LearnFlow FRONTEND**. We take the protection of our users and their data seriously. This document outlines our security policy and responsible disclosure guidelines.

---

## Supported Versions

We provide security updates for the latest major release of **LearnFlow FRONTEND**. Please refer to the [Releases](https://github.com/gayanukabulegoda/LearnFlow-FRONTEND/releases) page for information on currently supported version(s).

| Version | Supported          |
|---------|--------------------|
| `1.x`   | :white_check_mark: |

If you are using an older version, we strongly recommend upgrading to the latest release to benefit from current security patches and enhancements.

---

## Reporting a Vulnerability

We appreciate responsible disclosures. If you discover a security issue or vulnerability, **do not** publicly disclose it until we have had an opportunity to address it.

1. **Contact Method**
    - Email: [grbulegoda@gmail.com](mailto:grbulegoda@gmail.com)  
      Please include as much detail as possible, such as steps to reproduce, potential impact, and any supporting information.

2. **Optional Encrypted Communication**
    - If you prefer to use encryption, please mention it in your initial email, and we can coordinate secure communication (e.g., GPG key exchange).

3. **Alternate Contact**  
   You may also reach out via:
    - [LinkedIn](https://www.linkedin.com/in/gayanuka-bulegoda)
    - [Portfolio](https://grbulegoda.me)

   However, **email remains the preferred and most secure channel** for reporting sensitive issues.

4. **Response Time**  
   We strive to acknowledge your report within **72 hours**. We will follow up with an initial assessment and may request additional information to help reproduce or confirm the issue.

---

## Disclosure Process

1. **Investigation & Verification**  
   We will investigate your report to verify its validity and determine its impact. If confirmed, we will develop a fix or mitigation strategy.

2. **Fix & Release**  
   After the fix is developed and tested, we will release it in the next suitable version of **LearnFlow FRONTEND**. We will also inform you once the fix is available and, if desired, credit your contribution.

3. **Public Disclosure**  
   Once a patch is released, we may publicly disclose the nature of the vulnerability to ensure users are aware and can update promptly. We will coordinate with you on the public disclosure timeline to ensure responsible communication.

---

## Bug Bounty

Currently, **LearnFlow FRONTEND** does not have a formal bug bounty program. However, we greatly value your responsible disclosures and may offer public recognition for verified, high-impact reports.

---

## Security Best Practices

- **Regularly Update Dependencies**  
  Keep your Node.js packages, React, and other dependencies up to date.
- **Use HTTPS**  
  Always deploy the frontend over HTTPS to protect user data in transit.
- **Sanitize & Validate User Input**  
  Although the main data processing is handled by the backend, always sanitize any user-generated content to avoid client-side vulnerabilities.
- **Follow the Principle of Least Privilege**  
  Only expose or store minimal data necessary on the frontend.

---

## Thank You

Your efforts in identifying and responsibly disclosing vulnerabilities are vital to maintaining a secure environment for all **LearnFlow** users. We sincerely appreciate your commitment to security.

---

_Last updated: February 18, 2025_