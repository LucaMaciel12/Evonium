# Arquitetura do Projeto

Este documento explica como o projeto Evonium está organizado e como as partes principais conversam entre si.

## Visão Geral

O Evonium é dividido em três blocos principais:

- **Front-end:** páginas HTML, CSS e JavaScript da interface.
- **Back-end:** API em Node.js com Express.
- **Banco de dados:** SQLite usado pelo backend para salvar produtos, estoque e pedidos.

Fluxo básico:

```text
Usuário
  |
  v
Front-end HTML/CSS/JS
  |
  v fetch()
Back-end Express
  |
  v sqlite3
Banco SQLite
```

## Front-End

Pasta:

```text
front-end/
```

Arquivos principais:

- `index.html`: página inicial da Evonium.
- `produtos.html`: vitrine dos perfumes.
- `carrinho.html`: carrinho de compras.
- `contato.html`: página de contato.
- `sobre.html`: história e informações da marca.
- `equipe.html`: integrantes e funções no projeto.
- `style.css`: estilos gerais do site.
- `js/app.js`: lógica de produtos, carrinho, contato e compra simulada.

O front-end não possui framework. Ele usa HTML, CSS e JavaScript puro. A página `produtos.html` usa o arquivo `app.js` para buscar os produtos no backend e montar os cards dinamicamente.

## Back-End

Pasta:

```text
back-end/
```

Arquivos principais:

- `server.js`: cria o servidor Express e define as rotas da API.
- `database.js`: conecta no SQLite, cria tabelas e cadastra o catálogo inicial.
- `evonium.db`: arquivo local do banco SQLite.
- `package.json`: dependências e script de inicialização.

O backend usa:

- `express` para criar a API.
- `cors` para permitir acesso do front-end.
- `sqlite3` para manipular o banco local.

## Banco de Dados

O projeto usa SQLite no desenvolvimento local. A modelagem segue uma estrutura de e-commerce simples:

- Usuários
- Funcionários
- Clientes
- Endereços
- Categorias
- Produtos
- Estoque
- Pedidos
- Itens do pedido

O arquivo `database/Modelagem.txt` documenta a modelagem em SQL, enquanto `back-end/database.js` adapta essa estrutura para SQLite.

## Catálogo

O catálogo oficial dos perfumes fica cadastrado no backend, dentro de `database.js`. Quando o servidor inicia, ele garante que os perfumes existam no banco.

As imagens e descrições usadas na vitrine ficam no front-end, no arquivo:

```text
front-end/js/app.js
```

As imagens ficam em:

```text
assets/
```

## Carrinho

O carrinho é salvo no navegador usando `localStorage`. Isso significa que ele não depende de login real nessa versão acadêmica.

Quando o usuário finaliza a compra:

1. O front-end envia os itens para `POST /api/finalizar-compra`.
2. O backend cria um pedido em `tab_pedidos`.
3. O backend cria os itens em `tab_itens_pedido`.
4. O backend baixa o estoque em `tab_estoque`.

## Rotas Principais

- `GET /api/produtos`: lista os produtos da vitrine.
- `POST /api/finalizar-compra`: simula uma compra e registra o pedido.

Mais detalhes em:

```text
docs/documentacao/endpoints-api.md
```

## Observações

Este projeto foi feito para apresentação acadêmica. Ele simula uma loja funcional, mas ainda não possui autenticação real, pagamento real ou painel administrativo completo.
