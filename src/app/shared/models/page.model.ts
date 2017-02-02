import { Post, IPost } from "./post.model";
import { Media, IMedia } from "./media.model";

export interface IPage extends IPost {
    ingress?: string;
    authorImage?: IMedia;
    relatedPage?: IPage;
    isFrontPage: boolean;
    isHome: boolean;
}

export class Page extends Post implements IPage {
    ingress: string;
    authorImage: IMedia;
    relatedPage: IPage;
    isFrontPage: boolean = false;
    isHome: boolean = false;

    constructor(params: any, level: number = 0) {
        super(params);

        // Front Page
        if (params["is_front_page"]) {
            this.isFrontPage = true;
        }

        // Page For Posts
        if (params["is_home"]) {
            this.isHome = true;
        }

        // ACF fields
        if (params["acf"]) {

            // Get ingress
            this.ingress = params["acf"]["ingress"];

            // Get author image
            if (params["acf"]["author_image"]) {
                this.authorImage = new Media(params["acf"]["author_image"]);
            }

            // Get related page (only for level 0, to avoid infinite loop)
            if (params["acf"]["related_page"] && level == 0) {
                this.relatedPage = new Page(params["acf"]["related_page"], 1);
            }
        }
    }
}