import { NextFunction, Request, Response } from "express";
import { ManageToken } from "./utils/ManageToken";
import { RefreshTokenDTO } from "./interface/RefreshTokenDTO";
import { CookieConfig } from "./utils/CookieConfig";
import { Jwt } from "jsonwebtoken";
import { TokenDTO } from "./interface/TokenDTO";

const SetToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenCookieName = "token";
    const refreshTokenCookieName = "refresh-token";

    try {
        const token: string = req.cookies[tokenCookieName]
            .replace("Bearer ", "")
            .trim();

        if (token) {
            const validateToken: Jwt | null = await ManageToken.ValidateToken(token);
            //si el token no es valido se intenta recrear a travez del refresh token
            if (validateToken == null) {
                const refreshToken: string = req.cookies[refreshTokenCookieName]
                const createToken: TokenDTO = await ManageToken.GetTokenWRT(refreshToken);

                res.cookie(tokenCookieName, `Bearer ${createToken.accessToken}`, CookieConfig());
                res.cookie(refreshTokenCookieName, refreshToken, CookieConfig({
                    maxAge: 214748
                }));

                console.log("Se creo un nuevo token con RToken")

                return next();

            }else{

                console.log("Token Validado en SetToken");
                return next();

            }


        } else {

            const code: string | undefined = req.query["code"]?.toString();

            if (code) {
                const createRToken: RefreshTokenDTO = await ManageToken.GetTokenWCode(code);

                res.cookie(tokenCookieName, `Bearer ${createRToken.accessToken}`, CookieConfig());
                res.cookie(refreshTokenCookieName, createRToken.refreshToken, CookieConfig({
                    maxAge: 214748
                }));

                return next();
            }

        }

        return next();

    } catch (error) {
        console.error("Error en el middleware SetToken: ", error);
        return res.status(500).json({ error: "Error interno en el servidor", message:error?.message});
    }
};


export const MiddlewareAuth0 = {
    SetToken
};