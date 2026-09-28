# Legacy Sats

SATS IN A BOTTLE

A message to the future, sealed with Bitcoin.

PROJECT DOCUMENTATION • MVP + FRONTEND IMPLEMENTATION GUIDE

Money with a message, locked until it matters.

Pillar

Meaning

Message

Text, voice or photo carrying the human story.

Bitcoin

Real value, denominated in sats and controlled by the intended owner.

Future condition

A supported date/rule determining when the bottle can open.




 

1. Product Overview

Sats in a Bottle is a Bitcoin-powered gifting and time-locking application that combines a personal message with Bitcoin and seals both around a future unlock condition. A sender creates a digital bottle, attaches a message and sats, selects an unlock condition, and shares the sealed bottle with a recipient.

Product promise

“Money with a message, locked until it matters.”

Primary use cases

·         Birthday and graduation gifts

·         Anniversaries and milestones

·         Parents saving for a child’s future

·         Migrant families sending future-oriented gifts

·         Inheritance and legacy messages

·         Long-term savings with a deliberate access barrier

2. Problem Statement

Digital gifting normally separates emotional communication from financial value. A card, letter or voice note can carry meaning but not financial value; a bank transfer can move value but usually lacks the experience of a sealed future message.

Current approach

Strength

Gap

Card / letter

Emotional

Usually no financial value or enforced future access

Voice message

Personal

No attached financial value

Bank transfer

Real money

Generally immediate and emotionally cold

Traditional savings / trust

Long-term purpose

Can be complex and intermediary-dependent

3. Solution

The application packages a message and Bitcoin into one digital bottle. The message is encrypted, while the Bitcoin is governed by a Bitcoin timelock. The application presents the bottle, tracks blockchain state and guides the recipient through the reveal and claim experience.

Core principles

·         Self-custody by default

·         Bitcoin-native timelock enforcement

·         Client-side encryption where practical

·         Sats-first UX

·         Transparent transaction and fee states

·         Simple language for Bitcoin beginners

4. How It Works

1.       Create Bottle — choose recipient, title, message type and unlock condition.

2.       Add Message — write text or record/upload a voice note; encrypt content.

3.       Add Sats — select the Bitcoin amount and fund through the supported wallet flow.

4.       Set Unlock Date — choose a supported date/time condition.

5.       Seal — create and fund the Bitcoin timelock transaction/output.

6.       Share — generate an unguessable link and optional QR code.

7.       Wait — display countdown, confirmation state and reminders.

8.       Unlock — once the Bitcoin condition is satisfied, enable the reveal/claim experience.

9.       Claim & Reveal — reveal the message and guide the recipient through the Bitcoin spend/claim flow.

5. MVP Scope

MVP Must Have

Future

Create bottle

Multi-recipient inheritance

Text message

Video notes

Voice note

Goal/community bottles

Amount in sats

Recurring bottles

Fixed-date timelock

Complex event triggers

Sealed link + QR

M-Pesa cash-out

Countdown/status

Stablecoin support

Recipient reveal + claim

Advanced re-bottling graph

6. Bitcoin Technical Foundation

The financial primitive is a Bitcoin timelock. For an absolute time-based unlock, CHECKLOCKTIMEVERIFY (CLTV) can enforce that spending a particular output is not valid before the specified locktime, provided the script and spending transaction are constructed correctly.

Important: the frontend must never imply that the app itself can simply “unlock Bitcoin.” Bitcoin consensus rules enforce the spend condition. The application tracks state, stores encrypted metadata, presents the bottle and guides wallet interactions.

State

Meaning

Draft

Configured but not funded/sealed.

Awaiting funding

Waiting for the required Bitcoin transaction.

Funded

Funding transaction detected.

Sealed / Timelocked

Relevant output is protected by the timelock.

Unlockable

Timelock condition has been reached.

Claimed

Recipient completed the supported spend/claim flow.

Cancelled / recovery

Only if an explicitly designed recovery path exists; funds must never be silently lost.

Development environment: use Bitcoin Regtest or Signet for transaction and timelock testing before considering mainnet.

7. System Architecture

Layer

Technology

Responsibility

Web

React + Tailwind

UI, flows, dashboard, recipient experience

Mobile

React Native

Mobile-first bottle creation and recipient experience

Backend

Node.js or FastAPI

Orchestration, auth, metadata, reminders, blockchain status

Database

PostgreSQL

Bottle/user/status/transaction metadata

Storage

S3-compatible encrypted storage

Encrypted voice/image/message objects

Bitcoin

Bitcoin Core

Chain data and transaction verification

Wallet

Supported Bitcoin wallet integrations

User-controlled signing

Testing

Jest / Pytest + Regtest/Signet

Automated validation

High-level flow: Frontend ↔ API ↔ PostgreSQL/encrypted storage; Frontend ↔ Wallet ↔ Bitcoin network; Backend ↔ Bitcoin Core/indexer → bottle status; Backend → notifications.

8. Core Data Model

Entity

Key fields

User

id, display_name, identifier, wallet reference, created_at

Bottle

id, owner_id, recipient reference, title, status, unlock_at, created_at

Message

id, bottle_id, type, encrypted object reference, encryption metadata

BitcoinLock

id, bottle_id, network, txid, vout, amount_sats, locktime, script reference

RecipientAccess

id, bottle_id, access-token reference, redeemed_at

Event

id, bottle_id, event_type, timestamp, metadata

Notification

id, bottle_id, type, scheduled_at, sent_at

9. Frontend Specification

Primary screens

Landing — Product story: message + sats + future condition.

Create Bottle — Guided multi-step flow with progress and autosave.

Message Composer — Text editor, voice recorder and optional image.

Bitcoin Amount — Sats entry, BTC equivalent and network fee disclosure.

Unlock Condition — Date/time picker with plain-language timelock explanation.

Review & Seal — Recipient, message, amount, fee, date and wallet confirmation.

Sealed Bottle — Bottle visual, countdown, blockchain status and sharing.

Recipient Bottle — Sealed state with no message preview before unlock.

Open Bottle — Unlock animation, message reveal/playback and claim instructions.

Dashboard — Sent, received, draft, sealed, unlockable and claimed bottles.

Reusable UI components

·         BottleCard

·         BottleStatusBadge

·         SatsAmountInput

·         WalletConnectButton

·         MessageComposer

·         VoiceRecorder

·         UnlockDatePicker

·         CountdownTimer

·         SealAnimation

·         BitcoinTransactionStatus

·         QRCodeShare

·         ClaimPanel

·         ConfirmationModal

·         Toast / InlineError

10. UI/UX Direction

The interface should feel warm, trustworthy and memorable rather than like a trading terminal. Baby purple carries the emotional brand identity; gold marks Bitcoin/value moments; white provides clarity and breathing room.

Element

Direction

Primary

Baby purple / soft lavender

Bitcoin accent

Warm gold

Background

White + very light lavender surfaces

Text

Deep purple / charcoal

Cards

Rounded, subtle borders and shadows

Buttons

One dominant action per step

Typography

Friendly modern sans-serif with strong hierarchy

Illustration

Digital glass bottle / sealed capsule motif

Motion

Subtle seal, shimmer and countdown transitions

UX principles

·         Progressive disclosure

·         Plain-language Bitcoin explanations

·         Always show what is happening to the money

·         Clear confirmation before signing/funding

·         Accessible labels, contrast and captions/transcripts

·         Responsive mobile-first design

·         Trust signals: network, confirmations and relevant transaction identifiers

11. Visual Design Tokens

Token

Value

Use

Purple 50

#F3EEFB

Backgrounds

Baby Purple

#B79AE8

Brand accents

Deep Purple

#5B3A91

Headings / primary UI

Bitcoin Gold

#D4AF37

Sats and Bitcoin highlights

White

#FFFFFF

Cards / main canvas

Charcoal

#292333

Primary text

Muted

#66606F

Secondary text

These are initial tokens. Validate contrast/accessibility and refine during the design stage.

12. Security & Trust Model

·         Encrypt message content before backend storage where practical.

·         Keep signing keys in the user’s wallet for the self-custodial MVP.

·         Use high-entropy bottle identifiers; never expose sensitive message content in URLs.

·         Separate authorization for bottle metadata, encrypted blobs and recipient access.

·         Use secure authentication and optional 2FA.

·         Verify Bitcoin transaction state from blockchain data, not only client claims.

·         Display network fees separately from the gift amount.

·         Document recovery/spend paths before real funds are used.

·         Never claim funds are recoverable unless the actual recovery path has been implemented and tested.

Security rule: a beautiful UI must never hide a dangerous financial assumption.

13. Error & Edge Cases

·         Wallet not connected

·         Insufficient balance

·         Fee changes before signing

·         Funding transaction not detected

·         Insufficient confirmations

·         Invalid/expired bottle link

·         Recipient lacks a compatible wallet

·         Unlock time not reached

·         Claim transaction fails

·         Encrypted message cannot be decrypted

·         User closes app during funding/sealing

·         Backend unavailable while Bitcoin funds remain independently controlled

Every financial error should explain what happened, whether the user’s funds are safe, and what action is available next.

14. Testing Strategy

Test

Coverage

Unit

Sats arithmetic, locktime/date conversion, validation, state transitions

Component

Forms, countdown, recorder states, loading/errors, responsive UI

API

Auth, bottle CRUD, authorization, encrypted references

Bitcoin integration

Script construction, transaction validity, locktime enforcement, confirmations

E2E

Create → fund → seal → share → unlock → reveal → claim

Security

Authorization, token entropy, encryption, malformed input

Usability

Bitcoin beginner completes flow without specialist knowledge

Critical: timelock logic must be tested against actual Bitcoin node behavior, not only mocked responses.

15. Acceptance Criteria

·         A beginner can create a bottle without knowing Bitcoin scripting terminology.

·         Text and/or voice message can be attached.

·         Amount can be entered in sats with BTC equivalent shown.

·         Supported unlock date/time can be selected.

·         Draft, funding, sealed, unlockable and claimed states are distinct.

·         Sealed bottle does not expose message content before unlock.

·         Share link and QR can be generated.

·         Backend verifies relevant Bitcoin transaction state.

·         Self-custodial MVP does not require application-controlled private keys.

·         Core flows pass automated Regtest/Signet tests.

16. Future Features

·         Re-Bottle — recipient adds a new message and sats and passes a new bottle state forward.

·         Goal Bottles — community funding or savings goals.

·         Community Bottles — multiple contributors.

·         Recurring Bottles — scheduled contributions.

·         Multi-recipient inheritance bottles.

·         Video notes.

·         Stablecoin support.

·         M-Pesa/mobile-money cash-out integrations.

Re-Bottle should create a new auditable financial/message state rather than silently editing the original bottle.

17. Recommended Repository Documentation

·         README.md — overview and quick start

·         docs/PRODUCT.md — product requirements and roadmap

·         docs/UX.md — journeys, screens, states and accessibility

·         docs/ARCHITECTURE.md — application architecture

·         docs/BITCOIN.md — timelock model and transaction flow

·         docs/SECURITY.md — threat model and encryption

·         docs/API.md — endpoint contracts

·         docs/DATABASE.md — schema

·         docs/TESTING.md — test plan

·         docs/DECISIONS.md — architecture decision records

18. Frontend Implementation Order

10.    Set up React/Tailwind and design tokens.

11.    Build reusable buttons, cards, inputs, status badges and modals.

12.    Build landing page and product story.

13.    Build Create Bottle wizard with validation/autosave.

14.    Build message composer and voice recorder.

15.    Build sats amount and wallet connection UI.

16.    Build unlock date/time selection and timelock explanation.

17.    Build Review & Seal confirmation.

18.    Build sealed bottle page, countdown and QR/share.

19.    Build recipient locked/revealed states.

20.    Build dashboard and status filters.

21.    Add complete loading, empty, success and error states.

22.    Apply responsive and accessibility checks.

23.    Connect to stable backend contracts.

24.    Run end-to-end tests against Regtest/Signet.

19. Product Microcopy

Context

Suggested copy

Create

Create a bottle

Message

Leave something for the future.

Bitcoin

How many sats would you like to seal?

Unlock

Choose when your bottle can be opened.

Sealing

Your message is sealed. Your sats are being locked.

Waiting

Something meaningful is waiting.

Unlockable

The bottle is ready to open.

Claim

Your message is revealed. Your sats are ready to claim.

20. Key Risks Before Mainnet

·         Exact CLTV transaction/output design and recovery path

·         Wallet compatibility

·         Secure transfer of message decryption capability

·         Recipient wallet-loss scenarios

·         Small-gift fee economics

·         Blockchain monitoring reliability

·         Legal/compliance requirements for custodial or fiat features

·         Notification privacy

21. Definition of Done

The core MVP is complete when a test user can create a bottle, attach a message, specify a supported Bitcoin timelock, fund it on a test network, see a verifiable sealed state, share it, reach the unlock condition, reveal the message and complete the supported Bitcoin claim flow — with clear UI states, security controls, edge-case handling and automated tests.

22. Project Tagline & Positioning

More than money. It’s a legacy.

A little Bitcoin. A big tomorrow
hey my lovable this is the project am working on and my work is the frontend,give me a best of the best ui/ux, interactive,with white black and gold musturd,work with the fronted and where a bitcoin or backend intergration is required let it be just a demo,let it have real features not ai genenrated,let htere be wamth emotons,love,suprise money,let it fell all those,thanyou


## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
