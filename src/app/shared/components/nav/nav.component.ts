import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { Unicorn } from '../../models/unicorn.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    public cart: Unicorn[] = [];

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private cartService: CartService,
        private translateService: TranslateService
    ) {
        this.cartService.cart.subscribe(cart => this.cart = cart);
    }

    public changeLocale(lang: 'fr' | 'en'): void {
        this.translateService.use(lang);
    }
}
