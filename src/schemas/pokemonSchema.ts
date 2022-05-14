import { Schema, model, Document } from "mongoose";

interface IPokemon extends Document {
    pokemonId: Number,
    name: String,
    quantity: Number,
    base_experience: Number,
}

const pokemonSchema = new Schema<IPokemon>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    pokemonId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    },
    base_experience: {
        type: Number,
        required: true
    }
});

export default model<IPokemon>("Pokemon", pokemonSchema);