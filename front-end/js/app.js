// Aqui eu deixei o endereço base do backend, pq aí n preciso repetir a URL toda em cada fetch. - Adicionado por Guilherme Bento.
const API_URL = 'http://localhost:3000/api';

// Aqui ficam os detalhes extras dos perfumes, tipo img e descrição, pq o banco guarda mais os dados "secos". - Adicionado por Guilherme Bento.
const detalhesProdutos = {
    // Perfume da Lorena, coloquei a img dela q tá na pasta assets. - Adicionado por Guilherme Bento.
    'EVONIUM YARUMI GOLD (Edition Lorena)': {
        imagem: '../assets/Evonium - Lorena.jpeg',
        descricao: 'Uma fragrancia luminosa que revela frescor verde e delicada docura, traduzindo a natureza em sua forma mais elegante.'
    },
    // Perfume da Erika, seguindo o catalogo novo q a vanny montou. - Adicionado por Guilherme Bento.
    'EVONIUM AYSÚRA ABSOLU (Edition Erika)': {
        imagem: '../assets/Evonium - Erika.jpeg',
        descricao: 'Intensa e envolvente, combina flores e ambar em uma assinatura quente e sofisticada.'
    },
    // Perfume da Fabrizia, só deixei a descrição mais bonita no card. - Adicionado por Guilherme Bento.
    'EVONIUM IRYAPÁ ELIXIR (Edition Fabrizia)': {
        imagem: '../assets/Evonium - Fabrizia.jpeg',
        descricao: 'Frutas luminosas e flores envolventes em um fundo ambarado elegante e moderno.'
    },
    // Perfume da Vanny. - Adicionado por Guilherme Bento.
    'EVONIUM APÒÉNÀ PREMIUM (Edition Vanny)': {
        imagem: '../assets/Evonium - Vanny.jpeg',
        descricao: 'Radiante e luxuosa, revela um acorde floral solar envolto por madeiras cremosas.'
    },
    // Perfume da Priscilla, esse é o mais caro da linha feminina ent fica bem destacado, também o mais especial por ser o da professora. - Adicionado por Guilherme Bento.
    'EVONIUM ITAPUÃRA WOOD (Edition Priscilla Cunha)': {
        imagem: '../assets/Evonium - Priscilla.jpeg',
        descricao: 'Uma assinatura feminina intensa onde flores sofisticadas se fundem a madeiras nobres.'
    },
    // Perfume V&G, é o da linha unissex, por isso fica separado dos masculino e feminino. - Adicionado por Guilherme Bento.
    'EVONIUM V&G Edition': {
        imagem: '../assets/Evonium - VG.jpeg',
        descricao: 'Uma fragrancia que traduz liberdade e identidade, combinando madeiras e notas aromaticas com elegancia contemporanea.'
    },
    // Perfume do José. - Adicionado por Guilherme Bento.
    'EVONIUM YUSÉ PREMIUM (Edition José Wirysllan)': {
        imagem: '../assets/Evonium - J. Wirysllan.jpeg',
        descricao: 'Refinado e natural, combina frescor branco com base amadeirada elegante.'
    },
    // Perfume do Luca. - Adicionado por Guilherme Bento.
    'EVONIUM LÛKARA GOLD (Edition Luca)': {
        imagem: '../assets/Evonium - Luca.jpeg',
        descricao: 'Inspirado nas aguas amazonicas, revela frescor sofisticado com fundo amadeirado.'
    },
    // Perfume do Gustavo. - Adicionado por Guilherme Bento.
    'EVONIUM GÛSTAV ESSENCE (Edition Gustavo)': {
        imagem: '../assets/Evonium - Gustavo.jpeg',
        descricao: 'Leve e elegante, combina frescor moderno com madeira suave.'
    },
    // Perfume do Guilherme, esse é o meu. - Adicionado por Guilherme Bento.
    'EVONIUM GÛYRÉM INTENSE (Edition Guilherme)': {
        imagem: '../assets/Evonium - Guilherme.jpeg',
        descricao: 'Uma fragrancia intensa que une especiarias e madeiras nobres.'
    },
    // Perfume do Gabriel. - Adicionado por Guilherme Bento.
    'EVONIUM GÛYRABÉ NOIR (Edition Gabriel)': {
        imagem: '../assets/Evonium - Gabriel.jpeg',
        descricao: 'Profundo e misterioso, revela uma elegancia sofisticada.'
    },
    // Perfume Masiero. - Adicionado por Guilherme Bento.
    'EVONIUM JAGUARUNA ÉBANO MASIERO': {
        imagem: '../assets/Evonium - Masiero.jpeg',
        descricao: 'Escuro e poderoso, combina notas orientais e madeiras.'
    },
    // Perfume do Carlos Eduardo, fechando a linha masculina do catálogo. - Adicionado por Guilherme Bento.
    'EVONIUM ÁGUÀRÁ (Edition Carlos Eduardo)': {
        imagem: '../assets/Evonium - Carlos Eduardo.jpeg',
        descricao: 'Uma fragrancia de presenca forte, luxuosa e contemporanea, feita para quem transforma autenticidade em assinatura.'
    }
};

// Função pra mostrar preço em real, ex: 299.99 vira R$ 299,99. - Adicionado por Guilherme Bento.
function formatarMoeda(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Pega o carrinho salvo no navegador, se n tiver nada ele volta uma lista vazia msm. - Adicionado por Guilherme Bento.
function pegarCarrinho() {
    return JSON.parse(localStorage.getItem('evoniumCarrinho')) || [];
}

// Salva o carrinho no navegador, pq se trocar de página ele n perde os produtos. - Adicionado por Guilherme Bento.
function salvarCarrinho(carrinho) {
    localStorage.setItem('evoniumCarrinho', JSON.stringify(carrinho));
}

// Adiciona produto no carrinho, se já tiver o msm produto ele só aumenta a qtd. - Adicionado por Guilherme Bento.
function adicionarCarrinho(produto) {
    const carrinho = pegarCarrinho();
    const item = carrinho.find(p => p.id_produto === produto.id_produto);

    // Se achou o produto, aumenta +1 na quantidade. - Adicionado por Guilherme Bento.
    if (item) {
        item.qtde += 1;
    } else {
        // Se n achou, cria um item novo no carrinho com os dados principais. - Adicionado por Guilherme Bento.
        carrinho.push({
            id_produto: produto.id_produto,
            nome: produto.nome,
            preco: Number(produto.preco),
            qtde: 1,
            imagem: produto.imagem
        });
    }

    salvarCarrinho(carrinho);
    alert('Produto adicionado ao carrinho!');
}

// Essa função busca os perfumes no back e monta os cards na tela de produtos. - Adicionado por Guilherme Bento.
async function carregarProdutos() {
    const lista = document.getElementById('lista-produtos');
    const mensagem = document.getElementById('mensagem-produtos');

    // Se a pág n tiver lista-produtos, eu paro aqui pra n dar erro nas outras páginas. - Adicionado por Guilherme Bento.
    if (!lista) return;

    try {
        // Aqui eu peço pro backend mandar os produtos cadastrados no banco. - Adicionado por Guilherme Bento.
        const resposta = await fetch(`${API_URL}/produtos`);
        const produtos = await resposta.json();

        lista.innerHTML = '';
        mensagem.style.display = 'none';

        produtos.forEach(produto => {
            // Misturo os dados do banco com as img e descrições q tão aqui no JS. - Adicionado por Guilherme Bento.
            const extra = detalhesProdutos[produto.nome] || {};
            const produtoCompleto = {
                ...produto,
                imagem: extra.imagem || '../assets/Logo_Evonium.png',
                descricao: extra.descricao || `${produto.tipo} ${produto.fragrancia}, ${produto.volume_ml} ml.`
            };

            // Crio o card do perfume pelo JS, pq a lista vem dinâmica do backend. - Adicionado por Guilherme Bento.
            const card = document.createElement('article');
            card.className = 'produto-card';
            card.innerHTML = `
                <img src="${produtoCompleto.imagem}" alt="${produtoCompleto.nome}">
                <h3>${produtoCompleto.nome}</h3>
                <p>${produtoCompleto.descricao}</p>
                <strong>${produtoCompleto.volume_ml} ml</strong>
                <p class="preco">${formatarMoeda(produtoCompleto.preco)}</p>
                <p class="estoque">Estoque: ${produtoCompleto.estoque} unidades</p>
                <button class="botao">Adicionar ao carrinho</button>
            `;

            // Quando vc clica no botão do card, ele manda aquele perfume pro carrinho. - Adicionado por Guilherme Bento.
            card.querySelector('button').addEventListener('click', () => adicionarCarrinho(produtoCompleto));
            lista.appendChild(card);
        });

        // Se n vier produto nenhum do banco, aparece esse aviso na tela. - Adicionado por Guilherme Bento.
        if (produtos.length === 0) {
            mensagem.style.display = 'block';
            mensagem.textContent = 'Nenhum produto cadastrado no banco.';
        }
    } catch (erro) {
        // Se o backend tiver fechado, aparece essa msg pra pessoa saber oq fazer. - Adicionado por Guilherme Bento.
        mensagem.style.display = 'block';
        mensagem.textContent = 'Nao foi possivel carregar os produtos. Verifique se o backend esta rodando na porta 3000.';
    }
}

// Essa função monta a página do carrinho com oq ficou salvo no localStorage. - Adicionado por Guilherme Bento.
function carregarCarrinho() {
    const area = document.getElementById('itens-carrinho');
    const totalTexto = document.getElementById('total-carrinho');

    // Se n estiver na página do carrinho, n tem pq continuar. - Adicionado por Guilherme Bento.
    if (!area) return;

    const carrinho = pegarCarrinho();
    let total = 0;
    area.innerHTML = '';

    // Carrinho vazio mostra só um aviso simples. - Adicionado por Guilherme Bento.
    if (carrinho.length === 0) {
        area.innerHTML = '<p class="aviso">Seu carrinho esta vazio.</p>';
    }

    carrinho.forEach((item, indice) => {
        // Subtotal é preço vezes qtd, bem direto msm. - Adicionado por Guilherme Bento.
        const subtotal = item.preco * item.qtde;
        total += subtotal;

        // Cada item vira uma linha com img, nome, qtd, preço e botão remover. - Adicionado por Guilherme Bento.
        const linha = document.createElement('div');
        linha.className = 'item-carrinho';
        linha.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div>
                <strong>${item.nome}</strong>
                <p>Quantidade: ${item.qtde}</p>
                <p>${formatarMoeda(subtotal)}</p>
            </div>
            <button>Remover</button>
        `;

        // Botão pra remover aquele item e recarregar o carrinho atualizado. - Adicionado por Guilherme Bento.
        linha.querySelector('button').addEventListener('click', () => {
            carrinho.splice(indice, 1);
            salvarCarrinho(carrinho);
            carregarCarrinho();
        });

        area.appendChild(linha);
    });

    // No final mostro o total já formatado no resumo do carrinho. - Adicionado por Guilherme Bento.
    totalTexto.textContent = formatarMoeda(total);
}

// Finaliza a compra simulada, mandando o carrinho pro backend salvar como pedido. - Adicionado por Guilherme Bento.
async function finalizarCompra() {
    const mensagem = document.getElementById('mensagem-carrinho');
    const carrinho = pegarCarrinho();

    // Se o carrinho tiver vazio, n deixa finalizar pq n tem oq comprar. - Adicionado por Guilherme Bento.
    if (carrinho.length === 0) {
        mensagem.textContent = 'Adicione algum perfume antes de finalizar.';
        return;
    }

    // Calculo o total e monto os dados q o backend espera receber. - Adicionado por Guilherme Bento.
    const total = carrinho.reduce((soma, item) => soma + item.preco * item.qtde, 0);
    const dados = {
        id_cliente: 1,
        id_usuario: 1,
        total,
        itens: carrinho.map(item => ({
            id_produto: item.id_produto,
            preco: item.preco,
            qtde: item.qtde
        }))
    };

    try {
        // Aqui mando a compra via POST pra rota finalizar-compra. - Adicionado por Guilherme Bento.
        const resposta = await fetch(`${API_URL}/finalizar-compra`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        const resultado = await resposta.json();

        if (resultado.success) {
            // Se deu certo, limpo carrinho e mostro o número do pedido. - Adicionado por Guilherme Bento.
            salvarCarrinho([]);
            carregarCarrinho();
            mensagem.textContent = `Compra simulada com sucesso! Pedido numero ${resultado.id_pedido}.`;
        } else {
            // Se respondeu mas n finalizou, deixo um aviso simples. - Adicionado por Guilherme Bento.
            mensagem.textContent = 'O backend respondeu, mas nao finalizou a compra.';
        }
    } catch (erro) {
        // Se n conseguir falar com backend, provavelmente ele n tá rodando. - Adicionado por Guilherme Bento.
        mensagem.textContent = 'Erro ao comunicar com o backend. Rode o servidor antes de finalizar.';
    }
}

// Prepara o formulário de contato pra simular envio sem precisar backend pra isso. - Adicionado por Guilherme Bento.
function prepararContato() {
    const form = document.getElementById('form-contato');

    // Se n tiver formulário nessa pág, para aqui. - Adicionado por Guilherme Bento.
    if (!form) return;

    form.addEventListener('submit', function(evento) {
        // PreventDefault é pra n recarregar a pág quando clicar em enviar. - Adicionado por Guilherme Bento.
        evento.preventDefault();
        document.getElementById('retorno-contato').textContent = 'Mensagem enviada com sucesso! (simulacao)';
        form.reset();
    });
}

// Pego os botões do carrinho pelo id pra colocar ação neles. - Adicionado por Guilherme Bento.
const btnFinalizar = document.getElementById('btn-finalizar');
const btnLimpar = document.getElementById('btn-limpar');

// Se existir botão finalizar, ele chama a função q finaliza a compra. - Adicionado por Guilherme Bento.
if (btnFinalizar) btnFinalizar.addEventListener('click', finalizarCompra);

if (btnLimpar) {
    // Se existir botão limpar, ele apaga o carrinho inteiro e atualiza a tela. - Adicionado por Guilherme Bento.
    btnLimpar.addEventListener('click', () => {
        salvarCarrinho([]);
        carregarCarrinho();
    });
}

// Chamo as funções no final, e cada uma só roda de verdade se estiver na pág certa. - Adicionado por Guilherme Bento.
carregarProdutos();
carregarCarrinho();
prepararContato();
