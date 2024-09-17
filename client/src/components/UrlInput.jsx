const UrlInput = ({ urls, onUrlChange, onAddUrl }) => {
  return (
    <div style={styles.container}>
      {urls.map((url, index) => (
        <div key={index} style={styles.urlInputContainer}>
          <input
            type="text"
            value={url}
            onChange={(event) => onUrlChange(index, event)}
            placeholder="Enter URL"
            style={styles.input}
          />
          {index === urls.length - 1 && (
            <button onClick={onAddUrl} style={styles.addButton}>
              Add Another URL
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  urlInputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UrlInput;
