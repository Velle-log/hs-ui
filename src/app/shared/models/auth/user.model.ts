import { HSAuthToken } from './hs-auth-token.model';

export class User {
    email: String;
    username: String;
    name: String;
    authToken: HSAuthToken;
}