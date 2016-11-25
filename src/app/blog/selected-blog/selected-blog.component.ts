import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { BlogService } from "../blog.service";
import { IBlog } from "../blog.model";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./selected-blog.component.styl"],
    templateUrl: "./selected-blog.component.pug"
})
export class SelectedBlogComponent implements OnInit {
    blog: IBlog;
    loading: boolean = false;
    blogNotFound = false;

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( params => {
            this.loading = true;
            this.blogNotFound = false;
            this.blogService.get(params["slug"]).subscribe(
                blogs => {
                    this.loading = false;
                    if (blogs && blogs[0]) {
                        this.blog = blogs[0];
                    } else {
                        this.blogNotFound = true;
                    }
                }
            );
        });
    }
}
