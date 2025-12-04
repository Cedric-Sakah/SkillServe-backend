import { Provider } from "../Models/Provider";
import type { IProvider } from "../Models/Provider";

/**
 * Service layer for Provider operations.
 *
 * Responsible for data access and simple business rules. Controllers should
 * call these methods and handle HTTP concerns (status codes, request/response).
 */
export class ProviderService {
  /**
   * Create and persist a new provider document.
   * - `data` may be a partial provider; required fields are enforced by Mongoose.
   * - Returns the saved provider document.
   */
  async createProvider(data: Partial<IProvider>): Promise<IProvider> {
    const provider = new Provider(data);
    return provider.save();
  }

  /**
   * Retrieve all providers.
   * - Returns an array of provider documents. Consider adding pagination
   *   for large datasets in the future.
   */
  async getAllProviders(): Promise<IProvider[]> {
    return Provider.find();
  }

  /**
   * Find a provider by its MongoDB ObjectId string.
   * - Returns the provider document or `null` if not found.
   */
  async getProviderById(id: string): Promise<IProvider | null> {
    return Provider.findById(id);
  }

  /**
   * Update a provider by id with the provided data.
   * - `new: true` option returns the updated document.
   * - Returns the updated provider or `null` when the id doesn't exist.
   */
  async updateProvider(
    id: string,
    data: Partial<IProvider>
  ): Promise<IProvider | null> {
    return Provider.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Delete a provider by id.
   * - Returns the deleted document or `null` if it was not found.
   */
  async deleteProvider(id: string): Promise<IProvider | null> {
    return Provider.findByIdAndDelete(id);
  }
}
