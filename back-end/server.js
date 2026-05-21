// Aqui eu chamo o express, q é oq cria o servidor do backend. - Adicionado por Guilherme Bento.
const express = require('express');

// Cors libera o front pra conseguir fazer requisição pro back, não sei muito bem fazer isso mas ok. - Adicionado por Guilherme Bento.
const cors = require('cors');

// Aqui eu importo o banco, o "pronto" e o catálogo q vem do database.js. - Adicionado por Guilherme Bento.
const { db, pronto, catalogoEvonium } = require('./database');

// Criei o app do express, q é onde ficam as rotas da API. - Adicionado por Guilherme Bento.
const app = express();

// Porta padrão é 3000, mas deixei aceitar outra porta se precisar testar. - Adicionado por Guilherme Bento.
const PORT = process.env.PORT || 3000;

// Aqui pego só os nomes dos perfumes do catálogo, pq uso isso pra filtrar a vitrine. - Adicionado por Guilherme Bento.
const nomesDoCatalogo = catalogoEvonium.map(produto => produto.nome);

// Essas configs deixam o backend aceitar JSON e conexão do front. - Adicionado por Guilherme Bento.
app.use(cors());
app.use(express.json());

// Função auxiliar pra rodar comando no banco sem ficar repetindo Promise toda hora. - Adicionado por Guilherme Bento.
function executar(sql, parametros = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, parametros, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Função pra listar várias linhas do banco, ex: todos os produtos. - Adicionado por Guilherme Bento.
function listar(sql, parametros = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, parametros, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Rota q manda os produtos pro front-end, pra aparecer na pág de produtos. - Adicionado por Guilherme Bento.
app.get('/api/produtos', async (req, res) => {
    try {
        // Esses pontos de interrogação são pra passar os nomes com segurança pro SQL. - Adicionado por Guilherme Bento.
        const marcadores = nomesDoCatalogo.map(() => '?').join(', ');

        // Aqui eu junto produto, categoria e estoque numa resposta só, bem mais prático pro front. - Adicionado por Guilherme Bento.
        const produtos = await listar(
            `SELECT
                p.id_produto,
                p.nome,
                p.genero,
                p.tipo,
                p.fragrancia,
                p.volume_ml,
                p.preco,
                c.nome AS categoria,
                e.qtde AS estoque
             FROM tab_produtos p
             JOIN tab_categorias c ON c.id_categoria = p.id_categoria
             JOIN tab_estoque e ON e.id_produto = p.id_produto
             WHERE p.nome IN (${marcadores})
             ORDER BY c.id_categoria, p.id_produto`,
            nomesDoCatalogo
        );

        res.json(produtos);
    } catch (erro) {
        // Se der algum erro na busca, eu mando um erro simples pro front. - Adicionado por Guilherme Bento.
        res.status(500).json({ erro: 'Erro ao buscar produtos.' });
    }
});

// Rota q simula a finalização da compra e salva o pedido no banco. - Adicionado por Guilherme Bento.
app.post('/api/finalizar-compra', async (req, res) => {
    const { id_cliente, id_usuario, id_funcionario = null, itens = [] } = req.body;

    // Se faltar cliente, usuário ou item, nem deixa continuar pq o pedido fica incompleto. - Adicionado por Guilherme Bento.
    if (!id_cliente || !id_usuario || itens.length === 0) {
        return res.status(400).json({ erro: 'Pedido incompleto.' });
    }

    // Total é calculado aqui no back tbm, pra não confiar só no q veio do navegador. - Adicionado por Guilherme Bento.
    const total = itens.reduce((soma, item) => soma + Number(item.preco) * item.qtde, 0);

    try {
        // Inicio a transação pra salvar pedido, itens e estoque tudo junto. - Adicionado por Guilherme Bento.
        await executar('BEGIN TRANSACTION');

        // Primeiro cria o pedido principal. - Adicionado por Guilherme Bento.
        const pedido = await executar(
            `INSERT INTO tab_pedidos (id_cliente, id_usuario, id_funcionario, data, total)
             VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)`,
            [id_cliente, id_usuario, id_funcionario, total]
        );

        // Depois passa por cada produto do carrinho e salva como item do pedido, creio não ser a forma mais segura em caso de alguma queda no servidor, mas infelizmente é o que consigo agora. - Adicionado por Guilherme Bento.
        for (const item of itens) {
            const subtotal = Number(item.preco) * item.qtde;

            await executar(
                `INSERT INTO tab_itens_pedido (id_pedido, id_produto, valor, qtde, subtotal)
                 VALUES (?, ?, ?, ?, ?)`,
                [pedido.lastID, item.id_produto, item.preco, item.qtde, subtotal]
            );

            // Aqui baixa o estoque, mas só se ainda tiver quantidade suficiente. - Adicionado por Guilherme Bento.
            const estoque = await executar(
                `UPDATE tab_estoque
                 SET qtde = qtde - ?
                 WHERE id_produto = ? AND qtde >= ?`,
                [item.qtde, item.id_produto, item.qtde]
            );

            // Se não atualizou nada, é pq não tinha estoque suficiente. - Adicionado por Guilherme Bento.
            if (estoque.changes === 0) {
                throw new Error('Produto sem estoque suficiente.');
            }
        }

        // Se tudo deu certo, confirma a compra no banco. - Adicionado por Guilherme Bento.
        await executar('COMMIT');
        res.json({ success: true, id_pedido: pedido.lastID });
    } catch (erro) {
        // Se deu erro em qualquer parte, teoricamente desfaz a compra pra não ficar dado pela metade. - Adicionado por Guilherme Bento.
        await executar('ROLLBACK').catch(() => {});
        res.status(500).json({ erro: erro.message });
    }
});

// Só ligo o servidor depois q o banco terminou de se preparar. - Adicionado por Guilherme Bento.
pronto.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor Evonium rodando em http://localhost:${PORT}`);
    });
});
