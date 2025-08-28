# BookGrid
---
**BookGrid** is A modern, responsive book management web application built with React, Redux, TypeScript, Express Mongodb & Mongoose . BookGrid provides a smooth user experience for browsing, adding, updating, and borrowing books, with a modular architecture and scalable state management powered by Redux Toolkit.

# Table of Contents

- [Introduction](#introduction)

- [Features](#features)

- [Project Structure](#project-structure)

- [Installation](#installation)

- [Usage](#usage)

- [Available Scripts](#available-scripts)

- [Dependencies](#Dependencies)

- [Configuration](#configuration)

- [Pages & Modals](#pages--modals)

- [Live Demo](#live-demo)


---

## Introduction

BookGrid is a full-featured **book and borrowing system** built as a single-page application (SPA).

It allows users to:

- Browse and view books

- Add or update book entries

- Borrow books and view borrowing summaries

- Interact with smooth modals, forms, and accessible UI components
---
## Features

- **Book Management:** Add, edit, and view book details

- **Borrow System:** Borrow books with modal interactions and summaries

- **Routing:** Organized pages for Books and Borrow workflows via react-router

- **State Management:** Centralized with Redux Toolkit + API abstraction layer

- **Modern UI:** Built with TailwindCSS 4, Flowbite, and Radix UI components

- **Form Handling & Validation:** react-hook-form with zod validation

- **Type Safety:** Strongly typed with TypeScript

- **Reusable Components:** Shared UI elements like buttons, dialogs, forms, tables, inputs

- **Performance:** Powered by Vite for fast builds and hot reloading
---
## Project Structure
```
src/
├── App.tsx              
├── main.tsx             
├── assets/              
├── components/         
│   ├── layout/          
│   └── ui/              
├── lib/                 
│   └── utils.ts
├── module/              
│   ├── Books/           
│   └── Borrow/          
├── Pages/               
│   ├── Book/            
│   └── Borrow/          
├── redux/               
│   ├── store.ts
│   ├── appSlice.ts
│   └── api/Api.ts
├── routes/              
│   └── routes.tsx
└── types/               
    └── types.ts
```
---
## Installation

Ensure you have Node.js (>=18) and npm (>=9).

**Clone the repo**
```
git clone https://github.com/your-username/bookgrid.git
cd bookgrid
```
**Install dependencies**
```
npm install
```
---
## Usage

**Development server**
```
npm run dev
```

- Runs locally at http://localhost:5173


**Production build**
```
npm run build
```

**Preview production build**
```
npm run preview
```

**Linting**
```
npm run lint
```

## Available Scripts

```npm run dev``` → Start development server

```npm run build``` → Build for production

```npm run preview``` → Preview production build

```npm run lint``` → Run ESLint

## Dependencies

- **Core:** React 19, React DOM, Redux Toolkit, React Redux, React Router v7

- **UI/Styling:** TailwindCSS 4, Flowbite, Radix UI, DaisyUI

- **Forms & Validation:** React Hook Form, Zod, @hookform/resolvers

- **Animations & UX:** Lottie React, Lottie Web, SweetAlert2, React Spinners

- **Utilities:** date-fns, uuid, clsx, lucide-react

- **Dev Tools:** Vite, TypeScript, ESLint, @vitejs/plugin-react

## Configuration

- **Vite** → vite.config.ts

- **TypeScript** → tsconfig.json

- **Redux API** → redux/api/Api.ts

- **TailwindCSS** → via Flowbite + DaisyUI plugins


## Pages & Modals

- **Books Page** → Browse all books

- **Add Book Page & Modal** → Add a new book with validation

- **Update Book Modal** → Update details of existing books

- **Borrow Book Flow** → Borrow books and view borrow summary

- **Responsive Layout** → Navbar, Footer, mobile-friendly UI

## Live Demo
[BookGrid Frontend](https://bookgridl2.netlify.app)

[BookGrid Backend](https://l2-ph-assingment-04-server.vercel.app)

---
# The End
---

