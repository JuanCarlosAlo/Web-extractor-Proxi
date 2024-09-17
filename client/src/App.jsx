import { useState } from "react";
import { BodyContentExtractor } from "./components/BodyContentExtractor";
import Login from "./components/Login";
import UrlInput from "./components/UrlInput";
import XmlGenerator from "./components/XmlGenerator";
import { useXmlGenerator } from "./hooks/useXmlGenerator";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const {
    urls,
    xmlContent,
    loading,
    error,
    handleAddUrl,
    handleUrlChange,
    handleGenerateXml,
    downloadXml
  } = useXmlGenerator();
  return (
    <>
      {isAuthenticated ? (
        <> 
      <UrlInput urls={urls} onUrlChange={handleUrlChange} onAddUrl={handleAddUrl} />
      <XmlGenerator 
        xmlContent={xmlContent}
        onGenerateXml={handleGenerateXml}
        onDownloadXml={downloadXml}
        loading={loading}
        error={error}
      />
       <BodyContentExtractor />
        </>
       ):(
         <Login onLogin={handleLogin} />
       )} 

    </>
  );
}

export default App;
