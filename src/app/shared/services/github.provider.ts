import { ɵa as BaseLoginProvider } from 'angularx-social-login';
import { SocialUser, LoginOpt } from 'angularx-social-login';

declare let OAuth: any;

export class GitHubLoginProvider extends BaseLoginProvider {

    public static readonly PROVIDER_ID: string = 'GITHUB';

    protected auth2: any;

    constructor(private clientId: string, private opt: LoginOpt = { scope: 'email' }) { super(); }

    initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.loadScript(GitHubLoginProvider.PROVIDER_ID,
                'https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js',
                () => {
                    OAuth.initialize(this.clientId);
                    this.auth2 = OAuth;
                    this._readyState.next(true);
                    resolve();
                });
        });
    }

    getLoginStatus(): Promise<SocialUser> {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                resolve(undefined);
            });
        });
    }

    signIn(opt?: LoginOpt): Promise<SocialUser> {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                this.auth2.popup('github').then((guser: any) => {
                    let user: SocialUser = new SocialUser();
                    user.authToken = guser.access_token;
                    user.provider = "GITHUB";
                    guser.me().then((data: any) => {
                        user.email = data.email;
                        user.photoUrl = data.avatar;
                        user.id = data.id;
                        user.name = data.name;
                        resolve(user);
                    });
                    resolve(user);
                }, (error: any) => {
                    reject(error);
                })
            });
        });
    }

    signOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                resolve();      // find logout method for OAuth if needed
            });
        });
    }
}
