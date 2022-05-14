import { Router, Request, Response } from "express";
import TradeController from "../controllers/tradeController";

const tradeRoutes = Router();

const tradeController = new TradeController();

tradeRoutes.post("/", (req: Request, res: Response)=>{
    tradeController.createTrade(req, res);
});

tradeRoutes.get("/", (req: Request, res: Response)=>{
    tradeController.getTrades(req, res);
});

tradeRoutes.delete("/:id", (req: Request, res: Response)=>{
    tradeController.deleteTrade(req, res);
});

export default tradeRoutes;