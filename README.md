<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gayanukabulegoda/LearnFlow-FRONTEND">
    <!-- Optionally add a project-specific logo here if you wish -->
    <img src="/src/assets/learnFlowIcon.png" alt="LearnFlow Logo" width="110" height="110">
  </a>

<h2 align="center">LearnFlow FRONTEND</h2>

  <p align="center">
    Welcome to the <strong>LearnFlow</strong> frontend repository! This React Vite + TypeScript application serves as the responsive, user-facing interface for a dynamic learning platform. It offers goal tracking, AI-recommended resources, progress visualization, and integrates with a Node.js backend for secure JWT authentication.
    <br />
    <br />
    <a href="https://github.com/gayanukabulegoda/LearnFlow-FRONTEND/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/gayanukabulegoda/LearnFlow-FRONTEND/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation-and-setup">Installation and Setup</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#backend-repository">Backend Repository</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## About The Project

**LearnFlow** is designed to help self-learners stay motivated and organized. By leveraging basic AI/NLP techniques, it recommends free online resources (articles, videos, courses) based on user-defined learning goals (e.g., “Learn Python,” “Master React”). The frontend provides an intuitive interface for users to set goals, log progress, maintain streaks, and receive personalized weekly recommendations.

![Design-Thumbnail](/src/assets/learnFlowReadmePreview.png)

### Key Features

1. **Goal Management**
    - Create, edit, and track learning goals and subtasks.

2. **AI-Powered Recommendations**
    - Basic AI/NLP suggests relevant resources from external APIs (Wikipedia, MDN).

3. **Progress Visualization**
    - Interactive dashboards and charts to view goal progress, and user analytics.

4. **Secure Authentication**
    - Integration with JWT-based authentication for user login and access control.

5. **State Management with Redux**
    - Centralized state management using Redux Toolkit & Thunk for predictable data flow.

6. **Responsive Design**
    - Mobile-first, responsive layout with Tailwind CSS for rapid UI development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Built With

This project uses a modern frontend stack to ensure high performance, scalability, and a great developer experience:

[![React][react-shield]][react-url]
[![Vite][vite-shield]][vite-url]
[![TypeScript][typescript-shield]][typescript-url]
[![Redux][redux-shield]][redux-url]
[![Tailwind CSS][tailwind-shield]][tailwind-url]
[![Axios][axios-shield]][axios-url]
[![JWT][jwt-shield]][jwt-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- GETTING STARTED -->
## Getting Started

These instructions will help you set up the **LearnFlow FRONTEND** locally for development and testing.

### Prerequisites

- **Node.js** (v22+ recommended)  
  [Download & Install Node.js](https://nodejs.org/en/download/)
- **npm or yarn** (npm is bundled with Node.js; Yarn is optional)  
  [Install Yarn if you prefer Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/gayanukabulegoda/LearnFlow-FRONTEND.git
   ```
   Navigate to the project directory:
   ```bash
   cd LearnFlow-FRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure Environment Variables (Optional)**
    - If needed, create a `.env` or `.env.local` file in the project root.
    - Vite uses environment variables prefixed with `VITE_`. For example:
      ```bash
      VITE_API_BASE_URL="http://localhost:5000"
      VITE_OTHER_CONFIG="some_value"
      ```

### Usage

1. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173) by default.

2. **Build for production**
   ```bash
   npm run build
   ```
   or
   ```bash
   yarn build
   ```
   This command creates an optimized production build in the `dist` folder.

3. **Preview the production build**
   ```bash
   npm run preview
   ```
   or
   ```bash
   yarn preview
   ```
   This will serve the contents of the `dist` folder locally so you can verify the production build.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## API Documentation

For detailed information on available API endpoints, request/response formats, and usage guidelines, refer to the official [Postman Collection](https://documenter.getpostman.com/view/36681432/2sAYXFhxL8). Ensure the backend server is running and configured correctly before making requests.

---

## Backend Repository

The **LearnFlow BACKEND** is built with Node.js, Express.js, TypeScript, and Prisma. Visit the repository for more details:

- [LearnFlow BACKEND](https://github.com/gayanukabulegoda/LearnFlow-BACKEND.git)

---

## License

Distributed under the **MIT License**. See [`LICENSE`](https://github.com/gayanukabulegoda/LearnFlow-FRONTEND/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<div align="center">

&copy; 2025 <a href="https://grbulegoda.me/" target="_blank">Gayanuka Bulegoda</a>

</div>

---

<!-- MARKDOWN LINKS & IMAGES -->
[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/
[typescript-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[redux-shield]: https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[tailwind-shield]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[axios-shield]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[axios-url]: https://axios-http.com/
[jwt-shield]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[jwt-url]: https://jwt.io/