import type { Request, Response } from "express";
import { ProviderService } from "../Services/providerService";

// Service instance used to perform provider-related business logic and data access.
const providerService = new ProviderService();

/**
 * Controller that handles HTTP requests for Provider resources.
 *
 * Each method maps to a standard RESTful operation and uses `providerService`
 * to perform the underlying work. Methods send appropriate HTTP status codes
 * and JSON responses for success and error cases.
 */
export class ProviderController {
  /**
   * Create a new provider.
   * - Expects provider data in the request body.
   * - Returns `201 Created` with the created provider on success.
   * - Returns `400 Bad Request` when creation fails (validation, bad input).
   */
  async create(req: Request, res: Response) {
    try {
      const provider = await providerService.createProvider(req.body);
      res.status(201).json(provider);
    } catch (error) {
      // Surface the error message for client debugging (keep simple for now).
      res.status(400).json({ message: (error as Error).message });
    }
  }

  /**
   * Retrieve all providers.
   * - Returns `200 OK` with an array of providers.
   * - Returns `500 Internal Server Error` on unexpected failures.
   */
  async getAll(req: Request, res: Response) {
    try {
      const providers = await providerService.getAllProviders();
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  /**
   * Retrieve a provider by ID.
   * - Expects `id` to be present in `req.params`.
   * - Returns `400 Bad Request` when `id` is missing.
   * - Returns `404 Not Found` when no provider matches the ID.
   * - Returns `200 OK` with the provider when found.
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Provider ID is required" });
      }

      const provider = await providerService.getProviderById(id);

      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }

      res.json(provider);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  /**
   * Update an existing provider by ID.
   * - Expects `id` in `req.params` and updated data in `req.body`.
   * - Returns `400 Bad Request` when `id` is missing or update fails.
   * - Returns `404 Not Found` when trying to update a non-existent provider.
   * - Returns `200 OK` with the updated provider when successful.
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Provider ID is required" });
      }

      const provider = await providerService.updateProvider(id, req.body);

      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }

      res.json(provider);
    } catch (error) {
      // On update errors (validation or bad input) return 400.
      res.status(400).json({ message: (error as Error).message });
    }
  }

  /**
   * Delete a provider by ID.
   * - Expects `id` in `req.params`.
   * - Returns `400 Bad Request` when `id` is missing.
   * - Returns `404 Not Found` when provider doesn't exist.
   * - Returns `204 No Content` on successful deletion.
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Provider ID is required" });
      }

      const provider = await providerService.deleteProvider(id);

      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }

      // Resource deleted successfully; no content returned.
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
