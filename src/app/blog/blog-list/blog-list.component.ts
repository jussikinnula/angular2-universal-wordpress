import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

import { BlogService } from "../blog.service";
import { IBlog } from "../blog.model";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./blog-list.component.styl"],
    templateUrl: "./blog-list.component.pug"
})
export class BlogListComponent {
    blogs: IBlog[];

    constructor(private blogService: BlogService) {
        this.blogService.list().subscribe( blogs => this.blogs = blogs );
    }
}
