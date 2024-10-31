import envs from '@/config/envs';
import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jose from 'node-jose';
import { RefreshTokenDTO } from '../interface/RefreshTokenDTO';
import { TokenDTO } from '../interface/TokenDTO';

const GetTokenWCode = async (code: string): Promise<RefreshTokenDTO> => {
  try {
    const formData = {
      grant_type: 'authorization_code',
      client_id: envs.AUTH0.CLIENT_ID,
      client_secret: envs.AUTH0.CLIENT_SECRET,
      code: code,
      redirect_uri: `${envs.AUTH0.CLIENT_HOST}/redirect`,
    };

    const { data }: { data: RefreshTokenDTO } = await axios.post(`https://${envs.AUTH0.DOMAIN}/oauth/token`, formData);

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error al obtener el token:', error.message);
    throw Error('Error al crear el token con el codigo');
  }
};

const GetTokenWRT = async (refreshToken: string): Promise<TokenDTO> => {
  try {
    const formData = {
      grant_type: 'refresh_token',
      client_id: envs.AUTH0.CLIENT_ID,
      client_secret: envs.AUTH0.CLIENT_SECRET,
      refresh_token: refreshToken,
      redirect_uri: `${envs.AUTH0.CLIENT_HOST}/redirect`,
    };

    const { data }: { data: TokenDTO } = await axios.post(`https://${envs.AUTH0.DOMAIN}/oauth/token`, formData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error al obtener el token:', error.message);
    throw Error('Error al crear el token con el codigo');
  }
};

interface OpenIdConnectConfiguration {
  issuer: string;
  jwks_uri: string;
}

interface Jwk {
  kty: string; // Tipo de clave
  use: string; // Uso de la clave
  kid: string; // ID de la clave
  alg: string; // Algoritmo
  n: string; // Módulo en Base64
  e: string; // Exponente en Base64
}

interface JwksResponse {
  keys: Jwk[];
}

export async function ValidateToken(token: string): Promise<JwtPayload | null> {
  try {
    const authDomain = envs.AUTH0.DOMAIN; // Asegúrate de que DOMAIN esté definido en tu entorno
    const discoveryUrl = `https://${authDomain}/.well-known/openid-configuration`;

    const response = await axios.get<OpenIdConnectConfiguration>(discoveryUrl);
    const jwksUri = response.data.jwks_uri;

    // Obtén las claves de firma del JWKS
    const jwksResponse = await axios.get<JwksResponse>(jwksUri);
    const signingKeys = jwksResponse.data.keys;

    if (!signingKeys || signingKeys.length === 0) {
      throw new Error('No signing keys found in the JWKS.');
    }

    // Busca la clave que coincide con el "kid" del token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt.decode(token, { complete: true });
    const key = signingKeys.find((k) => k.kid === decodedToken.header.kid);

    if (!key) {
      throw new Error('No signing key found for the token.');
    }

    // Convierte la clave en una cadena PEM para la verificación
    const publicKey = await jose.JWK.asKey(
      {
        kty: key.kty,
        n: key.n,
        e: key.e,
      },
      'json',
    );

    // Verifica el token usando la clave de firma
    const validatedToken = jwt.verify(token, publicKey.toPEM(), { algorithms: ['RS256'] });

    return validatedToken as JwtPayload; // Retorna el token validado
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Token validation error:', error.message);
    return Error('Token no validad');
  }
}

export const ManageToken = {
  GetTokenWCode,
  GetTokenWRT,
  ValidateToken,
};
