import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { ApiService } from "./api.service";

import { Media } from "../models";

@Injectable()
export class MediaService {
    private baseUrl: string = "/wp-json/wp/v2/media";

    constructor(private apiService: ApiService) {}

    get(id: number): Observable<any> {
        return this.apiService.get(this.baseUrl + "/" + id)
            .map(media => new Media(media));
    }

}
