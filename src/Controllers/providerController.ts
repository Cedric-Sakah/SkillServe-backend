import type { Request, Response } from 'express';
import { ProviderService } from '../Services/providerService';

const providerService = new ProviderService();

export class ProviderController {
  async create(req: Request, res: Response) {
    try {
      const provider = await providerService.createProvider(req.body);
      res.status(201).json(provider);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const providers = await providerService.getAllProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Provider ID is required" });
      }

      const provider = await providerService.getProviderById(id);

      if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
      }

      res.json(provider);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Provider ID is required" });
      }

      const provider = await providerService.updateProvider(id, req.body);

      if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
      }

      res.json(provider);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Provider ID is required" });
      }

      const provider = await providerService.deleteProvider(id);

      if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
