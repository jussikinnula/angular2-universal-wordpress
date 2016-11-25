import * as url from "url";
import * as moment from "moment";

export interface IPost {
    id: number;
    created: Date;
    modified: Date;
    slug: string;
    link: string;
    title: string;
    content: string;
    mediaId?: number;
    authorId?: number;
    parentId?: number;
}

export class Post implements IPost {
    id: number;
    created: Date;
    modified: Date;
    slug: string;
    link: string;
    title: string;
    content: string;
    mediaId: number;
    authorId: number;
    parentId: number;

    constructor(params: any) {
        this.id = parseInt(params["id"], 10);
        this.created = moment(params["date_gmt"]).toDate();
        this.modified = moment(params["modified_gmt"]).toDate();
        this.slug = params["slug"];
        this.link = (url.parse(params["link"]).pathname + "/").replace(/\/+$/, "/");
        this.title = decodeURIComponent(params["title"]["rendered"]);
        this.content = this.replaceLinks(params["content"]["rendered"]);
        this.mediaId = this.getId(params["featured_media"]);
        this.authorId = this.getId(params["author"]);
        this.parentId = this.getId(params["parent"]);
    }

    private getId(param: any) {
        let id = parseInt(param, 10);
        if (id > 0) {
            return id;
        }
    }

    private replaceLinks(html: string) {
        const apiUrl = process.env.WP_HOME || "http://localhost:5001";
        return html.replace(apiUrl, "");
    }
}
