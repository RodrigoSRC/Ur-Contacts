"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const data_source_1 = require("./data-source");
const app_1 = require("./app");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database Connected');
    const PORT = Number(process.env.PORT);
    app_1.app.listen(PORT, () => console.log(`App running at port ${PORT}`));
})
    .catch((err) => console.log(err));
