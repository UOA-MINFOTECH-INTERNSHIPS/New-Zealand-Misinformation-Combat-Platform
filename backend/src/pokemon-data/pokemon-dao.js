import { Pokemon } from './schema';

async function createPokemon(pokemon) {

    const dbPokemon = new Pokemon(pokemon);
    await dbPokemon.save();
    return dbPokemon;
}

async function retrievePokemonList() {
    return await Pokemon.find();
}

async function retrievePokemon(id) {
    return await Pokemon.findById(id);
}

async function updatePokemon(pokemon) {

    const dbPokemon = await Pokemon.findById(pokemon._id);
    if (dbPokemon) {

        dbPokemon.name = pokemon.name;
        dbPokemon.imageUrl = pokemon.imageUrl;

        await dbPokemon.save();
        return true;
    }

    return false;
}

async function deletePokemon(id) {
    await Pokemon.deleteOne({ _id: id });
}

async function deleteAllPokemon() {
    await Pokemon.deleteMany({});
}

export {
    createPokemon,
    retrievePokemonList,
    retrievePokemon,
    updatePokemon,
    deletePokemon,
    deleteAllPokemon
}