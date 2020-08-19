import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unicorn } from '../../../shared/models/unicorn.model';
import { CartService } from '../../../shared/services/cart.service';

@Component({
    selector: 'app-unicorn-card',
    templateUrl: './unicorn-card.component.html',
    styleUrls: ['./unicorn-card.component.scss'],
})
export class UnicornCardComponent implements OnInit {

    @Input()
    public unicorn: Unicorn;

    @Output()
    public removed = new EventEmitter<Unicorn>();

    public currentYear = new Date().getFullYear();

    public isJunior: boolean;

    public isInCart = false;

    constructor(private cartService: CartService) {}

    public logName(): void {
        console.log(this.unicorn.name);
    }

    public removeUnicorn(): void {
        this.removed.emit(this.unicorn);
    }

    ngOnInit(): void {
        this.isJunior = this.currentYear - this.unicorn.birthyear < 16;
    }

    public toggleToCart(): void {
        if (this.isInCart) {
            this.cartService.removeFromCart(this.unicorn);
        } else {
            this.cartService.addToCart(this.unicorn);
        }
        this.isInCart = !this.isInCart;
    }
}
