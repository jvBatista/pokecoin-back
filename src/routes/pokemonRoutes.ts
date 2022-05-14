import { Router, Request, Response } from "express";
import PokemonController from "../controllers/pokemonController";

const pokemonRoutes = Router();

const pokemonController = new PokemonController();

pokemonRoutes.post("/", (req: Request, res: Response)=>{
    pokemonController.createPokemon(req, res);
});

pokemonRoutes.get("/", (req: Request, res: Response)=>{
    pokemonController.getPokemons(req, res);
});

pokemonRoutes.get("/:id", (req: Request, res: Response)=>{
    pokemonController.getOnePokemon(req, res);
});

pokemonRoutes.patch("/:id", (req: Request, res: Response)=>{
    pokemonController.updatePokemon(req, res);
});

pokemonRoutes.delete("/:id", (req: Request, res: Response)=>{
    pokemonController.deletePokemon(req, res);
});

export default pokemonRoutes;