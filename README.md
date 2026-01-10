# KMS Tech - Next.js Web Application

![KMS Tech](https://kmstech.co/kmstech-next.png)

> **Sacred Intention Leads to Perfection**

A modern, high-performance web application built with [Next.js 16](https://nextjs.org), featuring a hybrid SPA/SSR architecture, seamless animations, and a headless blog system powered by Hashnode.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Coverage](https://img.shields.io/badge/Coverage-100%25-green)

## 🚀 Key Features

*   **Hybrid Architecture**: SPA-style landing page with interactive modals mixed with SEO-optimized SSR blog pages.
*   **Headless CMS Integration**: Dynamic content fetching from Hashnode via GraphQL.
*   **PWA Support**: Installable as a native-like app with offline capabilities.
*   **Rich Animations**: Smooth page transitions and micro-interactions using GSAP.
*   **Responsive Design**: Mobile-first approach with optimized layouts for all devices.
*   **Robust Testing**: 100% unit test coverage for core UI components.

## 🛠️ Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Styling**: CSS Modules, Lucide React (Icons)
-   **Data**: GraphQL (graphql-request)
-   **Animation**: GSAP
-   **Testing**: Jest, React Testing Library
-   **Deployment**: Vercel

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/kmstech-next.git
    cd kmstech-next
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_HASHNODE_ENDPOINT=https://gql.hashnode.com
    NEXT_PUBLIC_HASHNODE_HOST=kmstech.hashnode.dev
    ```

4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Testing

We maintain strict test coverage standards.

-   **Run Unit Tests:**
    ```bash
    pnpm test
    ```
-   **Check Coverage:**
    ```bash
    pnpm test --coverage
    ```

## 📂 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (blog)/          # SSR Blog routes
│   │   └── [[...slug]]/     # Client-side Landing Page (catch-all)
│   ├── components/          # Reusable UI components
│   │   ├── blog/            # Blog-specific components
│   │   └── __tests__/       # Component tests
│   └── lib/                 # Utilities & API Clients (Hashnode)
├── public/                  # Static assets
└── ...config files
```

## 🚀 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com).

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the environment variables (`NEXT_PUBLIC_HASHNODE_HOST`, etc.).
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please check the [issues](https://github.com/your-org/kmstech-next/issues) page.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

**KMS Tech** - [kmstech.co](https://kmstech.co)

---
*Built with ❤️ by KMS Tech Engineering Team*
