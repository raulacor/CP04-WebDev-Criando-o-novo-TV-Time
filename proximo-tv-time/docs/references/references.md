# References — TV Time

## 1. Objetivo

As referências abaixo orientam as decisões de experiência e interface.

## 2. Referência 01 — Slumber's Audio Library

### Fonte

Slumber — tela da biblioteca de áudio

### Imagem

![Referência 01](./imagens/referencia-01.png)

### O que observamos?

Uma interface escura e de baixo contraste, em que o conteúdo é organizado em um
número pequeno de trilhas horizontais com título, e não em uma grade infinita.
Os cards são largos em vez de altos, combinando a arte à esquerda com o texto à
direita, de modo que dá para avaliar um item sem abri-lo. A tipografia carrega
a hierarquia: uma cor de destaque quente para os títulos e cinza suave para as
informações secundárias.

### O que vamos aproveitar?

A organização em trilhas, o card largo de duas colunas e a paleta escura
contida com uma única cor de destaque quente.

### Como será adaptado?

As trilhas passam a ser endpoints do TMDB — Highlights, Trending e Top Rated —
somadas a duas trilhas alimentadas pelas listas do próprio usuário. O card
mantém o formato de duas colunas, com o pôster à esquerda e título, data,
sinopse e gênero à direita. A cor de destaque quente vira o dourado do projeto
(`--gold: #BFA181`), acompanhado do turquesa para informações secundárias sobre
um fundo azul-marinho profundo.

## 3. Referência 02 — New Movie · Watch Movie Online Website

### Fonte

https://dribbble.com/shots/22049996-New-Movie-Watch-Movie-Online-Website

### Imagem

![Referência 02](./imagens/referencia-02.png)

### O que observamos?

Um filme em destaque apresentado sobre um frame do próprio filme ocupando toda
a largura, com um gradiente escurecendo o lado esquerdo para que o texto fique
sobre uma base legível enquanto a imagem continua visível à direita. As
informações seguem uma ordem clara: um selo pequeno, o título, uma linha única
de metadados separados por pontos, uma sinopse truncada e, por fim, as ações
como botões arredondados.

### O que vamos aproveitar?

O tratamento de imagem de fundo com gradiente, a ordem
selo → título → metadados → sinopse → ações, e os botões em formato de pílula.

### Como será adaptado?

O layout é reduzido de uma seção de largura total para um card com borda, no
mesmo padrão do restante da página, ocupando a mesma coluna de 85% das trilhas.
O selo "NEW MOVIE" vira "Featured". A linha de metadados exibe a nota do TMDB,
o ano de lançamento e o primeiro gênero. Os botões "Watch now" e "Watch
trailer" da referência dão lugar às duas ações do projeto — adicionar à lista e
marcar como assistido — já que a reprodução está fora do escopo. A imagem usa o
`backdrop_path` do TMDB, recorrendo ao pôster quando o filme não tem imagem de
fundo.

## 4. Referência 03 — React Bits · Web Threads

### Fonte

https://reactbits.dev/backgrounds/web-threads

### Imagem

![Referência 03](./imagens/referencia-03.png)

### O que observamos?

Um fundo animado em WebGL formado por fios luminosos finos que reagem ao
movimento do cursor. Ele adiciona movimento e profundidade sem competir com o
texto em primeiro plano, porque os fios têm contraste baixo e se concentram na
região central.

### O que vamos aproveitar?

O fundo animado como tratamento do hero e o princípio de que o movimento de
fundo precisa ser discreto o bastante para o texto se apoiar sobre ele.

### Como será adaptado?

O componente é configurado com a paleta do projeto — dourado, dourado claro e
branco — com brilho baixo, um grão sutil e o número de fios reduzido a três,
para que o efeito permaneça esparso. Ele é posicionado como uma camada absoluta
preenchendo a seção do hero, com o título e a chamada empilhados acima dele em
uma camada separada e centralizada. O fundo da página então faz a transição do
azul-marinho do hero para um tom mais escuro conforme o usuário rola até as
trilhas de filmes.
