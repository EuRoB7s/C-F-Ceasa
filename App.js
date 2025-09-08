import React, { useState } from "react";
import { enviarNota } from "./src/api";

export default function App() {
    const [texto, setTexto] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleEnviar = async () => {
        try {
            const data = new Date().toISOString();
            const resposta = await enviarNota({ texto, data });
            setMensagem(resposta.mensagem);
            setTexto("");
        } catch (erro) {
            setMensagem("Erro ao enviar nota!");
            console.error(erro);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>C&F Ceasa - Enviar Nota</h1>
            <textarea
                rows="4"
                cols="50"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua nota aqui..."
            ></textarea>
            <br />
            <button onClick={handleEnviar} style={{ marginTop: "10px", padding: "10px 20px" }}>
                Enviar Nota
            </button>
            {mensagem && <p style={{ marginTop: "10px" }}>{mensagem}</p>}
        </div>
    );
}
