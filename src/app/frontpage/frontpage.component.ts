import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./frontpage.component.styl"],
    templateUrl: "./frontpage.component.pug"
})
export class FrontpageComponent {
    constructor() {}
}
