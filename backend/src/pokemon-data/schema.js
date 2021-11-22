import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: String,
    imageUrl: String
}, {
    timestamps: {}
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export { Pokemon };