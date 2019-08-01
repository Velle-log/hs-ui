import { SocialUser } from 'angularx-social-login';
import { SocialAuthProvider, SocialAuthProviderName, webUIClientId } from 'src/app/config/app.config';
import { HSAuthToken } from './hs-auth-token.model';

class HSAuthBaseRequest {
    grantType: string;
    clientId: string;
}

class HSSocialAuthRequest extends HSAuthBaseRequest {
    backend: SocialAuthProvider;
    token: string;
}

class HSCredAuthRequest extends HSAuthBaseRequest {
    username: string;
    password: string;
}

class HSTokenRefreshRequest extends HSAuthBaseRequest {
    token: string;
}

export class HSAuthRequestBuilder {

    static social(socialUser: SocialUser): HSSocialAuthRequest {

        let authRequestData: HSSocialAuthRequest = {
            grantType: "convert_token",
            clientId: webUIClientId,
            backend: undefined,
            token: socialUser.authToken,
        }
        if(socialUser.provider == SocialAuthProviderName.GOOGLE)
            authRequestData.backend = SocialAuthProvider.GOOGLE;
        else if(socialUser.provider == SocialAuthProviderName.FACEBOOK)
            authRequestData.backend = SocialAuthProvider.FACEBOOK;
        else if(socialUser.provider == SocialAuthProviderName.GITHUB)
            authRequestData.backend = SocialAuthProvider.GITHUB;
        else
            console.error(`Social auth provider mismatch. Social auth provider ${socialUser.provider} 
                            doesn't match supported provider list ${SocialAuthProviderName}`);

        return authRequestData;
    }

    static refresh(authToken: HSAuthToken): HSTokenRefreshRequest {
        let tokenRefreshData: HSTokenRefreshRequest = {
            grantType: "refresh_token",
            clientId: webUIClientId,
            token: authToken.refreshToken,
        }
        return tokenRefreshData;
    }

    static creds(username: string, password: string): HSCredAuthRequest {
        let credAuthData: HSCredAuthRequest = {
            grantType: "password",
            clientId: webUIClientId,
            username: username,
            password: password,
        } 
        return credAuthData;
    }

    static logout(authToken: HSAuthToken) {
        return {
            clientId: webUIClientId,
            token: authToken.accessToken
          }
    }
}

