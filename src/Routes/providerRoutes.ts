import { Router } from "express";
import { ProviderController } from "../Controllers/providerController";

// Router instance for provider-related endpoints
const router = Router();

// Controller handles business logic and responses for provider routes
const controller = new ProviderController();

// Create a new provider
// POST /providers/
router.post("/", controller.create.bind(controller));

// Get a list of all providers
// GET /providers/
router.get("/", controller.getAll.bind(controller));

// Get a single provider by ID
// GET /providers/:id
router.get("/:id", controller.getById.bind(controller));

// Update a provider by ID
// PUT /providers/:id
router.put("/:id", controller.update.bind(controller));

// Delete a provider by ID
// DELETE /providers/:id
router.delete("/:id", controller.delete.bind(controller));

// Export the configured router as the default export so it can be mounted
// by the main application (e.g., `app.use('/providers', providerRoutes)`).
export default router;
