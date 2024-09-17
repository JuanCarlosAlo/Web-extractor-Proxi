// client/src/hooks/useBodyExtractor.js
import { useState } from 'react';
import axios from 'axios';

export function useHtmlExtractor() {
  const [bodyContent, setBodyContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractBodyContent = async (url) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/extract', { url });
      setBodyContent(response.data);
    } catch (err) {
      setError('Error extracting body content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    bodyContent,
    loading,
    error,
    extractBodyContent,
  };
}
