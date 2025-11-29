import { Router } from "express";
import { DownloadCertificate, DownloadReports } from "../controllers/reports.controller.ts";
const routerReports = Router();

routerReports.get('/downloadReport', DownloadReports);
routerReports.get('/downloadCertificate/:nombre', DownloadCertificate);
export default routerReports;