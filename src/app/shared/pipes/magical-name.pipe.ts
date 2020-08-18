import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'magicalName',
})
export class MagicalNamePipe implements PipeTransform {

    transform(name: string): string {
        console.count('MagicalNamePipe');
        return name
            .split('')
            .map((letter, idx) => (idx % 2) ? letter.toLowerCase() : letter.toUpperCase())
            .join('');
    }

}
