import { Request, Response } from "express";
import { SaleService } from "../services/sale.service";
import { validateRequest } from "../middlewares/validation.middleware";
import { CreateSaleRequest } from "../requests/create-sale-request";
import { UpdateSaleRequest } from "../requests/update-sale.request";

export const SaleController = {
  createSale: [
    validateRequest(CreateSaleRequest),
    async (req: Request, res: Response): Promise<void> => {
      const userId = (req as any).user.id;
      const response = await SaleService.createSale({
        ...req.body,
        createdByUserId: userId,
        updatedByUserId: userId,
      });
      res.status(response.status).json(response);
    },
  ],

  getSaleById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const response = await SaleService.getSaleById(id);
    res.status(response.status).json(response);
  },

  updateSale: [
    validateRequest(UpdateSaleRequest),
    async (req: Request, res: Response): Promise<void> => {
      const userId = (req as any).user.id;
      const { id } = req.params;
      const response = await SaleService.updateSale(
        id,
        {
          ...req.body,
          updated_by_user_id: userId,
        }
      );
      res.status(response.status).json(response);
    },
  ],

  deleteSale: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const response = await SaleService.deleteSale(id);
    res.status(response.status).json(response);
  },

  getAllSales: async (req: Request, res: Response): Promise<void> => {
    const response = await SaleService.getAllSales();
    res.status(response.status).json(response);
  },
};