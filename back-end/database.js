// Aqui eu puxo o sqlite3, q é a lib q faz o node conversar com o banco local .db. - Adicionado por Guilherme Bento.
const sqlite3 = require('sqlite3').verbose();

// Esse é o arquivo do banco, o lugar onde vai ficar salvo as tabelas e os dados. - Adicionado por Guilherme Bento.
const db = new sqlite3.Database('./evonium.db');

// Fiz essa função pra rodar INSERT, UPDATE, DELETE e essas coisas, pq usando Promise fica mais facil de entender no async/await. - Adicionado por Guilherme Bento.
function executar(sql, parametros = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, parametros, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Essa aqui busca só 1 registro no banco, ex: 1 cliente ou 1 categoria. - Adicionado por Guilherme Bento.
function buscar(sql, parametros = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, parametros, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

// Essa lista vários registros, ex: todos os produtos da vitrine. - Adicionado por Guilherme Bento.
function listar(sql, parametros = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, parametros, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Aqui deixei todas as tabelas do banco juntas, pra ficar mais fácil de ver a modelagem nova. - Adicionado por Guilherme Bento.
const tabelas = [
    // Tabela dos usuários, q guarda login, email, senha e nível de acesso. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        telefone TEXT NOT NULL,
        nivel INTEGER NOT NULL
    )`,

    // Tabela dos funcionários, cada funcionário fica ligado com 1 usuário. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_funcionarios (
        id_funcionario INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        rg TEXT NOT NULL UNIQUE,
        telefone TEXT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES tab_usuarios(id_usuario)
    )`,

    // Tabela dos clientes, tbm ligada com usuário pq o cliente teoricamente poderia logar no sistema (não consegui fazer o login pela falta de tempo). - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_clientes (
        id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        fone TEXT NOT NULL,
        dtnasc TEXT NOT NULL,
        sexo TEXT NOT NULL,
        status INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (id_usuario) REFERENCES tab_usuarios(id_usuario)
    )`,

    // Endereços ficam separados pq 1 cliente pode ter mais de 1 endereço. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_enderecos (
        id_endereco INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cliente INTEGER NOT NULL,
        rua TEXT NOT NULL,
        numero TEXT NOT NULL,
        bairro TEXT NOT NULL,
        cidade TEXT NOT NULL,
        estado TEXT NOT NULL,
        cep TEXT NOT NULL,
        FOREIGN KEY (id_cliente) REFERENCES tab_clientes(id_cliente)
    )`,

    // Categorias servem pra separar as linhas, ex: feminina, masculina e unissex. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_categorias (
        id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE
    )`,

    // Produtos é onde ficam os perfumes em si, com preço, fragrância, volume e categoria. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_produtos (
        id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
        id_categoria INTEGER NOT NULL,
        nome TEXT NOT NULL,
        genero TEXT NOT NULL,
        tipo TEXT NOT NULL,
        fragrancia TEXT NOT NULL,
        volume_ml INTEGER NOT NULL,
        preco REAL NOT NULL,
        data_validade TEXT NOT NULL,
        data_cadastro TEXT NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY (id_categoria) REFERENCES tab_categorias(id_categoria)
    )`,

    // Estoque fica separado pq cada produto tem sua quantidade disponível. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_estoque (
        id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produto INTEGER NOT NULL UNIQUE,
        qtde INTEGER NOT NULL,
        FOREIGN KEY (id_produto) REFERENCES tab_produtos(id_produto)
    )`,

    // Pedidos guardam quem comprou, quem atendeu se tiver funcionário e o total. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_pedidos (
        id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cliente INTEGER NOT NULL,
        id_usuario INTEGER NOT NULL,
        id_funcionario INTEGER,
        data TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        total REAL NOT NULL,
        FOREIGN KEY (id_cliente) REFERENCES tab_clientes(id_cliente),
        FOREIGN KEY (id_usuario) REFERENCES tab_usuarios(id_usuario),
        FOREIGN KEY (id_funcionario) REFERENCES tab_funcionarios(id_funcionario)
    )`,

    // Itens do pedido é a ligação entre pedido e produto, pq 1 pedido pode ter vários perfumes. - Adicionado por Guilherme Bento.
    `CREATE TABLE IF NOT EXISTS tab_itens_pedido (
        id_item INTEGER PRIMARY KEY AUTOINCREMENT,
        id_pedido INTEGER NOT NULL,
        id_produto INTEGER NOT NULL,
        valor REAL NOT NULL,
        qtde INTEGER NOT NULL,
        subtotal REAL NOT NULL,
        FOREIGN KEY (id_pedido) REFERENCES tab_pedidos(id_pedido),
        FOREIGN KEY (id_produto) REFERENCES tab_produtos(id_produto)
    )`
];

// Catálogo oficial q eu cadastrei no banco pra aparecer na pág de produtos. - Adicionado por Guilherme Bento.
const catalogoEvonium = [
    {
        nome: 'EVONIUM YARUMI GOLD (Edition Lorena)',
        categoria: 'Linha Feminina',
        genero: 'Feminino',
        fragrancia: 'Floral Verde Gourmand',
        preco: 299.99
    },
    {
        nome: 'EVONIUM AYSÚRA ABSOLU (Edition Erika)',
        categoria: 'Linha Feminina',
        genero: 'Feminino',
        fragrancia: 'Oriental Floral Ambarado',
        preco: 299.99
    },
    {
        nome: 'EVONIUM IRYAPÁ ELIXIR (Edition Fabrizia)',
        categoria: 'Linha Feminina',
        genero: 'Feminino',
        fragrancia: 'Floral Frutado Ambarado',
        preco: 299.99
    },
    {
        nome: 'EVONIUM APÒÉNÀ PREMIUM (Edition Vanny)',
        categoria: 'Linha Feminina',
        genero: 'Feminino',
        fragrancia: 'Floral Amadeirado Solar',
        preco: 299.99
    },
    {
        nome: 'EVONIUM ITAPUÃRA WOOD (Edition Priscilla Cunha)',
        categoria: 'Linha Feminina',
        genero: 'Feminino',
        fragrancia: 'Amadeirado Floral Ambarado',
        preco: 689.99
    },
    {
        nome: 'EVONIUM V&G Edition',
        categoria: 'Linha Unissex',
        genero: 'Unissex',
        fragrancia: 'Amadeirado Ambarado Aromático',
        preco: 429.99
    },
    {
        nome: 'EVONIUM YUSÉ PREMIUM (Edition José Wirysllan)',
        categoria: 'Linha Masculina',
        genero: 'Masculino',
        fragrancia: 'Amadeirado Branco Aromático',
        preco: 389.99
    },
    {
        nome: 'EVONIUM LÛKARA GOLD (Edition Luca)',
        categoria: 'Linha Masculina',
        genero: 'Masculino',
        fragrancia: 'Aquático Amadeirado Aromático',
        preco: 389.99
    },
    {
        nome: 'EVONIUM GÛSTAV ESSENCE (Edition Gustavo)',
        categoria: 'Linha Masculina',
        genero: 'Masculino',
        fragrancia: 'Amadeirado Aquático Aromático',
        preco: 389.99
    },
    {
        nome: 'EVONIUM GÛYRÉM INTENSE (Edition Guilherme)',
        categoria: 'Linha Masculina',
        genero: 'Masculino',
        fragrancia: 'Amadeirado Especiado Ambarado',
        preco: 389.99
    },
    {
        nome: 'EVONIUM GÛYRABÉ NOIR (Edition Gabriel)',
        categoria: 'Linha Masculina',
        genero: 'Masculino',
        fragrancia: 'Amadeirado Intenso Ambarado',
        preco: 459.99
    },
    {
        nome: 'EVONIUM JAGUARUNA ÉBANO MASIERO',
        categoria: 'Linha Masculina',
        genero: 'Masculino',
        fragrancia: 'Amadeirado Oriental Intenso',
        preco: 389.99
    },
    {
        nome: 'EVONIUM ÁGUÀRÁ (Edition Carlos Eduardo)',
        categoria: 'Linha Masculina',
        genero: 'Masculino',
        fragrancia: 'Amadeirado Aromático Âmbar',
        preco: 389.99
    }
];

// Essa função vê se uma coluna já existe antes de tentar criar, pq se criar repetido da erro. - Adicionado por Guilherme Bento.
async function adicionarColunaSeFaltar(tabela, coluna, definicao) {
    const colunas = await listar(`PRAGMA table_info(${tabela})`);
    const existe = colunas.some(item => item.name === coluna);

    if (!existe) {
        await executar(`ALTER TABLE ${tabela} ADD COLUMN ${coluna} ${definicao}`);
    }
}

// Aqui eu preparo as tabelas e deixo o banco pronto pra nova modelagem. - Adicionado por Guilherme Bento.
async function prepararTabelas() {
    await executar('PRAGMA foreign_keys = ON');

    // Esse for passa por todas as tabelas e cria só se ainda não existir. - Adicionado por Guilherme Bento.
    for (const tabela of tabelas) {
        await executar(tabela);
    }

    // Esses ajustes são pra banco antigo do projeto não quebrar, sem precisar apagar o .db toda hora. - Adicionado por Guilherme Bento.
    await adicionarColunaSeFaltar('tab_clientes', 'id_usuario', 'INTEGER');
    await adicionarColunaSeFaltar('tab_clientes', 'status', 'INTEGER NOT NULL DEFAULT 1');
    await adicionarColunaSeFaltar('tab_pedidos', 'id_funcionario', 'INTEGER');
}

// Criei um usuário e cliente teste pq o carrinho usa id 1 na compra simulada. - Adicionado por Guilherme Bento.
async function criarUsuarioTeste() {
    await executar(
        `INSERT OR IGNORE INTO tab_usuarios (id_usuario, login, email, senha, telefone, nivel)
         VALUES (1, 'admin', 'admin@evonium.com', '123', '11999999999', 1)`
    );

    const colunasCliente = await listar('PRAGMA table_info(tab_clientes)');
    const temAtivoAntigo = colunasCliente.some(coluna => coluna.name === 'ativo');
    const cliente = await buscar('SELECT id_cliente FROM tab_clientes WHERE id_cliente = 1');

    // Se o cliente teste já existe, eu só atualizo ele pra ficar no formato novo, sim coloquei admin para o usuario cliente, mas é só para demonstração se fosse um projeto de produção jamais faria isso. - Adicionado por Guilherme Bento.
    if (cliente) {
        await executar(
            `UPDATE tab_clientes
             SET id_usuario = 1, nome = 'Cliente Teste', email = 'teste@gmail.com',
                 fone = '11888888888', dtnasc = '1990-01-01', sexo = 'M', status = 1
             WHERE id_cliente = 1`
        );
        return;
    }

    // Esse trecho é só pra caso exista coluna antiga chamada ativo, como a prof pediu para alterarmos coloquei esse pequeno bloco pra correção. - Adicionado por Guilherme Bento.
    if (temAtivoAntigo) {
        await executar(
            `INSERT INTO tab_clientes
             (id_cliente, id_usuario, nome, email, fone, dtnasc, sexo, status, ativo)
             VALUES (1, 1, 'Cliente Teste', 'teste@gmail.com', '11888888888',
                     '1990-01-01', 'M', 1, 1)`
        );
        return;
    }

     //   if (temAtivonovo) {
     //   await executar(
     //       `INSERT INTO tab_clientes
     //        (id_cliente, id_usuario, nome, email, fone, dtnasc, sexo, status, ativo)
     //        VALUES (1, 1, 'Cliente', 'teste@gmail.com', '11888888888',
     //                '1990-01-01', 'M', 1, 1)`
     //  );
     //   return;}

    // Se for banco novo, insere o cliente normal msm. - Adicionado por Guilherme Bento.
    await executar(
        `INSERT INTO tab_clientes
         (id_cliente, id_usuario, nome, email, fone, dtnasc, sexo, status)
         VALUES (1, 1, 'Cliente Teste', 'teste@gmail.com', '11888888888',
                 '1990-01-01', 'M', 1)`
    );
}

// Essa função procura a categoria, e se não tiver ela cria na hora. - Adicionado por Guilherme Bento.
async function buscarOuCriarCategoria(nome) {
    let categoria = await buscar('SELECT id_categoria FROM tab_categorias WHERE nome = ?', [nome]);

    if (categoria) {
        return categoria.id_categoria;
    }

    await executar('INSERT INTO tab_categorias (nome) VALUES (?)', [nome]);
    categoria = await buscar('SELECT id_categoria FROM tab_categorias WHERE nome = ?', [nome]);
    return categoria.id_categoria;
}

// Aqui eu salvo o produto no banco, atualizando se já existir e criando se não existir. - Adicionado por Guilherme Bento.
async function salvarProduto(produto) {
    const idCategoria = await buscarOuCriarCategoria(produto.categoria);
    const existente = await buscar('SELECT id_produto FROM tab_produtos WHERE nome = ?', [produto.nome]);

    // Deixei esses dados numa lista pra não repetir tudo no INSERT e no UPDATE. - Adicionado por Guilherme Bento.
    const dados = [
        idCategoria,
        produto.nome,
        produto.genero,
        'Eau de Parfum',
        produto.fragrancia,
        100,
        produto.preco,
        '2028-12-31'
    ];

    // Se o produto já existe, atualizo preço, nome, fragrância e infos dele. - Adicionado por Guilherme Bento.
    if (existente) {
        await executar(
            `UPDATE tab_produtos
             SET id_categoria = ?, nome = ?, genero = ?, tipo = ?, fragrancia = ?,
                 volume_ml = ?, preco = ?, data_validade = ?
             WHERE id_produto = ?`,
            [...dados, existente.id_produto]
        );

        const estoque = await buscar('SELECT id_estoque FROM tab_estoque WHERE id_produto = ?', [existente.id_produto]);

        // Se por algum motivo o produto existe mas não tem estoque, eu crio um estoque padrão, apenas para test. - Adicionado por Guilherme Bento.
        if (!estoque) {
            await executar('INSERT INTO tab_estoque (id_produto, qtde) VALUES (?, 30)', [existente.id_produto]);
        }

        return;
    }

    // Se o produto não existe ainda, eu cadastro ele do zero. - Adicionado por Guilherme Bento.
    const resultado = await executar(
        `INSERT INTO tab_produtos
         (id_categoria, nome, genero, tipo, fragrancia, volume_ml, preco, data_validade)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        dados
    );

    // Todo perfume novo começa com 30 unidades pra teste na loja. - Adicionado por Guilherme Bento.
    await executar('INSERT INTO tab_estoque (id_produto, qtde) VALUES (?, 30)', [resultado.lastID]);
}

// Essa função passa pelo catálogo todo e garante q ele esteja salvo no banco. - Adicionado por Guilherme Bento.
async function prepararCatalogo() {
    for (const produto of catalogoEvonium) {
        await salvarProduto(produto);
    }
}

// Aqui é tipo o start do banco, cria tabela, cria teste, cadastra catálogo e avisa no terminal. - Adicionado por Guilherme Bento.
const pronto = (async () => {
    try {
        await prepararTabelas();
        await criarUsuarioTeste();
        await prepararCatalogo();
        console.log('Banco Evonium pronto.');
    } catch (erro) {
        console.error('Erro ao preparar o banco:', erro.message);
    }
})();

// Exporto o banco e o catálogo pra usar no server.js tbm. - Adicionado por Guilherme Bento.
module.exports = { db, pronto, catalogoEvonium };
