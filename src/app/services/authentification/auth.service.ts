import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User = null;
  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  getUserId() {
    return 1;
    // return this.user.id_token;
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      window.localStorage.setItem("auth_token", user.id_token);
      debugger
      this.user = user;
    });
  }
}


export function getClientSettings(): UserManagerSettings {
  return {
    metadataUrl: "https://accounts.google.com/.well-known/openid-configuration",
    authority: 'https://accounts.google.com/o/oauth2/v2/auth',
    client_id: '329518629784-7kuske73oob72h6p0ihgd442j99qrbmc.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
// tslint:disable-next-line:quotemark
    response_type: "id_token token",
    scope: "openid profile https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/admin.directory.customer.readonly",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
