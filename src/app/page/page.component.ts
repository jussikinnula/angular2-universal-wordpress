import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

import { ApiService } from "../shared";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./page.component.styl"],
    templateUrl: "./page.component.pug"
})
export class PageComponent {
    constructor(private apiService: ApiService) {
        this.apiService.get("/wp-json/wp/v2/pages").subscribe(
            pages => {
                //console.log(pages);
            },
            error => {
                console.error(error);
            }
        );
    }
}
