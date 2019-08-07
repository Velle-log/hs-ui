import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GitHubLoginProvider } from '../shared/services/github.provider';

// Add all API endpoints and configurations here
// TODO: Use Injectable for the config? and move socialAuthConfig to module?
// TODO: Using environment config and app config in conjunction?

// Social App Configurations
export const WEB_UI_CLIENT_ID = "<Client_id>";

export const GOOGLE_OAUTH2_CLIENT_ID = '<Client_ID>';
export const FB_OAUTH2_CLIENT_ID = '<Client_ID>';
export const GITHUB_OAUTH2_CLIENT_ID = '<Client_ID>';

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

export const SOCIAL_AUTH_CONFIG = new AuthServiceConfig([
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
    return SOCIAL_AUTH_CONFIG   ;
}


// Endpoints Config

export const UI_ENDPOINT = {
    CHALLENGE: "challenges",
    MAIN: "main",
    LOGIN: "login",
    // Add more routes here
}

export const API_URL = "http://localhost:8000/";

export const EMAIL_VALIDATION_PATTERN = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

export const API_ENDPOINT = {
    AUTH: {
        CONVERT_TOKEN: API_URL + "auth/convert-token/",
        LOGOUT: API_URL + "auth/revoke-token/",
        GET_TOKEN: API_URL + "auth/token/",
        GET_USER: API_URL + "user/me/",
    }
    // TODO: Get API endpoints
}

export const HS_AUTH_TOKEN_NAME = "hsAuthToken";


// Mat component defaults

export const MAT_SB_DEFAULT_OPT = {
    duration: 2000,
};
