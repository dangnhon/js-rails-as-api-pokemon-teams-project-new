const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


let allPokemons = [] 

fetchPokemons() 
fetchTrainers()

function fetchPokemons() {
    fetch(POKEMONS_URL) 
    .then(resp => resp.json()) 
    .then(pokemons => {allPokemons = pokemons})
}

function fetchTrainers() {
    fetch(TRAINERS_URL) 
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(trainer => renderTrainer(trainer))
)}

function renderTrainer(trainer) {
    
    let div = document.createElement('div') 
    div.className = "card"
    div.setAttribute('data-id' , trainer.id)

    let p = document.createElement('p')
    p.textContent = trainer.name

    let addBtn = document.createElement("button")
    addBtn.setAttribute('data-trainer-id', trainer.id)
    addBtn.textContent = "Add Pokemon"

    let pokemonUl = document.createElement("ul")
    
    filterPokemon = allPokemons.filter (pokemon => pokemon.trainer_id === trainer.id)

    filterPokemon.forEach(function(pokemon){
        let pokemonLi = document.createElement('li')
        pokemonLi.textContent = `${pokemon.nickname} (${pokemon.species})` 
        pokemonLi.className = pokemon.id 

        let releaseBtn = document.createElement('button') 
        releaseBtn.className = "release"
        releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
        releaseBtn.textContent = "Release"

        releaseBtn.addEventListener('click', () => deletePokemon(pokemon)) 

        pokemonLi.append(releaseBtn) 
        pokemonUl.append(pokemonLi)
    })

    div.append(p, addBtn, pokemonUl)
    let mainBody = document.querySelector('main')
    mainBody.append(div)

}

function deletePokemon(pokemon) {
    // fetch a delete request
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
        document.getElementsByClassName(`${pokemon.id}`)[0].remove()

    })
}

// only have to create the 'addPokemon functions' 