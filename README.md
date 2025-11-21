# Travel Booking Application

A modern travel booking platform with a React frontend and Express backend.

## Project Structure

```
travel-booking/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── App.tsx
│   └── package.json
│
├── server/              # Express.js backend
│   ├── src/
│   │   └── index.ts
│   └── package.json
│
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup Client

```bash
cd client
npm install
npm run dev
```

The client will run on [http://localhost:5173](http://localhost:5173)

### Setup Server

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000)

## Features

### Client
- ⚛️ React 18 with TypeScript
- ⚡ Vite for fast development
- 🎨 Tailwind CSS styling
- 🧩 shadcn/ui component library
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions

### Server
- 🚀 Express.js with TypeScript
- 🔄 Hot reload with tsx
- 🛡️ CORS enabled
- 📝 RESTful API structure
- ✅ Health check endpoints

## Development

### Client Development
```bash
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Server Development
```bash
cd server
npm run dev      # Start dev server with hot reload
npm run build    # Compile TypeScript
npm start        # Run production build
```

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /api` - Available routes

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend
- Node.js
- Express.js
- TypeScript
- CORS
- dotenv

## License

MIT
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

## 🤖 Powered by Z.ai

This scaffold is optimized for use with [Z.ai](https://chat.z.ai) - your AI assistant for:

- **💻 Code Generation** - Generate components, pages, and features instantly
- **🎨 UI Development** - Create beautiful interfaces with AI assistance  
- **🔧 Bug Fixing** - Identify and resolve issues with intelligent suggestions
- **📝 Documentation** - Auto-generate comprehensive documentation
- **🚀 Optimization** - Performance improvements and best practices

Ready to build something amazing? Start chatting with Z.ai at [chat.z.ai](https://chat.z.ai) and experience the future of AI-powered development!

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions and configurations
```

## 🎨 Available Features & Components

This scaffold includes a comprehensive set of modern web development tools:

### 🧩 UI Components (shadcn/ui)
- **Layout**: Card, Separator, Aspect Ratio, Resizable Panels
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Badge, Avatar, Calendar

### 📊 Advanced Data Features
- **Tables**: Powerful data tables with sorting, filtering, pagination (TanStack Table)
- **Charts**: Beautiful visualizations with Recharts
- **Forms**: Type-safe forms with React Hook Form + Zod validation

### 🎨 Interactive Features
- **Animations**: Smooth micro-interactions with Framer Motion
- **Drag & Drop**: Modern drag-and-drop functionality with DND Kit
- **Theme Switching**: Built-in dark/light mode support

### 🔐 Backend Integration
- **Authentication**: Ready-to-use auth flows with NextAuth.js
- **Database**: Type-safe database operations with Prisma
- **API Client**: HTTP requests with Axios + TanStack Query
- **State Management**: Simple and scalable with Zustand

### 🌍 Production Features
- **Internationalization**: Multi-language support with Next Intl
- **Image Optimization**: Automatic image processing with Sharp
- **Type Safety**: End-to-end TypeScript with Zod validation
- **Essential Hooks**: 100+ useful React hooks with ReactUse for common patterns

## 🤝 Get Started with Z.ai

1. **Clone this scaffold** to jumpstart your project
2. **Visit [chat.z.ai](https://chat.z.ai)** to access your AI coding assistant
3. **Start building** with intelligent code generation and assistance
4. **Deploy with confidence** using the production-ready setup

---

Built with ❤️ for the developer community. Supercharged by [Z.ai](https://chat.z.ai) 🚀
