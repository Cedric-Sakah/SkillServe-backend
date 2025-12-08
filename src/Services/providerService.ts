import { Provider } from "../Models/Provider";
import type { IProvider } from "../Models/Provider";

export class ProviderService {
  async createProvider(data: Partial<IProvider>): Promise<IProvider> {
    const provider = new Provider(data);
    return provider.save();
  }

  async getAllProviders(
    page = 1,
    limit = 10,
    sortBy: keyof IProvider = "createdAt",
    order: "asc" | "desc" = "asc"
  ): Promise<{
    data: IProvider[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Provider.find()
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit),
      Provider.countDocuments(),
    ]);

    return { data, total, page, limit };
  }

  async getProviderById(id: string): Promise<IProvider | null> {
    return Provider.findById(id);
  }

  async updateProvider(
    id: string,
    data: Partial<IProvider>
  ): Promise<IProvider | null> {
    return Provider.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProvider(id: string): Promise<IProvider | null> {
    return Provider.findByIdAndDelete(id);
  }
}
