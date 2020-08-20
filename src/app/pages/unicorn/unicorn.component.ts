import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { Unicorn } from '../../shared/models/unicorn.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-unicorn',
    templateUrl: './unicorn.component.html',
    styleUrls: ['./unicorn.component.scss']
})
export class UnicornComponent {

    public unicorn: Unicorn;

    public unicorn$: Observable<Unicorn>;


    constructor(
        private route: ActivatedRoute,
        private unicornsService: UnicornsService,
    ) {


        route.params.subscribe((params: Params) => {

            this.unicorn$ = this.unicornsService.get(params.id);

            unicornsService.get(params.id).subscribe(unicorn => this.unicorn = unicorn);
        });
    }

    public updateUnicorn(formValues: {name: string, birthyear: number}): void {
        const unicornToSave = {...this.unicorn, name: formValues.name, birthyear: formValues.birthyear};
        this.unicornsService.update(unicornToSave).subscribe();
        // TODO: parler de la lib de formatage des dates
    }

}
