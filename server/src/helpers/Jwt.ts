import jwt, { SignOptions } from 'jsonwebtoken';
import {appConfig} from '../Config';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
    const privateKey = Buffer.from(
        appConfig.authTokens.accessTokenPrivateKey,
        'base64'
    ).toString('ascii');
    const signOptions = Object.assign({}, options, <SignOptions>{
        algorithm: 'RS256',
    });
    return jwt.sign(payload, privateKey, signOptions);
}

export const verifyJwf = <T>(token: string): T | null => {
    try {
        const publicKey = Buffer.from(
            appConfig.authTokens.accessTokenPublicKey,
            'base64',
        ).toString('ascii');
        return jwt.verify(token, publicKey) as T;
    } catch(err) {
        return null;
    }
}