# AAST Smart Ticketing System

A production-grade, AI-powered university queue management platform built with Next.js 15, Prisma, PostgreSQL, and OpenAI.

## 🚀 Features

- **Premium UI/UX**: Futuristic dark mode dashboard with Glassmorphism and Framer Motion animations.
- **AI-Powered**:
  - **Smart Categorizer**: Automatically predicts department based on issue description.
  - **Auto-Summarizer**: Shortens long student requests for admins.
  - **Traffic Predictor**: Forecasts peak hours and resource needs using historical data.
- **Academic Data Structures**:
  - **General Tree**: Hierarchical university department management.
  - **Priority Queue (Heap)**: Efficient ticket processing based on priority (VIP, Urgent, Normal).
  - **Binary Search**: O(log n) lookup for students and tickets.
  - **Undo Stack**: Stack-based admin action reversal.
- **Real-Time**: Instant queue updates using Socket.IO.
- **Analytics**: Beautiful, interactive charts using Recharts.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Next.js Route Handlers, Server Actions.
- **Database**: PostgreSQL with Prisma ORM.
- **Auth**: NextAuth.js v5.
- **AI**: OpenAI API.
- **Charts**: Recharts.

## 🏁 Getting Started

1. **Clone the repository** (or use the provided files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file and add:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/db"
   NEXTAUTH_SECRET="your-secret"
   OPENAI_API_KEY="your-api-key"
   ```
4. **Setup Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## 📂 Architecture

- `/src/lib`: Core logic and data structures (`tree.ts`, `priorityQueue.ts`, `undoStack.ts`).
- `/src/app`: Next.js pages and layouts.
- `/src/components`: UI components and shared widgets.
- `/prisma`: Database schema definition.

## 🎓 Academic Integration

This project demonstrates the practical application of:
- **Heaps** for ticket prioritization.
- **Trees** for organizational hierarchy.
- **Stacks** for state management (Undo).
- **Search Algorithms** for performance optimization.

---
Built with ❤️ for AAST Students.
