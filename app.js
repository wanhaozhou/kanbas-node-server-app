import express from 'express';
import cors from "cors";
import "dotenv/config";

import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";


const app = express();

const origins = ['http://localhost:3000'];
if (process.env.FRONTEND_URL) {
    for (let i = 1; i <= 6; i++) {
        origins.push("https://a" + i + "--" + process.env.FRONTEND_URL);
    }
}

app.use(cors({
    credentials: true,
    origin: origins
}));
app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);

Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);