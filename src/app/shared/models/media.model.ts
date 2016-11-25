import * as url from "url";
import * as moment from "moment";

export interface IMedia {
    id: number;
    created: Date;
    modified: Date;
    slug: string;
    link: string;
    title: string;
    width: number;
    height: number;
}

export class Media implements IMedia {
    id: number;
    created: Date;
    modified: Date;
    slug: string;
    link: string;
    title: string;
    description: string;
    width: number;
    height: number;

    constructor(params: any) {
        this.id = parseInt(params["id"], 10);
        this.created = moment(params["date_gmt"]).toDate();
        this.modified = moment(params["modified_gmt"]).toDate();
        this.slug = params["slug"];
        this.link = params["source_url"];
        this.title = params["title"]["rendered"];
        this.width = parseInt(params["width"], 10);
        this.height = parseInt(params["height"], 10);
    }
}
