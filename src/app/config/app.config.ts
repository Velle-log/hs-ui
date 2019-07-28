import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// Add all API endpoints and configurations here
// TODO: Use Injectable for the config? and move socialAuthConfig to module?
// TODO: Using environment config and app config in conjunction?

// Social App Configurations
export const webUIClientId = "Sh3f6fMDaEEB9Cku0GJgNbQhEfXLXT05RHN9weh9";

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
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("634386749126-va58fbj5eo2hh42so98g15bgqflu5c0m.apps.googleusercontent.com"),
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("1427376524067462"),
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

export const API_ENDPOINT = {
    AUTH: {
        STATE: API_URL + "",
        CONVERT_TOKEN: API_URL + "auth/convert-token/",
        LOGOUT: API_URL + "",
        GET_TOKEN: API_URL + "auth/token/",
        GET_USER: API_URL + "user/",
    }
    // TODO: Get API endpoints
}

export const hsAuthTokenName = "hsAuthToken";
