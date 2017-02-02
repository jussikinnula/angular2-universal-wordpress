import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

import { IPage } from "../../shared";

@Component({
    selector: "page",
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./page.component.styl"],
    templateUrl: "./page.component.pug"
})
export class PageComponent {
    @Input() page: IPage;

    constructor() {}
}
