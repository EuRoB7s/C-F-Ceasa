import React, { useState } from "react";
import { enviarNota } from "./api";

export default function App() {
    const [texto, setTexto] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleEnviar = async () => {
        try {
            const resposta = await enviarNota({ texto, data: new Date() });
            setMensagem(resposta.mensagem);
            setTexto("");
        } catch (err) {
            setMensagem("Erro ao enviar nota");
            console.error(err);
        }
    };

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>C&F Ceasa</h1>
            <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua nota..."
                rows={5}
                cols={50}
            />
            <br />
            <button onClick={handleEnviar} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
                Enviar Nota
            </button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}
