import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

declare var process: any;

@Injectable()
export class ApiService {
    private baseUrl: string = process.env.WP_HOME || "http://localhost:5001";

    constructor(public http: Http) {}

    get(endpoint: string, options?: any) {
        return this.http.get(this.baseUrl + endpoint, options)
            .map(res => res.json())
            .catch(err => {
                console.log("Error: ", err);
                return Observable.throw(err);
            });
    }

}
