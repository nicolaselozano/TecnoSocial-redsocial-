import { NextFunction, Request, Response } from "express";
import { ManageToken } from "./utils/ManageToken";
import { RefreshTokenDTO } from "./interface/RefreshTokenDTO";
import { CookieConfig } from "./utils/CookieConfig";
import jwt,{ Jwt, JwtPayload } from "jsonwebtoken";
import { TokenDTO } from "./interface/TokenDTO";
import { SECRET_KEY } from "@/config/vars_config";
import { UserDataToken } from "./interface/UserDataToken";

const CheckToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenCookieName = "token";
    try {
        
        const token: string = req.cookies[tokenCookieName]
        .replace("Bearer ", "")
        .trim();

        if(token){
            const validateToken: Jwt | null = await ManageToken.ValidateToken(token);
            if(!validateToken){

                throw new Error("El token no es valido");
                
            } 
            console.log("TOKEN VERIFICADO EN CHECK");
            
            const decoded = jwt.verify(token,SECRET_KEY) as JwtPayload;

            const email = decoded["custom_email_claim"];
            const authName = decoded["custom_name_claim"];
            const authId = decoded["sub"];

            if(email && authName && authId){

                const userData:UserDataToken = {
                    authId,
                    authName,
                    email,
                    token
                }

                res.locals.userData = userData;
                console.log(res.locals["userData"] as UserDataToken);
                
                console.log("Token Validado y Datos de Usuario Agregados al Contexto");
                

            }else{
                throw Error("No esta en Email ni el Nombre en el token, chequee la configuracion en auth0");
            }

        }

    } catch (error) {
        console.error("Error en el middleware CheckToken:", error);
        return res.status(401).json({
            message: error || "Error de autenticación"
        });
    }
}

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

            } else {

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
        return res.status(401).json({ error: "Error interno en el servidor", message: error });
    }
};


export const MiddlewareAuth0 = {
    SetToken
};