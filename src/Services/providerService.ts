import { Provider } from '../Models/Provider';
import type { IProvider } from '../Models/Provider';

export class ProviderService {
  async createProvider(data: Partial<IProvider>): Promise<IProvider> {
    const provider = new Provider(data);
    return provider.save();
  }

  async getAllProviders(): Promise<IProvider[]> {
    return Provider.find();
  }

  async getProviderById(id: string): Promise<IProvider | null> {
    return Provider.findById(id);
  }

  async updateProvider(id: string, data: Partial<IProvider>): Promise<IProvider | null> {
    return Provider.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProvider(id: string): Promise<IProvider | null> {
    return Provider.findByIdAndDelete(id);
  }
}
