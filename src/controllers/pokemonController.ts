import { Request, Response } from "express";
import { Types } from "mongoose";
import Pokemon from "../schemas/pokemonSchema";

export default class PokemonController {
    createPokemon = async (req: Request, res: Response) => {
        try {
            if (!req.body.name || !req.body.pokemonId || !req.body.base_experience) return res.status(400).json({
                message: 'Falha ao criar a Pokemon, parametros não informados',
            });

            const newPokemon = await Pokemon.create(req.body);

            res.status(200).json(newPokemon);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    };

    getPokemons = async (req: Request, res: Response) => {
        try {
            const entries = Object.entries(req.query);
            const nonEmptyOrNull = entries.filter(
                ([, val]) => val !== '' && val !== null
            );
            const query = Object.fromEntries(nonEmptyOrNull);

            const data = await Pokemon.find(query);

            if (!data) return res.status(404).send({ error: "Nenhum pokemon foi encontrado" });

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Falha ao processar a requisição" });
        }
    };

    getOnePokemon = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!Types.ObjectId.isValid(id)) return res.status(400).json({
                message: 'Pokemon não encontrado, id informado inválido',
            });

            const pokemon = await Pokemon.findById(id);

            if (!Pokemon) return res.status(404).send({ error: "Pokemon não encontrado" });

            res.status(200).json(pokemon);
        } catch (error) {
            res.status(500).json({ message: "Falha ao processar a requisição" });
        }
    };

    updatePokemon = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { quantity } = req.body;

            if (!Types.ObjectId.isValid(id)) return res.status(400).json({
                message: 'Pokemon não foi atualizado, id informado inválido',
            });

            const pokemon = await Pokemon.findByIdAndUpdate(id, { quantity });

            if (!pokemon) return res.status(404).send({ error: "Pokemon não encontrado" });

            res.status(200).json({ message: 'Pokemon atualizado com sucesso' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Falha ao processar a requisição" });
        }
    };

    deletePokemon = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!Types.ObjectId.isValid(id)) return res.status(400).json({
                message: 'Pokemon não foi deletado, id informado inválido',
            });

            const pokemon = await Pokemon.findByIdAndDelete(id);

            if (!pokemon) return res.status(404).send({ error: "Pokemon não encontrado" });

            res.status(200).json({ message: "Pokemon deletado com sucesso!", pokemon });
        } catch (error) {
            res.status(400).json({ message: "Falha ao deletar a Pokemon" });
        }
    };
};