import Link from 'next/link';

interface SidebarProps {
  setSelectedTopic: (slug: string) => void;
}

const topics = [
  { id: 1, title: 'Introduction', slug: 'introduction' },
  { id: 2, title: 'Basic Syntax', slug: 'basic-syntax' },
  { id: 3, title: 'Variables', slug: 'variables' },
  { id: 4, title: 'Data Types', slug: 'data-types' },
  { id: 5, title: 'Operators', slug: 'operators' },
  { id: 6, title: 'Control Structures', slug: 'control-structures' },
  { id: 7, title: 'Functions', slug: 'functions' },
  { id: 8, title: 'Objects', slug: 'objects' },
  { id: 9, title: 'Arrays', slug: 'arrays' },
  { id: 10, title: 'Loops', slug: 'loops' },
  { id: 11, title: 'Scope', slug: 'scope' },
  { id: 12, title: 'DOM Manipulation', slug: 'dom-manipulation' },
  // Add more topics as needed
];

export default function Sidebar({ setSelectedTopic }: SidebarProps) {
  return (
    <div className="w-full md:w-1/4 bg-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Topics</h2>
      <ul className="grid grid-cols-3 lg:grid-cols-1 gap-4">
        {topics.map(topic => (
          <li key={topic.id} className="mb-2">
            <div
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setSelectedTopic(topic.slug)}
            >
              {topic.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}