import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unicorn } from '../models/unicorn.model';
import { environment } from '../../../environments/environment';
import { concatAll, filter, map, pluck, reduce, toArray } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UnicornsService {

    constructor(private http: HttpClient) {}

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

    // EX02 : Liste des licornes avec N-Kg de +
    public licornesWithKg(kg: number): Observable<Unicorn[]> {
        return this.getAll().pipe(
            concatAll(),
            map(unicorn => ({ ...unicorn, weight: unicorn.weight + kg })),
            toArray(),
        );
    }

}
