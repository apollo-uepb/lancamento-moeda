# Lançamento de moeda
Desenvolvido por Apollo Borges


## Descrição

Aplicação interativa desenvolvida para demonstrar conceitos de
probabilidade por meio de simulações de lançamentos de uma moeda. O
projeto permite comparar os resultados observados com as probabilidades
teóricas e acompanhar como a frequência relativa de caras se comporta à
medida que o número de lançamentos aumenta.

Desenvolvido por alunos do 2º período de Estatística e Ciência de Dados
da Universidade Estadual da Paraíba (UEPB), para a **II SECT-CCT**.

## Objetivo

Apresentar, de forma visual e acessível, conceitos fundamentais de
probabilidade frequentista. A proposta é permitir que o usuário realize
seus próprios experimentos, altere as chances de cada resultado e
observe como os dados se relacionam com o modelo probabilístico.

## Funcionalidades

-   **Simulação de lançamentos:** realização de lançamentos individuais
    ou em lote.
-   **Probabilidade configurável:** ajuste da probabilidade de sair cara
    e, consequentemente, da probabilidade de sair coroa.
-   **Contagem dos resultados:** acompanhamento do número de caras,
    coroas e lançamentos realizados.
-   **Frequência relativa:** cálculo e visualização da proporção de
    caras obtida durante o experimento.
-   **Convergência:** gráfico que acompanha a frequência relativa de
    caras ao longo dos lançamentos e a compara com a probabilidade
    teórica.
-   **Distribuição binomial:** gráfico de barras que representa as
    probabilidades de obter diferentes quantidades de caras,
    considerando o número de lançamentos e a probabilidade configurada.
-   **Indicadores estatísticos:** apresentação de medidas que ajudam a
    comparar os resultados observados com os valores esperados pelo
    modelo.

## Conceitos abordados

-   **Experimento aleatório:** processo cujo resultado não pode ser
    previsto com certeza antes de sua realização.
-   **Probabilidade teórica:** chance de um resultado ocorrer segundo o
    modelo definido para o experimento.
-   **Frequência relativa:** proporção entre a quantidade de vezes que
    um resultado ocorreu e o total de tentativas.
-   **Lei dos Grandes Números:** princípio segundo o qual, sob as
    condições do modelo, a frequência relativa tende a se aproximar da
    probabilidade teórica conforme o número de repetições aumenta.
-   **Moeda justa e moeda viciada:** comparação entre uma moeda com
    chances iguais de cara e coroa e uma moeda com probabilidades
    diferentes para cada resultado.
-   **Distribuição binomial:** modelo de probabilidade utilizado para
    representar a quantidade de caras em uma sequência de lançamentos
    independentes, com probabilidade constante de cara.

## Tecnologias

-   [Next.js](https://nextjs.org/) --- estrutura da aplicação web.
-   [React](https://react.dev/) --- construção da interface.
-   [TypeScript](https://www.typescriptlang.org/) --- tipagem estática.
-   [Tailwind CSS](https://tailwindcss.com/) --- estilização.
-   [Recharts](https://recharts.org/) --- construção dos gráficos.
-   [Lucide React](https://lucide.dev/) --- biblioteca de ícones.

As simulações e os cálculos são executados no próprio navegador, sem
necessidade de banco de dados ou servidor de aplicação dedicado.

## Como executar o projeto

### Requisitos

-   Node.js **20.9.0 ou superior**.
-   npm.

### Instalação

Clone o repositório e entre na pasta do projeto:

``` bash
git clone https://github.com/apollo-uepb/lancamento-moeda.git
cd lancamento-moeda
```

Instale as dependências:

``` bash
npm install
```

Inicie o servidor de desenvolvimento:

``` bash
npm run dev
```

Acesse <http://localhost:3000> no navegador.

## Scripts disponíveis

  -----------------------------------------------------------------------
  Comando                             Descrição
  ----------------------------------- -----------------------------------
  `npm run dev`                       Inicia o servidor de
                                      desenvolvimento.

  `npm run build`                     Gera a versão de produção.

  `npm run start`                     Inicia a aplicação em modo de
                                      produção, após o build.

  `npm run lint`                      Executa a verificação de código com
                                      ESLint.
  -----------------------------------------------------------------------

## Organização do projeto

A aplicação utiliza o **App Router** do Next.js. A interface é
construída com componentes React, enquanto os cálculos estatísticos e as
funções de simulação ficam separados da apresentação visual.

A organização do código segue estas responsabilidades:

-   `src/app/`: páginas, layout principal e estilos globais.
-   `src/components/`: componentes visuais, controles, moeda e gráficos.
-   `src/hooks/`: lógica de estado e gerenciamento da simulação.
-   `src/lib/`: funções de simulação, cálculos de probabilidade,
    estatística e formatação.
-   `src/types/`: tipos e estruturas utilizados pela aplicação.

## Equipe

-   Apollo Borges
-   Felipe Ferreira
-   Leonardo Alexandre

------------------------------------------------------------------------

**Projeto acadêmico** desenvolvido para a II SECT-CCT da UEPB.
