import express from "express";
import cors from "cors";

import { pokemonRoutes } from "./main/routes/pokemon";

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }))

app.use(pokemonRoutes);

app.get('/', (request, response) => {
    return response.json({
        message: 'Running'
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}.`));