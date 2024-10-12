# ![Pokédex](https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg)

_Bem-vindo à sua própria Pokédex interativa!_

Aqui, você pode explorar e conhecer todos os seus Pokémons favoritos da **primeira geração** (até o número 151)! Este projeto traz uma interface intuitiva para visualização dos Pokémons, diretamente da PokéAPI.

Você pode acessar a Pokédex interativa [aqui](https://nivaldo-nilngn.github.io/pokedex/).

## 🚀 Funcionalidades

- 🔍 **Exibição detalhada** dos Pokémons (imagem, número e tipos).
- ➕ **Carregamento progressivo** dos Pokémons com o botão "Carregar Mais".
- 📱 **Design responsivo**: adaptado para dispositivos móveis, tablets e desktop.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Para a estrutura da página.
- **CSS3**: Para o estilo e design da interface.
- **JavaScript (ES6+)**: Para a lógica de carregamento e exibição dos Pokémons.
- **PokéAPI**: Para obter as informações detalhadas dos Pokémons.

## 🎮 Como Jogar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/pokedex.git

2. **Navegue até a pasta do projeto**:
   ````bash
   cd pokedex

3. **Abra o arquivo index.html no navegador**:
- No terminal execute:
   ````bash 
   open index.html
- Ou simplesmente arraste o arquivo para uma nova aba do navegador.


Explore a Pokédex! Você pode carregar mais Pokémons clicando no botão "Carregar mais" até o número 151!

## 🌟 Estilo e Design

A Pokédex foi criada com um design limpo e minimalista, inspirado nos jogos clássicos de Pokémon. Cores vibrantes são utilizadas para representar os diferentes tipos de Pokémon:

- 🟩 Grass
- 🟥 Fire
- 🟦 Water
- 🟨 Electric
E muitos outros!

## 📱 Responsividade

A interface adapta-se de maneira fluida em diferentes tamanhos de tela:

| Resolução         | Número de Colunas |
|--------------------|-------------------|
| < 380px            | 1                 |
| 380px - 576px     | 2                 |
| 576px - 992px     | 3                 |
| > 992px            | 4                 |

## ⚙️ Detalhes Técnicos

A função que realiza o carregamento dos Pokémons é a `loadPokemonItens()`. Ela faz chamadas à PokéAPI para obter as informações e renderizar os Pokémons no formato de lista.

### Exemplo de Conversão de Pokémon para HTML:

```javascript
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}
```


Essa função converte os detalhes de cada Pokémon em um item de lista `<li>` contendo o nome, número, tipos e imagem do Pokémon.


## 📅 Melhorias Futuras

- **Busca por nome ou número**: Adicionar uma barra de pesquisa para filtrar Pokémons.
- **Filtro por tipo**: Permitir filtragem de Pokémons por tipo, como "Fire", "Water", etc.
- **Paginação aprimorada**: Melhorar a navegação entre as páginas de Pokémons.

## 🤝 Contribuições

Contribuições são muito bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto.

