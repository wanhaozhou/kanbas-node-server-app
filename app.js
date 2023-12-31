import express from 'express';
import cors from "cors";
import "dotenv/config";

import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";


const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL ? new RegExp(`.*${process.env.FRONTEND_URL}.*`) : 'http://localhost:3000'
}));
app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);