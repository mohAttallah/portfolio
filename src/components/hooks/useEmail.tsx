'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($name: String!, $email: String!, $message: String!) {
    sendMessage(name: $name, email: $email, message: $message) {
      success
      message
    }
  }
`;

interface SendEmailArgs {
  name: string;
  email: string;
  message: string;
}

interface SendEmailResponse {
  success: boolean;
  message: string;
}

interface UseEmailReturn {
  sendEmail: (args: SendEmailArgs) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  response: SendEmailResponse | null;
  reset: () => void;
}

export const useEmail = (): UseEmailReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState<SendEmailResponse | null>(null);

  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);

  const sendEmail = async ({ name, email, message }: SendEmailArgs) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setResponse(null);

      const result = await sendMessageMutation({
        variables: { name, email, message }
      });

      const data = result.data?.sendMessage;
      
      if (data) {
        setResponse(data);
        setSuccess(data.success);
        
        if (!data.success && data.message) {
          setError(data.message);
        }
      }
    } catch (err) {
      console.error('Email sending error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send email');
      setSuccess(false);
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
    sendEmail,
    loading,
    error,
    success,
    response,
    reset
  };
};
