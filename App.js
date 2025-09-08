import React, { useState } from "react";
import { enviarNota } from "./src/api";

export default function App() {
    const [texto, setTexto] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleEnviar = async () => {
        try {
            const resposta = await enviarNota({ texto, data: new Date() });
            setMensagem(resposta.mensagem);
            setTexto("");
        } catch (erro) {
            console.error("Falha ao enviar:", erro);
            setMensagem("Erro ao enviar nota");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>C&F Ceasa - Notas</h1>
            <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua nota..."
                rows={4}
                cols={50}
            />
            <br />
            <button onClick={handleEnviar}>Enviar Nota</button>
            <p>{mensagem}</p>
        </div>
    );
}
