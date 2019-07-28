export class HSAuthToken {
    accessToken: String;
    expiresIn: number;
    tokenType: String;  // TODO: Replace String type to enum for all possible values
    scope: String;      // TODO: ^
    refreshToken: String;
}
