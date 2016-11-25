import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { ApiService } from "../shared";

import { Blog } from "./blog.model";

@Injectable()
export class BlogService {
    private baseUrl: string = "/wp-json/wp/v2/posts";

    constructor(private apiService: ApiService) {}

    list(): Observable<any> {
        return this.apiService.get(this.baseUrl + "/?filter[type]=post")
            .map(blogs => blogs.map(blog => new Blog(blog)) );
    }

    get(slug: string): Observable<any> {
        return this.apiService.get(this.baseUrl + "/?filter[type]=post&filter[name]=" + slug)
            .map(blogs => blogs.map(blog => new Blog(blog)) )
    }
}
