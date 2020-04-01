import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './loginComponents/_services';
import { User } from './loginComponents/_models';

import './loginComponents/_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    clickOnAvatar(event) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}