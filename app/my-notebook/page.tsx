'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import WalletConnect from '@/components/WalletConnect';

// Type definitions
interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

interface NoteProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

// Component for navigation links in the sidebar
const NavLink: React.FC<NavLinkProps> = ({ href, icon, label, isActive = false }) => (
  <Link 
    href={href} 
    className={`flex items-center gap-3 p-4 rounded-lg mt-2 ${
      isActive 
        ? 'bg-[#D8B4FE]' 
        : 'text-gray-700 hover:bg-purple-100'
    }`}
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="font-medium">{label}</span>
  </Link>
);

// Component for the sidebar
const Sidebar: React.FC = () => (
  <div className="w-[320px] bg-[#F3E8FF] flex flex-col">
    <div className="p-6">
      <h1 className="text-[#BF9BDE] font-bold text-[36px]">VoCake</h1>
    </div>
    <nav className="flex-1">
      <div className="px-4">
        <NavLink 
          href="/" 
          icon={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          } 
          label="Homepage" 
        />
        
        <NavLink 
          href="/my-notebook" 
          isActive={true}
          icon={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          } 
          label="My Notebook" 
        />
      </div>
    </nav>
  </div>
);

// Component for the header
const Header: React.FC = () => (
  <header className="h-[80px] border-b flex items-center justify-between px-6">
    <div className="flex items-center">
      <h1 className="text-2xl font-bold">My Notebook</h1>
    </div>
    <div className="flex items-center gap-4">
      <WalletConnect />
      <button className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.857 17.082C16.7202 16.8614 18.4667 16.0334 19.8992 14.6992C21.3317 13.3649 22.3858 11.6108 22.9281 9.66509C23.4704 7.71936 23.4745 5.6544 22.9399 3.70655C22.4052 1.7587 21.3581 0.000199296 19.93 -1.33907C18.5019 -2.67834 16.7582 -3.51396 14.8955 -3.74233C13.0328 -3.9707 11.1392 -3.58613 9.45545 -2.63391C7.77171 -1.68169 6.37358 -0.204935 5.42545 1.61503C4.47732 3.435 4.02083 5.51884 4.11429 7.61803H3.14286C2.83853 7.61803 2.54211 7.70437 2.28326 7.86832C2.02442 8.03227 1.81283 8.26695 1.67143 8.54517L0.228571 11.3809C0.0804847 11.6749 0.00147479 12.0015 0 12.3323C-0.00147479 12.6631 0.0746553 12.9903 0.219977 13.2856C0.365298 13.5809 0.575549 13.8349 0.832887 14.0254C1.09022 14.2159 1.38663 14.3371 1.7 14.3775L10.9429 15.5466C11.2235 15.5866 11.5089 15.5661 11.7809 15.4865C12.0529 15.4069 12.3054 15.2699 12.5214 15.0845C12.7373 14.8991 12.9119 14.6693 13.0333 14.4107C13.1547 14.1521 13.2204 13.8704 13.2257 13.5845L13.2857 11.3809" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <UserButton />
      </div>
    </div>
  </header>
);

// Component for a single note card
const NoteCard: React.FC<NoteProps> = ({ id, title, content, createdAt, tags }) => {
  const router = useRouter();
  
  return (
    <div 
      className="bg-white p-5 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(`/my-notebook/${id}`)}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-3 line-clamp-3">{content}</p>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-gray-400 text-sm">{createdAt}</span>
      </div>
    </div>
  );
};

// Component for the empty state
const EmptyState: React.FC<{ onCreateNote: () => void }> = ({ onCreateNote }) => (
  <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg shadow-sm p-8">
    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <h3 className="text-xl font-medium text-gray-700 mb-2">No notes yet</h3>
    <p className="text-gray-500 text-center mb-6">Create your first note to get started with your vocabulary journey</p>
    <button 
      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      onClick={onCreateNote}
    >
      Create Note
    </button>
  </div>
);

// Main Page component
export default function NotebookPage() {
  const [notes, setNotes] = useState<NoteProps[]>([
    {
      id: '1',
      title: 'English Phrasal Verbs',
      content: 'A collection of common phrasal verbs: 1. Break down - to stop functioning. 2. Bring up - to raise a topic. 3. Call off - to cancel. 4. Carry on - to continue...',
      createdAt: 'May 15, 2023',
      tags: ['English', 'Phrasal Verbs']
    },
    {
      id: '2',
      title: 'Spanish Vocabulary - Food',
      content: 'Essential food vocabulary in Spanish: el pan (bread), la manzana (apple), el queso (cheese), la leche (milk), el huevo (egg)...',
      createdAt: 'Jun 22, 2023',
      tags: ['Spanish', 'Food']
    },
    {
      id: '3',
      title: 'IELTS Writing Tips',
      content: 'Tips for IELTS Writing Task 2: 1. Understand the question fully before starting. 2. Plan your essay structure. 3. Use a variety of sentence structures...',
      createdAt: 'Aug 10, 2023',
      tags: ['IELTS', 'Writing']
    }
  ]);
  
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');
  
  const handleCreateNote = () => {
    setIsCreatingNote(true);
  };
  
  const handleSaveNote = () => {
    if (newNoteTitle.trim() === '') return;
    
    const newNote: NoteProps = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };
    
    setNotes([newNote, ...notes]);
    setIsCreatingNote(false);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
  };
  
  const handleCancelCreate = () => {
    setIsCreatingNote(false);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 bg-[#E6F7EC] p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Your Notes</h2>
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                onClick={handleCreateNote}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Note
              </button>
            </div>
            
            {isCreatingNote ? (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-bold mb-4">Create New Note</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      placeholder="Enter note title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[150px]"
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      placeholder="Enter note content"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                      value={newNoteTags}
                      onChange={(e) => setNewNoteTags(e.target.value)}
                      placeholder="English, Vocabulary, Grammar"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      onClick={handleCancelCreate}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                      onClick={handleSaveNote}
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            
            {notes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard key={note.id} {...note} />
                ))}
              </div>
            ) : (
              <EmptyState onCreateNote={handleCreateNote} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 