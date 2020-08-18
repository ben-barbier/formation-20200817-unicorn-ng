import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { Unicorn } from '../../shared/models/unicorn.model';

@Component({
    selector: 'app-unicorn',
    templateUrl: './unicorn.component.html',
    styleUrls: ['./unicorn.component.scss']
})
export class UnicornComponent {

    public unicorn: Unicorn;

    constructor(
        route: ActivatedRoute,
        unicornsService: UnicornsService,
    ) {
        route.params.subscribe((params: Params) => {
            unicornsService.get(params.id).subscribe(unicorn => this.unicorn = unicorn);
        });
    }

}
