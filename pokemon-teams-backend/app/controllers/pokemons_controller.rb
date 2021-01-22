class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all 
        render json: pokemons
    end 

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: { id: pokemon.id, species: pokemon.species, nickname: pokemon.nickname, trainer_id: pokemon.trainer_id }
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        render json: { id: pokemon.id, species: pokemon.species, nickname: pokemon.nickname, trainer_id: pokemon.trainer_id }
    end 
end
