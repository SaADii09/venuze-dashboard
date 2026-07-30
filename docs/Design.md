# Design - Visual Guidelines

## Figma Reference

**Figma Link:** [Hashed System Assignment Design](https://www.figma.com/design/yHjRKVXHcf4E6mDj5khXQJ/Hashed-System-NEXTJS-TYPESCRIPT-Assignment?node-id=0-1&p=f&t=HegO7UF7LLPUdGHN-0)

> All visual decisions should reference the Figma file. Extract colors, spacing, typography, and component styles directly from the design.

## Design Principles

- **Pixel-perfect:** Match Figma exactly
- **Responsive:** Mobile-first, adapt across all breakpoints
- **Consistent:** Use design tokens for repeated values
- **Accessible:** Maintain contrast ratios, readable font sizes

## Colors

> Extract from Figma. Define in Tailwind config as custom colors.

```
Primary:    #TBD (extract from Figma)
Secondary:  #TBD (extract from Figma)
Accent:     #TBD (extract from Figma)
Neutral:    #TBD (extract from Figma)
Success:    #TBD
Warning:    #TBD
Error:      #TBD
Background: #TBD
Surface:    #TBD
Text:       #TBD
```

## Typography

> Extract from Figma.

```
Font Family: TBD (extract from Figma - likely Inter, Poppins, or similar)
Font Sizes:
  - xs:   TBD
  - sm:   TBD
  - base: TBD
  - lg:   TBD
  - xl:   TBD
  - 2xl:  TBD
  - 3xl:  TBD

Font Weights:
  - Regular:  400
  - Medium:   500
  - SemiBold: 600
  - Bold:     700

Line Heights: Extract from Figma
```

## Spacing

> Use Tailwind's default spacing scale. Override if Figma uses a custom scale.

```
Base unit: 4px (Tailwind default)
Scale: 1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px, 16=64px
```

## Border Radius

> Extract from Figma.

```
sm:   TBD
md:   TBD
lg:   TBD
xl:   TBD
full: 9999px
```

## Breakpoints

| Name | Min Width | Target |
| --- | --- | --- |
| Mobile | 0px | Phone screens |
| Tablet | 640px | Tablets, small laptops |
| Desktop | 1024px | Desktops, large screens |
| Wide | 1280px+ | Ultra-wide displays |

## Shadows / Elevation

> Extract from Figma for card elevation, dropdown menus, modals.

```
sm:  TBD
md:  TBD
lg:  TBD
```

## Component Styles

### Buttons
- Primary: Background, text color, hover state, active state
- Secondary: Border style, text color, hover state
- Ghost: Transparent background, hover state
- Sizes: sm, md, lg (extract from Figma)

### Inputs
- Height: Extract from Figma
- Border: Default, focus, error states
- Padding: Extract from Figma
- Placeholder color: Extract from Figma

### Cards
- Background: Extract from Figma
- Border/Shadow: Extract from Figma
- Padding: Extract from Figma
- Border radius: Extract from Figma

### Modals
- Overlay color/opacity: Extract from Figma
- Modal background: Extract from Figma
- Border radius: Extract from Figma
- Max width: Extract from Figma
- Animation: Fade in + scale or slide up

## Transitions & Animations

```
Duration:
  - fast:   150ms
  - normal: 200-300ms
  - slow:   400-500ms

Easing:
  - default: cubic-bezier(0.4, 0, 0.2, 1)
  - in:      cubic-bezier(0.4, 0, 1, 1)
  - out:     cubic-bezier(0, 0, 0.2, 1)
```

## Dark Mode (Bonus)

> If implementing dark mode, extract dark palette from Figma or define complementary colors.

```
Dark Background: #TBD
Dark Surface:    #TBD
Dark Text:       #TBD
Dark Border:     #TBD
```
