import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unicorn } from '../../../shared/models/unicorn.model';

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

    public logName(): void {
        console.log(this.unicorn.name);
    }

    public removeUnicorn(): void {
        this.removed.emit(this.unicorn);
    }

    ngOnInit(): void {
        this.isJunior = this.currentYear - this.unicorn.birthyear < 16;
    }
}
