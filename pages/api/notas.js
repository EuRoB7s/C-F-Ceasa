export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { texto, data } = req.body;

            if (!texto || !data) {
                return res.status(400).json({ erro: "Texto e data são obrigatórios." });
            }

            return res.status(200).json({
                mensagem: "Nota recebida com sucesso!",
                nota: { texto, data },
            });
        } catch (err) {
            return res.status(500).json({ erro: "Falha interna", detalhes: err.message });
        }
    } else {
        res.status(405).json({ erro: "Método não permitido" });
    }
}
