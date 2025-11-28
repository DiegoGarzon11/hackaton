import { Router } from "express";
import { getSchools, getSchoolsByRoute, CountBeneficiaries, getByRoute } from "../controllers/colegios.controller.ts";

const routerColegios = Router();
routerColegios.get("/", getSchools);
routerColegios.get("/beneficiarios", CountBeneficiaries);
routerColegios.get("/ubicacion/:ubicacion", getByRoute);
routerColegios.get("/:school", getSchoolsByRoute);

export default routerColegios;
 