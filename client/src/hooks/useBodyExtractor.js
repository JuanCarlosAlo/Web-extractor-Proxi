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
      const response = await axios.post(
        'https://web-extractor-proxi-production.up.railway.app/extract',
        { url },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
      setBodyContent(response.data);
    } catch (err) {
      setError('Error connecting to the server');
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
