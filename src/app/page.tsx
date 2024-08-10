'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const topics = [
  { id: 1, title: 'What is Next.js?', slug: 'intro' },
  { id: 2, title: 'Creating a Next.js App', slug: 'create-app' },
  { id: 3, title: 'Pages and Navigation', slug: 'pages-nav' },
  { id: 4, title: 'Adding Styles', slug: 'styles' },
  { id: 5, title: 'Creating Components', slug: 'components' },
  { id: 6, title: 'Fetching Data', slug: 'data-fetch' },
  { id: 7, title: 'Dynamic Routes', slug: 'dynamic-routes' },
  { id: 8, title: 'API Routes', slug: 'api-routes' },
  { id: 9, title: 'Deploying Your App', slug: 'deploy' },
];

const CodeBlock = ({ children }) => (
  <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
    <code className="text-sm font-mono">{children}</code>
  </pre>
);

const HighlightedText = ({ color, children }) => (
  <span className={`font-semibold ${color}`}>{children}</span>
);

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const NavContent = () => (
    <>
      {topics.map(topic => (
        <motion.button
          key={topic.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full text-left p-2 rounded transition duration-200 ${
            selectedTopic === topic.slug 
              ? 'bg-indigo-100 text-indigo-600' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => {
            setSelectedTopic(topic.slug);
            if (isMobile) setMenuOpen(false);
          }}
        >
          {topic.title}
        </motion.button>
      ))}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Next.js for Beginners</h1>
        <button 
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Desktop Navigation */}
        <nav className="hidden md:block w-64 bg-white p-4 space-y-2">
          <NavContent />
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-64 bg-white p-4 space-y-2 absolute inset-y-0 left-0 z-10"
            >
              <NavContent />
            </motion.nav>
          )}
        </AnimatePresence>

        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={selectedTopic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6"
          >
            {renderContent(selectedTopic)}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function renderContent(slug) {
  switch(slug) {
    case 'intro':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">What is Next.js?</h2>
          <Image src="/logo.png" width={200} height={100} alt="Next.js Logo" className="mb-4" />
          <p className="mb-4">Next.js is a React framework that makes it easy to build fast websites. It offers:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><HighlightedText color="text-indigo-600">Server-side rendering</HighlightedText></li>
            <li><HighlightedText color="text-green-600">Automatic code splitting</HighlightedText></li>
            <li><HighlightedText color="text-yellow-600">Simple page-based routing</HighlightedText></li>
            <li><HighlightedText color="text-red-600">Built-in CSS support</HighlightedText></li>
          </ul>
          <p>Next.js simplifies the process of building React applications, making it a great choice for beginners and experienced developers alike.</p>
        </>
      );
    case 'create-app':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Creating a Next.js App</h2>
          <p className="mb-4">To create a new Next.js app, follow these steps:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li><HighlightedText color="text-indigo-600">Open your terminal</HighlightedText></li>
            <li><HighlightedText color="text-green-600">Run this command:</HighlightedText>
              <CodeBlock>npx create-next-app my-first-nextjs-app</CodeBlock>
            </li>
            <li><HighlightedText color="text-yellow-600">Navigate to your new app:</HighlightedText>
              <CodeBlock>cd my-first-nextjs-app</CodeBlock>
            </li>
            <li><HighlightedText color="text-red-600">Start the development server:</HighlightedText>
              <CodeBlock>npm run dev</CodeBlock>
            </li>
          </ol>
          <p>Your app is now running at <a href="http://localhost:3000" className="text-indigo-600 hover:underline">http://localhost:3000</a>!</p>
          <Image src="/commands.png" width={500} height={300} alt="Terminal showing create-next-app command" className="mt-4" />
        </>
      );
    case 'pages-nav':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Pages and Navigation</h2>
          <p className="mb-4">In Next.js, each file in the `pages` directory becomes a route automatically:</p>
          <CodeBlock>
{`// pages/index.js -> '/'
export default function Home() {
  return <h1>Welcome to Next.js!</h1>
}

// pages/about.js -> '/about'
export default function About() {
  return <h1>About Us</h1>
}`}
          </CodeBlock>
          <p className="mb-4">To link between pages, use the Link component:</p>
          <CodeBlock>
{`import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  )
}`}
          </CodeBlock>
          <Image src="/structres.png" width={300} height={200} alt="Next.js pages structure" className="mt-4" />
        </>
      );
    case 'styles':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Adding Styles</h2>
          <p className="mb-4">Next.js supports CSS Modules out of the box. Here's how to use them:</p>
          <CodeBlock>
{`// styles/Home.module.css
.title {
  color: blue;
  font-size: 24px;
}

// pages/index.js
import styles from '../styles/Home.module.css'

export default function Home() {
  return <h1 className={styles.title}>Welcome to Next.js!</h1>
}`}
          </CodeBlock>
          <p>This approach keeps your styles scoped to specific components.</p>
          <Image src="/styling.jpg" width={400} height={200} alt="CSS Modules example" className="mt-4" />
        </>
      );
    case 'components':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Creating Components</h2>
          <p className="mb-4">React components are reusable pieces of UI. Here's a simple component in Next.js:</p>
          <CodeBlock>
{`// components/Header.js
export default function Header({ title }) {
  return <h1>{title}</h1>
}

// pages/index.js
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Header title="Welcome to My App" />
      <p>This is the home page</p>
    </div>
  )
}`}
          </CodeBlock>
          <p>Components help you break down your UI into manageable, reusable parts.</p>
          <Image src="/reacttree.png" width={400} height={300} alt="React component tree" className="mt-4" />
        </>
      );
    case 'data-fetch':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Fetching Data</h2>
          <p className="mb-4">Next.js provides several ways to fetch data. Here's an example using getServerSideProps:</p>
          <CodeBlock>
{`// pages/users.js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/users')
  const users = await res.json()
  return { props: { users } }
}

export default function Users({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`}
          </CodeBlock>
          <p>This function runs on every request, fetching fresh data each time the page loads.</p>
          <Image src="/fetching.png" width={500} height={300} alt="Data fetching flow in Next.js" className="mt-4" />
        </>
      );
    case 'dynamic-routes':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Dynamic Routes</h2>
          <p className="mb-4">Dynamic routes allow you to create pages with paths that depend on external data. Here's how to create them:</p>
          <CodeBlock>
{`// pages/posts/[id].js
import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return <p>Post: {id}</p>
}`}
          </CodeBlock>
          <p>This creates a route like /posts/1, /posts/2, etc. The [id] becomes a parameter you can access.</p>
          <Image src="/dynamicroute.png" width={400} height={250} alt="Dynamic routes in Next.js" className="mt-4" />
        </>
      );
    case 'api-routes':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">API Routes</h2>
          <p className="mb-4">Next.js allows you to create API endpoints as Node.js serverless functions. Here's a simple example:</p>
          <CodeBlock>
{`// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}`}
          </CodeBlock>
          <p>This creates an API route at /api/hello. You can now fetch from this API in your frontend code or use it as a standalone API endpoint.</p>
          <Image src="/apipage.png" width={400} height={250} alt="API routes in Next.js" className="mt-4" />
        </>
      );
    case 'deploy':
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Deploying Your App</h2>
          <p className="mb-4">To deploy your Next.js app, you can use Vercel (created by the makers of Next.js) for the easiest experience:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li><HighlightedText color="text-indigo-600">Sign up for a free account at <a href="https://vercel.com" className="text-indigo-600 hover:underline">vercel.com</a></HighlightedText></li>
            <li><HighlightedText color="text-green-600">Install the Vercel CLI:</HighlightedText>
              <CodeBlock>npm i -g vercel</CodeBlock>
            </li>
            <li><HighlightedText color="text-yellow-600">Run the following command in your project directory:</HighlightedText>
              <CodeBlock>vercel</CodeBlock>
            </li>
          </ol>
          <p>Follow the prompts, and your app will be deployed!</p>
          <Image src="/vercelpage.webp" width={500} height={300} alt="Vercel deployment process" className="mt-4" />
        </>
      );
    default:
      return <p>Please select a topic to start learning.</p>;
  }
}