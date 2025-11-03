# Athar Platform Design Guidelines

## Design Approach
**Hybrid Reference-Based**: Drawing from WeChat's social-financial integration, Telegram's clean messaging UI, and Coinbase's trustworthy wallet design. The platform balances social engagement with financial security through clear visual hierarchy and purposeful component design.

## Core Design Principles
1. **Dual Personality**: Social features feel warm and inviting; financial features convey trust and precision
2. **Purple Identity**: Brand color (purple/violet) as primary accent throughout
3. **Bilingual Excellence**: Seamless Arabic/English support with proper RTL handling
4. **Security-First**: Visual cues emphasizing safety in all financial transactions

---

## Typography System

**Primary Font**: Inter or Cairo (for Arabic support)
- Hero/Display: Bold, 48-56px (desktop), 32-40px (mobile)
- Section Headers: Semibold, 32-40px (desktop), 24-28px (mobile)
- Card Titles: Semibold, 20-24px
- Body Text: Regular, 16px
- Small/Meta: Regular, 14px
- Financial Data: Tabular nums, Medium weight for clarity

**Hierarchy Rules**:
- Wallet balances: Large, bold typography (32-40px)
- Transaction amounts: Medium weight, tabular figures
- Chat messages: Regular 16px with sender names at 14px bold
- Navigation: 14-16px medium weight

---

## Layout & Spacing System

**Tailwind Units**: Consistently use 2, 4, 6, 8, 12, 16, 20, 24 for spacing
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-20
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl with px-4

**Grid Patterns**:
- Desktop wallet cards: 3-column grid (grid-cols-3)
- Mobile: Single column stacking
- Chat/social feeds: Single column full-width
- Store items: 2-4 column responsive grid

---

## Component Library

### Navigation
**Main Menu**: Vertical sidebar (desktop) with purple accent indicators for active items
- Icon + label for each menu item
- Collapsible on mobile to hamburger menu
- Notification badges on relevant items (red dot)
- User avatar and balance summary at top

### Wallet Interface
**Balance Cards**: 
- Large cards showing SYP, USD, ATH balances
- Each card: Balance amount prominent, currency label, quick action buttons
- Visual distinction: Different subtle background tints for each currency

**Recipient Address Display**:
- Monospace font for address codes
- Copy button with visual feedback
- QR code generation (large, scannable 200x200px minimum)
- Share and save options clearly accessible

**Transaction Actions**:
- Send/Receive toggle tabs
- QR scanner interface with camera viewfinder overlay
- Input fields for manual address entry with paste functionality
- Amount input with currency selector
- Fee display prominently before confirmation

**ATH Trading Section**:
- Buy/Sell toggle interface
- Current rate display (large, bold: "1 ATH = 0.001 USD / 11 SYP")
- Amount calculator with real-time conversion
- Transfer interface with email/username input
- Fee structure clearly stated (0.005%, min 100 ATH)

### Chat & Social Features
**Chat Rooms**:
- Message bubbles: Rounded corners (rounded-2xl), sender's messages right-aligned with purple background, received messages left-aligned with neutral gray
- Timestamp below each message cluster
- Avatar thumbnails for group chats
- Input bar: Fixed at bottom, rounded-full input field, send button with icon

**Voice Rooms**:
- Participant grid showing avatars
- Active speaker visual indicator (pulsing ring around avatar)
- Mute/unmute controls prominent
- Leave room button clearly accessible

**Match System**:
- Card-based interface for random matching
- "Next" and "Connect" action buttons
- Toggle between chat and voice match modes

### User Profile & Settings
**My Account**:
- Profile header with avatar, username, email
- Editable fields for birthday, gender
- Stats display: Friends count, chat history, wallet activity

**Settings Panel**:
- Grouped sections (Account, Privacy, Notifications, Language, Security)
- Toggle switches for boolean options
- Dropdown selectors for choices
- Purple accents for active/selected states

### Store Interface
- Product grid with images, names, ATH prices
- Add to cart buttons with quantity selectors
- Cart summary sidebar/modal
- Checkout flow integrated with wallet

### Admin Panel
**Payment Method Management**:
- Table view with columns: Currency, Method Name, Icon, Min Deposit/Withdraw, Fees
- Add/Edit modal forms
- Enable/disable toggles per method
- Clear visual separation between deposit and withdrawal methods

**User & Balance Management**:
- Search and filter interface
- User list with expandable details
- Balance adjustment controls with audit logging
- ATH price setting interface with confirmation

---

## Visual Treatments

**Cards & Containers**:
- Subtle shadows (shadow-md to shadow-lg)
- Rounded corners (rounded-xl to rounded-2xl)
- Border styling for emphasis where needed

**Buttons**:
- Primary (purple): CTAs, confirmations, send/buy actions
- Secondary (outlined): Cancel, back, neutral actions
- Danger (red): Delete, withdraw, critical actions
- Icon buttons for compact actions (copy, share, scan)

**States & Feedback**:
- Loading: Skeleton screens for wallet data, spinners for transactions
- Success: Green checkmark overlays, toast notifications
- Error: Red inline messages with clear remediation steps
- Empty states: Friendly illustrations with helpful CTAs

**QR Codes**:
- White background with padding
- Download/share options immediately below
- Scannable size minimum 200x200px
- Clear labeling of what the QR represents

---

## Authentication Screens

**Registration**:
- Clean form layout, single column
- Field order: Username, Email, Password, Repeat Password, Birthday (date picker), Sex (radio buttons)
- Visual password strength indicator
- Terms acceptance checkbox
- Purple CTA button "Create Account"

**Login**:
- Username/Email single input (smart detection)
- Password with show/hide toggle
- "Forgot Password" link
- Purple "Login" button
- Option to register below

---

## Responsive Behavior

**Desktop (lg+)**: 
- Sidebar navigation persistent
- Multi-column layouts for wallet, store
- Side-by-side chat list and conversation

**Tablet (md)**:
- Collapsible sidebar
- 2-column maximum for grids
- Stack financial summaries

**Mobile (base)**:
- Bottom navigation bar for main actions
- Single column throughout
- Full-width cards
- Swipe gestures for navigation

---

## Images & Assets

**Icons**: Font Awesome or Heroicons via CDN for consistency
**QR Codes**: Generated via library (qrcode.js or similar)
**Avatars**: User uploads with placeholder defaults (purple gradient circles with initials)
**Store Products**: Placeholder images or admin-uploaded product photos

**No large hero image** - This is a web application dashboard, not a marketing site. Focus on functional interfaces and data presentation.