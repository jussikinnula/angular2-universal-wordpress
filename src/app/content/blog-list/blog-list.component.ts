import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";

import { IBlog, BlogService } from "../../shared";

@Component({
    selector: "blog-list",
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./blog-list.component.styl"],
    templateUrl: "./blog-list.component.pug"
})
export class BlogListComponent implements OnInit, OnDestroy{
    blogs: IBlog[];
    nextBlogs: IBlog[];
    loading: boolean;
    noMore: boolean;
    currentPage: number;
    nextPage: number;
    error: boolean;
    private subscription: Subscription;

    constructor(private blogService: BlogService) {}

    ngOnInit() {
        this.initialize();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private initialize() {
        this.error = false;
        this.blogs = [];
        this.nextBlogs = [];
        this.currentPage = 0;
        this.loading = false;
        this.nextPage = 0;
        this.noMore = false;
        this.loadMore();
    }

    private loadMore() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.error) {
            this.initialize();
        } else {
            if (this.nextBlogs.length > 0) {
                this.blogs = this.blogs.concat(this.nextBlogs);
            }
            this.currentPage++;
            this.loading = true;
            this.subscription = this.blogService.list(this.currentPage, 10).subscribe(
                blogs => {
                    if (blogs && blogs.length > 0) {
                        this.nextPage = this.currentPage + 1;
                    }
                    this.loading = false;
                    if (this.currentPage == 1) {
                        this.blogs = blogs;
                        if (blogs.length == 10) {
                            this.loadMore();
                        }
                    } else if (blogs && blogs.length > 0) {
                        this.nextBlogs = blogs;
                    } else {
                        this.noMore = true;
                    }
                },
                error => {
                    console.log(error);
                    this.error = true;
                }
            );
        }
    }
}
