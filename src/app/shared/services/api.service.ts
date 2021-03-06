import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
    private baseUrl: string = process.env.WP_HOME || "http://localhost:5001";

    constructor(public http: Http) {}

    get(endpoint: string, options?: any) {
        const url = this.baseUrl + endpoint;
        return this.http.get(url, options)
            .map(res => res.json())
            .catch(err => {
                console.log("Error: ", err);
                return Observable.throw(err);
            });
    }

}
