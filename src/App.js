import React, { useState } from "react";
import { enviarNota } from "./src/api";

export default function App() {
  const [texto, setTexto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleEnviar = async () => {
    if (!texto) {
      setMensagem("Digite algum texto antes de enviar!");
      return;
    }

    try {
      const resposta = await enviarNota({
        texto,
        data: new Date().toISOString(),
      });
      setMensagem(resposta.mensagem);
      setTexto(""); // limpa o campo
    } catch (erro) {
      console.error("Erro ao enviar nota:", erro);
      setMensagem("Falha ao enviar a nota.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>C&F Ceasa - Enviar Notas</h1>
      <textarea
        placeholder="Digite sua nota aqui..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={{ width: "100%", height: "150px", marginBottom: "1rem" }}
      />
      <button
        onClick={handleEnviar}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Enviar Nota
      </button>
      {mensagem && (
        <p style={{ marginTop: "1rem", color: "#333", fontWeight: "bold" }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}
