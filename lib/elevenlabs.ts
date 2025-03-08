/**
 * ElevenLabs voice utility functions and constants
 */

// Voice IDs for different accents
export const ELEVENLABS_VOICES = {
  // British voices
  UK: {
    MALE: {
      ADAM: 'pNInz6obpgDQGcFmaJgB', // Adam - British male
      HARRY: 'SOYHLrjzK2X1ezoPC6cr', // Harry - British male
    },
    FEMALE: {
      EMILY: 'LcfcDJNUP1GQjkzn1xUU', // Emily - British female
      BELLA: 'EXAVITQu4vr4xnSDxMaL', // Bella - British female
    }
  },
  // American voices
  US: {
    MALE: {
      JOSH: 'TxGEqnHWrfWFTfGW9XjX', // Josh - American male
      ARNOLD: 'VR6AewLTigWG4xSOukaG', // Arnold - American male
    },
    FEMALE: {
      RACHEL: '21m00Tcm4TlvDq8ikWAM', // Rachel - American female
      DOMI: '2EiwWnXFnvU5JabPnv8n', // Domi - American female
    }
  }
};

// Default voices for each accent
export const DEFAULT_UK_VOICE = ELEVENLABS_VOICES.UK.MALE.ADAM;
export const DEFAULT_US_VOICE = ELEVENLABS_VOICES.US.FEMALE.RACHEL;

/**
 * Generate audio for a word using ElevenLabs API
 * @param word The word to generate audio for
 * @param voiceId The ElevenLabs voice ID to use
 * @returns Promise with audio blob
 */
export async function generateWordAudio(word: string, voiceId: string): Promise<Blob> {
  try {
    const response = await fetch('/api/elevenlabs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: word,
        voice_id: voiceId,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', errorText);
        throw new Error(`Failed to generate audio: ${response.status}`);
      }
    }

    return await response.blob();
  } catch (error) {
    console.error('Error in generateWordAudio:', error);
    throw error;
  }
}

/**
 * Create an audio element from a blob
 * @param audioBlob The audio blob
 * @returns HTMLAudioElement
 */
export function createAudioFromBlob(audioBlob: Blob): HTMLAudioElement {
  const audioUrl = URL.createObjectURL(audioBlob);
  return new Audio(audioUrl);
} 