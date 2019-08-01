import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// Add all API endpoints and configurations here
// TODO: Use Injectable for the config? and move socialAuthConfig to module?
// TODO: Using environment config and app config in conjunction?

// Social App Configurations
export const webUIClientId = "<Client_ID>";

export const GOOGLE_OAUTH2_CLIENT_ID = '<Client_ID>';
export const FB_OAUTH2_CLIENT_ID = '<Client_ID>';

export enum SocialAuthProvider {
    GOOGLE = "google-oauth2",
    FACEBOOK = "facebook",
    GITHUB = "github",
}

export enum SocialAuthProviderName {
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
    GITHUB = "GITHUB",
}

export let socialAuthConfig = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(FB_OAUTH2_CLIENT_ID),
    },
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(GOOGLE_OAUTH2_CLIENT_ID),
    }
]);
  
export function getSocialAuthConfig() {
    return socialAuthConfig;
}


// Endpoints Config

export const UI_ENDPOINT = {
    CHALLENGE: "challenges",
    MAIN: "main",
    LOGIN: "login",
    // Add more routes here
}

export const API_URL = "http://localhost:8000/";

export const emailValidationPattern = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

export const API_ENDPOINT = {
    AUTH: {
        CONVERT_TOKEN: API_URL + "auth/convert-token/",
        LOGOUT: API_URL + "auth/revoke-token/",
        GET_TOKEN: API_URL + "auth/token/",
        GET_USER: API_URL + "user/me/",
    }
    // TODO: Get API endpoints
}

export const hsAuthTokenName = "hsAuthToken";
