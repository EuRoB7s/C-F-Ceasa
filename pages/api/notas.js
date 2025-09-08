export default function handler(req, res) {
    if (req.method === "POST") {
        const { texto, data } = req.body;

        if (!texto || !data) {
            return res.status(400).json({ erro: "Texto e data são obrigatórios." });
        }

        // Aqui você pode salvar no banco de dados futuramente
        return res.status(200).json({
            mensagem: "Nota recebida com sucesso!",
            nota: { texto, data },
        });
    } else {
        res.status(405).json({ erro: "Método não permitido." });
    }
}
