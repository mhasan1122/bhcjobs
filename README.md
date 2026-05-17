# BhcJobs - React Native Mobile Application

BhcJobs is a responsive React Native mobile application built with Expo to connect Bangladeshi job seekers with employment opportunities in Saudi Arabia. 

The application is built on Expo v54.0.0, React 19, and TypeScript. It integrates with provided REST APIs to fetch and display industries, recommended jobs, and companies, and features a robust registration, OTP verification, and login system with light and dark mode themes.

---

## Key Features

### 1. Landing Page
* **Hero Banner:** A linear gradient banner displaying a dynamic welcome message for logged-in users and registration/login actions for guests.
* **Popular Industries Section:** Lists active hiring sectors horizontally. The industries are fetched from the API, sorted by open job counts, and limited to the top 10.
* **Recommended Jobs Section:** Renders active job listings vertically with key details, vacancy counts, salary ranges, and employment-type tags. The list is sorted dynamically based on trending status and view counts.
* **Popular Companies Section:** Showcases verified companies hiring now, complete with logos and open job counts.
* **Pull-to-Refresh:** Integrated RefreshControl triggers parallel API updates across all sections.

### 2. Authentication Flow
* **Login Screen:** Features a fully validated form for phone number and password with field-level error messages and loading states.
* **Registration Screen:** Collects user profile details including:
  * Full Name and Email address (with standard format validations).
  * Bangladesh Phone Number (validated via regex).
  * Passport Number (validated for correct letter and digit format).
  * Date of Birth (uses the native system date picker).
  * Gender Selection (custom selector controls).
  * Password and Password Confirmation matches.
* **Developer OTP Mode:** For testing purposes, when the registration API returns an OTP code, it is extracted and displayed in a developer callout on the OTP entry screen, allowing for quick end-to-end verification without SMS gateway bottlenecks.

### 3. Job Detail Screen
* Renders comprehensive job specifications, candidate requirements, and qualifications. Experience and gender tags are displayed as visual chips, and HTML tags within descriptions are sanitized into clean, readable text.

### 4. Technical Capabilities
* **Dynamic Theming:** Seamless system-wide Light and Dark mode transitions that immediately update backgrounds, cards, typography, status bars, and borders.
* **Micro-Animations:** Fluid, native spring transitions powered by React Native Reanimated applied to list components for a polished interface feel.
* **Asset Loading & Performance:** Configured with Expo Image for hardware-accelerated rendering, smooth placeholder transitions, and disk caching of CDN resources. REST API calls are dispatched concurrently in custom hooks using Promise.all.
* **Session Persistence:** Utilizes AsyncStorage to persist authentication tokens and user profiles across app launches.

---

## Tech Stack
* **Framework:** React Native (Expo v54.0.0 SDK)
* **Language:** TypeScript
* **Animations:** React Native Reanimated
* **Navigation:** React Navigation v7 (Native Stack)
* **Image Rendering:** Expo Image
* **Theme Management:** React Context API

---

## Project Structure

```text
src/
├── api/
│   ├── client.ts         # Base fetch wrapper with error parsing and network fallback
│   └── services.ts       # Service layer for industries, jobs, companies, and auth
├── components/
│   ├── AppHeader.tsx     # Application header with branding and theme toggle
│   ├── AuthScreenLayout.tsx # Keyboard-aware layout for authorization forms
│   ├── BrandLogo.tsx     # Brand logo renderer
│   ├── CompanyCard.tsx   # Company summary card
│   ├── DateOfBirthField.tsx # Platform-agnostic date selection input
│   ├── ErrorView.tsx     # Inline error display with retry options
│   ├── GenderSelector.tsx # Custom gender selector inputs
│   ├── HeroBanner.tsx    # Linear gradient welcoming banner
│   ├── IndustryCard.tsx  # Industry summary card
│   ├── JobCard.tsx       # Reusable recommended job card
│   ├── LoadingSpinner.tsx# Centered indicator
│   ├── PrimaryButton.tsx # Action button with inline activity loader
│   ├── RemoteImage.tsx   # Cached image renderer
│   ├── SuccessPopup.tsx  # Animated success toast
│   └── UserProfileMenu.tsx # Modal menu for active user profiles and sign out
├── constants/
│   ├── config.ts         # Base URLs and image folder mappings
│   └── theme.ts          # Core tokens for spacing, radius, fonts, and colors
├── context/
│   ├── AuthContext.tsx   # Context tracking auth states, tokens, and storage
│   ├── SuccessPopupContext.tsx # Context for displaying global success events
│   └── ThemeContext.tsx  # Context controlling light and dark variables
├── hooks/
│   └── useLandingData.ts # Custom hook executing and sorting dashboard queries in parallel
├── navigation/
│   └── AppNavigator.tsx  # Typed stack navigation config
├── screens/
│   ├── LandingScreen.tsx # Landing screen and dashboard feed
│   ├── LoginScreen.tsx   # Sign-in form
│   ├── RegisterScreen.tsx# Sign-up form
│   ├── VerifyOtpScreen.tsx# OTP validation screen
│   └── JobDetailScreen.tsx# Job description and requirements view
├── types/
│   ├── api.ts            # Data models and payloads
│   ├── auth.ts           # Session and profile interfaces
│   ├── navigation.ts     # Route parameters mapping
│   └── theme.ts          # Stylesheet variables
└── utils/
    ├── auth.ts           # User normalization helpers
    ├── date.ts           # Date conversion utilities
    ├── html.ts           # HTML stripping and cleaning parser
    ├── images.ts         # URL construction for CDN assets
    └── validation.ts     # Validation logic for inputs
```

---

## REST API Integrations

### Base Configuration
* **API Base URL:** `https://dev.bhcjobs.com`
* **Image Storage URL:** `https://dev.bhcjobs.com/storage`

### Image URL Mappings
The application builds image paths using the following patterns:
* **Industry Images:** `${STORAGE_BASE_URL}/industry-image/{image_filename}`
* **Job / Company Images:** `${STORAGE_BASE_URL}/company-image/{image_filename}`

### API Endpoints
1. **Get Industries:** `GET /api/industry/get` (Populates Popular Industries)
2. **Get Jobs:** `GET /api/job/get` (Populates Recommended Jobs and detailed specifications)
3. **Get Companies:** `GET /api/company/get` (Populates Popular Companies)
4. **Register:** `POST /api/job_seeker/register` (Submits profile data and returns verification OTP)
5. **Verify OTP:** `POST /api/job_seeker/phone_verify` (Validates OTP and exchanges for auth token)
6. **Login:** `POST /api/job_seeker/login` (Validates credentials and returns auth token)
7. **Profile:** `GET /api/job_seeker/get` (Validates session and fetches user details)

---

## Local Setup and Installation

Follow these steps to run the application in a local environment:

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### 2. Install Dependencies
Run the following command in the project root folder:
```bash
npm install
```

### 3. Run Static Code Checking
Validate imports and type integrity with TypeScript:
```bash
npm run typecheck
```

### 4. Start the Development Server
Start the Expo bundler:
```bash
npm run start
```

### 5. Running on Simulators or Physical Devices
* **iOS Simulator:** Press `i` in the terminal once the server is running.
* **Android Emulator:** Press `a` in the terminal once the server is running.
* **Physical Device:** Download **Expo Go** on your mobile device and scan the QR code printed in the terminal.

---

## Project Requirements and Compliance

| Section / Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Banner / Hero section** | Implemented | Built custom `HeroBanner.tsx` with dynamic gradients, greeting strings, and authentication states. |
| **Popular Industries** | Implemented | Lists active industries horizontally, sorted by `jobs_count` from `/api/industry/get`. |
| **Recommended Jobs** | Implemented | Displays detailed active recommended job cards from `/api/job/get` with custom navigation. |
| **Popular Companies** | Implemented | Displays active companies with job counts horizontally from `/api/company/get`. |
| **Dynamic API Fetching** | Implemented | Dispatches landing page requests concurrently using `Promise.all` in `useLandingData.ts`. |
| **Responsive UI** | Implemented | Adapts to varying phone screens using relative flex offsets and safe area insets. |
| **Clean Code Structure** | Implemented | Follows a clean modular setup. TypeScript checks pass with zero compilation errors. |
| **Form Inputs & Layouts** | Implemented | Features styled custom inputs with date pickers, gender selectors, and masked passwords. |
| **Form Validation** | Implemented | Implements checks for password matches, Bangladesh phone formatting, and passport codes. |
| **Navigation Flows** | Implemented | Configured stack routes linking Home, Login, Register, OTP verification, and Job Details. |
| **Loading Indicators** | Implemented | Inline loaders in buttons and full-screen loaders during initial API fetches. |
| **Dark Mode Support** | Implemented | Seamless custom light/dark color mappings applied to all cards, text, and header configurations. |
| **Micro-Animations** | Implemented | Custom spring physics applied to card mount phases using Reanimated. |
| **Image Performance** | Implemented | Configured using `expo-image` for asset disk caching and smooth placeholder crossfades. |
