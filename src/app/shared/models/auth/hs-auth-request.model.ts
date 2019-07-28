import { SocialUser } from 'angularx-social-login';
import { SocialAuthProvider, SocialAuthProviderName, webUIClientId } from 'src/app/config/app.config';

export function HSAuthRequestBuilder(socialUser: SocialUser) {
    class HSAuthRequest {
        grantType: string;
        clientId: string;
        backend: SocialAuthProvider;
        token: string;
    }
    let authRequestData: HSAuthRequest = {
        grantType: "convert_token",
        clientId: webUIClientId,
        backend: undefined,
        token: socialUser.authToken
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

