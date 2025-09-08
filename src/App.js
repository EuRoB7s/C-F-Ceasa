import React, { useState } from "react";
import "./App.css";

function App() {
  const [numeroEnvio, setNumeroEnvio] = useState("");
  const [data, setData] = useState("");
  const [arquivo, setArquivo] = useState(null);

  const [numeroBusca, setNumeroBusca] = useState("");
  const [mensagem, setMensagem] = useState("");

  const backendURL = "http://localhost:3001"; // URL do backend

  const handleUpload = (e) => {
    if (e.target.files.length > 0) setArquivo(e.target.files[0]);
  };

  // Enviar nota
  const enviarNota = async () => {
    if (!numeroEnvio || !data || !arquivo) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    const formData = new FormData();
    formData.append("numero", numeroEnvio);
    formData.append("data", data);
    formData.append("arquivo", arquivo);

    try {
      const res = await fetch(`${backendURL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMensagem("Nota enviada com sucesso!");
        setNumeroEnvio("");
        setData("");
        setArquivo(null);
      } else {
        setMensagem("Erro ao enviar nota!");
      }
    } catch {
      setMensagem("Erro ao enviar nota!");
    }
  };

// Buscar nota
const buscarNota = async () => {
  if (!numeroBusca) {
    setMensagem("Informe o número da nota.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3001/nota/${numeroBusca}`);
    if (!res.ok) {
      setMensagem("Nota não encontrada.");
      return;
    }

    const nota = await res.json(); // captura todo o objeto
    setMensagem("");

    // Abre o PDF corretamente no backend
    if (nota.arquivo_url) {
      window.open(`http://localhost:3001${nota.arquivo_url}`, "_blank");
    } else {
      setMensagem("Arquivo da nota não encontrado.");
    }
  } catch {
    setMensagem("Erro ao buscar nota.");
  }
};


  return (
    <div className="app-container">
      <h1>C&F Ceasa - Sistema de Notas</h1>

      <h3>Enviar Nota</h3>
      <input
        type="text"
        placeholder="Número da Nota"
        value={numeroEnvio}
        onChange={(e) => setNumeroEnvio(e.target.value)}
      />
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      <input type="file" accept="application/pdf" onChange={handleUpload} />
      <button onClick={enviarNota}>Enviar Nota</button>

      <h3>Buscar Nota</h3>
      <input
        type="text"
        placeholder="Número da Nota"
        value={numeroBusca}
        onChange={(e) => setNumeroBusca(e.target.value)}
      />
      <button onClick={buscarNota}>Buscar Nota</button>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default App;
