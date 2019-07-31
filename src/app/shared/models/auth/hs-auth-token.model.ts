export class HSAuthToken {
    accessToken: string;
    expiresIn: number;
    tokenType: string;  // TODO: Replace String type to enum for all possible values
    scope: string;      // TODO: ^
    refreshToken: string;
}
