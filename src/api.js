const API_URL = "/api/notas"; // relativo ao próprio site

export async function enviarNota(nota) {
    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nota),
    });

    if (!resposta.ok) {
        throw new Error("Erro ao enviar a nota");
    }

    return resposta.json();
}
