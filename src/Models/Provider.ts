import { Schema, model, Document } from "mongoose";

/**
 * Mongoose document interface for a Provider.
 * Extends `Document` to include mongoose document methods/fields.
 */
export interface IProvider extends Document {
  /** Full name of the provider */
  name: string;
  /** Unique email address used to contact or identify the provider */
  email: string;
  /** Phone number for contacting the provider */
  phone: string;
  /** The type of service the provider offers (e.g., "plumbing", "tutoring") */
  serviceType: string;
  /** Current status of the provider record. Used to soft-disable providers. */
  status: "active" | "inactive";
  /** Timestamp automatically managed by Mongoose when the document is created */
  createdAt: Date;
  /** Timestamp automatically managed by Mongoose when the document is updated */
  updatedAt: Date;
}

/**
 * Mongoose schema definition for providers.
 * - `email` is unique to prevent duplicate provider accounts.
 * - `status` uses an enum and defaults to `'active'`.
 * - `timestamps: true` enables `createdAt` and `updatedAt` fields.
 */
const providerSchema = new Schema<IProvider>(
  {
    // Provider's display name
    name: { type: String, required: true },

    // Unique contact email
    email: { type: String, required: true, unique: true },

    // Contact phone number
    phone: { type: String, required: true },

    // Categorization of the service offered
    serviceType: { type: String, required: true },

    // Active/inactive status for soft-deletes or temporary disabling
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Mongoose model for use in services/controllers.
export const Provider = model<IProvider>("Provider", providerSchema);
