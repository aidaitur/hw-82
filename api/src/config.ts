import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: process.env.DB_URI || 'mongodb://localhost/shop-js-30',
    jwtSecret: process.env.JWT_SECRET || 'secret',
};

export default config;