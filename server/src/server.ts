import 'dotenv/config';
import path from 'node:path';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';

import sequelize from './config/database.js';
import errorHandler from './middleware/ErrorHandlerMiddleware.js';
import router from './routes/index.js';
import './models/models.js';

const PORT = process.env.PORT || 5000;
const ON_START_MESSAGE = `
\x1b[36m\x1b[1mServer Status:\x1b[0m
\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
\x1b[32m\x1b[1m✅ Status:\x1b[0m     \x1b[37mOnline\x1b[0m
\x1b[33m\x1b[1m🔌 Port:\x1b[0m       \x1b[36m${PORT}\x1b[0m
\x1b[33m\x1b[1m🌐 URL:\x1b[0m        \x1b[36mhttp://localhost:${PORT}\x1b[0m
\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m`;
const pathToImg = path.resolve(process.cwd(), 'src', 'assets', 'img');

const app = express();

app.use(cors());
app.use(express.static(pathToImg));
app.use(fileUpload({}));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'SERVER IS WORKING' });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(ON_START_MESSAGE);
        });
    } catch (e) {
        console.error(e);
    }
};

startServer();
