# Endpoints da API

Documentação das rotas principais do backend Evonium.

URL base local:

```text
http://localhost:3000
```

## GET /api/produtos

Lista os perfumes do catálogo oficial da Evonium com dados de preço, categoria e estoque.

### Requisição

```http
GET /api/produtos
```

### Resposta de Sucesso

Status:

```text
200 OK
```

Exemplo:

```json
[
  {
    "id_produto": 1,
    "nome": "EVONIUM YARUMI GOLD (Edition Lorena)",
    "genero": "Feminino",
    "tipo": "Eau de Parfum",
    "fragrancia": "Floral Verde Gourmand",
    "volume_ml": 100,
    "preco": 299.99,
    "categoria": "Linha Feminina",
    "estoque": 30
  }
]
```

### Erro

Status:

```text
500 Internal Server Error
```

Exemplo:

```json
{
  "erro": "Erro ao buscar produtos."
}
```

## POST /api/finalizar-compra

Simula a finalização de uma compra. A rota cria um pedido, registra os itens comprados e diminui o estoque.

### Requisição

```http
POST /api/finalizar-compra
Content-Type: application/json
```

Exemplo de corpo:

```json
{
  "id_cliente": 1,
  "id_usuario": 1,
  "id_funcionario": null,
  "itens": [
    {
      "id_produto": 1,
      "preco": 299.99,
      "qtde": 2
    }
  ]
}
```

Observação: o campo `id_funcionario` pode ser `null`, porque o pedido pode ser feito diretamente pelo cliente.

### Resposta de Sucesso

Status:

```text
200 OK
```

Exemplo:

```json
{
  "success": true,
  "id_pedido": 1
}
```

### Erro por Pedido Incompleto

Status:

```text
400 Bad Request
```

Exemplo:

```json
{
  "erro": "Pedido incompleto."
}
```

### Erro de Estoque ou Banco

Status:

```text
500 Internal Server Error
```

Exemplo:

```json
{
  "erro": "Produto sem estoque suficiente."
}
```

## Como Testar

Com o backend rodando:

```bash
cd back-end
npm start
```

Abra no navegador:

```text
http://localhost:3000/api/produtos
```

Para testar o `POST`, use uma ferramenta como Postman, Insomnia ou o próprio front-end em `front-end/carrinho.html`.
