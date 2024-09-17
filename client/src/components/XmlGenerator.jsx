const XmlGenerator = ({ xmlContent, onGenerateXml, onDownloadXml, loading, error }) => {
  return (
    <div style={styles.container}>
      <button onClick={onGenerateXml} disabled={loading} style={styles.generateButton}>
        {loading ? 'Generating...' : 'Generate XML'}
      </button>
      {xmlContent && (
        <div style={styles.downloadContainer}>
          <button onClick={onDownloadXml} style={styles.downloadButton}>Download XML</button>
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  generateButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  downloadContainer: {
    marginTop: '20px',
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default XmlGenerator;
