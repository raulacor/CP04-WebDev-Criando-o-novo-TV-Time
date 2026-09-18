# Requirements — TV Time

## 1. Visão do Produto

### Nome

TV Time

### Problema

Escolher o que assistir demora mais do que deveria. Os catálogos de streaming
estão fragmentados, então descobrir o que está em alta hoje exige abrir vários
serviços, e não existe um lugar simples para guardar uma lista curta de filmes
que se pretende assistir e registrar os que já foram vistos. A maioria dos
sites de catálogo é otimizada para navegar indefinidamente, e não para chegar a
uma decisão.

### Público

Espectadores casuais que acompanham o que está em alta e querem uma forma
rápida e sem fricção de decidir o que assistir em seguida, além de manter a
própria lista — sem criar conta e sem pagar nada.

### Proposta de solução

Uma aplicação web de página única que consome dados em tempo real do The Movie
Database (TMDB) e os apresenta em um número reduzido de trilhas horizontais:
um filme em destaque escolhido aleatoriamente, além de Highlights, Trending e
Top Rated. Cada filme pode ser aberto para ver detalhes completos, adicionado a
uma lista pessoal ou marcado como assistido, sem sair da página. A interface é
deliberadamente enxuta para que a decisão — o que assistir — seja tomada
rapidamente.

## 2. Objetivo do MVP

Ao final do projeto, a aplicação precisa:

- Buscar e exibir dados de filmes em tempo real a partir da API do TMDB.
- Exibir um filme em destaque escolhido aleatoriamente a cada carregamento.
- Renderizar pelo menos três trilhas navegáveis de filmes.
- Abrir uma página de detalhes para qualquer filme selecionado, em rota própria.
- Permitir adicionar um filme à lista de interesse e marcá-lo como assistido,
  mantendo as duas listas enquanto o usuário navega entre as páginas.

## 3. Funcionalidades

### F01 — Trilhas de filmes (carrosséis)

**Descrição:** Exibe filmes vindos de um endpoint do TMDB em uma trilha
horizontal de cards. Cada trilha é independente e define o próprio endpoint,
de modo que adicionar uma nova trilha custa uma única linha em `MovieLists`.

**Critérios de aceitação:**

- [x] Cada trilha busca a própria lista no TMDB e renderiza um card por filme.
- [x] O card exibe pôster, título, data de lançamento, sinopse truncada e gênero.
- [x] A trilha rola horizontalmente com pontos de encaixe e sem barra visível.
- [x] Um filme sem pôster exibe um texto alternativo no lugar da imagem quebrada.

**Estados:**

- [x] Inicial
- [x] Carregando
- [x] Sucesso
- [x] Vazio
- [x] Erro

### F02 — Filme em destaque

**Descrição:** Um card grande no topo da seção de listas exibindo um filme
sorteado da lista de populares, apresentado sobre a imagem de fundo do próprio
filme. A escolha permanece estável enquanto a página está aberta e muda a cada
recarregamento.

**Critérios de aceitação:**

- [x] Um filme é sorteado a cada carregamento da página.
- [x] A escolha não muda quando o componente é renderizado novamente.
- [x] O card usa o `backdrop_path`, recorrendo ao pôster quando ele não existe.
- [x] Um gradiente sobreposto mantém o texto legível sobre qualquer imagem.
- [x] O título leva à página de detalhes daquele filme.

**Estados:**

- [x] Inicial
- [x] Carregando
- [x] Sucesso
- [x] Vazio
- [x] Erro

### F03 — Listas pessoais (quero assistir e assistidos)

**Descrição:** Dois botões em cada card permitem adicionar o filme à lista de
interesse ou marcá-lo como assistido. As duas listas ficam no Context do React,
para que qualquer componente de qualquer página possa lê-las e atualizá-las, e
são devolvidas ao usuário como duas trilhas adicionais.

**Critérios de aceitação:**

- [x] Clicar no botão adiciona ou remove o filme da lista correspondente.
- [x] O botão reflete o estado atual por meio da cor.
- [x] Clicar no botão não navega para a página de detalhes.
- [x] As duas listas sobrevivem à navegação entre a home e a página de detalhes.
- [ ] As duas listas sobrevivem ao recarregamento da página (exigiria armazenamento no navegador).

**Estados:**

- [x] Inicial
- [x] Sucesso
- [x] Vazio

### F04 — Página de detalhes do filme

**Descrição:** Uma rota dedicada que exibe informações ampliadas de um filme,
buscadas no endpoint de detalhe do TMDB, que retorna campos ausentes nos
endpoints de listagem: duração, tagline, status e gêneros com nome.

**Critérios de aceitação:**

- [x] A rota `/movie/:id` renderiza o filme correspondente ao id da URL.
- [x] A página exibe imagem de fundo, pôster, título, tagline, nota, número de
      votos, ano, duração, status, gêneros e a sinopse completa.
- [x] Um estado de carregamento é exibido enquanto a requisição está em curso.
- [x] Uma requisição com falha exibe mensagem de erro e um link de volta à home.
- [x] Os botões de lista e de assistido também estão disponíveis nesta página.

**Estados:**

- [x] Inicial
- [x] Carregando
- [x] Sucesso
- [x] Erro

### F05 — Busca

**Descrição:** Um campo de busca que filtra o catálogo por título usando o
endpoint de busca do TMDB. O campo já existe na interface; a consulta ainda não
está ligada a uma requisição.

**Critérios de aceitação:**

- [x] Um campo de busca é exibido acima das trilhas de filmes.
- [x] O campo mostra um sublinhado animado quando recebe foco.
- [ ] Digitar um termo busca resultados no endpoint de busca do TMDB.
- [ ] Os resultados substituem as trilhas enquanto houver uma busca ativa.
- [ ] Limpar o campo restaura as trilhas padrão.

**Estados:**

- [x] Inicial
- [ ] Carregando
- [ ] Sucesso
- [ ] Vazio
- [ ] Erro

## 4. Fora do Escopo

- Contas de usuário, autenticação e persistência no servidor.
- Reprodução de vídeo, trailers ou links para serviços de streaming.
- Notas, avaliações ou comentários escritos por usuários.
- Séries de TV; a aplicação cobre apenas filmes.
- Paginação ou rolagem infinita além da primeira página de cada endpoint.
- Internacionalização; todas as requisições usam `language=en-US`.
