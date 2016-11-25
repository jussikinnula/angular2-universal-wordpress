import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

import { BlogService } from "../blog.service";
import { IBlog } from "../blog.model";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./blog-list.component.styl"],
    templateUrl: "./blog-list.component.pug"
})
export class BlogListComponent {
    blogs: IBlog[] = [];
    loading: boolean = false;
    noMore: boolean = false;
    private page = 0;

    constructor(private blogService: BlogService) {}

    ngOnInit() {
        this.loadMore();
    }

    loadMore() {
        this.page++;
        this.loading = true;
        this.blogService.list(this.page, 10).subscribe( blogs => {
            this.loading = false;
            if (blogs && blogs.length > 0) {
                this.blogs = this.blogs.concat(blogs);
            } else {
                this.noMore = true;
            }
        });
    }
}
