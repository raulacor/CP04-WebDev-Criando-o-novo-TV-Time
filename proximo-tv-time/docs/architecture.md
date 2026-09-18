# Architecture — TV Time

## 1. Visão Geral

A aplicação é uma SPA em React com TypeScript, construída com Vite. Não possui
backend próprio: o TMDB é a fonte de dados, e o navegador conversa diretamente
com ele usando um token de leitura fornecido por variável de ambiente do Vite.

O código está organizado em três camadas, cada uma com uma responsabilidade:

- **`API/`** sabe conversar com o TMDB — URL base, cabeçalho de autenticação,
  verificação de erro e formato das respostas. Nada fora dessa pasta menciona
  `fetch`, o token ou uma URL do TMDB.
- **`context/`** guarda o estado que mais de um ramo da árvore precisa: a lista
  de interesse e a lista de assistidos.
- **`components/` e `pages/`** sabem apenas renderizar. Pedem dados chamando um
  hook e recebem objetos simples.

Os dados descem pela árvore por meio de props. Quem precisa de uma lista busca
a lista; quem renderiza um único item recebe o item. O roteamento fica a cargo
do React Router, com a barra de navegação e o provider das listas montados fora
do bloco de rotas, para que ambos sobrevivam à navegação.

## 2. Estrutura de Pastas

```text
src/
├── API/
│   └── tmdb.ts
├── components/
│   ├── Hero/
│   │   └── WebThreads/
│   ├── MovieLists/
│   │   ├── Carousel/
│   │   │   └── Card/
│   │   ├── Featured/
│   │   └── SearchBar/
│   └── Navbar/
├── context/
│   ├── Lists.tsx
│   └── ListsContext.ts
├── pages/
│   ├── Home.tsx
│   └── MovieDetail/
├── App.tsx
├── main.tsx
└── index.css
```

Cada componente fica na própria pasta ao lado da sua folha de estilo, de modo
que o CSS permaneça restrito ao componente que o usa. Os tokens de design
(cores) são declarados uma única vez em `:root`, no `index.css`.

## 3. Páginas e Rotas

| Página              | Rota         | Objetivo                                                              |
| ------------------- | ------------ | --------------------------------------------------------------------- |
| Home                | `/`          | Apresentar o hero, o filme em destaque e todas as trilhas de filmes.   |
| Detalhes do filme   | `/movie/:id` | Exibir as informações completas do filme identificado por `:id`.       |

`Navbar` e `ListsProvider` são renderizados fora de `<Routes>`, para que a
barra permaneça na tela e as listas do usuário não se percam ao trocar de rota.

## 4. Componentes

| Componente    | Responsabilidade                                                                                   | Props                                 |
| ------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `Navbar`      | Navegação fixa no topo.                                                                             | —                                     |
| `Hero`        | Seção inicial de altura total, com o fundo animado e o título do site.                               | —                                     |
| `WebThreads`  | Animação de fundo em WebGL renderizada em um canvas.                                                 | cores, velocidade, nº de fios etc.    |
| `MovieLists`  | Layout da página: define quais trilhas existem e qual endpoint cada uma usa.                         | —                                     |
| `SearchBar`   | Campo de busca.                                                                                      | —                                     |
| `Featured`    | Busca a lista de populares, sorteia um filme e o renderiza como card grande.                         | —                                     |
| `Carousel`    | Renderiza uma trilha horizontal com título. Busca pelo `path` ou exibe a `list` recebida.             | `title`, `path?`, `list?`             |
| `Card`        | Renderiza um filme como card e leva à sua página de detalhes.                                         | `movie`                               |
| `MovieDetail` | Lê o `:id` da rota, busca o filme e renderiza o registro completo.                                    | —                                     |

`Carousel` aceita ou um `path` (busque este endpoint) ou uma `list` (renderize
estes filmes). É isso que permite às trilhas de interesse e de assistidos
reaproveitarem o mesmo componente das trilhas vindas do TMDB.

## 5. Estado da Aplicação

| Estado                       | Onde será controlado?                | Por quê?                                                                                                          |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Filmes de uma trilha          | `useMovies` dentro de cada `Carousel` | Cada trilha é independente; manter o estado local faz com que adicionar uma trilha custe uma linha e nenhuma ligação extra. |
| Filme em destaque             | `Featured` (sorteio no escopo do módulo) | A escolha precisa ser estável entre renderizações e nova a cada recarregamento, então é calculada uma vez, na carga do módulo. |
| Lista de interesse e assistidos | `ListsProvider` (Context do React)  | São lidas e escritas pelos cards, pelo destaque e pela página de detalhes, em duas rotas — distantes demais para props. |
| Detalhes do filme selecionado | `useMovie` dentro de `MovieDetail`    | Pertence a uma única página e é indexado pelo parâmetro da rota; nenhum outro componente precisa dele.              |
| Rota / página atual           | React Router                          | Derivada da URL em vez de armazenada, para que os links e o botão voltar do navegador funcionem.                    |

## 6. useEffect

| Efeito                        | Quando acontece?                                     | O que faz?                                                                                     |
| ----------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Buscar uma lista (`useMovies`) | Na montagem e sempre que o `path` mudar.             | Chama `getMovies(path)` e guarda o resultado, registrando eventuais falhas no console.            |
| Buscar um filme (`useMovie`)   | Na montagem e sempre que o `:id` mudar.              | Limpa o filme anterior, chama `getMovie(id)` e guarda o filme ou a mensagem de erro.              |

Os dois efeitos declaram a dependência explicitamente, em vez de usar um array
vazio, para que navegar de um filme a outro dispare nova busca em vez de exibir
dados desatualizados. Nenhuma das buscas é feita no corpo do componente: o
corpo precisa permanecer puro, e os efeitos são a saída prevista para efeitos
colaterais.

## 7. Dependências

| Biblioteca           | Uso                                        | Motivo                                                                                            |
| -------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `react`, `react-dom` | Modelo de componentes e renderização no DOM. | Base da aplicação.                                                                                  |
| `react-router-dom`   | Roteamento no cliente.                       | Necessário para duas páginas e para uma rota com parâmetro (`/movie/:id`) com botão voltar funcional. |
| `react-icons`        | Ícones da interface.                         | Fornece os ícones de lista, assistido e voltar sem adicionar arquivos de imagem.                     |
| `ogl`                | Renderização WebGL do fundo do hero.         | O fundo animado de fios é um shader; `ogl` é a camada WebGL mínima que ele exige.                    |
| `vite`               | Servidor de desenvolvimento e build.         | Servidor rápido com hot reload; gera a saída empacotada em `dist/`.                                  |
| `typescript`         | Verificação estática de tipos.                | Descreve o formato das respostas do TMDB, expondo campos ausentes ou nulos antes da execução.        |
| `eslint`             | Análise estática de código.                   | Detecta violações como hooks chamados condicionalmente.                                             |

O token de leitura do TMDB é fornecido pela variável de ambiente
`VITE_TMDB_TOKEN` e não é versionado. Vale registrar que um token usado a
partir do navegador fica visível para quem inspecionar o bundle; escondê-lo
exigiria um proxy no backend, o que está fora do escopo deste projeto.
