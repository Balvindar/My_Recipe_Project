import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./user.model";






export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any => {

    const authService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.user.pipe(take(1), map(user => {

        const isAuth = !!user;

        if (isAuth) {
            return true;
        }

        return router.navigate(['/auth']);
    }));
}

// export class AuthGuard implements CanActivate {

//     constructor(private authService: AuthService, private router: Router) {
//     }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

//         return this.authService.user.pipe(take(1), map(user => {

//             const isAuth = !!user;   //!user ? false : true;

//             if (isAuth) {
//                 return true;
//             }
//             return this.router.createUrlTree(['/auth']);
//         }))
//     }

// }