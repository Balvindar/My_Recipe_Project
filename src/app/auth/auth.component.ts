import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {

    @ViewChild(PlaceHolderDirective) alertHost!: PlaceHolderDirective;
    closeSub!: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver
        : ComponentFactoryResolver) { }

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
            this.showErrorAlert(errorMessage);
            console.log(this.error);
            this.isLoading = false
        });
        console.log(form.value);
        // form.reset();
    }

    onHandleError() {
        this.error = '';
    }


    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    // show error alert  method dynamically
    showErrorAlert(message: string) {

        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;

        this.closeSub = componentRef.instance.close.subscribe(() => {
            hostViewContainerRef.clear();
        })


    }

}