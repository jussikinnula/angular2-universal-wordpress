import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { ApiService } from "./api.service";

import { Blog, IBlog } from "../models";

@Injectable()
export class BlogService {
    private baseUrl: string = "/wp-json/wp/v2/posts";

    constructor(private apiService: ApiService) {}

    list(page: number = 1, count: number = 10): Observable<any> {
        const url = this.baseUrl + "?filter[type]=post&filter[orderby]=date&order=desc&per_page=" + count + "&page=" + page;
        return this.apiService.get(url)
            .map(items => <IBlog[]>items.map(item => new Blog(item)));
    }

    get(id: number): Observable<any> {
        const url = this.baseUrl + "/" + id;
        return this.apiService.get(url).map(item => new Blog(item));
    }
}
