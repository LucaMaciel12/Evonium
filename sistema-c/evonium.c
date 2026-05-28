#include <stdio.h>
#include <locale.h>
int main() {

    setlocale(LC_ALL, "Portuguese");
    
    int opcao, escolha_p, quant;
    char usr[50];
    float preco1 = 299.99, preco2 = 299.99, preco3 = 299.99, preco4 = 299.99, preco5 = 689.99, preco6 = 429.99, preco7 = 389.99, preco8 = 389.99, preco9 = 389.99, preco10 = 389.99, preco11 = 459.99, preco12 = 389.99, preco13 = 389.99;
    float soma= 0 , cont;
    printf("Digite seu nome: ");
    fgets(usr,50,stdin);

    do {
        printf("\nBem Vindo %s\n", usr);
        printf("Voce tem as seguintes opcoes:\n\n");

        printf("1 - Fazer encomenda de perfume\n");
        printf("2 - Alteracao de preco\n");
        printf("3 - Conheca nossas parcerias\n");
        printf("4 - Quem somos nos\n");
        printf("5 - Finalizar programa\n");

        printf("--- Escolha uma opcao ---\n");
        scanf("%d", &opcao);

        switch(opcao) {

            case 1:
                do {
                    printf("\n1-Yarumi Gold = %.2f\n", preco1);
                    printf("2-Aysúra Absolute = %.2f\n", preco2);
                    printf("3-Iryapá Elixir = %.2f\n", preco3);
                    printf("4-Apòénà Premium = %.2f\n", preco4);
                    printf("5-Itapurãra Wood = %.2f\n", preco5);
                    printf("6-V&G Edition = %.2f\n", preco6);
                    printf("7-Yusé Premium = %.2f\n", preco7);
                    printf("8-Lúkara Gold = %.2f\n", preco8);
                    printf("9-Gûstav Essence = %.2f\n", preco9);
                    printf("10-Gûyrém Intense = %.2f\n", preco10);
                    printf("11-Gúyrabe Noir = %.2f\n", preco11);
                    printf("12-Jaguaruna Ébano = %.2f\n", preco12);
                    printf("13-Águàrá = %.2f\n", preco13);
                    printf("14-Voltar ao menu principal\n");
                    printf("--- Escolha uma opcao ---\n");
                    scanf("%d", &escolha_p);

                    switch(escolha_p) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        printf("Escolha a quantidade: ");
                        scanf("%d", &quant);

                            switch(escolha_p) {

                        case 1:
                            soma += preco1 * quant;
                        break;

                        case 2:
                            soma += preco2 * quant;
                        break;

                        case 3:
                            soma += preco3 * quant;
                        break;

                        case 4:
                            soma += preco4 * quant;
                        break;

                        case 5:
                            soma += preco5 * quant;
                        break;

                        case 6:
                            soma += preco6 * quant;
                        break;

                        case 7:
                            soma += preco7 * quant;
                        break;

                        case 8:
                            soma += preco8 * quant;
                        break;

                        case 9:
                            soma += preco9 * quant;
                        break;

                        case 10:
                            soma += preco10 * quant;
                        break;

                        case 11:
                            soma += preco11 * quant;
                        break;

                        case 12:
                            soma += preco12 * quant;
                        break;

                        case 13:
                            soma += preco13 * quant;
                        break;
}

                        printf("Voce escolheu %d unidade(s)\n", quant);
                        printf("Total acumulado:\033[1;31mR$ %.2f\033[0m\n", soma);

                            break;  

                        case 14:
                            printf("Voltando ao menu principal...\n");
                            break;

                        default:
                            printf("Opcao invalida!\n");
                    }

                } while(escolha_p != 14);
               
                printf("\nValor total da compra: R$ %.2f\n", soma);

                break;

            case 2:
                do {
                     printf("\n====== ALTERACAO DE PRECOS ======\n");
                printf("\n1-Yarumi Gold = %.2f\n", preco1);
                    printf("2-Aysúra Absolute = %.2f\n", preco2);
                    printf("3-Iryapá Elixir = %.2f\n", preco3);
                    printf("4-Apòénà Premium = %.2f\n", preco4);
                    printf("5-Itapurãra Wood = %.2f\n", preco5);
                    printf("6-V&G Edition = %.2f\n", preco6);
                    printf("7-Yusé Premium = %.2f\n", preco7);
                    printf("8-Lúkara Gold = %.2f\n", preco8);
                    printf("9-Gûstav Essence = %.2f\n", preco9);
                    printf("10-Gûyrém Intense = %.2f\n", preco10);
                    printf("11-Gúyrabe Noir = %.2f\n", preco11);
                    printf("12-Jaguaruna Ébano = %.2f\n", preco12);
                    printf("13-Águàrá = %.2f\n", preco13);
                    printf("14-Voltar ao menu principal\n");
                    
                    printf("--- Escolha o perfume para alterar o preco ---\n");
                    scanf("%d", &escolha_p);

                    switch(escolha_p) {
                        case 1:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco1);
                            printf("Preço alterado com sucesso!");
                            break;
                        case 2:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco2);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 3:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco3);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 4:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco4);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 5:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco5);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 6:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco6);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 7:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco7);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 8:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco8);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 9:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco9);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 10:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco10);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 11:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco11);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 12:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco12);
                            printf("\nPreço alterado com sucesso!\n");
                            break;
                        case 13:
                            printf("Digite um novo Preço: ");
                            scanf("%f", &preco13);
                            printf("\nPreço alterado com sucesso!\n");
                            break;

                        case 14:
                            printf("Voltando ao menu principal...\n");
                            break;

                        default:
                            printf("Opcao invalida!\n");
                    }

                } while(escolha_p != 14);
                break;

            case 3:
                do {
                    printf("\n====== PARCERIAS EVONIUM ======\n");
                    printf("1 - Firmenich\n");
                    printf("2 - Givaudan\n");
                    printf("3 - IFF\n");
                    printf("4 - Wheaton Brasil\n");
                    printf("5 - Correios\n");
                    printf("6 - Instagram\n");
                    printf("7 - Voltar ao menu principal\n");
                    printf("--- Escolha uma opcao ---\n");
                    scanf("%d", &escolha_p);

                    switch(escolha_p) {
                        case 1:
                            printf("\n=== Firmenich ===\n");
                            printf("Empresa especializada na criacao de fragrancias sofisticadas e materias-primas premium.\n");
                            break;
                        case 2:
                            printf("\n=== Givaudan ===\n");
                            printf("Parceira responsavel pelo desenvolvimento de essencias exclusivas e inovadoras.\n");
                            break;
                        case 3:
                            printf("\n=== IFF ===\n");
                            printf("Fornecedor internacional de aromas e ingredientes para perfumaria de luxo.\n");
                            break;
                        case 4:
                            printf("\n=== Wheaton Brasil ===\n");
                            printf("Empresa responsavel pela fabricacao dos frascos premium da Evonium.\n");
                            break;
                        case 5:
                            printf("\n=== Correios ===\n");
                            printf("Parceira logistica utilizada para entregas em todo o Brasil.\n");
                            break;
                        case 6:
                            printf("\n=== Instagram ===\n");
                            printf("Plataforma utilizada para marketing digital e divulgacao da marca.\n");
                            break;
                        case 7:
                            printf("Voltando ao menu principal...\n");
                            break;
                        default:
                            printf("Opcao invalida!\n");
                    }

                } while(escolha_p != 7);
                break;

            case 4:
                do{    
                printf("\n====== EVONIUM ======\n");
                printf("1-Nossa Historia\n");
                printf("2-Nossa Missão\n");
                printf("3-Nossa Visão\n");
                printf("4-Nossos Valores\n");
                printf("5-Voltar ao menu principal\n");
                
                printf("--- Escolha uma opcao ---\n");
                scanf("%d", &escolha_p);
                
                switch(escolha_p) {
                        case 1:
                            printf("\n==== Nossa Historia ====\n");
                            printf("A Evonium nasce em 2026 com a proposta de reinventar a perfumaria de nicho por meio de fragrâncias ousadas, sofisticadas e memoráveis. A marca combina inspiração artesanal com uma visão contemporânea, criando perfumes com identidade própria e presença marcante. Suas composições exploram notas refrescantes, florais, amadeiradas, aromáticas e ambaradas, sempre buscando transmitir exclusividade, elegante e personalidade. Mais do que vender perfumes, a Evonium apresenta uma experiência de marca. Cada fragrância possui nome, edição, estética e conceito, formando uma linha autoral criada para parecer uma perfumaria real, moderna e bem posicionada.\n");
                            break;
                        case 2:
                            printf("\n==== Missão ====\n");
                            printf("Criar uma experiência de perfumaria de nicho acessível, elegante e diferente, unindo criatividade, visual e tecnologia em um projeto de e-commerce funcional.\n");
                            break;
                        case 3:
                            printf("\n==== Visão ====\n");
                            printf("Ser referencia em perfumaria na America Latina, reconhecida pela inovação, qualidade e autencidade de suas criações.\n");
                            break;
                        case 4:
                            printf("\n==== Valores ====\n");
                            printf("Especialização\nElegância\nAcessibilidade\nTransparencia\nSofisticação\nSustentabilidade\nInovação\nExclusividade\nAutencidade\n");
                            break;
                        case 5:
                            printf("Voltando ao menu principal...\n");
                            break;

                        default:
                            printf("Opcao invalida!\n");
                    }

                } while(escolha_p != 5);
                break;
                

            case 5:
                printf("Encerrando programa...\n");
                break;

            default:
                printf("Opcao invalida!\n");
        }

    } while(opcao != 5);

    return 0;
}
