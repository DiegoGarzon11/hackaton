import express from "express";
import cors from 'cors';
import router from "./routes/chat.route.ts";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/chat", router);

app.listen(4000, () => console.log("Servidor iniciado en puerto 4000"));
