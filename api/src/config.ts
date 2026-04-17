import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: process.env.DB_URI || 'mongodb://127.0.0.1:27017/music',
    jwtSecret: process.env.JWT_SECRET || 'secret',
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
    }
};

export default config;