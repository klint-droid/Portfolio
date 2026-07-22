import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaGraduationCap,
  FaLaptopCode,
  FaRedo,
  FaTrophy,
  FaQuestionCircle
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";

const courseParts = [
  {
    id: 1,
    title: "Part 1: Understand the Tools",
    subtitle: "React, Node.js, npm, and Vite",
    category: "Fundamentals",
    content: (
      <div className="space-y-4">
        <p>
          React is a JavaScript library for creating user interfaces from reusable pieces called <strong>components</strong>.
          A component may represent a button, navigation bar, form, product card, page, or an entire application.
        </p>

        <div className="p-4 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] space-y-2">
          <h4 className="font-bold text-sm">Key Roles:</h4>
          <ul className="list-disc pl-5 text-xs space-y-1 opacity-90">
            <li><strong>HTML:</strong> Defines page structure.</li>
            <li><strong>CSS:</strong> Controls appearance & layout.</li>
            <li><strong>JavaScript:</strong> Controls data & dynamic behavior.</li>
            <li><strong>React:</strong> Organizes UI components and keeps them synced with data.</li>
            <li><strong>Node.js:</strong> Runs JavaScript outside the browser for tooling.</li>
            <li><strong>Vite:</strong> Provides the fast dev server and production build system.</li>
          </ul>
        </div>

        <p className="text-xs opacity-80">Essential npm commands you will use daily:</p>
        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`npm install          # Install dependencies
npm run dev          # Start local dev server (http://localhost:5173)
npm run build        # Build optimized production bundle`}
        </pre>
      </div>
    ),
    quiz: {
      question: "What is the primary role of Vite in modern React development?",
      options: [
        "It replaces HTML and CSS completely",
        "It provides the dev server and production build system",
        "It acts as a backend SQL database",
        "It automatically deploys apps to cloud servers"
      ],
      correctIndex: 1,
      explanation: "Vite provides an extremely fast local development server and uses Rollup under the hood to build optimized production files."
    }
  },
  {
    id: 2,
    title: "Part 2: Node.js Setup & Project Scaffolding",
    subtitle: "Installing Node & Scaffolding with Vite",
    category: "Environment Setup",
    content: (
      <div className="space-y-4">
        <p>
          Before creating a React app, verify Node.js (v20.19+ or v22.12+ LTS recommended) and npm are installed in your terminal:
        </p>

        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`node --version   # Verify Node.js
npm --version    # Verify npm`}
        </pre>

        <h4 className="font-bold text-sm pt-2">Scaffold a New React App</h4>
        <p className="text-xs opacity-90">Run Vite's current project scaffolding command:</p>
        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`npm create vite@latest react-course -- --template react
cd react-course
npm install
npm run dev`}
        </pre>
      </div>
    ),
    quiz: {
      question: "Which command scaffolds a new React application using Vite?",
      options: [
        "npm start react",
        "npm create vite@latest my-app -- --template react",
        "npx create-react-app my-app",
        "node init react"
      ],
      correctIndex: 1,
      explanation: "npm create vite@latest creates a new Vite project with the official React template."
    }
  },
  {
    id: 3,
    title: "Part 3: Essential JavaScript for React",
    subtitle: "Arrow Functions, Destructuring & Spread Syntax",
    category: "JS Prerequisites",
    content: (
      <div className="space-y-4">
        <p>
          React relies heavily on modern JavaScript features. Become comfortable with these essential concepts:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)]">
            <strong className="block mb-1">1. Variables & Arrow Functions:</strong>
            <code>{"const greet = (name) => `Hello, ${name}`;"}</code>
          </div>

          <div className="p-3 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)]">
            <strong className="block mb-1">2. Destructuring:</strong>
            <code>{"const { name, age } = user; // Object"}</code><br/>
            <code>{"const [count, setCount] = useState(0); // Array"}</code>
          </div>

          <div className="p-3 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)]">
            <strong className="block mb-1">3. Immutable Spread Syntax:</strong>
            <code>{"const newTasks = [...oldTasks, 'Practice'];"}</code><br/>
            <code>{"const updatedUser = { ...user, active: true };"}</code>
          </div>
        </div>
      </div>
    ),
    quiz: {
      question: "Why is array destructuring `const [state, setState] = useState(0)` used in React?",
      options: [
        "To modify the state array directly",
        "To cleanly extract the state value and its updater function",
        "To convert state variables into CSS styles",
        "To export global variables across components"
      ],
      correctIndex: 1,
      explanation: "`useState` returns a 2-element array [currentValue, updaterFunction]. Destructuring assigns custom variable names to both elements."
    }
  },
  {
    id: 4,
    title: "Part 4: Components & JSX Rules",
    subtitle: "Creating Functional Components & JSX Syntax",
    category: "Core Concepts",
    content: (
      <div className="space-y-4">
        <p>
          JSX looks like HTML inside JavaScript. A React component is a JavaScript function that returns JSX.
        </p>

        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`function Header() {
  const courseTitle = "React Guided Learning Path";
  return (
    <header className="header-card">
      <h1>{courseTitle}</h1>
      <p>Welcome to component-based architecture.</p>
    </header>
  );
}

export default Header;`}
        </pre>

        <div className="p-4 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)] space-y-1 text-xs">
          <strong className="block font-bold mb-1">JSX Rules to Remember:</strong>
          <div>1. Component names MUST start with a Capital letter (e.g. <code>Header</code>, not <code>header</code>).</div>
          <div>2. Return a single root element (or use Fragment <code>&lt;&gt;...&lt;/&gt;</code>).</div>
          <div>3. Close all tags explicitly (e.g. <code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code>).</div>
          <div>4. Use <code>className</code> instead of <code>class</code>.</div>
        </div>
      </div>
    ),
    quiz: {
      question: "What is a mandatory naming rule for React components?",
      options: [
        "Component function names must start with a capital letter",
        "Component filenames must end with .html",
        "Component names must be written in lowercase",
        "Components must return a string instead of JSX"
      ],
      correctIndex: 0,
      explanation: "Capitalized names distinguish React custom components from regular HTML elements (like <div> or <h1>)."
    }
  },
  {
    id: 5,
    title: "Part 5: Props & Data Flow",
    subtitle: "Passing Data from Parent to Child",
    category: "Core Concepts",
    content: (
      <div className="space-y-4">
        <p>
          Props (short for properties) allow a parent component to pass read-only information down to a child component.
        </p>

        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`// Child Component
function CourseCard({ title, description, level }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Level: {level}</span>
    </article>
  );
}

// Parent Usage in App.jsx
<CourseCard 
  title="React Components" 
  description="Learn component architecture" 
  level="Beginner" 
/>`}
        </pre>
        <p className="text-xs opacity-80">
          <strong>Important:</strong> Props are read-only snapshot values. A child component must never attempt to mutate its props directly.
        </p>
      </div>
    ),
    quiz: {
      question: "How does data flow when using props in React?",
      options: [
        "Unidirectionally from parent component to child component",
        "Upward from child component to parent component",
        "Bi-directionally between all components automatically",
        "Randomly depending on CSS selectors"
      ],
      correctIndex: 0,
      explanation: "React relies on top-down (unidirectional) data flow where props pass from parent components to child components."
    }
  },
  {
    id: 6,
    title: "Part 6: Conditional Rendering & Lists",
    subtitle: "Ternaries, Logical &&, and Rendering Arrays with .map()",
    category: "UI Patterns",
    content: (
      <div className="space-y-4">
        <p>
          Use standard JavaScript <code>.map()</code> to render lists of items. Every list item needs a unique, stable <code>key</code>.
        </p>

        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`function LessonList({ lessons }) {
  return (
    <ul>
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          {lesson.title} — {lesson.completed ? '✓ Done' : 'Pending'}
        </li>
      ))}
    </ul>
  );
}`}
        </pre>
      </div>
    ),
    quiz: {
      question: "Why does React require a unique `key` prop when mapping arrays to JSX?",
      options: [
        "To apply custom CSS animations",
        "To help React identify and update specific DOM elements efficiently between re-renders",
        "To encrypt list items in local storage",
        "To sort items alphabetically"
      ],
      correctIndex: 1,
      explanation: "Unique keys allow React to track which items changed, were added, or were removed without re-rendering the entire list."
    }
  },
  {
    id: 7,
    title: "Part 7: Events & State Management (`useState`)",
    subtitle: "Responding to User Actions & Re-rendering UI",
    category: "Interactive State",
    content: (
      <div className="space-y-4">
        <p>
          State is information a component remembers between renders. When state changes via its setter function, React re-renders the component with the new data.
        </p>

        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount(prev => prev + 1);
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
}`}
        </pre>
      </div>
    ),
    quiz: {
      question: "Why should you use `setCount(prev => prev + 1)` instead of direct assignment `count = count + 1`?",
      options: [
        "Direct assignment does not trigger React to re-render the UI",
        "Direct assignment throws an instant web browser error",
        "Setter functions are only needed in TypeScript",
        "Direct assignment erases the component from the DOM"
      ],
      correctIndex: 0,
      explanation: "React state must be updated via setter functions so React knows to schedule a re-render and reflect changes on screen."
    }
  },
  {
    id: 8,
    title: "Part 8: Controlled Forms & Lifting State Up",
    subtitle: "Binding Inputs to State & Sharing State with Parents",
    category: "Interactive State",
    content: (
      <div className="space-y-4">
        <p>
          A <strong>controlled input</strong> derives its displayed value from React state and updates state via <code>onChange</code>.
        </p>

        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim());
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="New Task" 
      />
      <button type="submit">Add Task</button>
    </form>
  );
}`}
        </pre>
      </div>
    ),
    quiz: {
      question: "What does 'Lifting State Up' mean in React?",
      options: [
        "Moving state to a common parent component so multiple children can access and share it",
        "Storing state variables in global CSS files",
        "Moving state to a database server",
        "Deleting state when the page reloads"
      ],
      correctIndex: 0,
      explanation: "When sibling components need access to the same state, move (lift) the state to their closest shared parent component."
    }
  },
  {
    id: 9,
    title: "Part 9: Effects (`useEffect`) & REST API Data Fetching",
    subtitle: "Synchronizing with External Systems & Cleanup",
    category: "Side Effects",
    content: (
      <div className="space-y-4">
        <p>
          <code>useEffect</code> lets you synchronize a component with external systems, such as network APIs, timers, or browser LocalStorage.
        </p>

        <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto">
{`useEffect(() => {
  const controller = new AbortController();

  async function loadUsers() {
    try {
      const res = await fetch('/api/users', { signal: controller.signal });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    }
  }

  loadUsers();
  return () => controller.abort(); // Cleanup on unmount
}, []); // Empty [] means run once on mount`}
        </pre>
      </div>
    ),
    quiz: {
      question: "What happens when you pass an empty array `[]` as the dependency array in `useEffect`?",
      options: [
        "The effect runs after every single render",
        "The effect runs only once after the component mounts",
        "The effect never runs at all",
        "The effect runs whenever any state in the component changes"
      ],
      correctIndex: 1,
      explanation: "An empty dependency array `[]` tells React to execute the effect callback only once when the component first appears (mounts)."
    }
  },
  {
    id: 10,
    title: "Part 10: Router, Vitest Testing & Deployment",
    subtitle: "React Router, Vitest Unit Tests & `npm run build`",
    category: "Production Ready",
    content: (
      <div className="space-y-4">
        <p>
          Complete your application with client-side routing, automated testing with Vitest, and production build generation:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)]">
            <strong className="block mb-1">1. React Router:</strong>
            <code>{"<Link to=\"/tasks\">Tasks</Link>"}</code> navigation prevents full browser reloads.
          </div>
          <div className="p-3 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)]">
            <strong className="block mb-1">2. Vitest Testing:</strong>
            Run unit tests with <code>vitest</code> to verify business logic functions.
          </div>
          <div className="p-3 bg-[var(--bg-color)] rounded-xl border border-[var(--border-color)]">
            <strong className="block mb-1">3. Production Build:</strong>
            <code>npm run build</code> generates minified static files inside <code>dist/</code> directory.
          </div>
        </div>
      </div>
    ),
    quiz: {
      question: "Where does Vite place optimized production build output files?",
      options: [
        "Inside the `dist/` directory",
        "Inside the `src/` directory",
        "Inside `node_modules/`",
        "Directly in the browser's download folder"
      ],
      correctIndex: 0,
      explanation: "Running `npm run build` compiles, minifies, and bundles your application into the static `dist/` folder ready for hosting."
    }
  }
];

const ReactCoursePage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});
  const [score, setScore] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex]);

  const currentPart = courseParts[currentStepIndex];
  const totalParts = courseParts.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalParts) * 100);

  const handleSelectOption = (optionIndex) => {
    if (quizSubmitted[currentPart.id]) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentPart.id]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    const selectedOption = selectedAnswers[currentPart.id];
    if (selectedOption === undefined) return;

    const isCorrect = selectedOption === currentPart.quiz.correctIndex;
    setQuizSubmitted({
      ...quizSubmitted,
      [currentPart.id]: true
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextStep = () => {
    setCompletedSteps(new Set([...completedSteps, currentPart.id]));
    if (currentStepIndex < totalParts - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestartCourse = () => {
    setCurrentStepIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted({});
    setScore(0);
    setCompletedSteps(new Set());
    setIsFinished(false);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl hover:border-blue-500 transition-colors text-sm font-medium"
        >
          <FaArrowLeft className="text-xs" /> Portfolio Home
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1.5">
            <FaGraduationCap className="text-sm" /> Interactive React Path
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Score: {score} / {totalParts}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 p-4 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span>Part {currentStepIndex + 1} of {totalParts}: {currentPart.title}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="w-full bg-[var(--bg-color)] h-2 rounded-full overflow-hidden border border-[var(--border-color)]">
          <div
            className="bg-blue-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Selector Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {courseParts.map((part, index) => (
            <button
              key={part.id}
              onClick={() => setCurrentStepIndex(index)}
              className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                index === currentStepIndex
                  ? "bg-blue-500 text-white shadow-sm"
                  : completedSteps.has(part.id)
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-[var(--bg-color)] opacity-70 hover:opacity-100 border border-[var(--border-color)]"
              }`}
            >
              Part {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Completion View */}
      {isFinished ? (
        <div className="card rounded-3xl p-8 md:p-12 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center border border-amber-500/20 shadow-inner">
            <FaTrophy className="text-4xl animate-bounce" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-2">Congratulations! Course Completed</h2>
            <p className="text-sm opacity-80 max-w-lg mx-auto">
              You have completed all 10 parts of the <strong>React Guided Learning Path</strong>. You are ready to build & deploy modern React applications!
            </p>
          </div>

          <div className="p-5 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)] inline-block min-w-[240px]">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-500">Your Knowledge Score</span>
            <div className="text-4xl font-extrabold mt-1 text-emerald-500">
              {score} <span className="text-base text-[var(--text-secondary)] font-normal">/ {totalParts}</span>
            </div>
            <p className="text-xs opacity-75 mt-1">
              {score === totalParts ? "Perfect Score! 100% Mastery 🎉" : "Great job completing the course!"}
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleRestartCourse}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm shadow-md"
            >
              <FaRedo /> Restart Course
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[var(--bg-color)] border border-[var(--border-color)] hover:border-blue-500 transition-colors text-sm"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      ) : (
        /* Part View */
        <div className="card rounded-3xl p-6 md:p-10 space-y-8">
          {/* Part Header */}
          <div className="border-b border-[var(--border-color)] pb-4">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
              {currentPart.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1">
              {currentPart.title}
            </h1>
            <p className="text-xs opacity-75 mt-1">{currentPart.subtitle}</p>
          </div>

          {/* Part Lesson Content */}
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
            {currentPart.content}
          </div>

          {/* Interactive Quiz Section */}
          <div className="mt-8 p-6 bg-[var(--bg-color)] rounded-2xl border border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
              <FaQuestionCircle className="text-lg" />
              <span>Interactive Knowledge Check</span>
            </div>

            <p className="text-sm font-semibold">{currentPart.quiz.question}</p>

            {/* Quiz Options */}
            <div className="space-y-2">
              {currentPart.quiz.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentPart.id] === idx;
                const isSubmitted = quizSubmitted[currentPart.id];
                const isCorrect = idx === currentPart.quiz.correctIndex;

                let optionStyle = "border-[var(--border-color)] hover:border-blue-500 bg-[var(--card-bg)]";

                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300 font-bold";
                  }
                } else if (isSelected) {
                  optionStyle = "border-blue-500 bg-blue-500/10 font-bold";
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isSubmitted && isCorrect && <FaCheckCircle className="text-emerald-500 text-sm shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <FaTimesCircle className="text-red-500 text-sm shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Quiz Actions & Explanation */}
            {!quizSubmitted[currentPart.id] ? (
              <button
                disabled={selectedAnswers[currentPart.id] === undefined}
                onClick={handleSubmitQuiz}
                className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Submit Answer
              </button>
            ) : (
              <div className="p-3 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] text-xs space-y-1 mt-3">
                <div className="font-bold flex items-center gap-1.5">
                  {selectedAnswers[currentPart.id] === currentPart.quiz.correctIndex ? (
                    <span className="text-emerald-500 flex items-center gap-1"><FaCheckCircle /> Correct Answer!</span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1"><FaTimesCircle /> Incorrect</span>
                  )}
                </div>
                <p className="opacity-80 leading-relaxed">{currentPart.quiz.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
            <button
              disabled={currentStepIndex === 0}
              onClick={handlePrevStep}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] disabled:opacity-40 hover:border-blue-500 text-xs font-bold transition-all"
            >
              <FaArrowLeft /> Previous Part
            </button>

            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md"
            >
              {currentStepIndex === totalParts - 1 ? "Finish Course 🎉" : "Next Part"} <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactCoursePage;
