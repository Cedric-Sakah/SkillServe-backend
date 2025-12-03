import { Schema, model, Document } from 'mongoose';

export interface IProvider extends Document {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const providerSchema = new Schema<IProvider>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    serviceType: { type: String, required: true },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      required: true,
    },
  },
  { timestamps: true }
);

export const Provider = model<IProvider>('Provider', providerSchema);
