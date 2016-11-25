import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name: "date"
})
export class DatePipe implements PipeTransform {
    transform(date: Date, format: string = "DD.MM.YYYY"): any {
        return moment(date).format(format);
    }
}