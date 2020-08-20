import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { Unicorn } from '../../shared/models/unicorn.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AgeGuard implements CanActivate {

    constructor(
        private unicornsService: UnicornsService,
        private router: Router,
        private snackbar: MatSnackBar,
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<true | UrlTree> {

        // Ne laisser passer que sui la licorne a plus de 4 ans.
        const unicorn$: Observable<Unicorn> = this.unicornsService.get(next.params.id);

        return unicorn$.pipe(
            map(unicorn => {
                if (unicorn.birthyear < new Date().getFullYear() - 4) {
                    return true;
                } else {
                    this.snackbar.open('Pas encore 4 ans :-)');
                    return this.router.createUrlTree(['/']);
                }
            }),
        );

    }
}
