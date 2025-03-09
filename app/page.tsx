'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { wordsList } from '@/lib/words-data';
import { useRouter } from 'next/navigation';
import WalletConnect from '@/components/WalletConnect';

// Type definitions
interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

interface SearchResultsProps {
  searchTerm: string;
  searchResults: typeof wordsList;
  handleWordClick: (word: string) => void;
  setShowResults: (show: boolean) => void;
}

interface PopularWordsProps {
  wordsList: typeof wordsList;
  handleWordClick: (word: string) => void;
}

interface HomeContentProps extends SearchFormProps {
  handleWordClick: (word: string) => void;
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
          isActive={true}
          icon={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          } 
          label="Homepage" 
        />
        
        <NavLink 
          href="/my-notebook" 
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

// Component for the header search form
const HeaderSearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, handleSearch }) => (
  <form onSubmit={handleSearch}>
    <input 
      type="text" 
      placeholder="Enter your search term..." 
      className="w-full h-[40px] pl-4 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button 
      type="submit"
      className="absolute right-3 top-1/2 transform -translate-y-1/2"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </form>
);

// Component for the header
const Header: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, handleSearch }) => (
  <header className="h-[80px] border-b flex items-center justify-between px-6">
    <div className="relative w-full max-w-[600px]">
      <HeaderSearchForm 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch} 
      />
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

// Component for the search results
const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, searchResults, handleWordClick, setShowResults }) => (
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Search Results for "{searchTerm}"</h2>
    
    {searchResults.length > 0 ? (
      <div className="bg-white rounded-lg shadow-md p-6">
        <ul className="divide-y">
          {searchResults.map((word) => (
            <li 
              key={word.id} 
              className="py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handleWordClick(word.word)}
            >
              <div className="flex items-start">
                <div>
                  <h3 className="text-xl font-bold">{word.word}</h3>
                  <p className="text-gray-500 text-sm">{word.type} • {word.pronunciation.uk}</p>
                  <p className="mt-1">{word.definitions[0].meaning}</p>
                </div>
                <span className="ml-auto text-purple-600 font-medium">View</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No results found for "{searchTerm}"</p>
      </div>
    )}
    
    <button 
      className="mt-6 text-purple-600 font-medium flex items-center"
      onClick={() => setShowResults(false)}
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to Home
    </button>
  </div>
);

// Component for the home page search form
const HomeSearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, handleSearch }) => (
  <form onSubmit={handleSearch} className="flex items-center">
    <div className="relative flex-1 max-w-md">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <input 
        type="text" 
        placeholder="Search Vocabulary" 
        className="w-full h-[50px] pl-12 pr-4 rounded-l-full border-0 focus:outline-none focus:ring-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <button 
      type="submit"
      className="h-[50px] px-6 bg-[#FF7A2F] text-white font-medium rounded-r-full"
    >
      English - Vietnamese
    </button>
  </form>
);

// Component for the popular words section
const PopularWords: React.FC<PopularWordsProps> = ({ wordsList, handleWordClick }) => (
  <div className="mt-16">
    <h2 className="text-2xl font-bold mb-6">Popular Words</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wordsList.slice(0, 6).map((word) => (
        <div 
          key={word.id} 
          className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleWordClick(word.word)}
        >
          <h3 className="text-xl font-bold">{word.word}</h3>
          <p className="text-gray-500 text-sm">{word.type} • {word.level}</p>
          <p className="mt-2 text-gray-700 line-clamp-2">{word.definitions[0].meaning}</p>
        </div>
      ))}
    </div>
  </div>
);

// Component for the home page content
const HomeContent: React.FC<HomeContentProps> = ({ searchTerm, setSearchTerm, handleSearch, handleWordClick }) => (
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between">
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">VOCAKE LEARNING</h1>
        <p className="text-2xl text-gray-700 mb-8">Find new words and master their meanings with ease</p>
        
        <HomeSearchForm 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch} 
        />
      </div>
      
      <div className="hidden md:block">
        <Image 
          src="/asset/Group 48095851.png" 
          alt="Learning illustration" 
          width={400} 
          height={300}
          className="object-contain"
        />
      </div>
    </div>

    <PopularWords wordsList={wordsList} handleWordClick={handleWordClick} />
  </div>
);

// Main Page component
export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof wordsList>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = wordsList.filter(word => 
      word.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(true);
  };

  const handleWordClick = (word: string) => {
    router.push(`/word/${word}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch} 
        />

        {/* Main Content Area */}
        <main className="flex-1 bg-[#E6F7EC] p-8 overflow-y-auto">
          {showResults ? (
            <SearchResults 
              searchTerm={searchTerm}
              searchResults={searchResults}
              handleWordClick={handleWordClick}
              setShowResults={setShowResults}
            />
          ) : (
            <HomeContent 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              handleWordClick={handleWordClick}
            />
          )}
        </main>
      </div>
    </div>
  );
}

