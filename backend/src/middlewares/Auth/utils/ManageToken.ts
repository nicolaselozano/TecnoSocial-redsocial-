import axios from "axios";
import { CLIENT_HOST, CLIENT_ID, CLIENT_SECRET, DOMAIN } from "@/config/vars_config";
import { RefreshTokenDTO } from "../interface/RefreshTokenDTO";
import { TokenDTO } from "../interface/TokenDTO";
import jwt, { JwtPayload, Jwt, verify } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const GetTokenWCode = async (code: string): Promise<RefreshTokenDTO> => {

    try {

        console.log("EL CODIGO ES : " + code);

        const formData = {
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
            "redirect_uri": `${CLIENT_HOST}/redirect`
        };

        const { data }: { data: RefreshTokenDTO } = await axios.post(`https://${DOMAIN}/oauth/token`,
            formData
        );
        // Manejo de la respuesta
        console.log("Respuesta del token: ", data);

        return data;


    } catch (error) {
        console.error("Error al obtener el token:", error);
        throw Error("Error al crear el token con el codigo")
    }

}

const GetTokenWRT = async (refreshToken: string): Promise<TokenDTO> => {

    try {

        console.log("EL Refresh Token ES : " + refreshToken);

        const formData = {
            "grant_type": "refresh_token",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "refresh_token": refreshToken,
            "redirect_uri": `${CLIENT_HOST}/redirect`
        };

        const { data }: { data: TokenDTO } = await axios.post(`https://${DOMAIN}/oauth/token`,
            formData
        );
        // Manejo de la respuesta
        console.log("Respuesta del token: ", data);

        return data;


    } catch (error) {
        console.error("Error al obtener el token:", error);
        throw Error("Error al crear el token con el codigo")
    }

}

interface OpenIdConfig {
    jwks_uri: string;
}

interface ValidateToken {
    (token: string): Promise<Jwt | null>;
}

const ValidateToken: ValidateToken = async (token: string) => {
    try {

        const openIdConfigUrl = `https://${DOMAIN}/.well-known/openid-configuration`;
        const { data: openIdConfig } = await axios.get<OpenIdConfig>(openIdConfigUrl);

        const client = jwksClient({
            jwksUri: openIdConfig.jwks_uri
        });

        const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
            client.getSigningKey(header.kid as string, (err, key) => {
                const signingKey = key?.getPublicKey();
                callback(null, signingKey);
            });
        };

        const validatedToken = await new Promise<Jwt>((resolve, reject) => {
            verify(token, getKey, {
                audience: `https://${DOMAIN}`,
                issuer: `https://${DOMAIN}/`,
                algorithms: ['RS256']
            }, (err, decodedToken) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decodedToken as Jwt);
                }
            });
        });

        console.log('Token validado correctamente:', validatedToken);
        return validatedToken;

    } catch (error) {
        console.error('Error validando el token:', error);
        return null;
    }
};

export const ManageToken = {
    GetTokenWCode,
    GetTokenWRT,
    ValidateToken
}