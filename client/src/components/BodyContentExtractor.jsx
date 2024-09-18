import React, { useState } from 'react';
import { useHtmlExtractor } from '../hooks/useBodyExtractor';

export function BodyContentExtractor() {
  const [url, setUrl] = useState('');
  const { bodyContent, loading, error, extractBodyContent } = useHtmlExtractor();

  const handleExtract = () => {
    extractBodyContent(url);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Extract Body Content</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter the URL"
          style={styles.input}
        />
        <button onClick={handleExtract} disabled={loading} style={styles.button}>
          {loading ? 'Extracting...' : 'Extract Content'}
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      {bodyContent && (
        <div style={styles.contentContainer}>
          <h3 style={styles.subHeading}>Extracted Content:</h3>
          <div style={styles.content}>{bodyContent}</div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color:'#222',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  contentContainer: {
    marginTop: '20px',
    backgroundColor:'#222',
    padding: '10px',
    borderRadius: '4px',
  },
  subHeading: {
    marginBottom: '10px',
    color:'#fff',
  },
  content: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    color:'#fff',
    
  },
};
