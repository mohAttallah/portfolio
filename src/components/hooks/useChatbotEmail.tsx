import { useState } from 'react';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

interface UseChatbotEmailReturn {
  sendChatbotEmail: (data: EmailData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
  response: EmailResponse | null;
  reset: () => void;
}

export const useChatbotEmail = (): UseChatbotEmailReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState<EmailResponse | null>(null);

  const sendChatbotEmail = async (data: EmailData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResponse(null);

    try {
      const res = await fetch('/api/chatbot-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result);

      if (result.success) {
        setSuccess(true);
        return true;
      } else {
        setError(result.message || 'Failed to send email');
        return false;
      }
    } catch (err) {
      const errorMessage = 'Network error. Please check your connection and try again.';
      setError(errorMessage);
      setResponse({ success: false, message: errorMessage });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setResponse(null);
  };

  return {
    sendChatbotEmail,
    loading,
    error,
    success,
    response,
    reset,
  };
};

export default useChatbotEmail;
