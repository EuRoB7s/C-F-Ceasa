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
        } catch (erro) {
            setMensagem("Erro ao enviar a nota");
            console.error(erro);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>C&F Ceasa</h1>
            <textarea
                placeholder="Digite sua nota"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                style={{ width: "300px", height: "100px" }}
            />
            <br />
            <button onClick={handleEnviar} style={{ marginTop: "10px", padding: "5px 10px" }}>
                Enviar Nota
            </button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}
