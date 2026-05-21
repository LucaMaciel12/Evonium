# Evonium

Evonium é um projeto acadêmico de e-commerce para uma marca fictícia de perfumaria de nicho criada em 2026. O sistema apresenta a marca, lista produtos, simula carrinho de compras e registra pedidos usando um backend em Node.js com banco SQLite.

O projeto foi construído com foco em organização, identidade visual e integração entre front-end, back-end e banco de dados.

## Funcionalidades

- Página inicial institucional da marca Evonium.
- Catálogo de perfumes com imagens, descrições, preços e estoque.
- Carrinho salvo no navegador com `localStorage`.
- Simulação de finalização de compra.
- Registro de pedido e itens no banco de dados.
- Página de equipe com integrantes, funções e RAs.
- Página de contato com formulário simulado.
- Modelagem de banco com usuários, clientes, funcionários, produtos, estoque e pedidos.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- SQLite
- sqlite3
- CORS

## Estrutura

```text
Evonium/
|-- assets/                  # Imagens, banners e logo
|-- back-end/                # API em Node.js/Express
|   |-- database.js          # Criação das tabelas e catálogo inicial
|   |-- server.js            # Rotas da API
|   |-- package.json
|-- database/                # Modelagem e DER
|   |-- Modelagem.txt
|   |-- DER Evonium.png
|-- docs/
|   |-- documentacao/
|   |   |-- arquitetura.md
|   |   |-- endpoints-api.md
|   |-- empresa/
|       |-- historia.md
|-- front-end/               # Páginas do site
|   |-- index.html
|   |-- produtos.html
|   |-- carrinho.html
|   |-- contato.html
|   |-- sobre.html
|   |-- equipe.html
|   |-- style.css
|   |-- js/app.js
|-- README.md
```

## Como Rodar

1. Entre na pasta do backend:

```bash
cd back-end
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

4. Abra o front-end no navegador:

```text
front-end/index.html
```

Com o servidor rodando, a página de produtos busca os dados em:

```text
http://localhost:3000/api/produtos
```

## API

A API principal possui duas rotas:

- `GET /api/produtos`
- `POST /api/finalizar-compra`

A documentação completa está em [docs/documentacao/endpoints-api.md](docs/documentacao/endpoints-api.md).

## Banco de Dados

O banco usado no projeto é SQLite no ambiente Node.js. A modelagem original está documentada em [database/Modelagem.txt](database/Modelagem.txt), e a criação prática das tabelas fica em [back-end/database.js](back-end/database.js).

Principais tabelas:

- `tab_usuarios`
- `tab_funcionarios`
- `tab_clientes`
- `tab_enderecos`
- `tab_categorias`
- `tab_produtos`
- `tab_estoque`
- `tab_pedidos`
- `tab_itens_pedido`

## Documentação

- [Arquitetura do projeto](docs/documentacao/arquitetura.md)
- [Endpoints da API](docs/documentacao/endpoints-api.md)
- [História da empresa](docs/empresa/historia.md)
- [Modelagem do banco](database/Modelagem.txt)

## Equipe

Projeto desenvolvido pela equipe Evonium:

- Carlos Eduardo Souza de Oliveira
- Fabrizia Fonseca Bellante Celeste
- Gabriel de Sousa Borges
- Gabriel Masiero
- Guilherme Ferreira Bento
- Gustavo Pereira Furlan
- José Wirysllan Casusa de Sousa
- Lorena Morais Silva
- Luca Maciel da Silva do Nascimento
- Vanny Alves da Silva

## Status

Projeto em versão acadêmica, com e-commerce funcional em ambiente local e compra simulada.
