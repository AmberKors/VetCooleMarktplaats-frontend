import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'delivery'
})
export class DeliveryPipe implements PipeTransform {

  transform(delivery: string): string {

    switch (delivery) {
      case "BEZORGEN":
        return "Bezorgen";
        break;
      case "AFHALEN":
        return "Afhalen";
        break;
      case "MAGAZIJN":
        return "Ophalen bij magazijn";
        break;
    }
    return "undefined"
  }

}
