import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unicorn } from '../models/unicorn.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UnicornsService {

    constructor(private http: HttpClient) {}

    public getAll(): Observable<Unicorn[]> {
        return this.http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`);
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

}
