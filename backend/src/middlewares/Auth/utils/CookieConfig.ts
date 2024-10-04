import { CookieOptions } from "express";

export const CookieConfig = (config?: CookieOptions): CookieOptions => {
    return {
        httpOnly: true || config?.httpOnly,
        maxAge: config?.maxAge ?? 3 * 24 * 60 * 60 * 1000, // 3 * 24 * 60 * 60 * 1000 = expira en 3 dias
        sameSite: "none" || config?.sameSite
    }
}