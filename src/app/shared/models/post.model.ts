import * as url from "url";
import * as moment from "moment";

export interface IPost {
    id: number;
    created: Date;
    modified: Date;
    slug: string;
    link?: string;
    title: string;
    excerpt?: string;
    content?: string;
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
    excerpt: string;
    content: string;
    mediaId: number;
    authorId: number;
    parentId: number;

    constructor(params: any) {
        this.id = this.getId(params["id"] || params["ID"]);

        this.created = moment(params["date_gmt"] || params["post_date_gmt"]).toDate();

        this.modified = moment(params["modified_gmt"] || params["post_modified_gmt"]).toDate();

        this.slug = params["slug"] || params["post_name"];

        if (params["link"] || params["post_link"]) {
            this.link = (url.parse(params["link"] || params["post_link"]).pathname + "/").replace(/\/+$/, "/");
        }

        if (params["title"] && params["title"]["rendered"]) {
            this.title = decodeURIComponent(params["title"]["rendered"]);
        } else {
            this.title = decodeURIComponent(params["post_title"]);
        }

        if (params["excerpt"] && params["excerpt"]["rendered"]) {
            this.excerpt = decodeURIComponent(params["excerpt"]["rendered"]);
        } else {
            this.excerpt = decodeURIComponent(params["post_excerpt"]);
        }

        if (params["content"] && params["content"]["rendered"]) {
            this.content = this.replaceLinks(params["content"]["rendered"]);
        } else if (params["post_content"]) {
            this.content = this.replaceLinks(params["post_content"]);
        }

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
