import express from "express"
import apiRoutes from "./routes/index.js"
import { ServerConfig, Logger } from "./config/index.js"

const app = express();

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, () => {
    console.log("Server running at PORT:", ServerConfig.PORT);
})