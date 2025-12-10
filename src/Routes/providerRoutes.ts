import { Router } from "express";
import { ProviderService } from "../Services/providerService";
import { ProviderController } from "../Controllers/providerController";
import { validate } from "../Middlewares/validate";
import { createProviderSchema, updateProviderSchema } from "../Middlewares/providerValidation";

const router = Router();

const providerService = new ProviderService();
const controller = new ProviderController(providerService);

router.post("/", validate(createProviderSchema), controller.create.bind(controller));

router.put("/:id", validate(updateProviderSchema), controller.update.bind(controller));

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
