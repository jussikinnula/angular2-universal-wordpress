import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

import { IBlog } from "../../shared";

@Component({
    selector: "blog",
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./blog.component.styl"],
    templateUrl: "./blog.component.pug"
})
export class BlogComponent {
    @Input() blog: IBlog;

    constructor() {}
}
