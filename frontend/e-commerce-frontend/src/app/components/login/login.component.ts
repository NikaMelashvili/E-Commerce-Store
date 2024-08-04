import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { pkce } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import myAppConfig from 'src/app/config/my-app-config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  // templateUrl: './login.component.html',
  template: `
    <div class="pt-5">
      <div id="okta-sign-in-widget" class="pt-5"></div>
    </div>
  `,
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      },
    });
  }

  ngOnInit(): void {
    this.oktaSignIn.remove();

    this.oktaSignIn.renderEl(
      {
        el: '#okta-sign-in-widget',
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}
