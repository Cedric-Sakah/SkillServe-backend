import type { Request, Response } from "express";
import { ProviderService } from "../Services/providerService";
import { MongoServerError } from "mongodb";
import type { IProvider } from "../Models/Provider";

export class ProviderController {
  constructor(private providerService: ProviderService) {}

  // Create a new provider
  async create(req: Request, res: Response) {
    try {
      const provider = await this.providerService.createProvider(req.body);
      res.status(201).json(provider);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Invalid input data", details: error.errors });
      }

      if ((error as MongoServerError)?.code === 11000) {
        return res.status(409).json({ message: "Provider with this email already exists" });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Retrieve all providers with pagination and optional sorting
  async getAll(req: Request, res: Response) {
    try {
      const page = Math.max(parseInt(req.query.page as string) || 1, 1);
      const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);
      const sortBy = (req.query.sortBy as string) || "createdAt";
      const order = (req.query.order as string) === "desc" ? "desc" : "asc";

      const result = await this.providerService.getAllProviders(
        page,
        limit,
        sortBy as keyof IProvider,
        order as "asc" | "desc"
      );

      const totalPages = Math.ceil(result.total / limit);

      res.json({
        data: result.data,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Retrieve a single provider by ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Provider ID is required" });

      const provider = await this.providerService.getProviderById(id);
      if (!provider) return res.status(404).json({ message: "Provider not found" });

      res.json(provider);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update an existing provider
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Provider ID is required" });

      const provider = await this.providerService.updateProvider(id, req.body);
      if (!provider) return res.status(404).json({ message: "Provider not found" });

      res.json(provider);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: "Invalid input data", details: error.errors });
      }

      if ((error as MongoServerError)?.code === 11000) {
        return res.status(409).json({ message: "Provider with this email already exists" });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a provider
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Provider ID is required" });

      const provider = await this.providerService.deleteProvider(id);
      if (!provider) return res.status(404).json({ message: "Provider not found" });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
