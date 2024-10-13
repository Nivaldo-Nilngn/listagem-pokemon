const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    const liElement = document.createElement('li');
    liElement.className = `pokemon ${pokemon.type}`;
    liElement.innerHTML = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    `;

    liElement.addEventListener('click', () => {
        showPokemonDetails(pokemon.number); // Call showPokemonDetails with the Pokémon's number
    });

    return liElement;
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons); // Verifique a estrutura dos dados retornados
        pokemons.forEach(pokemon => {
            const liElement = convertPokemonToLi(pokemon);
            pokemonList.appendChild(liElement);
        });
    });
}

const typeWeaknesses = {
    normal: ['fighting'],
    fighting: ['flying', 'psychic', 'fairy', 'ghost'],
    flying: ['electric', 'ice', 'rock'],
    poison: ['psychic', 'ground'],
    ground: ['water', 'ice', 'grass'],
    rock: ['fighting', 'ground', 'steel', 'water', 'grass'],
    bug: ['fire', 'flying', 'rock', 'bug', 'fairy'],
    ghost: ['ghost', 'dark'],
    steel: ['fire', 'fighting', 'ground'],
    fire: ['water', 'rock', 'ground'],
    water: ['electric', 'grass'],
    grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
    electric: ['ground'],
    psychic: ['bug', 'ghost', 'dark'],
    ice: ['fire', 'fighting', 'rock', 'steel'],
    dragon: ['ice', 'fairy', 'dragon'],
    dark: ['fighting', 'bug', 'fairy'],
    fairy: ['poison', 'steel'],
    // Adicione outros tipos e suas fraquezas aqui
};

function getWeaknesses(types) {
    const weaknesses = new Set();

    types.forEach(type => {
        if (typeWeaknesses[type]) {
            typeWeaknesses[type].forEach(weakness => weaknesses.add(weakness));
        }
    });

    return Array.from(weaknesses);
}
const pokemonImages = {
    normal: `./assets/img/normal.png`,
    fighting: `./assets/img/fighting.png`,
    flying: `./assets/img/flying.png`,
    poison: `./assets/img/poison.png`,
    ground: `./assets/img/ground.png`,
    rock: `./assets/img/rock.png`,
    bug: `./assets/img/bug.png`,
    ghost: `./assets/img/ghost.png`,
    steel: `./assets/img/steel.png`,
    fire: `./assets/img/fire.png`,
    water: `./assets/img/water.png`,
    grass: `./assets/img/grass.png`,
    electric: `./assets/img/electric.png`,
    psychic: `./assets/img/psychic.png`,
    ice: `./assets/img/ice.png`,
    dragon: `./assets/img/dragon.png`,
    dark: `./assets/img/dark.png`,
    fairy: `./assets/img/fairy.png`,
};

function showPokemonDetails(pokemonNumber) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name);

            const modalElement = document.getElementById('pokemonModal');
            const backgroundElement = document.querySelector('.modal-background');

            // Remover classes antigas de fundo
            const typeClasses = [
                'grass-type', 'fire-type', 'water-type', 'bug-type',
                'electric-type', 'psychic-type', 'ice-type', 'dragon-type',
                'dark-type', 'fairy-type', 'fighting-type', 'flying-type',
                'poison-type', 'ground-type', 'rock-type', 'ghost-type', 'steel-type'
            ];

            typeClasses.forEach(typeClass => modalElement.classList.remove(typeClass));

            // Definir o tipo principal e secundário (se houver)
            const primaryType = pokemonTypes[0]; // Tipo primário
            const secondaryType = pokemonTypes[1]; // Tipo secundário (se existir)

            // Adicionar a classe do tipo principal
            modalElement.classList.add(`${primaryType}-type`);

            // Atualizar a imagem de fundo baseado no tipo secundário ou no primário
            if (secondaryType) {
                // Se existir um segundo tipo, usar a imagem do segundo tipo
                backgroundElement.style.backgroundImage = `url(${pokemonImages[secondaryType]})`;
            } else {
                // Se não houver segundo tipo, usar a imagem do primeiro tipo ou a imagem padrão
                const backgroundImage = pokemonImages[primaryType] || pokemonImages.normal;
                backgroundElement.style.backgroundImage = `url(${backgroundImage})`;
            }

            // Preencher detalhes do Pokémon
            document.getElementById('modalPokemonName').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.getElementById('modalPokemonNumber').textContent = `Nº${data.id}`;
            document.getElementById('modalPokemonWeight').textContent = (data.weight / 10).toFixed(1);
            document.getElementById('modalPokemonHeight').textContent = (data.height / 10).toFixed(1);
            document.getElementById('modalPokemonAbility').textContent = data.abilities.map(ability => ability.ability.name).join(', ');
            document.getElementById('modalPokemonImage').src = data.sprites.other['official-artwork'].front_default;

            // Exibir os tipos
            const type1Element = document.getElementById('modalPokemonType1');
            const type2Element = document.getElementById('modalPokemonType2');

            // Limpar o conteúdo anterior
            type1Element.innerHTML = '';
            type2Element.innerHTML = '';

            // Adicionar tipo 1
            if (primaryType) {
                const type1Icon = `<img src="${pokemonImages[primaryType]}" alt="${primaryType} type" class="type-icon">`;
                type1Element.innerHTML = `${type1Icon} ${primaryType.charAt(0).toUpperCase() + primaryType.slice(1)}`;
                type1Element.className = `type ${primaryType}`;
            }

            // Adicionar tipo 2, se existir
            if (secondaryType) {
                const type2Icon = `<img src="${pokemonImages[secondaryType]}" alt="${secondaryType} type" class="type-icon">`;
                type2Element.innerHTML = `${type2Icon} ${secondaryType.charAt(0).toUpperCase() + secondaryType.slice(1)}`;
                type2Element.className = `type ${secondaryType}`;
            } else {
                type2Element.innerHTML = '';
            }

            // Obter fraquezas e exibi-las
            const weaknesses = getWeaknesses(pokemonTypes);
            const weaknessesContainer = document.querySelector('.pokemon-weaknesses');
            weaknessesContainer.innerHTML = '';
            if (weaknesses.length > 0) {
                weaknessesContainer.innerHTML += '<h3>Fraquezas</h3>';
                weaknessesContainer.innerHTML += weaknesses.map(weakness => `<span class="weakness">${weakness.charAt(0).toUpperCase() + weakness.slice(1)}</span>`).join(' ');
            } else {
                weaknessesContainer.innerHTML += '<h3>Fraquezas</h3><span>Nenhuma fraqueza conhecida</span>';
            }

            // Carregar a cadeia de evolução
            loadEvolutionChain(data.species.url);

            // Mostrar a modal
            modalElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao obter detalhes do Pokémon:', error);
        });
}



function loadEvolutionChain(speciesUrl) {
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            // Verifique a estrutura de speciesData
            console.log('Species Data:', speciesData);

            // Checar se a URL da cadeia de evolução existe
            if (speciesData.evolution_chain && speciesData.evolution_chain.url) {
                return fetch(speciesData.evolution_chain.url);
            } else {
                throw new Error('Evolução não disponível para esta espécie.');
            }
        })
        .then(response => response.json())
        .then(evolutionData => {
            // Verifique a estrutura da evolutionData
            console.log('Evolution Data:', evolutionData);
            
            const evolutionChain = document.getElementById('evolutionChain');
            evolutionChain.innerHTML = ''; // Limpa a cadeia anterior

            // Função para percorrer a cadeia de evolução
            let evolution = evolutionData.chain;

            while (evolution) {
                // Verifique se a propriedade species existe
                const pokemonSpecies = evolution.species;
                if (pokemonSpecies) {
                    const pokemonName = pokemonSpecies.name;
                    const pokemonId = pokemonSpecies.url.split('/').slice(-2, -1)[0];

                    // Criar o elemento de evolução
                    const evolutionItem = document.createElement('div');
                    evolutionItem.classList.add('evolution-item');
                    evolutionItem.innerHTML = `
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" alt="${pokemonName}">
                        <p>${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)} Nº${pokemonId}</p>
                        ${evolution.evolves_to.length > 0 ? `<p>Nível ${evolution.evolves_to[0].evolution_details[0]?.min_level || 'Desconhecido'}</p>` : ''}
                    `;

                    // Adicionar ao contêiner de evolução
                    evolutionChain.appendChild(evolutionItem);
                } else {
                    console.warn('Pokemon species não encontrado na evolução:', evolution);
                }

                // Avançar para a próxima evolução
                evolution = evolution.evolves_to[0];
            }
        })
        .catch(error => {
            console.error('Erro ao obter a cadeia de evolução:', error);
        });
}



loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

document.getElementById('pokemonModal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePokemonModal();
    }
});

function closePokemonModal() {
    document.getElementById('pokemonModal').style.display = 'none';
}
