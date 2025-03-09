'use client';

import React, { useState, useEffect, use } from 'react';
import { wordsList } from '@/lib/words-data';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Volume2, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { 
  DEFAULT_UK_VOICE, 
  DEFAULT_US_VOICE, 
  generateWordAudio, 
  createAudioFromBlob 
} from '@/lib/elevenlabs';

// Simple in-memory audio cache
const audioCache: Record<string, Blob> = {};

export default function WordPage({ params }: { params: { word: string } }) {
  // Unwrap params using use() hook
  const unwrappedParams = use(params as any) as { word: string };
  const wordParam = unwrappedParams.word;
  
  const [activeTab, setActiveTab] = useState<'collocations' | 'wordFamily' | 'synonyms'>('collocations');
  const [wordData, setWordData] = useState(wordsList.find(w => w.word.toLowerCase() === wordParam.toLowerCase()));
  const [ukAudio, setUkAudio] = useState<HTMLAudioElement | null>(null);
  const [usAudio, setUsAudio] = useState<HTMLAudioElement | null>(null);
  const [isUkLoading, setIsUkLoading] = useState(false);
  const [isUsLoading, setIsUsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState({ uk: 0, us: 0 });

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Preload audio when the component mounts
  useEffect(() => {
    if (wordData) {
      // Preload UK audio
      generateUkAudio(false);
      // Preload US audio with a slight delay to avoid rate limiting
      const timer = setTimeout(() => {
        generateUsAudio(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [wordData]);

  // Function to generate audio for UK pronunciation with caching
  const generateUkAudio = async (shouldPlay = true) => {
    if (!wordData) return;
    
    const cacheKey = `${wordData.word}-uk`;
    setIsUkLoading(true);
    
    try {
      // Check cache first
      if (audioCache[cacheKey]) {
        const audio = createAudioFromBlob(audioCache[cacheKey]);
        setUkAudio(audio);
        if (shouldPlay) {
          audio.play();
        }
        setIsUkLoading(false);
        return;
      }
      
      const audioBlob = await generateWordAudio(wordData.word, DEFAULT_UK_VOICE);
      
      // Cache the audio
      audioCache[cacheKey] = audioBlob;
      
      const audio = createAudioFromBlob(audioBlob);
      setUkAudio(audio);
      if (shouldPlay) {
        audio.play();
      }
      
      // Reset retry count on success
      setRetryCount(prev => ({ ...prev, uk: 0 }));
    } catch (error) {
      console.error('Error generating UK audio:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate UK audio';
      setError(errorMessage);
      
      // Increment retry count
      setRetryCount(prev => ({ ...prev, uk: prev.uk + 1 }));
    } finally {
      setIsUkLoading(false);
    }
  };

  // Function to generate audio for US pronunciation with caching
  const generateUsAudio = async (shouldPlay = true) => {
    if (!wordData) return;
    
    const cacheKey = `${wordData.word}-us`;
    setIsUsLoading(true);
    
    try {
      // Check cache first
      if (audioCache[cacheKey]) {
        const audio = createAudioFromBlob(audioCache[cacheKey]);
        setUsAudio(audio);
        if (shouldPlay) {
          audio.play();
        }
        setIsUsLoading(false);
        return;
      }
      
      const audioBlob = await generateWordAudio(wordData.word, DEFAULT_US_VOICE);
      
      // Cache the audio
      audioCache[cacheKey] = audioBlob;
      
      const audio = createAudioFromBlob(audioBlob);
      setUsAudio(audio);
      if (shouldPlay) {
        audio.play();
      }
      
      // Reset retry count on success
      setRetryCount(prev => ({ ...prev, us: 0 }));
    } catch (error) {
      console.error('Error generating US audio:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate US audio';
      setError(errorMessage);
      
      // Increment retry count
      setRetryCount(prev => ({ ...prev, us: prev.us + 1 }));
    } finally {
      setIsUsLoading(false);
    }
  };

  // Play UK audio
  const playUkAudio = () => {
    if (ukAudio) {
      ukAudio.play().catch(e => {
        console.error('Error playing UK audio:', e);
        setError('Error playing audio. Trying to regenerate...');
        generateUkAudio(true);
      });
    } else {
      generateUkAudio(true);
    }
  };

  // Play US audio
  const playUsAudio = () => {
    if (usAudio) {
      usAudio.play().catch(e => {
        console.error('Error playing US audio:', e);
        setError('Error playing audio. Trying to regenerate...');
        generateUsAudio(true);
      });
    } else {
      generateUsAudio(true);
    }
  };

  if (!wordData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Word Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the word "{wordParam}".</p>
          <Link href="/" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[320px] bg-[#F3E8FF] flex flex-col">
        <div className="p-6">
          <Link href="/">
            <h1 className="text-[#BF9BDE] font-bold text-[36px]">VoCake</h1>
          </Link>
        </div>
        <nav className="flex-1">
          <div className="px-4">
            <Link href="/" className="flex items-center gap-3 p-4 text-gray-700 hover:bg-purple-100 rounded-lg mt-2">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium">Homepage</span>
            </Link>
            
            <Link href="/my-notebook" className="flex items-center gap-3 p-4 text-gray-700 hover:bg-purple-100 rounded-lg mt-2">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium">My Notebook</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[80px] border-b flex items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/" className="text-purple-600 font-medium flex items-center mr-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
            <h1 className="text-xl font-bold">Word Details</h1>
          </div>
          <div className="flex items-center gap-4">
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

        {/* Main Content Area */}
        <main className="flex-1 bg-white p-8 overflow-y-auto relative">
          {/* Error Toast */}
          {error && (
            <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center shadow-md z-50">
              <AlertCircle className="mr-2" size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                {/* Word Header */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-5xl font-bold">{wordData.word}</h1>
                  <span className="uppercase text-[14px] text-[#776108] bg-[#F2D147] rounded-[4px] p-3">
                    {wordData.level.toUpperCase()}
                  </span>
                </div>

                {/* Word Type */}
                <div className="mb-4">
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">{wordData.type}</span>
                </div>

                {/* Pronunciation */}
                <div className="mb-6">
                  <div className="flex gap-2 items-center mb-2">
                    <p className="text-[24px] font-semibold text-[#5E89ED]">UK</p>
                    <button 
                      onClick={playUkAudio} 
                      className="cursor-pointer flex items-center justify-center w-8 h-8"
                      disabled={isUkLoading}
                    >
                      {isUkLoading ? (
                        <Loader2 className="text-[#5E89ED] animate-spin" size={24} />
                      ) : retryCount.uk > 0 ? (
                        <RefreshCw className="text-[#5E89ED]" size={24} />
                      ) : (
                        <Volume2 className="text-[#5E89ED]" size={24} />
                      )}
                    </button>
                    <p className="text-[24px] font-medium text-[#757575]">
                      {wordData.pronunciation.uk}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-[24px] font-semibold text-[#E83080]">US</p>
                    <button 
                      onClick={playUsAudio} 
                      className="cursor-pointer flex items-center justify-center w-8 h-8"
                      disabled={isUsLoading}
                    >
                      {isUsLoading ? (
                        <Loader2 className="text-[#E83080] animate-spin" size={24} />
                      ) : retryCount.us > 0 ? (
                        <RefreshCw className="text-[#E83080]" size={24} />
                      ) : (
                        <Volume2 className="text-[#E83080]" size={24} />
                      )}
                    </button>
                    <p className="text-[24px] font-medium text-[#757575]">
                      {wordData.pronunciation.us}
                    </p>
                  </div>
                </div>

                {/* Definitions */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Definitions</h2>
                  {wordData.definitions.map((def, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-start gap-2">
                        <div className="flex items-center justify-center text-[#757575] h-[24px] w-[24px] border border-[#757575] rounded-[100px] mt-1">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-xl font-bold">{def.meaning}</p>
                          <p className="mt-2 italic text-gray-600">"{def.example}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add to Notebook Button */}
                <button className="flex items-center gap-2 px-4 py-2 border border-[#39A756] rounded-[8px] text-[#39A756] font-semibold mb-8">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="#39A756" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Add to notebook
                </button>
              </div>

              {/* Right Column - Learning Tips */}
              <div className="md:w-[300px] mt-6 md:mt-0 md:ml-8">
                <div className="bg-purple-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Learning Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Practice using "{wordData.word}" in daily conversations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Create your own example sentences.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Learn related words and phrases.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-12 border-b">
              <div className="flex space-x-8">
                <button 
                  className={`pb-4 px-2 font-medium ${activeTab === 'collocations' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('collocations')}
                >
                  Collocations
                </button>
                <button 
                  className={`pb-4 px-2 font-medium ${activeTab === 'wordFamily' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('wordFamily')}
                >
                  Word Family
                </button>
                <button 
                  className={`pb-4 px-2 font-medium ${activeTab === 'synonyms' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('synonyms')}
                >
                  Synonyms
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'collocations' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Common Collocations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wordData.collocations.map((collocation, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-lg">{collocation.phrase}</p>
                        <p className="text-gray-600 mt-1">{collocation.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wordFamily' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Word Family</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wordData.wordFamily.map((familyWord, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-lg">{familyWord.word}</p>
                        <p className="text-gray-600 mt-1">{familyWord.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'synonyms' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Synonyms</h3>
                  <div className="flex flex-wrap gap-3">
                    {wordData.synonyms.map((synonym, index) => (
                      <div key={index} className="bg-gray-50 px-4 py-2 rounded-full">
                        {synonym}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 