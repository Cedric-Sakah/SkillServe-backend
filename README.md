# skillserve-backend

A clean, modern REST API for the SkillServe application.

Built with **Bun + TypeScript + Express.js + MongoDB (Mongoose)**.

## Tech Stack

- **Runtime**: Bun (primary) – falls back gracefully to Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Package manager**: Bun (or npm/yarn/pnpm)

## Dependencies

Key packages used in this project:

| Package      | Version | Purpose                                       |
| ------------ | ------- | --------------------------------------------- |
| `express`    | ^5.1.0  | Web framework for HTTP routing and middleware |
| `mongoose`   | ^9.0.0  | MongoDB object modeling and validation        |
| `cors`       | ^2.8.5  | Enable cross-origin requests from frontend    |
| `dotenv`     | ^17.2.3 | Load environment variables from `.env`        |
| `helmet`     | ^8.1.0  | Security headers middleware                   |
| `morgan`     | ^1.10.1 | HTTP request logging middleware               |
| `joi`        | ^18.0.2 | Schema validation library                     |
| `typescript` | ^5.9.3  | Type checking and transpilation (peer)        |

See `package.json` for the full dependency list.

## Prerequisites

- Bun (recommended) or Node.js ≥ 18
- MongoDB running locally or a cloud connection string (MongoDB Atlas works great)

## Quick Start (Development)

```bash
# Clone the repo
git clone https://github.com/your-username/skillserve-backend.git
cd skillserve-backend

# Install dependencies
bun install
# or: npm install

# Copy example env (recommended)
cp .env.example .env

# Start the development server
bun start
```
