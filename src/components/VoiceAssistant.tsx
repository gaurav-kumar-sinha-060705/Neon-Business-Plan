import { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id': string;
        'avatar-image-url'?: string;
        'avatar-orb-color-1'?: string;
        'avatar-orb-color-2'?: string;
        'action-text'?: string;
        'start-call-text'?: string;
        'end-call-text'?: string;
        'expand-text'?: string;
        'listening-text'?: string;
        'speaking-text'?: string;
        'variant'?: string;
        'dynamic-variables'?: string;
        'override-language'?: string;
        'override-prompt'?: string;
        'override-first-message'?: string;
        'override-voice-id'?: string;
        [key: string]: any;
      };
    }
  }
}

const VoiceAssistant = () => {
  useEffect(() => {
    // Load ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      console.log('ElevenLabs ConvAI script loaded successfully');
    };
    
    script.onerror = (error) => {
      console.error('Failed to load ElevenLabs ConvAI script:', error);
    };
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <elevenlabs-convai
        agent-id="agent_7201k38m3xzfea1v3vytxpaa8y7t"
        action-text="Chat with NEON Concierge"
        expand-text="Open chat"
        start-call-text="Start voice chat"
        end-call-text="End"
        listening-text="Listening..."
        speaking-text="Speaking..."
        avatar-orb-color-1="#F2C24B"
        avatar-orb-color-2="#FFB84D"
      />
    </div>
  );
};

export default VoiceAssistant;