import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { Unicorn } from '../../shared/models/unicorn.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AgeGuard implements CanActivate {

    constructor(
        private unicornsService: UnicornsService,
        private router: Router,
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
                    return this.router.createUrlTree(['/']);
                }
            }),
        );

    }
}
