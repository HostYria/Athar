# Athar Platform Design Guidelines

## Design Approach
**Hybrid Reference-Based**: Drawing from WeChat's social-financial integration, Telegram's clean messaging UI, Revolut's modern fintech aesthetic, and Coinbase's trustworthy wallet design. The platform features premium glassmorphism effects, gradient accents, and sophisticated visual hierarchy that balances social warmth with financial precision.

## Core Design Principles
1. **Premium Minimalism**: Clean, spacious layouts with sophisticated glass effects and gradients
2. **Gradient Identity**: Multi-color gradient system (teal→purple→pink) as primary visual language
3. **Glassmorphism**: Frosted glass effects with backdrop blur for modern depth and hierarchy
4. **Bilingual Excellence**: Seamless Arabic/English support with proper RTL handling
5. **Trust Through Clarity**: Transparent visual cues emphasizing safety in financial operations

---

## Typography System

**Primary Fonts**: SF Pro Display / Inter (Latin), Cairo / Tajawal (Arabic)

**Scale**:
- Display/Hero: 56-64px desktop, 36-42px mobile, Weight 700
- Page Headers: 40-48px desktop, 28-32px mobile, Weight 600
- Section Titles: 28-32px desktop, 20-24px mobile, Weight 600
- Card Headers: 20-24px, Weight 600
- Body: 16px, Weight 400
- Meta/Small: 14px, Weight 400
- Financial Data: 24-32px, Weight 500, tabular-nums

**Hierarchy**:
- Wallet balances: 40-48px bold with subtle gradient text effect
- Transaction amounts: 28-32px medium, monospaced numerals
- Currency labels: 14px uppercase tracking-wider
- Chat messages: 16px regular, sender names 14px semibold
- Timestamps: 12px light gray

---

## Color & Gradient System

**Primary Gradient**: Linear teal (#14b8a6) → purple (#a855f7) → pink (#ec4899)
- Applied to: Primary buttons, active states, balance card accents, navigation indicators
- Direction: 135deg diagonal

**Background System**:
- Base: Dark slate (#0f172a) or light (#f8fafc) depending on theme
- Cards: Semi-transparent white (rgba(255,255,255,0.1) dark / 0.7 light) with backdrop-blur-xl
- Overlays: rgba(0,0,0,0.4) with backdrop-blur-md

**Accent Colors**:
- Success: Emerald (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Rose (#f43f5e)
- Info: Sky (#0ea5e9)

**Text Colors**:
- Primary: Near-black (#1e293b) or white (#f8fafc)
- Secondary: Slate (#64748b)
- Muted: Light slate (#cbd5e1)

---

## Layout & Spacing

**Tailwind Units**: 2, 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8
- Card spacing: p-6
- Section gaps: py-16 to py-24
- Grid gaps: gap-6 to gap-8
- Container: max-w-7xl with px-6

**Grid Patterns**:
- Wallet overview: 3-column grid (1/2/3 responsive)
- Transaction history: Single column list with dividers
- Chat interface: Split view (list 30% / conversation 70%)
- Store: 4-column grid (1/2/3/4 responsive)
- Admin tables: Full-width with fixed headers

---

## Component Library

### Navigation
**Sidebar (Desktop)**: Floating glass panel with backdrop blur
- Width: 280px, semi-transparent white/dark background
- Active item: Gradient background with subtle glow
- Icons: 24px with gradient fill on active
- User section at top: Avatar (56px) with balance summary in glass container
- Navigation items: Icon + label with 12px spacing, hover scale effect

**Mobile Navigation**: Bottom tab bar with glass effect
- Fixed bottom, backdrop-blur, 5 primary actions
- Active tab: Gradient indicator line (4px height)

### Wallet Interface

**Balance Cards**:
- Large glass cards (rounded-3xl, backdrop-blur-2xl, border border-white/20)
- Gradient border accent on hover
- Currency icon top-left (40px gradient circle)
- Balance: 48px bold, gradient text
- Label: 14px uppercase tracking-wide
- Quick actions: Two icon buttons with glass effect
- Dimensions: Minimum 320px wide, 180px tall

**Transaction Flow**:
- Send/Receive tabs with gradient underline indicator
- Amount input: Large (32px) with glass container
- Recipient field: Monospace with copy button (glass effect)
- QR scanner: Full-screen overlay with frosted edges, central viewfinder
- Confirmation modal: Glass panel with blur, gradient confirm button

**ATH Trading Panel**:
- Current rate display: Large gradient text (40px)
- Buy/Sell slider toggle with gradient track
- Amount calculator: Real-time conversion in glass containers
- Fee structure: Small text in muted color below input
- Trade button: Full-width gradient with glow effect

### Chat & Social

**Chat Rooms**:
- Message bubbles: Glass effect with backdrop blur
- Sent messages: Gradient background, right-aligned
- Received: Semi-transparent gray, left-aligned
- Bubble radius: rounded-2xl with tail pointer
- Avatar: 40px circle with gradient ring for active users
- Input bar: Fixed bottom, glass effect, rounded-full
- Send button: Gradient circle (48px)

**Voice Rooms**:
- Participant grid: Glass cards with avatar (80px)
- Active speaker: Pulsing gradient ring animation
- Username below avatar: 14px semibold
- Controls: Bottom glass panel with mute/leave buttons
- Background: Subtle gradient overlay

**Match System**:
- Card interface: Large glass card (400px wide) with user info
- Action buttons: Gradient "Connect", outlined "Next"
- Toggle: Chat/Voice switch with gradient background slider

### User Profile

**Profile Header**:
- Glass container spanning full width
- Avatar: 120px with gradient border (4px)
- Username: 32px bold
- Email/Bio: 16px muted
- Stats row: Three glass pills with counts (Friends, Chats, Transactions)

**Settings**:
- Grouped sections in glass cards
- Toggle switches: Gradient when active
- Dropdowns: Glass containers with gradient focus ring
- Save button: Gradient background

### Store

**Product Cards**:
- Glass effect with hover elevation
- Product image: Full-width top, rounded-t-2xl
- Name: 18px semibold
- Price: 24px bold with ATH label, gradient text
- Add button: Small gradient pill
- Grid: 4 columns desktop, 2 mobile

**Cart**:
- Slide-out glass panel from right
- Item list with quantity controls
- Total: Large gradient text
- Checkout: Full-width gradient button

### Admin Panel

**Dashboard Cards**:
- Glass containers with gradient border-top
- Metric value: 40px bold gradient
- Label: 14px uppercase
- Icon: 32px with gradient

**Data Tables**:
- Glass container with fixed header
- Row hover: Subtle gradient background
- Action buttons: Icon buttons with glass effect
- Pagination: Glass pills with gradient active state

---

## Visual Effects

**Glassmorphism**:
- Background: rgba(255,255,255,0.1) dark mode / rgba(255,255,255,0.7) light
- Backdrop filter: blur(20px) to blur(40px)
- Border: 1px solid rgba(255,255,255,0.2)
- Shadow: Large soft shadows for depth

**Gradients**:
- Buttons: 135deg linear gradient
- Text: Gradient fill on headings and accents
- Borders: Gradient border on focus/hover states
- Backgrounds: Subtle radial gradients on large sections

**Elevation**:
- Cards: shadow-xl with glass effect
- Modals: shadow-2xl with backdrop blur
- Dropdowns: shadow-lg
- Hover states: Increase shadow and subtle scale (1.02)

---

## Authentication

**Login/Register**:
- Centered glass card (500px max-width)
- Gradient logo at top (80px)
- Form fields: Glass inputs with gradient focus ring
- Submit button: Full-width gradient
- Links: Gradient text on hover
- Background: Subtle animated gradient mesh

---

## Responsive Behavior

**Desktop (1024px+)**: Sidebar + content area, multi-column grids
**Tablet (768px)**: Collapsible sidebar, 2-column max
**Mobile (<768px)**: Bottom navigation, single column, full-width cards

---

## Images & Assets

**Icons**: Heroicons via CDN, gradient fill for active states
**Avatars**: User uploads, placeholder: gradient circles with initials (48px default)
**QR Codes**: Generated via qrcode.js, displayed in glass container (240x240px)
**Product Images**: Admin uploads, 1:1 ratio preferred
**Background**: Subtle animated gradient mesh for auth screens

**No Hero Image**: This is a dashboard application focused on functional interfaces with premium glassmorphism aesthetic, not a marketing landing page.