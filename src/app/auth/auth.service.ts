import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, throwError, tap, BehaviorSubject } from "rxjs";
import { User } from "./user.model";



export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {


    user = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) { }

    // signUp method for authentication
    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrtpnWrfm0fFw7xDh4tVRM2UOhLASYsTs',
            {
                email: email,
                password: password,
                returnsecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }


    // login method for authentication
    login(email: string, password: string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrtpnWrfm0fFw7xDh4tVRM2UOhLASYsTs',
            {
                email: email,
                password: password,
                returnsecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            console.log('res', resData);
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }


    // common function for authenticating user
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(email, userId, token, expirationDate);
        console.log(user);
        this.user.next(user);

    }


    // common function for handling errors
    private handleError(errorRes: HttpErrorResponse) {

        let errorMessage = 'An unkown error accured!';
        if (!errorRes.error) {
            return throwError(() => new Error(errorMessage));
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email doesnot exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(() => new Error(errorMessage));
    }

}