# Contributing to LearnFlow FRONTEND

Thank you for your interest in contributing to **LearnFlow FRONTEND**! Your contributions help improve the project and make it more useful for everyone. This document outlines the guidelines and best practices to follow when contributing.

---

## Table of Contents
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Contributing Code](#contributing-code)
- [Code Style](#code-style)
- [Branching Strategy](#branching-strategy)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Issue Tracking](#issue-tracking)
- [Acknowledgements](#acknowledgements)

---

## Getting Started

1. **Fork the repository**  
   Create a personal fork of the repository by clicking the "Fork" button at the top of the project page.

2. **Clone your fork**  
   Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/<your-username>/LearnFlow-FRONTEND.git
   cd LearnFlow-FRONTEND
   ```

3. **Create a new branch**  
   Always create a new branch for your work:
   ```bash
   git checkout -b feature/your-branch-name
   ```

4. **Install dependencies**  
   Install project dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

5. **Run the development server**  
   Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

---

## How to Contribute

### Reporting Bugs
If you encounter a bug:
- Search for existing issues to avoid duplicates.
- Create a new issue with:
    - A clear and descriptive title.
    - Steps to reproduce the bug.
    - Expected vs actual behavior.
    - Screenshots or logs (if applicable).

👉 [Report a Bug](https://github.com/gayanukabulegoda/LearnFlow-FRONTEND/issues/new?labels=bug)

---

### Suggesting Enhancements
If you have an idea for improving the project:
- Search for similar enhancement requests.
- Create a new issue with:
    - A clear and descriptive title.
    - The motivation for the enhancement.
    - Expected behavior and benefits.

👉 [Request a Feature](https://github.com/gayanukabulegoda/LearnFlow-FRONTEND/issues/new?labels=enhancement)

---

### Contributing Code
1. Ensure that you have an open issue linked to your contribution.
2. Follow the [Branching Strategy](#branching-strategy) and [Commit Message Guidelines](#commit-message-guidelines).
3. Test your changes locally:
    - Ensure all tests pass.
    - Test UI components across different devices and screen sizes.
4. Submit a pull request.

---

## Code Style
Ensure consistency with the project's coding style:
- **Language:** TypeScript
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **HTTP Requests:** Axios

### Linting and Formatting
- Ensure your code follows project linting rules:
   ```bash
   npm run lint
   ```
  or
   ```bash
   yarn lint
   ```

- Format your code using Prettier:
   ```bash
   npm run format
   ```
  or
   ```bash
   yarn format
   ```

---

## Branching Strategy
Use the following branching strategy:
- `main` – Production-ready code only.
- `dev` – Latest stable development branch.
- `feature/branch-name` – For new features.
- `fix/branch-name` – For bug fixes.
- `hotfix/branch-name` – For urgent fixes on the `main` branch.

Example:
```bash
git checkout -b feature/ai-recommendation
```

---

## Commit Message Guidelines
Follow the **Conventional Commits** format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Common Types:
- **feat** – A new feature.
- **fix** – A bug fix.
- **docs** – Documentation updates.
- **style** – Code style changes (formatting, no logic changes).
- **refactor** – Code restructuring without changing behavior.
- **test** – Adding or modifying tests.
- **chore** – Maintenance or build tasks.

Example:
```
feat(auth): add JWT-based authentication
```

---

## Pull Request Guidelines
1. Create a pull request (PR) against the `dev` branch.
2. Clearly describe the changes and link to the related issue.
3. Ensure that:
    - Linting and tests pass.
    - Code follows the project’s coding style.
    - Documentation is updated (if applicable).

**PR Title Example:**
```
feat(dashboard): add goal tracking feature
```

**PR Description Example:**
```
### What’s Changed
- Added goal tracking feature to the dashboard.
- Updated Redux state to handle goal updates.

### How to Test
1. Create a new goal from the dashboard.
2. Check that the progress is updated correctly.

Closes #42
```

---

## Issue Tracking
- Use [GitHub Issues](https://github.com/gayanukabulegoda/LearnFlow-FRONTEND/issues) to track bugs and feature requests.
- Assign appropriate labels:
    - `bug` – For issues related to broken functionality.
    - `enhancement` – For feature improvements.
    - `help wanted` – For issues where community help is welcome.
    - `good first issue` – For beginner-friendly issues.

---

## Acknowledgements
We appreciate all contributions! 🙌  
By contributing to LearnFlow FRONTEND, you agree to license your contributions under the MIT License.

---

Thank you for improving **LearnFlow FRONTEND**! ❤️