import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

import { ApiService } from "./api.service";
import { MetaService } from "./meta.service";

import { Blog, Content, IContent, Page } from "../models";

@Injectable()
export class ContentService {
    constructor(
        private apiService: ApiService,
        private metaService: MetaService
    ) {}

    get(path: string) {
        if (path === "") {
            path = "frontpage";
        }
        return this.apiService.get("/wp-json/wp/v2/find?path=" + path)
            .map(content => new Content(content))
            .do(content => this.setMeta(content))
            .catch(error => Observable.of(new Content({})));
    }

    private setMeta(content: IContent) {
        let post: any;
        if (content.page) {
            post = content.page;
        } else if (content.blog) {
            post = content.blog;
        }

        this.metaService.setMeta({
            title: post.title,
            description: post.excerpt,
            image: post.mediaId,
            url: post.link
        });
    }
}
