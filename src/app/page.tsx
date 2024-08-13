/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect, useRef, RefObject } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
}

const topics = [
  { id: 1, title: 'Next.js Basics', slug: 'intro', icon: '🚀' },
  { id: 2, title: 'Creating Your First App', slug: 'create-app', icon: '🛠️' },
  { id: 3, title: 'Navigating Your App', slug: 'pages-nav', icon: '🧭' },
  { id: 4, title: 'Styling Like a Pro', slug: 'styles', icon: '🎨' },
  { id: 5, title: 'Building Blocks: Components', slug: 'components', icon: '🧱' },
  { id: 6, title: 'Getting Data: The Next.js Way', slug: 'data-fetch', icon: '📊' },
  { id: 7, title: 'Dynamic Routes Magic', slug: 'dynamic-routes', icon: '🔮' },
  { id: 8, title: 'Creating Your Own API', slug: 'api-routes', icon: '🌐' },
  { id: 9, title: 'Launching Your App', slug: 'deploy', icon: '🚀' },
];

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative">
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 overflow-x-auto">
      <code className="text-sm font-mono">{children}</code>
    </pre>
    <button
      onClick={() => {
        if (typeof children === 'string') {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(children)
              .then(() => {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              })
              .catch(err => {
                console.error('Failed to copy text: ', err);
              });
          } else {
            console.log('Clipboard API not supported');

          }
        }
      }}
      className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition duration-200"
    >
      Copy
    </button>
  </div>
);

const HighlightedText: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <span className={`font-semibold ${color} px-1 py-0.5 rounded`}>{children}</span>
);

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef: RefObject<HTMLSpanElement> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <span className="relative inline-block" ref={tooltipRef}>
      <span
        className="cursor-help border-b-2 border-dotted"
        onMouseEnter={() => setIsVisible(true)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </span>
      {isVisible && (
        <span className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-black rounded-lg shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
};

const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === correctAnswer) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="bg-indigo-100 p-4 rounded-lg mb-4">
      <h3 className="font-bold mb-2">{question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`w-full text-left p-2 rounded transition duration-200 ${selectedAnswer === option
                ? option === correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-white hover:bg-gray-100'
              }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <p className="mt-2 font-bold">
          {selectedAnswer === correctAnswer ? '🎉 Correct!' : '😅 Oops! Try again!'}
        </p>
      )}
    </div>
  );
};

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
          className={`w-full text-left p-2 rounded transition duration-200 ${selectedTopic === topic.slug
              ? 'bg-indigo-100 text-indigo-600'
              : 'hover:bg-gray-100'
            }`}
          onClick={() => {
            setSelectedTopic(topic.slug);
            if (isMobile) setMenuOpen(false);
          }}
        >
          <span className="mr-2">{topic.icon}</span>
          {topic.title}
        </motion.button>
      ))}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 font-sans">
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Learn Next.js as Beginner</h1>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Desktop Navigation */}
        <nav className="hidden md:block w-64 bg-white p-4 space-y-2 shadow-lg">
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
              className="w-64 bg-white p-4 space-y-2 absolute inset-y-0 left-0 z-10 shadow-lg"
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
            {renderContent(selectedTopic, setSelectedTopic)}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function renderContent(slug: string, setSelectedTopic: (slug: string) => void) {
  const currentTopicIndex = topics.findIndex(topic => topic.slug === slug);
  const prevTopic = topics[currentTopicIndex - 1];
  const nextTopic = topics[currentTopicIndex + 1];
  let content;
  switch (slug) {
    case 'intro':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">What's Next.js?</h2>
          <Image src="/logo.png" width={800} height={100} alt="Next.js Logo" className="mb-4" />
          <p className="mb-4">Imagine you're assembling a high-tech robot 🤖. Next.js is like having a super-advanced toolkit that makes everything easier and more efficient. It's a <Tooltip text="A framework is like a pre-built structure that helps you create things faster and easier.">
            framework
          </Tooltip> for React that transforms your ideas into awesome websites at lightning speed. Here's what makes it so cool:</p>
          <ul className="list-disc pl-6 mb-4 flex flex-col gap-5 ">
            <li><HighlightedText color="bg-indigo-100 text-indigo-800 ">Server-side rendering</HighlightedText> - Your pages load faster than a supercomputer! 💻💨</li>
            <li><HighlightedText color="bg-green-100 text-green-800">Automatic code splitting</HighlightedText> - It's like your app goes through a high-tech optimization process. 🔧</li>
            <li><HighlightedText color="bg-yellow-100 text-yellow-800">Simple page-based routing</HighlightedText> - Navigating your app is as smooth as a well-oiled machine. 🔗</li>
            <li><HighlightedText color="bg-red-100 text-red-800">Built-in CSS support</HighlightedText> - Style your app effortlessly, like a digital fashion designer. 🎨</li>
          </ul>


          <Quiz
            question="What does Next.js help you build?"
            options={["Mobile apps", "Desktop software", "Web applications", "Video games"]}
            correctAnswer="Web applications"
          />
        </>
      );
      break;
    case 'create-app':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Let's Build Your First Next.js App.</h2>
          <p className="mb-4">Ready to create something awesome? Follow these steps to launch your project:</p>
          <ol className="list-decimal pl-6 mb-4 flex flex-col gap-5">
            <li><HighlightedText color="bg-indigo-100 text-indigo-800">Open your terminal</HighlightedText> (it's like your app's command center! 💻)</li>
            <li><HighlightedText color="bg-green-100 text-green-800 ">Run this command to create your app:</HighlightedText>

              <CodeBlock>npx create-next-app my-awesome-nextjs-app</CodeBlock>
            </li>
            <li><HighlightedText color="bg-yellow-100 text-yellow-800">Navigate to your new app's directory:</HighlightedText>
              <CodeBlock>cd my-awesome-nextjs-app</CodeBlock>
            </li>
            <li><HighlightedText color="bg-red-100 text-red-800">Start your development server:</HighlightedText>
              <CodeBlock>npm run dev</CodeBlock>
            </li>
          </ol>
          <p>Awesome! 🎉 Your app is now running at <a href="http://localhost:3000" className="text-indigo-600 hover:underline">http://localhost:3000</a>. You've just created your own little corner of the web.</p>
          <Image src="/commands.png" width={800} height={300} alt="Terminal showing create-next-app command" className="mt-10 rounded-lg shadow-md mb-10" />

          <Quiz
            question="What command do you use to start your Next.js development server?"
            options={["npm start", "npm run dev", "npm build", "npm serve"]}
            correctAnswer="npm run dev"
          />
        </>
      );
      break;
    case 'pages-nav':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Navigating Your App</h2>
          <p className="mb-4">In Next.js, every file in your <code>pages</code> folder is like a different screen on your app's control panel. Let's explore how it works:</p>
          <ul className="list-disc pl-6 mb-4 flex flex-col gap-5">
            <li><HighlightedText color="bg-indigo-100 text-indigo-800">pages/index.js</HighlightedText> - This is your main dashboard (your homepage)!</li>
            <li><HighlightedText color="bg-green-100 text-green-800">pages/about.js</HighlightedText> - Create this file, and voila! You have an "About" screen at <code>/about</code>.</li>
          </ul>
          <p className="mb-4">Want to add quick links between your screens? Use the powerful <Tooltip text="Link is a component in Next.js that allows you to create client-side navigation between pages.">Link</Tooltip> component:</p>
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


          <Quiz
            question="What file would you create for a page at '/contact'?"
            options={["pages/contact.js", "contact.js", "pages/contact/index.js", "contact/page.js"]}
            correctAnswer="pages/contact.js"
          />
        </>
      );
      break;

    case 'styles':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Styling Like a Pro</h2>
          <p className="mb-4">Next.js comes with a built-in style system! It's called CSS Modules, and it's like having a personal UI designer for each component. Here's how to use it:</p>
          <ol className="list-decimal pl-6 mb-4 flex flex-col gap-5">
            <li>Create a file named <HighlightedText color="bg-indigo-100 text-indigo-800">Home.module.css</HighlightedText> in your <code>styles</code> folder.</li>
            <li>Add some sleek styles:
              <CodeBlock>
                {`.title {
    color: #ff6b6b;
    font-size: 24px;
  }`}
              </CodeBlock>
            </li>
            <li>Use your styles in your component:
              <CodeBlock>
                {`import styles from '../styles/Home.module.css'
  
  export default function Home() {
    return <h1 className={styles.title}>Welcome to My Awesome App!</h1>
  }`}
              </CodeBlock>
            </li>
          </ol>


          <Quiz
            question="What's the benefit of using CSS Modules?"
            options={["Global styles", "Scoped styles", "No CSS needed", "Automatic animations"]}
            correctAnswer="Scoped styles"
          />
        </>
      );
      break;
    case 'components':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Building Blocks</h2>
          <p className="mb-4">Components in React are like advanced, reusable building blocks. You can create them once and use them everywhere! Let's build a simple one:</p>
          <CodeBlock>
            {`// components/Greeting.js
  export default function Greeting({ name }) {
    return <h1>Hello, {name}! Welcome to our awesome app!</h1>
  }
  
  // pages/index.js
  import Greeting from '../components/Greeting'
  
  export default function Home() {
    return (
      <div>
        <Greeting name="User" />
        <p>Get ready for an amazing digital experience!</p>
      </div>
    )
  }`}
          </CodeBlock>
          <p className="mb-4">Now you have a reusable <Tooltip text="A component is a reusable piece of UI in React.">component</Tooltip> that greets visitors to your app. You can use it on any page you want. 🖥️👋</p>

          <Quiz
            question="What's the main benefit of using components?"
            options={["They make the code longer", "They allow code reuse", "They slow down the app", "They require more CPU"]}
            correctAnswer="They allow code reuse"
          />
        </>
      );
      break;

    case 'data-fetch':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Getting Data: Fetching Information from 🌐</h2>
          <p className="mb-4">Next.js has powerful tools for fetching data. One of the most useful is <Tooltip text="getServerSideProps is a function that runs on the server for every request, allowing you to fetch data and pass it as props to your page.">getServerSideProps</Tooltip>. Here's how to use it:</p>
          <CodeBlock>
            {`// pages/users.js
  export async function getServerSideProps() {
    const res = await fetch('https://api.example.com/users')
    const users = await res.json()
    return { props: { users } }
  }
  
  export default function Users({ users }) {
    return (
      <div>
        <h1>Registered Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    )
  }`}
          </CodeBlock>
          <p className="mb-4">This function fetches a list of users from an API and displays them in your app. The best part? It happens on the server, so it's super fast. ⚡🖥️</p>

          <Quiz
            question="Where does getServerSideProps run?"
            options={["In the browser", "On the server", "In a database", "In the cloud"]}
            correctAnswer="On the server"
          />
        </>
      );
      break;
    case 'dynamic-routes':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Dynamic Routes</h2>
          <p className="mb-4">Dynamic routes in Next.js are like smart pathways that can lead to many destinations. Here's how to create one:</p>
          <ol className="list-decimal pl-6 mb-4 flex flex-col gap-2">
            <li>Create a file named <HighlightedText color="bg-indigo-100 text-indigo-800">[id].js</HighlightedText> in your <code>pages/users</code> folder.</li>
            <li>Add this code to your file:
              <CodeBlock>
                {`import { useRouter } from 'next/router'
  
  export default function User() {
    const router = useRouter()
    const { id } = router.query
  
    return <p>You're viewing the profile of user #{id}</p>
  }`}
              </CodeBlock>
            </li>
          </ol>
          <p className="mb-4">Now, when someone visits <code>/users/1</code> or <code>/users/john</code>, they'll see a custom page for that user. It's like each user has their own dynamically generated page. 👤🔧</p>

          <Quiz
            question="What does [id] in the filename represent?"
            options={["A literal bracket", "A variable part of the URL", "An HTML tag", "A React component"]}
            correctAnswer="A variable part of the URL"
          />
        </>
      );
      break;

    case 'api-routes':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Creating Your Own API</h2>
          <p className="mb-4">Next.js lets you create your own API right in your app! Here's how:</p>
          <ol className="list-decimal pl-6 mb-4 flex flex-col gap-2">
            <li>Create a file named <HighlightedText color="bg-indigo-100 text-indigo-800">hello.js</HighlightedText> in your <code>pages/api</code> folder.</li>
            <li>Add this code to your file:
              <CodeBlock>
                {`export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe', role: 'Developer' })
  }`}
              </CodeBlock>
            </li>
          </ol>
          <p className="mb-4">Now, when someone visits <code>/api/hello</code>, they'll receive a JSON response. You can use this to create backend functionality without leaving your Next.js ecosystem. 🌐🔧</p>

          <Quiz
            question="What type of response does an API route typically send?"
            options={["HTML", "CSS", "JSON", "Plain text"]}
            correctAnswer="JSON"
          />
        </>
      );
      break;

    case 'deploy':
      content = (
        <>
          <h2 className="text-3xl font-bold mb-4">Launching Your App</h2>
          <p className="mb-4">You've built an amazing app, now let's show it to everyone! Here's how to deploy with <Tooltip text="Vercel is a cloud platform for static sites and serverless functions, created by the makers of Next.js.">Vercel</Tooltip>:</p>
          <ol className="list-decimal pl-6 mb-4 flex flex-col gap-2">
            <li><HighlightedText color="bg-indigo-100 text-indigo-800">Sign up</HighlightedText> for a free account at <a href="https://vercel.com" className="text-indigo-600 hover:underline">vercel.com</a></li>
            <li><HighlightedText color="bg-green-100 text-green-800">Install the Vercel CLI</HighlightedText> (Command Line Interface):
              <CodeBlock>npm i -g vercel</CodeBlock>
            </li>
            <li><HighlightedText color="bg-yellow-100 text-yellow-800">Run the deployment command</HighlightedText> in your project directory:
              <CodeBlock>vercel</CodeBlock>
            </li>
          </ol>

          <Quiz
            question="What's a benefit of using Vercel for deployment?"
            options={["It's expensive", "It's slow", "It's optimized for Next.js", "It only works on Windows"]}
            correctAnswer="It's optimized for Next.js" />
        </>
      );

      break;

    default:
      content = <p>Select a topic from the menu and let's start this exciting coding journey! 🚀</p>;
  }
  return (
    <>
      {content}
      <div className="mt-8 flex justify-between">
        {prevTopic && (
          <button
            onClick={() => setSelectedTopic(prevTopic.slug)}
            className="bg-indigo-500 text-white px-2 py-1 text-[0.7rem] rounded hover:bg-indigo-600 transition duration-200"
          >
            ← {prevTopic.title}
          </button>
        )}
        {nextTopic && (
          <button
            onClick={() => setSelectedTopic(nextTopic.slug)}
            className="bg-indigo-500 text-white px-2 py-1 text-[0.7rem] rounded hover:bg-indigo-600 transition duration-200"
          >
            {nextTopic.title} →
          </button>
        )}
      </div>
    </>
  );
}
