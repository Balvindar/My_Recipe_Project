import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {

    constructor(private authService: AuthService, private router: Router) { }

    isLoginMode = true;
    isLoading = false;
    error: string = '';

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData> = new Observable();

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            this.isLoading = true;
            authObs = this.authService.signUp(email, password)
        }

        authObs.subscribe(response => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.error = errorMessage;
            console.log(this.error);
            this.isLoading = false
        });
        console.log(form.value);
        // form.reset();
    }

}