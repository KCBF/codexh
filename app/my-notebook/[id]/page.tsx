'use client';
import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import WalletConnect from '@/components/WalletConnect';

// Type definitions
interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

interface HeaderProps {
  title: string;
}

// Sample data - in a real app, this would come from an API or database
const sampleNotes = [
  {
    id: '1',
    title: 'English Phrasal Verbs',
    content: 'A collection of common phrasal verbs:\n\n1. Break down - to stop functioning.\n2. Bring up - to raise a topic.\n3. Call off - to cancel.\n4. Carry on - to continue.\n5. Come across - to find by chance.\n6. Drop off - to fall asleep or to deliver someone/something.\n7. Figure out - to understand or solve.\n8. Get along - to have a good relationship.\n9. Give up - to surrender or stop trying.\n10. Look after - to take care of.',
    createdAt: 'May 15, 2023',
    tags: ['English', 'Phrasal Verbs']
  },
  {
    id: '2',
    title: 'Spanish Vocabulary - Food',
    content: 'Essential food vocabulary in Spanish:\n\n- el pan (bread)\n- la manzana (apple)\n- el queso (cheese)\n- la leche (milk)\n- el huevo (egg)\n- la carne (meat)\n- el pescado (fish)\n- el arroz (rice)\n- la pasta (pasta)\n- el pollo (chicken)\n- la ensalada (salad)\n- la sopa (soup)\n- el postre (dessert)\n- la fruta (fruit)\n- las verduras (vegetables)',
    createdAt: 'Jun 22, 2023',
    tags: ['Spanish', 'Food']
  },
  {
    id: '3',
    title: 'IELTS Writing Tips',
    content: 'Tips for IELTS Writing Task 2:\n\n1. Understand the question fully before starting.\n2. Plan your essay structure.\n3. Use a variety of sentence structures.\n4. Use appropriate academic vocabulary.\n5. Stay on topic and address all parts of the question.\n6. Use clear paragraphs with topic sentences.\n7. Include specific examples to support your points.\n8. Write a clear introduction and conclusion.\n9. Aim for at least 250 words but focus on quality over quantity.\n10. Leave time to check your work for errors.',
    createdAt: 'Aug 10, 2023',
    tags: ['IELTS', 'Writing']
  }
];

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
const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="h-[80px] border-b flex items-center justify-between px-6">
    <div className="flex items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
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

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  // Find the note with the matching ID
  const note = sampleNotes.find(note => note.id === id);
  
  // If no note is found, show a message
  if (!note) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Note Not Found" />
          <main className="flex-1 bg-[#E6F7EC] p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Note Not Found</h2>
              <p className="text-gray-600 mb-6">The note you're looking for doesn't exist or has been deleted.</p>
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => router.push('/my-notebook')}
              >
                Back to My Notebook
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={note.title} />
        <main className="flex-1 bg-[#E6F7EC] p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <button 
                className="text-purple-600 font-medium flex items-center"
                onClick={() => router.push('/my-notebook')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to My Notebook
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{note.title}</h2>
                  <p className="text-gray-500">{note.createdAt}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="prose max-w-none">
                  {note.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 