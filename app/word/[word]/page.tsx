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
            <Link href="/" className="flex items-center gap-3 p-4 hover:bg-purple-100 rounded-lg">
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
            
            <Link href="/explore" className="flex items-center gap-3 p-4 text-gray-700 hover:bg-purple-100 rounded-lg mt-2">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17H14.337M12 3V5M18.121 5.879L16.707 7.293M21 12H19M18.121 18.121L16.707 16.707M5.879 18.121L7.293 16.707M4 12H6M5.879 5.879L7.293 7.293M8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium">Explore</span>
            </Link>
            
            <Link href="/setting" className="flex items-center gap-3 p-4 text-gray-700 hover:bg-purple-100 rounded-lg mt-2">
              <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium">Setting</span>
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