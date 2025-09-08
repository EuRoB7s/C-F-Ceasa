import React, { useState } from "react";
import { enviarNota } from "./api";

export default function App() {
    const [texto, setTexto] = useState("");

    const handleEnviar = async () => {
        try {
            const resposta = await enviarNota({ texto, data: new Date() });
            alert("Nota enviada: " + JSON.stringify(resposta.nota));
            setTexto("");
        } catch (erro) {
            alert("Erro ao enviar nota: " + erro.message);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>C&F Ceasa - Notas</h1>
            <input 
                type="text" 
                value={texto} 
                onChange={(e) => setTexto(e.target.value)} 
                placeholder="Digite a nota" 
                style={{ width: "300px", marginRight: "10px" }}
            />
            <button onClick={handleEnviar}>Enviar</button>
        </div>
    );
}
