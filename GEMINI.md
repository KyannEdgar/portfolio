# Design System & UI Guidelines

## 1. Monochrome & Minimalist Aesthetic
- **Palette**: Strictly monochrome and minimalist. Use only black, white, and neutral grayscale tones.
- **Accents & Glows**: Never use colored accents for text, borders, icons, or backgrounds. Do not apply colored glowing effects, colored radial back-glows, or neon gradients.

## 2. Layout & Content Invariants
- **No Mock Telemetry**: Do not include mock technical telemetry, artificial IP addresses, simulated latency meters, or system status UI elements (e.g., `SYSTEM_STATE: NOMINAL`, `LIVE_TELEMETRY`, pulsing status lights) in the layout.
- Focus presentation directly on real engineering work, case studies, and clear technical descriptions.

## 3. Navigation Styling
- **Unboxed Text Links**: All navigation must reflect clean, unboxed text links without surrounding button boxes, pill borders, or decorative tags.
- Use ample spacing, refined typographic hierarchy, and subtle text opacity transitions on hover.

## 4. Typography Standards
- **Modern Geometric Sans-Serif**: Strictly mandate clean, modern geometric sans-serif typography across all headings, body copy, and UI elements.
- **Prohibition of Serif Fonts**: Serif typefaces are strictly prohibited.

## 5. Header Behavior & Scroll Transitions
- **Frosted Glass on Scroll**: The top navigation header must dynamically activate a frosted glass container (backdrop blur with translucent background and subtle border) upon scrolling.

## 6. Motion & State Transitions
- **Fluid Transitions**: All state changes—including theme switching, route navigation, and hover states—must utilize smooth Framer Motion transitions or CSS duration classes (`transition-*`, `duration-*`).
- **No Instant Snapping**: Avoid rigid, abrupt UI snapping; guarantee refined, fluid easing across interactive states.
