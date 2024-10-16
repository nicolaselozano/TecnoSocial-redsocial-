import dotenv from 'dotenv';

dotenv.config();

export const CLIENT_ID = process.env['CLIENT_ID'] || '';
export const CLIENT_SECRET = process.env['CLIENT_SECRET'] || '';
export const CLIENT_HOST = process.env['CLIENT_HOST'] || '';
export const DOMAIN = process.env['DOMAIN'] || '';
export const SECRET_KEY = process.env['SECRET_KEY'] || '';
