import { OktaAuth } from '@okta/okta-auth-js';
import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // templateUrl: './login-status.component.html',
  template: `<div class="login-status-header">
    <div *ngIf="isAuthenticated && userFullName" class="login-status-user-info">
      Welcome back {{ userFullName }}!
    </div>

    <button *ngIf="!isAuthenticated" routerLink="/login" class="security-btn">
      Login
    </button>

    <button *ngIf="isAuthenticated" (click)="logout()" class="security-btn">
      Logout
    </button>
  </div> `,
  // styleUrls: ['./login-status.component.css'],
  styles: [
    `
      .security-btn {
        position: relative;
        right: 10px;
        min-width: 85px;
        color: #fff;
        border: 10px solid #205b8d;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 0;
        background: #205b8d;
      }

      .login-status-header {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
      }

      .login-status-user-input {
        line-height: 43px;
        border: 1px solid #e5e5e5;
        padding: 0 17px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        -webkit-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        transition: all 0.5s ease;
      }
    `,
  ],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then((res) => {
        this.userFullName = res.name as string;
      });
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
