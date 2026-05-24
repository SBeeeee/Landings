# Landings — Design System

This document is the single source of truth for all UI decisions. Every agent working on this codebase must read and follow it before writing any component.

---

## Product

**Landings** is a micro-landing-page SaaS for small Indian businesses (salons, gyms, tutors, boutiques). Users get a shareable page at `landings.in/their-username` in under 5 minutes.

---

## Visual Language

| Token | Value |
|---|---|
| Style | Dark, minimal, modern SaaS |
| Personality | Professional but approachable — not corporate, not playful |
| Primary accent | Indigo (`indigo-600` / `#4f46e5`) |
| Secondary accent | Violet (`violet-500`) |
| Background | `gray-950` (`#030712`) |
| Surface | `white/3` to `white/8` (translucent cards) |
| Border | `white/6` to `white/10` |
| Body text | `gray-400` |
| Heading text | `white` |
| Muted text | `gray-500` / `gray-600` |

---

## Typography

Fonts are loaded via `next/font/google` in `layout.tsx`:
- **Sans**: Geist Sans (`--font-geist-sans`) — used for all body and UI text
- **Mono**: Geist Mono (`--font-geist-mono`) — used for code/URLs only

| Role | Classes |
|---|---|
| Page headline (H1) | `text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight` |
| Section headline (H2) | `text-4xl sm:text-5xl font-extrabold tracking-tight` |
| Card title (H3) | `text-base font-bold` |
| Body | `text-sm leading-relaxed text-gray-400` |
| Label / badge | `text-xs font-semibold uppercase tracking-widest` |
| Price | `text-5xl font-extrabold` |

---

## Spacing & Layout

- Max content width: `max-w-6xl mx-auto`
- Section vertical padding: `py-24`
- Horizontal padding: `px-4 sm:px-6`
- Card padding: `p-6` (small) / `p-7–p-8` (large)
- Gap between grid items: `gap-6`

---

## Components

All UI primitives live in `src/components/ui/`. Never write raw HTML equivalents in pages or feature components — always use these.

---

### `Button` (`src/components/ui/Button.tsx`)

The only button component in the app. Never write raw `<button>` elements in pages or feature components.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `fullWidth` | `boolean` | `false` | |

**Variants:**
- `primary` — indigo fill, white text. Use for main CTAs.
- `secondary` — white fill, dark text, border. Use on dark backgrounds for secondary actions.
- `ghost` — transparent, gray text. Use in navbars and for tertiary actions.

**Usage:**
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg">Get started free</Button>
<Button variant="ghost" size="sm">Log in</Button>
```

---

### `Input` (`src/components/ui/Input.tsx`)

| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | Renders a `<label>` above |
| `error` | `string` | Red error text below |
| `hint` | `string` | Gray hint text below (hidden when error shown) |
| `leftIcon` | `ReactNode` | Icon inside left edge |
| `rightIcon` | `ReactNode` | Icon inside right edge |

```tsx
import Input from '@/components/ui/Input';

<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Search" leftIcon={<SearchIcon />} error="Required" />
```

---

### `Textarea` (`src/components/ui/Textarea.tsx`)

Same props as `Input` minus icons. Resizable vertically, min height 100px.

```tsx
import Textarea from '@/components/ui/Textarea';

<Textarea label="Description" placeholder="Tell customers about your business..." />
```

---

### `Select` (`src/components/ui/Select.tsx`)

Native `<select>` styled to match the design system.

| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value: string; label: string }[]` | Required |
| `placeholder` | `string` | Disabled first option |
| `label` / `error` / `hint` | `string` | Same as Input |

```tsx
import Select from '@/components/ui/Select';

<Select
  label="Business type"
  placeholder="Select a type"
  options={[
    { value: 'salon', label: 'Salon' },
    { value: 'gym', label: 'Gym' },
  ]}
/>
```

---

### `Dropdown` (`src/components/ui/Dropdown.tsx`)

Custom dropdown menu with click-outside and Escape-to-close. Use for action menus, user menus, etc.

| Prop | Type | Notes |
|---|---|---|
| `trigger` | `ReactNode` | The element that opens the menu |
| `items` | `DropdownItem[]` | Menu items |
| `align` | `'left' \| 'right'` | Menu alignment. Default `'right'` |

`DropdownItem` shape:
```ts
{ label, onClick, icon?, danger?, disabled?, dividerAfter? }
```

```tsx
import Dropdown from '@/components/ui/Dropdown';

<Dropdown
  trigger={<button>Options</button>}
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Share', onClick: handleShare, dividerAfter: true },
    { label: 'Delete', onClick: handleDelete, danger: true },
  ]}
/>
```

---

### `Modal` (`src/components/ui/Modal.tsx`)

| Prop | Type | Notes |
|---|---|---|
| `open` | `boolean` | Controls visibility |
| `onClose` | `() => void` | Called on backdrop click or Escape |
| `title` | `string` | Optional header title |
| `description` | `string` | Optional header subtitle |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | Default `'md'` |

```tsx
import Modal from '@/components/ui/Modal';

<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm delete">
  <p className="text-gray-400">This action cannot be undone.</p>
  <div className="mt-4 flex gap-3 justify-end">
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleDelete}>Delete</Button>
  </div>
</Modal>
```

---

### `Badge` (`src/components/ui/Badge.tsx`)

| Prop | Type | Notes |
|---|---|---|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'indigo'` | Default `'default'` |
| `dot` | `boolean` | Adds a colored dot before text |

```tsx
import Badge from '@/components/ui/Badge';

<Badge variant="success" dot>Published</Badge>
<Badge variant="warning">Draft</Badge>
```

---

### `Spinner` (`src/components/ui/Spinner.tsx`)

| Prop | Type | Notes |
|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | Default `'md'` |
| `fullscreen` | `boolean` | Covers entire viewport |
| `label` | `string` | Text below spinner |

```tsx
import Spinner from '@/components/ui/Spinner';

<Spinner size="lg" label="Loading..." />
<Spinner fullscreen label="Checking authentication" />
```

---

### `Card` (`src/components/ui/Card.tsx`)

| Prop | Type | Notes |
|---|---|---|
| `highlighted` | `boolean` | Indigo border + glow |
| `onClick` | `() => void` | Makes card interactive |

```tsx
import Card from '@/components/ui/Card';

<Card>
  <h3 className="text-white font-bold">Basic card</h3>
</Card>

<Card highlighted onClick={handleSelect}>
  <h3 className="text-white font-bold">Featured card</h3>
</Card>
```

---

### `Toast` + `useToast` (`src/components/ui/Toast.tsx`)

Self-dismissing toast notifications. Use the `useToast` hook in any client component.

```tsx
'use client';
import { useToast, ToastContainer } from '@/components/ui/Toast';

export default function MyPage() {
  const toast = useToast();

  return (
    <>
      <button onClick={() => toast.success('Page published!')}>Publish</button>
      <button onClick={() => toast.error('Something went wrong')}>Fail</button>

      {/* Place once per page/layout */}
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </>
  );
}
```

Variants: `success`, `error`, `info`, `warning`. Auto-dismisses after 4 seconds.

---

## Cards

Cards use this base pattern — never deviate:

```tsx
<div className="rounded-2xl border border-white/8 bg-white/3 p-6 transition-all hover:border-indigo-500/40 hover:bg-white/5">
```

Highlighted/featured cards (e.g. pricing):
```tsx
<div className="rounded-2xl border border-indigo-500/50 bg-indigo-600/10 p-8 shadow-xl shadow-indigo-600/10">
```

---

## Section Header Pattern

Every section uses this exact header structure:

```tsx
<div className="text-center">
  <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
    Section label
  </p>
  <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
    Main headline
  </h2>
  <p className="mx-auto mt-4 max-w-xl text-gray-400">
    Supporting description.
  </p>
</div>
```

---

## Background Glows

Decorative blurred gradient orbs used on hero and key sections:

```tsx
<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
  <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />
</div>
```

Always `aria-hidden`, always `pointer-events-none`, always `-z-10` or lower.

---

## Icons

No icon library. Use inline SVGs only. All icons:
- `stroke="currentColor"` — inherits text color
- `strokeWidth={1.8}` for decorative / `strokeWidth={2.5}` for UI actions
- `fill="none"`
- Size via `className="h-5 w-5"` etc.

---

## Page Structure

```
layout.tsx
  └── Provider (Redux + AuthInitializer)
       └── page.tsx (or any route)
            ├── Navbar (fixed, z-50)
            ├── <main>
            │    ├── Hero
            │    ├── HowItWorks
            │    ├── BusinessTypes
            │    ├── Testimonials
            │    └── Pricing
            └── Footer
```

---

## Home Page Components (`src/components/home/`)

| File | Purpose |
|---|---|
| `Navbar.tsx` | Fixed top nav — logo, links, login/register CTAs |
| `Hero.tsx` | Full-viewport hero — headline, sub-headline, CTAs, mock browser preview |
| `HowItWorks.tsx` | 4-step process cards |
| `BusinessTypes.tsx` | 8 business type tiles |
| `Testimonials.tsx` | 3 customer quotes |
| `Pricing.tsx` | Free vs Pro pricing cards |
| `Footer.tsx` | Brand, nav links, copyright |

---

## Routing Conventions

| Path | Page | Auth |
|---|---|---|
| `/` | Landing / home | Public |
| `/login` | Login form | Public (redirect to dashboard if logged in) |
| `/register` | Register form | Public (redirect to dashboard if logged in) |
| `/dashboard` | User dashboard | Protected — wrap with `<PrivateRoute>` |
| `/:username` | Public business page | Public |

---

## Auth Guard

Wrap any protected page content with `PrivateRoute`:

```tsx
import PrivateRoute from '@/components/PrivateRoute';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      {/* page content */}
    </PrivateRoute>
  );
}
```

`PrivateRoute` reads `initialized` and `isLoggedIn` from `useAuth()`. It shows a spinner until the session check completes, then redirects to `/login` if not authenticated.

---

## Rules for Agents

1. **Never** install new UI libraries (no shadcn, no MUI, no Radix) — use Tailwind only.
2. **Never** create a second Axios instance — use `src/utils/api.ts`.
3. **Never** call `useDispatch` / `useSelector` in a component — use the domain hook.
4. **Always** use `<Button>` from `src/components/ui/Button.tsx` for buttons.
5. **Always** use `next/link` for internal navigation, never `<a href>`.
6. **Always** add `aria-hidden` to decorative elements.
7. **Always** follow the section header pattern for new sections.
8. Page components are Server Components by default — only add `'use client'` when the component uses hooks, event handlers, or browser APIs.
