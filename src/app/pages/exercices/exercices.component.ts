import { Component } from '@angular/core';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { Unicorn } from '../../shared/models/unicorn.model';

@Component({
    selector: 'app-exercices',
    templateUrl: './exercices.component.html',
    styleUrls: ['./exercices.component.scss']
})
export class ExercicesComponent {

    public totalAge: number;
    public fatUnicorns: Unicorn[];

    constructor(unicornsServices: UnicornsService) {
        unicornsServices.totalAge().subscribe(totalAge => this.totalAge = totalAge);
        unicornsServices.licornesWithKg(1000).subscribe(fatUnicorns => this.fatUnicorns = fatUnicorns);
    }

}
