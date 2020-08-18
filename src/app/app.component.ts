import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = '🦄';

    constructor() {
        const group = [
            {id: 1, age: 16},
            {id: 2, age: 14},
            {id: 3, age: 21},
            {id: 4, age: 17}
        ];
    }

}
