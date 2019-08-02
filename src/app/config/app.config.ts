import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GitHubLoginProvider } from '../shared/services/github.provider';

// Add all API endpoints and configurations here
// TODO: Use Injectable for the config? and move socialAuthConfig to module?
// TODO: Using environment config and app config in conjunction?

// Social App Configurations
export const webUIClientId = "Sh3f6fMDaEEB9Cku0GJgNbQhEfXLXT05RHN9weh9";

export const GOOGLE_OAUTH2_CLIENT_ID = '634386749126-va58fbj5eo2hh42so98g15bgqflu5c0m.apps.googleusercontent.com';
export const FB_OAUTH2_CLIENT_ID = '1427376524067462';
export const GITHUB_OAUTH2_CLIENT_ID = 'HwAr2OtSxRgEEnO2-JnYjsuA3tc';

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
        lazyLoad: true,
    },
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(GOOGLE_OAUTH2_CLIENT_ID),
        lazyLoad: true,
    },
    {
        id: GitHubLoginProvider.PROVIDER_ID,
        provider: new GitHubLoginProvider(GITHUB_OAUTH2_CLIENT_ID),
        lazyLoad: true
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
