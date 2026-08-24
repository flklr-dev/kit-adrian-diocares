/**
 * Single source of truth for Kit's portfolio content.
 *
 * Both the website UI (`src/app/page.tsx`) and the AI chatbot's knowledge
 * base (`src/app/api/chat/route.ts`) read from this file, so updating a
 * project, job, or skill here keeps the whole site and the chatbot in sync.
 * Add new entries here whenever new content comes in — no other file needs
 * to change for the data to show up.
 */

export const profile = {
  name: "Kit Adrian B. Diocares",
  title: "Freelance Developer — Mobile & Web",
  location: "Davao City, Philippines",
  status: "Open for work",
  email: "kitadriand@gmail.com",
  summary:
    "BSIT Graduate (Cum Laude, 2026) from Davao Oriental State University and a Freelance Developer specializing in mobile and web applications — cross-platform apps with React Native & Expo, plus scalable web platforms with Next.js & TypeScript. Currently focused on integrating AI tooling into the workflow to accelerate delivery without sacrificing quality, security, or maintainability.",
  resumeUrl: "/resume",
};

export const techStack: Record<string, string[]> = {
  frontend: ["JavaScript", "TypeScript", "React Native", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "PHP", "MongoDB", "SQL"],
  tools: ["Git", "Docker", "AWS", "Figma"],
};

export type Experience = {
  title: string;
  company: string;
  year: string;
  type: "work" | "education";
};

export const experiences: Experience[] = [
  {
    title: "Freelance Developer",
    company: "Fiverr",
    year: "2025 - 2026",
    type: "work",
  },
  {
    title: "Web Developer",
    company: "DICT-DOrSU (386-hour internship)",
    year: "2026",
    type: "work",
  },
  {
    title: "BS Information Technology",
    company: "Davao Oriental State University",
    year: "2022-2026",
    type: "education",
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  year: string;
};

export const achievements: Achievement[] = [
  {
    title: "Cum Laude",
    issuer: "Davao Oriental State University",
    year: "2026",
  },
  {
    title: "ICT Diagnostic Examination (Level 1)",
    issuer: "DICT",
    year: "2025",
  },
  {
    title: "Institutional Scholar - Mangalayan & Bagani",
    issuer: "Davao Oriental State University",
    year: "2022 - 2026",
  },
];

export type SocialLink = {
  name: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/kit-adrian-diocares-349a20338/" },
  { name: "GitHub", url: "https://github.com/flklr-dev" },
];

export type ProjectMetric = {
  label: string;
  value: string;
  hint?: string;
};

export type ArchitectureLayer = {
  name: string;
  tech: string[];
  description: string;
};

export type DiseaseItem = {
  name: string;
  scientificName: string;
  code: string;
  symptoms: string;
  image?: string;
};

export type TechCategory = {
  category: string;
  technologies: { name: string; purpose: string }[];
};

export type ChallengeItem = {
  challenge: string;
  solution: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  badge: string;
  /** Optional build status shown on cards (e.g. "In Development", "WIP", "Completed"). */
  status?: string;
  url?: string;
  githubUrl?: string;
  tagline?: string;
  overview?: string;
  metrics?: ProjectMetric[];
  architecture?: {
    summary: string;
    image?: string;
    layers: ArchitectureLayer[];
  };
  dualModelPipeline?: {
    summary: string;
    classification: { model: string; desc: string };
    segmentation: { model: string; formula: string; desc: string };
    stages: {
      stage: string;
      coverage: string;
      badgeColor: string;
      description: string;
      treatment: string;
    }[];
  };
  keyFeatures?: {
    title: string;
    description: string;
    highlights?: string[];
  }[];
  supportedDiseases?: DiseaseItem[];
  techStackBreakdown?: TechCategory[];
  challengesAndSolutions?: ChallengeItem[];
};

export const projects: Project[] = [
  {
    slug: "walk-alert",
    title: "Walk Alert",
    description:
      "Personal safety application with live real-time tracking, check-ins, automated SOS alerts, and modular Bluetooth hardware device support.",
    tags: ["React Native", "Expo", "BLE", "AWS ECS", "AWS SNS", "Socket.io", "MongoDB"],
    role: "Full-Stack Developer & DevOps",
    badge: "Mobile & IoT Platform",
    status: "Completed",
    tagline:
      "Personal Safety & Emergency Broadcast Ecosystem with Hardware BLE SOS Button and AWS Cloud Infrastructure",
    overview:
      "Walk Alert is a personal safety and distress broadcasting platform. By coupling a cross-platform mobile application with a low-power physical Bluetooth Low Energy (BLE) SOS Button, users can trigger panic alarms even when their smartphone is locked or in a pocket. The platform provides continuous background GPS geofencing, real-time WebSocket location breadcrumb streaming, Apple Critical Alerts (bypassing device mute/DND), and transactional SMS emergency dispatches powered by AWS SNS and AWS ECS Fargate.",
    metrics: [
      { label: "Hardware SOS", value: "Physical BLE", hint: "Pin-Pull & Silent Trigger" },
      { label: "Broadcast Sync", value: "<1s Latency", hint: "Socket.io Bi-Directional" },
      { label: "Critical Alerts", value: "Bypasses DND", hint: "Apple & Android Sirens" },
      { label: "Cloud Compute", value: "AWS ECS Fargate", hint: "Serverless Docker API" },
    ],
    architecture: {
      summary:
        "Walk Alert follows a secure system topology linking low-power IoT Bluetooth hardware, mobile edge telemetry, and an AWS containerized backend delivering push sirens and SMS broadcasts to trusted responder networks.",
      image: "/projects/walk-alert/walk-alert-aws-architecture.jpg",
      layers: [
        {
          name: "IoT Hardware & BLE Central",
          tech: ["BLE GATT (0xFFF0)", "react-native-ble-plx", "5-Byte Pairing Key", "Pin-Pull Trigger"],
          description:
            "Integrates physical SOS keychain devices via custom GATT characteristics, supporting silent clicks, hardware pin extraction alarms, and cryptographically verified pairing handshakes in background mode.",
        },
        {
          name: "Mobile Application (React Native + Expo)",
          tech: ["React Native 0.81.5", "Expo 54", "TypeScript", "expo-location", "Zustand"],
          description:
            "Runs continuous background GPS tracking tasks (`SIGNIFICANT_LOCATION_TASK`), offline SQLite resilience caching, geofencing boundary detection, and Apple Critical Alerts sound synthesis.",
        },
        {
          name: "AWS Cloud Backend (ECS Fargate)",
          tech: ["AWS ECS (Fargate)", "Amazon ECR", "Node.js 20+", "Express 4", "Docker"],
          description:
            "Stateless REST API containerized with Docker and deployed on AWS ECS Fargate via Amazon ECR. Handles phone-first OTP authentication, JWT sessions, and safety Circle management.",
        },
        {
          name: "Real-Time Streaming & Alert Dispatch",
          tech: ["AWS SNS (SMS)", "Socket.io (WebSockets)", "MongoDB Atlas", "Firebase Cloud Messaging"],
          description:
            "Delivers high-priority transactional SMS emergency dispatches via AWS SNS, bi-directional live GPS coordinate streaming via WebSockets, and push sirens to trusted responder networks.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Dual-Protocol Physical BLE SOS Hardware",
        description:
          "Integrates physical SOS buttons and keychains to trigger emergency alarms even when the phone is locked, silenced, or running in the background.",
        highlights: [
          "Supports Silent SOS and physical Pin-Pull emergency triggers",
          "Cryptographic 5-byte pairing key prevents device hijacking",
          "Persistent background BLE central mode listener",
        ],
      },
      {
        title: "Continuous Background Geofencing & GPS",
        description:
          "Automated location tracking that updates safety circles when members arrive or depart designated safety zones.",
        highlights: [
          "Expo background location tasks (`SIGNIFICANT_LOCATION_TASK`)",
          "Life360-style customizable Circles of Trust",
          "Privacy controls: Always Visible vs. SOS-Only visibility",
        ],
      },
      {
        title: "DND-Bypassing Apple Critical Alerts",
        description:
          "High-priority emergency siren broadcasts configured to sound loudly on responder devices regardless of mute switches or Do Not Disturb.",
        highlights: [
          "Apple Critical Alerts entitlement (`com.apple.developer.usernotifications.critical-alerts`)",
          "Android high-priority emergency notification channel",
          "Immediate auditory confirmation for critical incidents",
        ],
      },
      {
        title: "Transactional SMS Dispatch via AWS SNS",
        description:
          "Direct integration with Amazon Simple Notification Service for zero-delay registration OTPs and distress SMS delivery to non-app emergency contacts.",
        highlights: [
          "AWS SNS Transactional SMS tier for maximum deliverability",
          "Phone-first authentication and instant code delivery",
          "Emergency SMS fallback in low-data coverage zones",
        ],
      },
      {
        title: "Offline-First Resilient Telemetry",
        description:
          "Guarantees that emergency breadcrumbs and incident logs are never lost in dead zones.",
        highlights: [
          "Encrypted local SQLite storage for offline location points",
          "Automatic batch cloud synchronization on network restoration",
          "Idempotent event dispatching to prevent duplicate triggers",
        ],
      },
      {
        title: "Circles of Trust Network",
        description:
          "Family and trusted contact groups receiving instantaneous push alerts, location coordinates, and status updates during distress events.",
        highlights: [
          "Real-time bi-directional coordinate sharing via Socket.io",
          "Granular privacy controls per circle member",
          "One-tap incident resolution and emergency broadcast cancellation",
        ],
      },
    ],
    techStackBreakdown: [
      {
        category: "Mobile Client & IoT",
        technologies: [
          { name: "React Native (0.81.5)", purpose: "Cross-platform mobile application core" },
          { name: "Expo (v54.0.30)", purpose: "Mobile build tooling, runtime SDK & native modules" },
          { name: "TypeScript", purpose: "Type-safe robust frontend codebase" },
          { name: "react-native-ble-plx", purpose: "Bluetooth Low Energy central mode & GATT comms" },
          { name: "expo-location", purpose: "Background GPS geofencing & location tracking tasks" },
          { name: "react-native-maps", purpose: "Interactive mobile map & live breadcrumb rendering" },
          { name: "Zustand & SecureStore", purpose: "Reactive client state & encrypted local credentials" },
        ],
      },
      {
        category: "Cloud Backend & AWS Services",
        technologies: [
          { name: "AWS ECS (Fargate)", purpose: "Serverless container compute for the REST API" },
          { name: "Amazon ECR", purpose: "Docker container image repository" },
          { name: "AWS SNS (Simple Notification Service)", purpose: "High-priority transactional SMS OTP & distress alerts" },
          { name: "Node.js (20+) & Express 4", purpose: "Asynchronous backend API runtime & controllers" },
          { name: "Socket.io (WebSockets)", purpose: "Duplex live location streaming & alert state machine" },
          { name: "MongoDB Atlas & Mongoose", purpose: "Document store for users, circles & incident logs" },
          { name: "Firebase Admin / APNs", purpose: "Push notification sirens & Apple Critical Alerts" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Maintaining reliable BLE connection with physical SOS hardware when mobile OS suspends background apps.",
        solution:
          "Engineered a persistent BLE central mode service with automated reconnection retry loops and cryptographic 5-byte pairing handshakes, ensuring the physical button reliably triggers alarms even while the phone is locked in a pocket.",
      },
      {
        challenge: "Delivering audible emergency alarms to responders whose phones are silenced or in Do Not Disturb.",
        solution:
          "Configured Apple Critical Alerts (`com.apple.developer.usernotifications.critical-alerts`) and Android high-priority notification channels, enabling the safety broadcast to override hardware mute switches and sound high-volume sirens.",
      },
      {
        challenge: "Ensuring zero-delay SMS delivery for phone-first authentication and urgent SOS alerts.",
        solution:
          "Integrated AWS Simple Notification Service (SNS) with the Transactional message tier, ensuring sub-second OTP verification and dependable emergency SMS dispatching across international carriers.",
      },
    ],
  },
  {
    slug: "kappi",
    title: "KAPPI",
    description:
      "Automated scanner that detects coffee leaf disease types and evaluates severity levels using tailored machine learning and computer vision.",
    tags: ["Python", "TensorFlow", "Computer Vision", "React Native", "Expo", "Node.js", "Express", "MongoDB"],
    role: "AI & ML Engineer",
    badge: "Machine Learning",
    status: "Completed",
    url: "https://kappi-landing-page-2.vercel.app/",
    githubUrl: "https://github.com/flklr-dev/kappi",
    tagline:
      "On-Device AI Coffee Leaf Disease Detection, U-Net Lesion Severity Estimation & Variety-Aware Crop Management",
    overview:
      "KAPPI (Kape Plant Protection Intelligence) is an offline-first mobile application designed to assist coffee farmers, agricultural technicians, and researchers in diagnosing plant diseases directly in the field. By running quantized TensorFlow Lite neural networks on-device, KAPPI detects foliage diseases, mathematically calculates lesion surface area percentages via U-Net segmentation, and provides customized treatment schedules tailored specifically to Arabica and Robusta coffee varieties.",
    metrics: [
      { label: "Dual-Model Engine", value: "Classifier + U-Net", hint: "On-Device Inference" },
      { label: "Model Precision", value: "94.2%+", hint: "Foliage Pathology" },
      { label: "Inference Latency", value: "<100ms", hint: "Quantized Mobile CPU" },
      { label: "Connectivity", value: "100% Offline", hint: "Zero Internet Required" },
    ],
    architecture: {
      summary:
        "KAPPI uses a decoupled, offline-first 3-tier architecture. On-device inference eliminates remote API latency in rural plantations, while a cloud Node.js/Express API and MongoDB backend handle background synchronization and outbreak tracking.",
      image: "/projects/kappi/kappi-aws-architecture.jpg",
      layers: [
        {
          name: "Mobile Client Tier",
          tech: ["React Native 0.79", "Expo 53", "TypeScript", "Vision Camera", "Zustand"],
          description:
            "Cross-platform mobile UI providing high-speed camera capture with flash/zoom controls, local gallery selection, encrypted SQLite storage, and background sync queues.",
        },
        {
          name: "On-Device AI Engine",
          tech: ["TensorFlow Lite (TFLite)", "MobileNetV2", "U-Net", "INT8 Quantization"],
          description:
            "Executes edge machine learning models directly on the mobile CPU. Classifies pathology and computes pixel-exact lesion-to-leaf surface area ratios without remote network dependencies.",
        },
        {
          name: "Cloud Backend Server",
          tech: ["AWS ECS (Fargate)", "Docker", "Node.js 18+", "Express 4", "JWT", "Helmet"],
          description:
            "Stateless RESTful API containerized with Docker and deployed on AWS ECS Fargate with Amazon ECR. Handles token-based authentication, user account management, password reset OTP flows, and telemetry synchronization.",
        },
        {
          name: "Data & Storage Tier",
          tech: ["MongoDB", "Mongoose", "Cloudinary CDN", "AWS SSM", "Multer"],
          description:
            "Persists user profiles, historical diagnostic scan logs, and geographic outbreak heatmaps. Leaf photos are served via Cloudinary CDN, and credentials are encrypted in AWS Systems Manager Parameter Store.",
        },
      ],
    },
    dualModelPipeline: {
      summary:
        "Rather than just providing a simple disease label, KAPPI executes a dual-model computer vision pipeline to quantify infection severity and guide progressive intervention.",
      classification: {
        model: "MobileNetV2 / EfficientNetB0 (Quantized TFLite)",
        desc: "Identifies pathology category across 4 major coffee leaf diseases or confirms healthy leaf tissue.",
      },
      segmentation: {
        model: "U-Net with MobileNetV2 Backbone",
        formula: "Severity % = (Lesion Pixels / Leaf Pixels) × 100%",
        desc: "Generates a binary pixel mask separating diseased lesion tissue from healthy leaf surface area.",
      },
      stages: [
        {
          stage: "Healthy",
          coverage: "0% Lesion",
          badgeColor: "bg-emerald-500 text-white",
          description: "No fungal or bacterial infection detected across the leaf surface.",
          treatment: "Standard preventive cultural maintenance and routine fertilization.",
        },
        {
          stage: "Early Stage",
          coverage: "< 10% Lesion",
          badgeColor: "bg-amber-500 text-black",
          description: "Localized spot clusters detected before systemic fungal spreading.",
          treatment: "Cultural sanitation, shade management, and preventive organic bio-fungicides.",
        },
        {
          stage: "Progressive Stage",
          coverage: "10% - 30% Lesion",
          badgeColor: "bg-orange-500 text-white",
          description: "Spreading necrotic tissue impacting photosynthetic leaf efficiency.",
          treatment: "Targeted copper-based fungicides, selective pruning, and spore containment.",
        },
        {
          stage: "Severe Stage",
          coverage: "≥ 30% Lesion",
          badgeColor: "bg-rose-600 text-white",
          description: "Extensive defoliation risk threatening seasonal berry yield and tree health.",
          treatment: "Aggressive systemic fungicide application and isolation of affected branches.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Dual-Model AI Engine",
        description:
          "Combines MobileNetV2 classification and U-Net pixel segmentation for real-time mathematical severity estimation on-device.",
        highlights: [
          "Offline TensorFlow Lite execution",
          "Calculates exact (Lesion / Leaf) pixel ratio",
          "Four-tier infection stage classification",
        ],
      },
      {
        title: "Variety-Aware Crop Management",
        description:
          "Automatically refines cultural and chemical treatment protocols based on coffee variety (Arabica vs. Robusta) and infection severity.",
        highlights: [
          "Distinct Arabica vs. Robusta guidelines",
          "Actionable organic and chemical treatments",
          "Preventive measures for healthy crops",
        ],
      },
      {
        title: "Smart Camera Scanner",
        description:
          "High-performance camera integration optimized for challenging outdoor agricultural conditions.",
        highlights: [
          "Hardware flash & zoom controls for dim canopies",
          "Gallery image import for field photos",
          "Instant real-time diagnosis feedback",
        ],
      },
      {
        title: "Geolocation & Outbreak Tagging",
        description:
          "Captures GPS coordinates during leaf scans and resolves administrative boundaries to map regional agricultural outbreaks.",
        highlights: [
          "Automatic reverse geocoding (Barangay, City, Province)",
          "Scan history with geographic markers",
          "Enables early warning epidemiology for farm cooperatives",
        ],
      },
      {
        title: "Offline-First Synchronization",
        description:
          "Designed for rural remote environments where cellular coverage is unavailable or intermittent.",
        highlights: [
          "Encrypted local SQLite storage for offline scans",
          "Automatic batch cloud synchronization on network restoration",
          "Cloudinary CDN leaf photo backup",
        ],
      },
      {
        title: "Multilingual & Field Accessibility",
        description:
          "High-contrast UI designed for readability in bright tropical sunlight with local language support.",
        highlights: [
          "English and Bisaya language toggle",
          "High-contrast dark and light color palettes",
          "Minimalist, farmer-friendly navigation",
        ],
      },
    ],
    supportedDiseases: [
      {
        name: "Coffee Leaf Rust (CLR)",
        scientificName: "Hemileia vastatrix",
        code: "LR",
        symptoms:
          "Powdery orange to yellow pustules on the lower leaf surface, resulting in chlorophyll destruction and premature leaf drop.",
        image: "/projects/kappi/leaf-rust.png",
      },
      {
        name: "Leaf Spot (Cercospora)",
        scientificName: "Cercospora coffeicola",
        code: "LS",
        symptoms:
          "Small circular brown spots with light-grey ash centers surrounded by bright yellow chlorotic halos.",
        image: "/projects/kappi/leaf-spot.jpg",
      },
      {
        name: "Brown Eye Spot",
        scientificName: "Cercospora coffeicola (Severe)",
        code: "BS",
        symptoms:
          "Enlarged necrotic brown lesions that cause extensive leaf burn, tissue death, and premature berry drop.",
        image: "/projects/kappi/brown-spot.jpg",
      },
      {
        name: "Sooty Mold",
        scientificName: "Capnodium spp.",
        code: "SM",
        symptoms:
          "Superficial black coal-like fungal film covering leaf surfaces, blocking sunlight and photosynthesis after insect feeding.",
        image: "/projects/kappi/sooty-mold.jpg",
      },
    ],
    techStackBreakdown: [
      {
        category: "Mobile Application",
        technologies: [
          { name: "React Native (0.79.2)", purpose: "Cross-platform mobile client framework" },
          { name: "Expo (v53.0.0)", purpose: "Native mobile build tooling & runtime SDK" },
          { name: "TypeScript", purpose: "Type-safe robust mobile codebase" },
          { name: "Vision Camera", purpose: "High-performance camera stream & flash control" },
          { name: "Zustand & MobX", purpose: "Lightweight reactive global client state" },
          { name: "Expo Location", purpose: "GPS tagging & administrative reverse geocoding" },
          { name: "Expo SecureStore", purpose: "Encrypted offline local cache & auth tokens" },
        ],
      },
      {
        category: "Machine Learning & CV",
        technologies: [
          { name: "TensorFlow & Keras", purpose: "Model training, transfer learning & evaluation" },
          { name: "TensorFlow Lite (TFLite)", purpose: "Quantized on-device mobile inference" },
          { name: "MobileNetV2", purpose: "Lightweight convolutional disease classifier" },
          { name: "U-Net", purpose: "Pixel-level lesion segmentation architecture" },
          { name: "CVAT", purpose: "Dataset annotation, bounding boxes & polygon masks" },
          { name: "YOLOv8 Nano", purpose: "Leaf object detection & false-positive filter" },
        ],
      },
      {
        category: "Backend & Cloud Infrastructure",
        technologies: [
          { name: "AWS ECS & Fargate", purpose: "Serverless container compute for the REST API" },
          { name: "Amazon ECR", purpose: "Docker container image repository" },
          { name: "AWS SSM Parameter Store", purpose: "Encrypted secrets & environment configuration" },
          { name: "Node.js (18+) & Express 4", purpose: "Asynchronous REST API server & middleware" },
          { name: "MongoDB & Mongoose", purpose: "Document database for users and scan telemetry" },
          { name: "Cloudinary CDN", purpose: "Optimized image upload & leaf photo storage" },
          { name: "JWT & bcrypt.js", purpose: "Secure token authentication & credential hashing" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Deploying high-precision segmentation models on budget mobile processors.",
        solution:
          "Engineered a lightweight U-Net with a MobileNetV2 backbone and quantized the weights to 8-bit integers (INT8). This compressed model memory by 75% while maintaining inference speeds under 100ms on CPU.",
      },
      {
        challenge: "Managing diagnostic scans in remote plantations with zero internet connection.",
        solution:
          "Implemented an offline-first SQLite persistence queue with encrypted storage. Scans execute fully offline and automatically sync to MongoDB and Cloudinary CDN once connection is detected.",
      },
      {
        challenge: "Varied farm lighting and camera angles causing misclassification in field conditions.",
        solution:
          "Integrated native flash/zoom controls in Vision Camera and added pre-inference adaptive thresholding to standardize contrast and leaf boundaries.",
      },
    ],
  },
  {
    slug: "accessmap-ph",
    title: "ACCESSMAP PH",
    description:
      "Crowdsourced accessibility mapping platform where users report and verify wheelchair ramps, accessible restrooms, and barrier-free entrances across the Philippines.",
    tags: ["React 19", "Vite", "TypeScript", "Node.js", "Express", "MongoDB", "Leaflet", "Tailwind CSS"],
    role: "Full-Stack Developer & UI/UX",
    badge: "Web Platform · Civic Tech",
    status: "Completed",
    url: "https://accessmapph.vercel.app/",
    githubUrl: "https://github.com/flklr-dev/accessmapph",
    tagline:
      "Crowdsourced Accessibility Mapping & Verification Platform for Persons with Disabilities Across the Philippines",
    overview:
      "ACCESSMAP PH is a civic-tech web platform designed to empower Persons with Disabilities (PWDs), senior citizens, caregivers, and advocates to report, discover, and verify real accessibility conditions at public spaces (malls, government offices, hospitals, and parks) across the Philippines. Built around WCAG 2.1 AA design standards, it couples an interactive Leaflet.js map layer with a geospatial resolution pipeline (OSM Nominatim placeKey + Haversine deduplication), a 3-tier moderation trust engine, and gamified community auditing leaderboards.",
    metrics: [
      { label: "Geospatial Index", value: "2dsphere MongoDB", hint: "Sub-50ms Radius Search" },
      { label: "Deduplication", value: "OSM + 75m Haversine", hint: "5m Collision Floor" },
      { label: "Moderation", value: "3-Tier Trust Engine", hint: "Auto-Approve & Peer Review" },
      { label: "Design Standard", value: "WCAG 2.1 AA", hint: "High Contrast & PWD UX" },
    ],
    architecture: {
      summary:
        "ACCESSMAP PH follows a decoupled three-tier architecture connecting a responsive React 19/Vite web application with Leaflet.js geospatial map rendering, an Express 5 REST API handling deduplication algorithms, and MongoDB Atlas with 2dsphere spatial indexes.",
      image: "/projects/accessmap-ph/accessmap-architecture.jpg",
      layers: [
        {
          name: "Frontend Web Client",
          tech: ["React 19", "Vite 6", "TypeScript", "Leaflet.js", "Tailwind CSS v4", "Zustand"],
          description:
            "Responsive web viewport rendering OpenStreetMap vector tiles, custom accessibility pin overlays (Mobility, Visual, Hearing, Cognitive), and client-side photo proof upload wizards.",
        },
        {
          name: "Location Deduplication & Geocoding",
          tech: ["OSM Nominatim API", "Haversine Distance", "Proximity Matcher", "Collision Floor"],
          description:
            "Resolves canonical placeKey IDs, computes Haversine radius boundaries (75m proximity matching), enforces a 15m separation guard, and prevents duplicate pins within 5m.",
        },
        {
          name: "3-Tier Moderation & Trust Engine",
          tech: ["Rule Screening", "Trust Engine", "Community Voting", "Reputation System"],
          description:
            "Automates syntax and duplicate submission screening, provides instant approval for trusted contributors (>= 3 verified reports), and manages community review queues with upvote/flag thresholds.",
        },
        {
          name: "Geospatial Data & Cloud Services",
          tech: ["MongoDB Atlas (2dsphere)", "Redis", "Cloudinary CDN", "Firebase Auth / Admin"],
          description:
            "High-speed geospatial document queries with `$near` and `$geoWithin`, Redis rate-limiting and validation caching, and Cloudinary CDN for multi-photo proof delivery.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Location Resolution & Deduplication Pipeline",
        description:
          "Prevents duplicate venue pins by matching OpenStreetMap Nominatim canonical place keys with Haversine distance calculations.",
        highlights: [
          "OSM Nominatim placeKey linking (`osm:way:123456`)",
          "75m Haversine proximity matching for nearby suggestions",
          "15m separation guard and strict 5m collision floor",
        ],
      },
      {
        title: "3-Tier Moderation & Community Trust Engine",
        description:
          "Multi-stage review architecture ensuring high-quality, verified accessibility reviews without manual bottlenecks.",
        highlights: [
          "Tier 1: Automated rule filter (shouting caps, min length, 24h spam guard)",
          "Tier 2: Trust bypass (users with >= 3 approved reviews publish instantly)",
          "Tier 3: Community peer review (>= 5 upvotes verifies, >= 3 flags hides)",
        ],
      },
      {
        title: "Interactive Leaflet Map with Disability Filters",
        description:
          "High-performance map viewport featuring fast marker clustering and specialized disability overlay toggles.",
        highlights: [
          "Mobility filters: Wheelchair ramps, elevators, accessible restrooms",
          "Visual filters: Tactile paving, braille signage, audio cues",
          "Hearing & Cognitive filters: Visual alarms, captions, quiet zones",
        ],
      },
      {
        title: "Gamified Contributions & Leaderboards",
        description:
          "Reputation reward system that incentivizes local accessibility auditing across Philippine cities.",
        highlights: [
          "Point scoring (+10 auto-approved, +5 community verified, -15 flagged)",
          "Tiered reputation ranks: Newcomer, Contributor, Trusted, Champion",
          "City-filtered leaderboards promoting local community civic action",
        ],
      },
      {
        title: "Proof-Focused Photographic Reviews",
        description:
          "Supports attaching up to 3 high-resolution photo proofs per review to visually verify ramp slope gradients and accessible grab bars.",
        highlights: [
          "Cloudinary CDN media transformation and CDN hosting",
          "Structured criteria for ramps, elevators, restrooms, and parking",
          "Detailed 280-character condition notes",
        ],
      },
      {
        title: "WCAG 2.1 AA Accessible Design System",
        description:
          "Tailored UI built from the ground up for full compliance with accessibility guidelines.",
        highlights: [
          "High-contrast color palettes and prominent focus rings",
          "Semantic HTML and complete ARIA screen reader attributes",
          "Full keyboard navigation support across map and forms",
        ],
      },
    ],
    techStackBreakdown: [
      {
        category: "Frontend Web Client",
        technologies: [
          { name: "React (19.2.6)", purpose: "Component-driven interactive web interface" },
          { name: "Vite (6.4.3)", purpose: "High-speed modern frontend bundler & dev server" },
          { name: "TypeScript", purpose: "Strict type safety across UI components and state" },
          { name: "Leaflet.js & React-Leaflet", purpose: "Vector tile map rendering & custom marker layers" },
          { name: "Tailwind CSS (v4)", purpose: "WCAG 2.1 AA accessible utility styling" },
          { name: "Zustand (v5)", purpose: "Lightweight reactive client-side store" },
          { name: "Firebase Client SDK", purpose: "Google OAuth and email/password authentication" },
        ],
      },
      {
        category: "Backend & Processing APIs",
        technologies: [
          { name: "Node.js (20+) & Express 5", purpose: "Asynchronous REST API engine" },
          { name: "Redis", purpose: "Rate-limiting, session validation & cache management" },
          { name: "OSM Nominatim API", purpose: "Geocoding and placeKey canonical resolution" },
          { name: "Firebase Admin SDK", purpose: "Server-side JWT validation & role authorization" },
          { name: "Helmet & CORS", purpose: "HTTP security headers & origin protection" },
        ],
      },
      {
        category: "Data & Cloud Infrastructure",
        technologies: [
          { name: "MongoDB Atlas (2dsphere)", purpose: "Geospatial document store with spatial indexing" },
          { name: "Mongoose", purpose: "Schema validation and query modeling" },
          { name: "Cloudinary SDK", purpose: "Image proof upload validation and CDN delivery" },
          { name: "Vercel & Render", purpose: "Cloud hosting and automated deployment pipelines" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Preventing duplicate pin sprawl across dense public areas like malls and transport hubs.",
        solution:
          "Architected a dual-resolution pipeline that maps OpenStreetMap placeKey identifiers and falls back to a 75m Haversine proximity boundary with a strict 5m hard database collision limit.",
      },
      {
        challenge: "Preventing spam and inaccurate reviews without bottlenecking community submissions.",
        solution:
          "Engineered a 3-tier trust engine where proven contributors (>= 3 verified reports) publish instantly, while new submissions undergo automated rule screening and community upvoting.",
      },
      {
        challenge: "Rendering hundreds of custom accessibility markers on mobile web browsers without UI stutter.",
        solution:
          "Implemented viewport-bounded geospatial queries ($geoWithin) with Leaflet marker clustering and Zustand store memoization, ensuring buttery-smooth 60fps panning and zooming.",
      },
    ],
  },
  {
    slug: "landed",
    title: "Landed",
    description:
      "AI-assisted job tracking and career intelligence platform featuring automated job URL extraction, natural-language updates, and semantic resume fit ranking.",
    tags: ["Next.js", "TypeScript", "Google Gemini AI", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Docker"],
    role: "Full-Stack & Applied AI Engineer",
    badge: "Developer SaaS",
    status: "WIP",
    githubUrl: "https://github.com/flklr-dev/landed",
    tagline:
      "AI-Powered Job Application Tracker & Semantic Resume Matching Engine Powered by Google Gemini AI",
    overview:
      "Landed removes friction from the technical job search process by transforming messy job posting URLs and natural-language notes into structured career intelligence. Built with production-style cloud infrastructure, Landed decouples slow AI operations from the user request path via an asynchronous BullMQ worker fleet. The system leverages Google Gemini AI for structured JSON extraction, generates 384-dimensional dense vector embeddings, and executes native SQL cosine similarity queries in PostgreSQL pgvector to rank job fit with personalized explanations.",
    metrics: [
      { label: "Extraction Latency", value: "<10s Async Worker", hint: "BullMQ + Redis Queue" },
      { label: "Semantic Search", value: "PostgreSQL pgvector", hint: "384-dim Cosine Similarity" },
      { label: "LLM Engine", value: "Google Gemini AI", hint: "Structured JSON Schemas" },
      { label: "Architecture", value: "Decoupled Worker Fleet", hint: "Independent Autoscaling" },
    ],
    architecture: {
      summary:
        "Landed employs a decoupled, event-driven microservice architecture separating the Next.js web application and Express REST API from background AI processing. Slower operations like HTML parsing, Google Gemini AI structured extraction, and vector embedding generation run in an independent Docker worker fleet.",
      image: "/projects/landed/landed-architecture.jpg",
      layers: [
        {
          name: "Frontend Web Client (Next.js + React 19)",
          tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Server-Sent Events (SSE)"],
          description:
            "Interactive Kanban board (Saved, Applied, Interview, Offer, Rejected), resume drag-and-drop upload wizards, and real-time SSE progress subscriptions for async job extractions.",
        },
        {
          name: "API Gateway & Session Controller",
          tech: ["Node.js 20+", "Express.js", "JWT", "Zod Validation", "IORedis"],
          description:
            "High-throughput REST API validating payloads, creating pending database rows (<100ms response), and enqueuing heavy jobs to Redis message queues without blocking request threads.",
        },
        {
          name: "Decoupled Async Worker Fleet (Docker)",
          tech: ["BullMQ", "Redis Queue", "Docker Containers", "Concurrency Limiting"],
          description:
            "Independently scaled worker tasks consuming from `job-extraction`, `resume-parsing`, and `match-scoring` queues with rate limiting and exponential backoff retry strategies.",
        },
        {
          name: "Applied AI & Vector Engine",
          tech: ["Google Gemini AI", "384-dim Embeddings", "PostgreSQL pgvector", "Cosine Similarity"],
          description:
            "Executes Google Gemini AI for structured JSON job extraction, computes 384-dimensional dense text embeddings, and runs native SQL cosine similarity queries (`<=>`) in pgvector for instant fit ranking.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Paste-a-URL Intelligent Extraction",
        description:
          "Extracts structured job data directly from messy web postings using Google Gemini AI and strict schema validation.",
        highlights: [
          "Auto-detects company, title, salary range, location, and remote type",
          "Parses technical requirements and required skill sets into arrays",
          "Zod schema validation guarantees strict data integrity before writing to SQL",
        ],
      },
      {
        title: "Decoupled Asynchronous Queue Architecture",
        description:
          "High-throughput task queue isolating slow LLM requests from the client API path.",
        highlights: [
          "Sub-100ms immediate API response with background task tokens",
          "BullMQ and Redis queue with configurable concurrency and rate limiters",
          "Server-Sent Events (SSE) notify frontend once extraction completes",
        ],
      },
      {
        title: "Semantic Resume-to-Job Fit Ranking",
        description:
          "Ranks every tracked job against the candidate's resume using dense vector embeddings.",
        highlights: [
          "Upload resume once to extract skills, experience, and domain strengths",
          "Dense 384-dimensional vector embedding generation for resumes and job descriptions",
          "Best Matches tab sorts jobs by percentage fit score (0–100%)",
        ],
      },
      {
        title: "Native SQL Cosine Similarity in PostgreSQL",
        description:
          "Performs ultra-fast vector similarity searches directly inside the primary database without expensive standalone vector DBs.",
        highlights: [
          "PostgreSQL `pgvector` extension for indexed vector distance queries",
          "Single query execution combining relational filters and cosine similarity",
          "Sub-millisecond query latency on indexed vector collections",
        ],
      },
      {
        title: "Personalized AI Fit Explanations",
        description:
          "On-demand Google Gemini AI analysis explaining why a job is a good fit, highlighting strong matches and missing competencies.",
        highlights: [
          "Explains skill overlap (e.g. 'Strong match — covers 4/5 skills; missing: GraphQL')",
          "Gated on-demand LLM calls keep operational token costs predictable",
          "Actionable resume tailoring suggestions for interview preparation",
        ],
      },
      {
        title: "Interactive Kanban Pipeline Tracker",
        description:
          "Visual workflow to monitor job applications through their full lifecycle.",
        highlights: [
          "Stages: Saved, Applied, Interview, Offer, and Rejected",
          "Application timeline logging and status history tracking",
          "Redis URL-hash cache prevents re-parsing duplicate job URLs across users",
        ],
      },
    ],
    techStackBreakdown: [
      {
        category: "Frontend Web Client",
        technologies: [
          { name: "Next.js 15+ (App Router)", purpose: "Server and client component rendering" },
          { name: "React 19 & TypeScript", purpose: "Strictly typed reactive UI and state" },
          { name: "Tailwind CSS", purpose: "Modern utility-first styling and animations" },
          { name: "Server-Sent Events (SSE)", purpose: "Live background task progress streaming" },
        ],
      },
      {
        category: "Backend & Worker Microservices",
        technologies: [
          { name: "Node.js (20+) & Express.js", purpose: "Fast asynchronous REST API endpoints" },
          { name: "BullMQ & IORedis", purpose: "Decoupled asynchronous queue worker fleet" },
          { name: "Docker & Docker Compose", purpose: "Containerized service virtualization & deployment" },
          { name: "Zod", purpose: "Runtime schema validation for LLM structured outputs" },
        ],
      },
      {
        category: "Applied AI & Vector Search",
        technologies: [
          { name: "Google Gemini AI", purpose: "Structured job extraction & match explanation LLM" },
          { name: "Dense Text Embeddings (384-dim)", purpose: "Vector representation for semantic matching" },
          { name: "PostgreSQL with pgvector", purpose: "Primary relational DB & native vector cosine search" },
          { name: "Redis (ElastiCache)", purpose: "URL hash deduplication cache & rate limiting" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Preventing slow LLM extraction calls and bursty URL pasting from blocking API response times.",
        solution:
          "Architected a decoupled BullMQ worker fleet with Redis task queues. The API responds in under 100ms with a pending token, while worker nodes process extraction and broadcast live updates via SSE.",
      },
      {
        challenge: "Running cost-effective, high-speed semantic resume matching without provisioning expensive external vector databases.",
        solution:
          "Utilized PostgreSQL's native pgvector extension with 384-dimensional dense embeddings and cosine distance indexing (<=>), allowing complex semantic ranking queries to execute directly inside relational SQL transactions.",
      },
      {
        challenge: "Eliminating redundant LLM costs when multiple users track identical job postings.",
        solution:
          "Implemented a Redis URL-hash cache that stores previously parsed job metadata, serving instant duplicate extractions with zero LLM API overhead.",
      },
    ],
  },
  {
    slug: "thumbnail-lab",
    title: "Thumbnail-Lab",
    description:
      "AI-powered YouTube thumbnail generation and predictive Click-Through Rate (CTR) optimization platform with creator identity preservation.",
    tags: ["Next.js 15", "React 19", "Google Gemini AI", "Supabase", "PostgreSQL", "Drizzle ORM", "Paddle", "Tailwind CSS"],
    role: "Full-Stack & Applied AI Engineer",
    badge: "AI SaaS Platform",
    status: "WIP",
    githubUrl: "https://github.com/flklr-dev/thumbnail-lab",
    tagline:
      "AI-Powered YouTube Thumbnail Studio & Predictive CTR Optimization SaaS with Creator Face Vault",
    overview:
      "Thumbnail Lab is an AI-driven SaaS studio engineered to help YouTube creators generate high-converting 16:9 thumbnails from natural language video titles. Leveraging Google's Gemini Multimodal Models, the platform automates prompt enrichment, visual composition, creator identity embedding (Face Vault), and predictive Click-Through Rate (CTR) evaluation simulating 160×90px mobile rendering clarity. Built with Next.js 15, Supabase (PostgreSQL + Drizzle ORM), and Paddle Merchant of Record billing with an atomic credit ledger.",
    metrics: [
      { label: "AI Vision Engine", value: "Google Gemini 2.0", hint: "Multimodal Synthesis" },
      { label: "CTR Scoring", value: "Predictive Vision AI", hint: "Contrast & Mobile 160px" },
      { label: "Identity Vault", value: "Face Embedding", hint: "Persona Preservation" },
      { label: "Billing System", value: "Paddle MoR", hint: "Atomic Credit Ledger" },
    ],
    architecture: {
      summary:
        "Thumbnail Lab is built as a unified Next.js 15 full-stack application connecting creator studio interfaces with Google Gemini Multimodal APIs, Sharp server-side image processing pipelines, Supabase PostgreSQL with Drizzle ORM, and Paddle billing webhooks.",
      image: "/projects/thumbnail-lab/thumbnail-lab-architecture.jpg",
      layers: [
        {
          name: "Frontend Web Studio (Next.js 15 + React 19)",
          tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Lucide React"],
          description:
            "Creator studio dashboard featuring style presets (MrBeast Viral, Tech Showcase, Documentary, Gaming), Identity Face Vault, and A/B Test comparative CTR analytics.",
        },
        {
          name: "Backend & Multimodal AI Engine",
          tech: ["Next.js Server Actions", "Google Gemini API", "Gemini Vision", "Sharp Pipeline", "Zod"],
          description:
            "Server-side image generation with Google Gemini multimodal conditioning, Sharp compositing, prompt refinement engine, and vision-based CTR performance evaluation.",
        },
        {
          name: "Cloud Database & Identity Vault (Supabase)",
          tech: ["Supabase (PostgreSQL)", "Drizzle ORM", "Row-Level Security", "Supabase Storage"],
          description:
            "Type-safe relational database with 7 core tables, immutable credit transaction ledger, encrypted storage for face portrait references, and device anti-abuse fingerprinting.",
        },
        {
          name: "Global Billing & Merchant of Record",
          tech: ["Paddle Billing", "Webhooks", "Signature Verification", "Atomic Credit Ledger"],
          description:
            "International payments handling multi-currency checkouts, sales tax (VAT/GST), and idempotent webhook event processing for instant credit allocations.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Multimodal AI Generation Studio",
        description:
          "Converts video concepts into high-contrast 1280×720 or 1920×1080 16:9 thumbnail assets with curated visual presets.",
        highlights: [
          "Presets: MrBeast Viral, Clean Tech Showcase, Dramatic Documentary, and Gaming Hype",
          "High-contrast visual hierarchy optimized for small mobile previews and large desktop feeds",
          "One-click resolution toggles and custom style prompt formatting",
        ],
      },
      {
        title: "Identity & Face Vault (Persona Preservation)",
        description:
          "Maintains recognizable creator identity across diverse environments using multimodal face reference embeddings.",
        highlights: [
          "Upload portrait photos once to generate thumbnails featuring the creator's real face",
          "Expression modifiers (shocked, ecstatic, intense, skeptical)",
          "Encrypted Supabase Storage bucket for private portrait references",
        ],
      },
      {
        title: "Predictive A/B CTR Evaluation",
        description:
          "Gemini Vision analysis scoring visual contrast, emotional connection, and simulated 160×90px mobile feed clarity.",
        highlights: [
          "Granular metrics (0-10): Visual Hierarchy, Emotional Resonance, Text Readability",
          "Estimated CTR percentage prediction with actionable design improvement tips",
          "Multi-variant side-by-side comparison to select the highest-performing thumbnail",
        ],
      },
      {
        title: "Smart Prompt Refinement Engine",
        description:
          "Automatically augments raw video titles into rich cinematic lighting, color contrast, and focal depth directives.",
        highlights: [
          "Expands basic concepts with dramatic lighting and color pop instructions",
          "Formats text overlay rules to ensure legible rendering at small sizes",
          "Bi-directional toggle allowing manual prompt customization",
        ],
      },
      {
        title: "Atomic Credit Ledger & Subscription Billing",
        description:
          "Paddle Merchant of Record integration managing global payments and audit-logged credit debits.",
        highlights: [
          "Tiered plans: Free (2 credits), Starter ($9/mo), Pro ($29/mo), Creator ($49/mo)",
          "Immutable append-only ledger tracking all credit additions and generation events",
          "Cryptographic webhook signature verification ensuring tamper-proof credit delivery",
        ],
      },
      {
        title: "Anti-Abuse Device Fingerprinting",
        description:
          "Telemetry cross-referencing and prompt boundary sanitization to safeguard platform infrastructure.",
        highlights: [
          "Browser fingerprint and IP hashing preventing multiple account free-tier abuse",
          "Strict Zod schema validation defending against prompt injection attacks",
          "Offloaded PCI compliance with Paddle secure checkout overlays",
        ],
      },
    ],
    techStackBreakdown: [
      {
        category: "Frontend Web Studio",
        technologies: [
          { name: "Next.js 15 (App Router)", purpose: "Full-stack React server & client architecture" },
          { name: "React 19 & TypeScript", purpose: "Strictly typed reactive UI and state components" },
          { name: "Tailwind CSS (v4)", purpose: "Utility-first design with curated dark-mode theme" },
          { name: "Lucide React", purpose: "Modern icon set for creator controls and tools" },
        ],
      },
      {
        category: "AI & Image Processing",
        technologies: [
          { name: "Google Gemini API (@google/genai)", purpose: "Multimodal text-to-image synthesis & face conditioning" },
          { name: "Gemini Vision Scorer", purpose: "Predictive CTR quality evaluation & mobile simulation" },
          { name: "Sharp", purpose: "Server-side image compositing, cropping & optimization" },
          { name: "Zod", purpose: "Input boundary sanitization & prompt validation" },
        ],
      },
      {
        category: "Database, Storage & Payments",
        technologies: [
          { name: "Supabase (PostgreSQL)", purpose: "Relational database with Row-Level Security (RLS)" },
          { name: "Drizzle ORM", purpose: "Type-safe SQL schema definitions & migrations" },
          { name: "Supabase Storage", purpose: "Encrypted asset storage for face vault & thumbnails" },
          { name: "Paddle Billing", purpose: "Global Merchant of Record handling payments & taxes" },
        ],
      },
    ],
    challengesAndSolutions: [
      {
        challenge: "Maintaining consistent creator facial likeness and expressions across diverse generated environments.",
        solution:
          "Architected the Identity Face Vault utilizing Gemini's multimodal image-to-image conditioning, feeding user portrait embeddings with targeted expression directives directly into the generation pipeline.",
      },
      {
        challenge: "Accurately predicting YouTube viewer engagement before a thumbnail is published.",
        solution:
          "Built a vision evaluation model using Gemini Vision that downscales assets to simulate 160x90px mobile feed conditions, scoring contrast hierarchy, text legibility, and facial intensity.",
      },
      {
        challenge: "Preventing credit race conditions and free-tier abuse.",
        solution:
          "Implemented an atomic append-only credit ledger with database transactions and device fingerprinting, paired with cryptographic Paddle webhook signature verification.",
      },
    ],
  },
  {
    slug: "codementor-ai",
    title: "CodeMentor AI",
    description:
      "Gamified educational code learning platform with curated level pathways, algorithmic challenges, achievement awards, and unlockable user perks.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    role: "Full-Stack Developer",
    badge: "Web Platform",
    tagline: "Gamified educational code learning platform with algorithmic challenges",
    overview:
      "CodeMentor AI turns computer science education into an interactive quest system with level-based skill trees, real-time code validation, reward badges, and adaptive AI explanations.",
    metrics: [
      { label: "Gamification", value: "XP & Streaks", hint: "Level Progression" },
      { label: "Execution", value: "Sandboxed", hint: "Safe Code Evaluation" },
      { label: "Curriculum", value: "50+ Challenges", hint: "Data Structures & Algos" },
    ],
  },
];

/** Projects shown on the home page (excludes entries only listed on /projects). */
export const homeProjects = projects.filter(
  (p) => p.title !== "CodeMentor AI" && p.title !== "Thumbnail-Lab"
);

/** Helper to look up a project by its URL slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export type BeyondCodeItem = {
  title: string;
  description: string;
};

export const beyondCode: BeyondCodeItem[] = [
  {
    title: "Competitive Focus",
    description:
      "Dedicated esports player and tech enthusiast. I enjoy competitive matches and analyzing modern hardware, keeping my focus sharp and reflexes quick.",
  },
  {
    title: "Acoustic Flows",
    description:
      "Always listening to lofi rhythms and ambient synths while configuring code. A steady beat helps me build flow state and maintain momentum.",
  },
  {
    title: "Minimalist Mindset",
    description:
      "An avid researcher of clean layouts, structural web design, and cognitive productivity hacks to simplify workflows and design patterns.",
  },
];

/**
 * Renders all of the above into a Markdown knowledge base for the chatbot's
 * system prompt. Keeping this here (instead of duplicating facts inside
 * route.ts) means the AI's answers automatically stay accurate as this file
 * is updated.
 */
export function buildAiKnowledgeBase(): string {
  const techLines = Object.entries(techStack)
    .map(([category, items]) => `  - ${capitalize(category)}: ${items.join(", ")}.`)
    .join("\n");

  const experienceLines = experiences
    .map((exp) => `  - ${exp.title} at ${exp.company} (${exp.year}).`)
    .join("\n");

  const projectLines = projects
    .map((p) => {
      const liveUrl = p.url ? ` Live at ${p.url}.` : "";
      const statusNote = p.status
        ? ` Status: ${p.status === "WIP" ? "In Development (WIP)" : p.status}.`
        : "";
      return `  - **${p.title}** (${p.badge}, role: ${p.role}): ${p.description} Built with ${p.tags.join(", ")}.${statusNote}${liveUrl}`;
    })
    .join("\n");

  const achievementLines = achievements
    .map((a) => `${a.title} — ${a.issuer}${a.year ? ` (${a.year})` : ""}`)
    .join("; ");

  const beyondCodeLines = beyondCode.map((b) => `${b.title.toLowerCase()}`).join(", ");

  const socialLines = socialLinks.map((s) => `${s.name} (${s.url})`).join(", ");

  return `- **Summary**: ${profile.summary}
- **Current Status**: ${profile.status}.
- **Email**: ${profile.email}
- **Tech Stack**:
${techLines}
- **Experience**:
${experienceLines}
- **Recent Projects**:
${projectLines}
- **Achievements**: ${achievementLines}.
- **Life Beyond Code**: ${beyondCodeLines}.
- **Links**: ${socialLines}.`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
