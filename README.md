 <p align="center">
  <a href="https://nikshay-setu.in" target="_blank">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=gradient&text=Ni-kshay%20SETU&fontSize=50&fontAlign=50&fontAlignY=34" alt="Ni-kshay Setu banner"/>
  </a>

<p align="center">
  <a href="https://nikshay-setu.in/" target="_blank">
    <img src="https://nikshay-setu.in/newLogo.b72ac552416e2a050fc6c22c0491143e.svg" width="200" alt="Ni-kshay SETU" />
  </a>
</p>

<div align="center">

![Subscribers](https://img.shields.io/badge/Subscribers-44k%2B-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL%203.0-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web-yellow?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-8-orange?style=for-the-badge)

</div>

## Ni-kshay Setu Admin Panel | Management System for TB Control Platform

The Ni-kshay Setu app ([https://nikshay-setu.in/](https://nikshay-setu.in/)), already with **44K+ subscribers**, empowers healthcare providers to make informed decisions and contributes to India's mission to combat tuberculosis. Available on [web](https://nikshay-setu.in/), [Android](https://play.google.com/store/apps/details?id=com.iiphg.tbapp&pli=1), and [iOS](https://apps.apple.com/in/app/ni-kshay-setu/id1631331386) platforms in 8 languages, it offers real-time updates, interactive modules, and personalized insights, revolutionizing TB knowledge management and accessibility across India.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Development](#development)
  - [Build](#build)
- [Conventional Branching](#conventional-branching)
- [Conventional Commits](#conventional-commits)
- [Project Structure](#project-structure)
- [Third-Party Documentation](#third-party-documentation)
- [Links](#links)
- [License](#license)

## Introduction

Ni-Kshay SETU is a groundbreaking digital solution available as a web application, Android application, and iOS application. With a mission to support healthcare providers in decision-making and transform knowledge into empowerment, this innovative and interactive learning tool is a catalyst in India's journey towards a TB-free nation. As a comprehensive digital platform, Ni-Kshay SETU revolutionizes the way healthcare providers approach TB management. By leveraging cutting-edge technology, it empowers medical professionals with real-time support and evidence-based recommendations, ensuring they have the most up-to-date information at their fingertips. With an intuitive interface and user-friendly design, Ni-Kshay SETU offers a seamless experience across devices, making it accessible to a wide range of users. The web application allows healthcare providers to access the platform from any computer, while the Android and iOS applications provide mobility and convenience for on-the-go professionals. Through a range of interactive modules, virtual simulations, and case studies, Ni-Kshay SETU transforms learning into a dynamic and engaging experience. Healthcare providers can enhance their knowledge and skills by practicing TB case management in a risk-free environment. They can diagnose, prescribe treatment plans, and monitor patient progress, gaining invaluable experience and building their confidence in TB management.


The Ni-kshay Setu Admin Panel is a powerful administrative interface designed to manage the Ni-kshay Setu platform, which serves as a digital solution for healthcare providers in TB management. This admin panel provides tools for content management, user administration, and platform configuration.

The admin panel allows administrators to:
- Manage subscriber data and monitor their progress
- Create and update educational content in multiple languages
- Configure application settings and features
- Generate reports and visualize platform usage data
- Manage notifications and communications with users

> The Ni-kshay Setu app is part of the 'Closing the Gaps in TB care Cascade (CGC)' project, developed by the Indian Institute of Public Health, Gandhinagar (https://iiphg.edu.in/). This project aims to strengthen health systems' ability to comprehensively monitor and respond to the TB care cascade with quality improvement (QI) interventions.

> IIPHG, The Union, and NTEP are proud partners in the development and implementation of Ni-Kshay SETU.

> Technological support for this project is provided by Digiflux Technologies Pvt. Ltd. (https://www.digiflux.io), contributing to the development and implementation of the digital solution.

## Features

- **Content Management:** Create, edit, and manage various content types including blogs, key features, resource materials, and more
- **Multilingual Support:** Manage content in 8 different languages through an intuitive translation interface
- **User Administration:** Monitor subscriber activities, manage roles and permissions
- **Application Configuration:** Control application flags, settings, and behavior
- **Release Management:** Track and publish application updates and release notes
- **Static Content Management:** Manage static content like "What We Do" sections and key features
- **Notification System:** Create and send notifications to users through various channels
- **Data Visualization:** View and analyze platform usage statistics and user engagement metrics
- **Role-based Access Control:** Manage permissions for different admin user types

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **State Management:** Redux
- **UI Components:** Mantine, Headless UI, TailwindCSS
- **Form Handling:** Formik
- **Internationalization:** i18next
- **Charts and Visualization:** ApexCharts
- **HTTP Client:** Axios
- **Build Tool:** Vite

## Setup Instructions

### Prerequisites

- Node.js v20.x or later
- npm v9.x or later

### Installation

1. **Clone the repository:**

```bash
git clone <repository_url>
cd <project_directory>
```

2. **Install dependencies:**

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file to include:

```
BASE_URL=<backend_api_url>
MEDIA_URL=<media_server_url>
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

### Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Conventional Branching

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/feature-name`: New features
- `bugfix/bugfix-name`: Bug fixes
- `hotfix/hotfix-name`: Urgent production fixes

## Conventional Commits

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation updates
- **style:** Code style changes (no logic impact)
- **refactor:** Code refactoring
- **perf:** Performance improvements
- **test:** Adding or updating tests
- **chore:** Build process or tool updates

Example:

```bash
git commit -m "feat: add new user authentication flow"
```

## Project Structure

```
src/
├── assets/          # Static assets like images
├── components/      # Reusable UI components
├── forms/           # Form components for data entry
├── hooks/           # Custom React hooks
├── layouts/         # Page layout components
├── pages/           # Page components
├── services/        # API service functions
├── store/           # Redux store configuration
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```


Translations are managed through the i18next library and stored in JSON files in the `public/locales/` directory.

## Third-Party Documentation

| No. | Service       | Description                                                                        | Documentation Link                                                   |
| --- | ------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1   | WATI          | WhatsApp messaging platform for customer communication and automation.             | [WATI API Reference](https://docs.wati.io/reference/introduction)    |
| 2   | SendGrid Mail | Email delivery service used for transactional and marketing emails.                | [SendGrid by Twilio](https://www.twilio.com/docs/sendgrid)           |
| 3   | Firebase      | Admin SDK for Firebase, used for server-side integrations like push notifications. | [firebase-admin (NPM)](https://www.npmjs.com/package/firebase-admin) |
| 4   | TextLocal     | SMS gateway used for sending text messages to users.                               | [TextLocal API Docs](https://api.textlocal.in/docs/)                 |
| 5   | Mantine       | React components library used for UI elements.                                     | [Mantine Docs](https://mantine.dev/)                                 |

## Links

* [Main Application](https://nikshay-setu.in/)
* [Backend API](https://nikshay-setu.in/api)
* [Admin Panel](https://admin.nikshay-setu.in/)

## License

Ni-kshay Setu project is licensed under the [GNU General Public License, Version 3.0](https://www.gnu.org/licenses/gpl-3.0).

![Static Badge](https://img.shields.io/badge/Licence-GPL%203.0-blue)