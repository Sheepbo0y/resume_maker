# Accessibility Guidelines

This document outlines WCAG 2.1 AA-level guidelines applied to the resume templates in this project, and practical testing methods.

## WCAG 2.1 AA Principles
- Perceivable: Information and user interface components must be presentable and understandable.
- Operable: User interface must be usable with keyboard and assistive technologies.
- Understandable: Information and operation of the user interface must be understandable.
- Robust: Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

## Core Guidelines for the Resume Templates
- Semantic HTML: Use proper semantic elements (header, main, section, article, nav, footer, address, ul/li, time).
- Headings: Use a single-page heading order (h1 for name, h2 for major sections such as Summary, Experience, Education, Skills, Projects). Avoid skipping heading levels.
- Text Alternatives: All textual information should be available as text (no decorative text replacing content).
- Color Contrast: Ensure foreground/background contrast ratio is at least 4.5:1 for body text; avoid color-only indicators.
- Keyboard Accessibility: All interactive items accessible via keyboard; focus order logical; visible focus outlines enabled.
- Screen Reader Compatibility: Ensure that structure and content are announced in a meaningful order; ARIA labels should be descriptive where needed.
- Print Accessibility: Ensure print styles preserve content readability; avoid hiding essential text for print.
- Language of Page: The html element should declare lang attribute (e.g., lang="en").

## Testing Methods
- Manual keyboard navigation: Tab through all sections and ensure logical focus order.
- Screen reader testing: Use a screen reader (NVDA, VoiceOver, VoiceOver on macOS) to read the resume sections and confirm content flow.
- Automated linting/validation: Use an HTML validator and accessibility testing tools (axe-core, Lighthouse) to check for ARIA misuse, color contrast, and semantic correctness.
- WCAG compliance checks: Validate that all non-text content has text alternatives and that interactive elements have robust names.

## Quick Checks for Developers
- All sections have headings with a proper hierarchy.
- Contacts are in plain text or links (mailto/tel).
- No decorative images replace textual information.
- CSS uses tokens/classes rather than inline styles for accessibility-controlable properties when possible.
- Print styles do not hide necessary information.

版本：2026-03-28
