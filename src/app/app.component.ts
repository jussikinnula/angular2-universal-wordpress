import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    selector: "app",
    styleUrls: ['./app.component.styl'],
    templateUrl: './app.component.pug'
})
export class AppComponent {
    constructor() {}
}
