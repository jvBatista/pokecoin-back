import { Request, Response } from "express";
import { Types } from "mongoose";
import Trade from "../schemas/tradeSchema";

export default class TradeController {
    createTrade = async (req: Request, res: Response) => {
        try {
            if (!req.body.pokemon || !req.body.type || !req.body.value || !req.body.date) return res.status(400).json({
                message: 'Falha ao criar a transação, parametros não informados',
            });

            const newTrade = await Trade.create(req.body);

            res.status(200).json(newTrade);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    };

    getTrades = async (req: Request, res: Response) => {
        try {
            const data = await Trade.find();

            if (!data) return res.status(404).send({ error: "Nenhuma transação foi encontrada" });

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Falha ao processar a requisição" });
        }
    };

    deleteTrade = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!Types.ObjectId.isValid(id)) return res.status(400).json({
                message: 'Falha ao deletar a transação, id informado inválido',
            });

            const trade = await Trade.findByIdAndDelete(id);

            if (!Trade) return res.status(404).send({ error: "transação não encontrada" });

            res.status(200).json({ message: "Transação deletada com sucesso!", Trade });
        } catch (error) {
            res.status(400).json({ message: "Falha ao deletar a transação" });
        }
    };
};