import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Observable } from "rxjs";

import { ApiService, MediaService, IMedia } from "../shared";

import { Page, IPage } from "./page.model";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./page.component.styl"],
    templateUrl: "./page.component.pug"
})
export class PageComponent implements OnInit {
    page: IPage;
    pageNotFound: boolean = false;
    media: IMedia;
    loading: boolean = false;
    private baseUrl: string = "/wp-json/wp/v2/pages";
    private link: string;
    private slug: string;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private mediaService: MediaService
    ) {}

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => this.routeChanged(event));
    }

    private routeChanged(event?: any) {
        let link = "/";
        let slug = "frontpage";
        if (event) {
            link = (event.url + "/").replace(/\/+$/, "/");;
            slug = event.url.split("/").pop();
        }
        if (link !== this.link) {
            this.link = link;
            this.slug = slug;
            this.page = undefined;
            this.pageNotFound = false;
            this.media = undefined;
            this.loading = true;
            this.getPage().subscribe( pages => {
                this.loading = false;
                if (pages && pages[0]) {
                    this.page = pages[0];
                    if (this.page.mediaId) {
                        this.mediaService.get(this.page.mediaId).subscribe( media => this.media = media );
                    } else {
                        this.media = undefined;
                    }
                } else {
                    this.page = undefined;
                    this.pageNotFound = true;
                    this.media = undefined;
                }
            });
        }
    }

    private getPage(): Observable<any> {
        return this.apiService.get(this.baseUrl + "?filter[name]=" + this.slug)
            .map( pages => pages.map(page => new Page(page)) )
            .map( pages => pages.filter(page =>  page.link === this.link) );
    }
}
