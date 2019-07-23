import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { GOOGLE_OAUTH2_CLIENT_ID } from './constants';

// Add all API endpoints and configurations here
// TODO: Use Injectable for the config? and move socialAuthConfig to module?
// TODO: Using environment config and app config in conjunction?


export let socialAuthConfig = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(GOOGLE_OAUTH2_CLIENT_ID),
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("<Client_ID"),
    }
]);
  
export function getSocialAuthConfig() {
    return socialAuthConfig;
}

export let UI_ENDPOINT = {
    CHALLENGE: "challenges",
    MAIN: "main",
    LOGIN: "login",
    // Add more routes here
}

export let API_URL = "http://localhost:8000/";

export let API_ENDPOINT = {
    AUTH_STATE: "",
    LOGOUT: "",
    LOGIN: "",
    // TODO: Get API endpoints
}