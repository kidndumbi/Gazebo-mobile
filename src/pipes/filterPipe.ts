import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {

        console.log(value.src);

        const av = value.map(function(a){

            let i = a.src.lastIndexOf('/')

            // console.log(a.src.substring(0, i+1))
            


            return {src: a.src.substring(0, i+1) + '24', title: a.title }
        });

        console.log(av);

        //console.log(value.src.lastIndexOf('/'));

        return av;
        
    }
}