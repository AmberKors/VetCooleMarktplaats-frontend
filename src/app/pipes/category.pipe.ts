import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(category: string): string {

    switch (category) {
      case "BOEKEN":
        return "Boeken";
        break;
      case "DIEREN_EN_TOEBEHOREN":
        return "Dieren en toebehoren";
        break;
      case "TICKETS":
        return "Tickets";
        break;
      case "HUIS_EN_INRICHTING":
        return "Huis en inrichting";
        break;
      case "KLEDING":
        return "Kleding";
        break;
    }
    return "undefined"
  }

}
