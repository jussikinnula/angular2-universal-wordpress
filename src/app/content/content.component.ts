import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { IContent, ContentService } from "../shared";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./content.component.styl"],
    templateUrl: "./content.component.pug"
})
export class ContentComponent implements OnInit, OnDestroy {
    content: IContent;
    loading: boolean = false;
    subscription: Subscription;

    constructor(
        private route: ActivatedRoute, 
        private contentService: ContentService
    ) {}

    ngOnInit() {
        this.subscription = this.route.url
            .map(segments => segments.join("/"))
            .distinctUntilChanged()
            .flatMap(url => this.contentService.get(url))
            .subscribe(content => this.content = content);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
