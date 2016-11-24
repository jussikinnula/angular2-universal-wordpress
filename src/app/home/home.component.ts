import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./home.component.styl"],
    templateUrl: "./home.component.pug"
})
export class HomeComponent {
    constructor() {}
}
