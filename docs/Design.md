# Design - Visual Guidelines

## Figma Reference

**Figma Link:** [Hashed System Assignment Design](https://www.figma.com/design/4CYMYUihn9hbRpLgpb7g4J/Hashed-System-NEXTJS-TYPESCRIPT-Assignment--Copy-?node-id=0-1&t=gCjFZiUanGbW5SGq-1)

**File ID:** `4CYMYUihn9hbRpLgpb7g4J`

**File Name:** Hashed System NEXTJS/TYPESCRIPT Assignment (Copy)

> All visual decisions should reference the Figma file. Extract colors, spacing, typography, and component styles directly from the design.

## Design Principles

- **Pixel-perfect:** Match Figma exactly
- **Responsive:** Mobile-first, adapt across all breakpoints
- **Consistent:** Use design tokens for repeated values
- **Accessible:** Maintain contrast ratios, readable font sizes

## Colors

> Extracted from Figma design screenshots.

### Primary Colors

```
Primary:        #ff5037 (Coral/Orange - main brand color)
Primary Light:  #ff8777 (Lighter shade for hover states)
Primary Dark:   #e6452f (Darker shade for active states)
```

### Accent Colors

```
Accent Coral:   #ff786a
Accent Orange:  #fe8b16
Accent Yellow:  #ffc332
Accent Beige:   #fdf5e8
```

### Neutral Colors

```
Dark Brown:     #372320 (Primary text color)
Light Gray:     #f4f4f4 (Background color)
White:          #ffffff (Surface color)
Gray 100:       #f3f4f6
Gray 200:       #e5e7eb
Gray 300:       #d1d5db
Gray 400:       #9ca3af
Gray 500:       #6b7280
Gray 600:       #4b5563
Gray 700:       #374151
Gray 800:       #1f2937
Gray 900:       #111827
```

### Semantic Colors

```
Success:        #10b981 (Green)
Warning:        #f59e0b (Yellow)
Error:          #ef4444 (Red)
Info:           #3b82f6 (Blue)
```

## Typography

> Extracted from Figma design.

### Font Family

```
Primary:        Poppins (Google Fonts)
Fallback:       sans-serif
```

### Font Sizes

```
xs:             0.75rem (12px)
sm:             0.875rem (14px)
base:           1rem (16px)
lg:             1.125rem (18px)
xl:             1.25rem (20px)
2xl:            1.5rem (24px)
3xl:            1.875rem (30px)
4xl:            2.25rem (36px)
5xl:            3rem (48px)
6xl:            3.75rem (60px)
```

### Font Weights

```
Regular:        400
Medium:         500
SemiBold:       600
Bold:           700
```

### Line Heights

```
Tight:          1.25
Normal:         1.5
Relaxed:        1.75
```

## Spacing

> Tailwind's default spacing scale with custom additions.

### Base Scale

```
Base unit:      4px
Scale:          1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px, 16=64px, 20=80px, 24=96px
```

### Custom Spacing

```
15:             3.75rem (60px)
18:             4.5rem (72px)
22:             5.5rem (88px)
26:             6.5rem (104px)
30:             7.5rem (120px)
```

## Border Radius

> Extracted from Figma design.

```
sm:             0.25rem (4px)
md:             0.375rem (6px)
lg:             0.5rem (8px)
xl:             0.75rem (12px)
2xl:            1rem (16px)
card:           20px (custom)
button:         10px (custom)
pill:           999px (fully rounded)
```

## Breakpoints

| Name | Min Width | Target |
| --- | --- | --- |
| Mobile | 0px | Phone screens |
| Tablet | 640px | Tablets, small laptops |
| Desktop | 1024px | Desktops, large screens |
| Wide | 1280px+ | Ultra-wide displays |

## Shadows / Elevation

> Extracted from Figma design.

```
sm:             0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:             0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
lg:             0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
xl:             0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

## Component Styles

### Buttons

#### Primary Button
- Background: #ff5037 (Primary)
- Text Color: #ffffff (White)
- Hover Background: #e6452f (Primary Dark)
- Border Radius: 10px (button)
- Font Weight: 600 (SemiBold)
- Padding: 12px 24px (md), 16px 32px (lg)

#### Secondary Button
- Background: #ffffff (White)
- Border: 1px solid #e5e7eb (Gray 200)
- Text Color: #372320 (Dark Brown)
- Hover Background: #f4f4f4 (Light Gray)
- Border Radius: 10px (button)

#### Ghost Button
- Background: transparent
- Text Color: #372320 (Dark Brown)
- Hover Background: #fef2f0 (Primary 50)
- Border Radius: 10px (button)

### Inputs

- Height: 44px (md), 48px (lg)
- Border: 1px solid #e5e7eb (Gray 200)
- Focus Border: #ff5037 (Primary)
- Error Border: #ef4444 (Error)
- Padding: 12px 16px
- Border Radius: 10px (button)
- Placeholder Color: #9ca3af (Gray 400)

### Cards

- Background: #ffffff (White)
- Border Radius: 20px (card)
- Padding: 16px-24px
- Shadow: sm or md (depending on elevation)
- Border: 1px solid #e5e7eb (optional)

### Modals

- Overlay Background: rgba(0, 0, 0, 0.5)
- Modal Background: #ffffff (White)
- Border Radius: 20px (card)
- Max Width: 480px (sm), 640px (md), 768px (lg)
- Animation: Fade in + scale up (0.2s ease-out)

## Transitions & Animations

### Duration

```
Fast:           150ms
Normal:         200-300ms
Slow:           400-500ms
```

### Easing

```
Default:        cubic-bezier(0.4, 0, 0.2, 1)
In:             cubic-bezier(0.4, 0, 1, 1)
Out:            cubic-bezier(0, 0, 0.2, 1)
In-Out:         cubic-bezier(0.4, 0, 0.2, 1)
```

### Animations

```
Slide In:       0.3s ease-out (from right)
Slide Out:      0.3s ease-in (to right)
Fade In:        0.2s ease-out
Fade Out:       0.2s ease-in
Scale In:       0.2s ease-out (from 0.95 to 1)
Scale Out:      0.2s ease-in (from 1 to 0.95)
Spin:           1s linear infinite
Pulse:          2s cubic-bezier(0.4, 0, 0.6, 1) infinite
```

## Dark Mode (Bonus)

> Dark mode implementation uses CSS variables for easy theme switching.

### Dark Mode Colors

```
Dark Background:    #1a1a1a
Dark Surface:       #2d2d2d
Dark Text:          #ffffff
Dark Muted:         #a0a0a0
Dark Border:        #404040
```

### Dark Mode CSS Variables

```css
:root {
  --background: #ffffff;
  --foreground: #372320;
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --muted: #6b7280;
}

.dark {
  --background: #1a1a1a;
  --foreground: #ffffff;
  --card-bg: #2d2d2d;
  --card-border: #404040;
  --muted: #a0a0a0;
}
```

## Design Verification Checklist

> Complete this checklist for EVERY component before marking as done.

- [ ] All colors extracted from Figma (not guessed)
- [ ] All typography extracted from Figma
- [ ] All spacing extracted from Figma
- [ ] All border-radius values extracted from Figma
- [ ] All shadows/elevation extracted from Figma
- [ ] Hover states implemented
- [ ] Active states implemented
- [ ] Focus states implemented
- [ ] Disabled states implemented (if applicable)
- [ ] Loading states implemented
- [ ] Empty states implemented
- [ ] Error states implemented
- [ ] Responsive behavior matches Figma
- [ ] Transitions/animations match Figma
