import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { Unicorn } from '../models/unicorn.model';
import { environment } from '../../../environments/environment';
import { catchError, concatAll, filter, map, mergeMap, pluck, reduce, toArray } from 'rxjs/operators';
import { CapacitiesService } from './capacities.service';

@Injectable({
    providedIn: 'root',
})
export class UnicornsService {

    constructor(
        private http: HttpClient,
        private capacitiesService: CapacitiesService,
    ) {}

    public getAll(): Observable<Unicorn[]> {
        return this.http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`).pipe(
            concatAll(),
            map(unicorn => ({ ...unicorn, age: new Date().getFullYear() - unicorn.birthyear })),
            toArray(),
        );
    }

    public update(unicorn: Unicorn): Observable<Unicorn> {
        return this.http.put<Unicorn>(`${environment.apiUrl}/unicorns/${unicorn.id}`, unicorn);
    }

    public create(unicorn: Unicorn): Observable<Unicorn> {
        return this.http.post<Unicorn>(`${environment.apiUrl}/unicorns`, unicorn);
    }

    public get(id: number): Observable<Unicorn> {
        return this.http.get<Unicorn>(`${environment.apiUrl}/unicorns/${id}`);
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/unicorns/${id}`);
    }

    public getUnicornNamesWithMinAge(minAge: number): Observable<string[]> {
        return this.getAll().pipe(
            concatAll(),
            filter(unicorn => unicorn.age >= minAge),
            pluck('name'),
            toArray(),
        );
    }

    public totalAge(): Observable<number> {
        return this.getAll().pipe(
            concatAll(),
            reduce((acc, unicorn) => acc + unicorn.age, 0),
        );
    }

    public licornesWithKg(kg: number): Observable<Unicorn[]> {
        return this.getAll().pipe(
            concatAll(),
            map(unicorn => ({ ...unicorn, weight: unicorn.weight + kg })),
            toArray(),
        );
    }

    public getAllWithCapacitiesLabels(): Observable<Unicorn[]> {
        return this.getAll().pipe(
            // N licornes
            concatAll(),
            // 1 licorne
            mergeMap((unicorn: Unicorn) =>
                from(unicorn.capacities).pipe(
                    // 1 capacity ID
                    mergeMap(capacityId => this.capacitiesService.get(capacityId)),
                    // 1 capacity
                    pluck('label'),
                    // 1 label de capacity
                    toArray(),
                    // N labels de capacities
                    map((labels: string[]): Unicorn => ({ ...unicorn, capacitiesLabels: labels }))
                )
            ),
            toArray(),
        );
    }

}
