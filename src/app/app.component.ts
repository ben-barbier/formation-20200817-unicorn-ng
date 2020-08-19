import { Component } from '@angular/core';
import { from, of } from 'rxjs';
import { concatAll, filter, map, pluck, reduce, tap, toArray } from 'rxjs/operators';
import { UnicornsService } from './shared/services/unicorns.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = '🦄';

    constructor(unicornsService: UnicornsService) {

        interface Facture {
            id: number;
            montant: number;
            paye: boolean;
        }

        const facturesHT: Facture[] = [
            { id: 1, montant: 10, paye: true },
            { id: 3, montant: 30, paye: false },
            { id: 2, montant: 20, paye: true },
        ];

        // EX00 : Noms des licornes de + de N ans
        // EX01 : Age Total des licornes (reduce)
        // EX02 : Liste des licornes avec N-Kg de +

        // (avec N un paramètre de la fonction dans le service)

        // from(facturesHT).pipe(
        //     reduce((acc, factureHT) => acc + factureHT.montant, 0)
        // ).subscribe(e => {
        //     debugger;
        //     console.log(e);
        // });


        unicornsService.getUnicornNamesWithMinAge(30).subscribe(res => {
            debugger;
        });

        // unicornsService.getAll().pipe(
        //     concatAll(),
        //     filter(unicorn => unicorn.weight > 10),
        //     toArray(),
        // );
        //
        // from(facturesHT).pipe(
        //     filter(factureTTC => factureTTC.paye),
        //     map(factureHT => ({...factureHT, montant: factureHT.montant * 1.2})),
        //     toArray(),
        // ).subscribe({
        //     next: res => {
        //         debugger;
        //     },
        //     complete: () => {
        //         debugger;
        //     }
        // });


    }

}
