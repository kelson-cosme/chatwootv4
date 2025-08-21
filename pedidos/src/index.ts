import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = 5000;

// Configura o servidor para usar a pasta 'public' para servir arquivos estáticos (nosso index.html)
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- BANCO DE DADOS SIMULADO (continua igual) ---
interface Pedido {
    id: string;
    data: string;
    valor: string;
    status: 'Entregue' | 'Enviado' | 'Pagamento Pendente';
}

const DADOS_DE_PEDIDOS: Record<string, Pedido[]> = {
    "1": [
        { id: "PED-001", data: "2024-07-20", valor: "R$ 150,00", status: "Entregue" },
        { id: "PED-008", data: "2024-08-10", valor: "R$ 89,90", status: "Enviado" },
    ],
    "10": [
        { id: "PED-003", data: "2024-08-01", valor: "R$ 450,00", status: "Pagamento Pendente" },
    ],
    "12": [],
    "2": [ // O ID do seu contato de teste
        { id: "PED-XYZ-01", data: "2025-08-19", valor: "R$ 55,70", status: "Entregue" },
        { id: "PED-ABC-02", data: "2025-08-20", valor: "R$ 199,00", status: "Enviado" }
    ]
};
// ----------------------------------------------------

// ROTA 1: O endpoint principal que serve a nossa página HTML
app.get('/painel-pedidos', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ROTA 2: A nossa nova API que retorna os dados dos pedidos em JSON
app.get('/api/pedidos/:contactId', (req: Request, res: Response) => {
    const { contactId } = req.params; // Pegamos o ID dos parâmetros da rota
    
    console.log(`📦 API foi chamada para buscar pedidos do contactId: ${contactId}`);
    
    const pedidosDoCliente = DADOS_DE_PEDIDOS[contactId];

    // Retornamos os dados em formato JSON
    res.json({ pedidos: pedidosDoCliente });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor (versão API) rodando em http://localhost:${PORT}`);
});