import {Router} from "express";
import tradeRoutes from "./routes/tradeRoutes";
import pokemonRoutes from "./routes/pokemonRoutes";

const router = Router();

router.use("/pokemon", pokemonRoutes);
router.use("/trade", tradeRoutes);

export default router;