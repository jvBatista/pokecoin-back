import { Schema, model, Document } from "mongoose";

interface ITrade extends Document {
    type: String,
    pokemon: String,
    value: number,
    date: Date,
};

const tradeSchema = new Schema<ITrade>({
    type: {
        type: String,
        required: true,
        trim: true
    },
    pokemon: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: Number,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    }
});

export default model<ITrade>("Trade", tradeSchema);