import { HSAuthToken } from './hs-auth-token.model';

export class User {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    authToken: HSAuthToken;
    isAuthenticated: Boolean;
}