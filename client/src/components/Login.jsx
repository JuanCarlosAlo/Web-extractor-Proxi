import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Usuario y contraseña predefinidos
    const validUsername = 'admin';
    const validPassword = 'password123';

    // Verificar credenciales
    if (username === validUsername && password === validPassword) {
      onLogin(); // Autenticación exitosa
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    },
    form: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      width: '300px',
    },
    inputContainer: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginBottom: '1rem',
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
