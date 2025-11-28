import { Router } from "express";
import { getMatriculas } from "../controllers/matriculas.controller.ts";
const routerMatriculas = Router();

routerMatriculas.get('/getMatriculas', getMatriculas);
export default routerMatriculas;