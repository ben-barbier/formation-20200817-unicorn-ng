import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {

    transform(birthYear: number): number {
        return new Date().getFullYear() - birthYear;
    }

}
