'use client';

import { useState, useCallback } from 'react';

type TTSVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

interface UseTTSOptions {
  defaultVoice?: TTSVoice;
}

interface UseTTSReturn {
  isLoading: boolean;
  error: string | null;
  generateSpeech: (text: string, voice?: TTSVoice) => Promise<string>;
  playAudio: (text: string, voice?: TTSVoice) => Promise<void>;
}

export function useTTS({ defaultVoice = 'nova' }: UseTTSOptions = {}): UseTTSReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});

  const generateSpeech = useCallback(
    async (text: string, voice: TTSVoice = defaultVoice): Promise<string> => {
      // Create a cache key based on text and voice
      const cacheKey = `${text}-${voice}`;
      
      // Return cached audio URL if available
      if (audioCache[cacheKey]) {
        return audioCache[cacheKey];
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, voice }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate speech');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Cache the audio URL
        setAudioCache(prev => ({ ...prev, [cacheKey]: audioUrl }));
        
        return audioUrl;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [defaultVoice, audioCache]
  );

  const playAudio = useCallback(
    async (text: string, voice: TTSVoice = defaultVoice): Promise<void> => {
      try {
        const audioUrl = await generateSpeech(text, voice);
        const audio = new Audio(audioUrl);
        await audio.play();
      } catch (err) {
        console.error('Error playing audio:', err);
      }
    },
    [generateSpeech, defaultVoice]
  );

  return {
    isLoading,
    error,
    generateSpeech,
    playAudio,
  };
} 