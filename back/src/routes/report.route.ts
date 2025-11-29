import { Router } from "express";
import { DownloadCertificate, DownloadReports, SendInfo } from "../controllers/reports.controller.ts";
const routerReports = Router();

routerReports.get('/downloadReport', DownloadReports);
routerReports.get('/downloadCertificate/:nombre', DownloadCertificate);
routerReports.get('/sendInfo', SendInfo);
export default routerReports;