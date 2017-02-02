import { Blog, IBlog } from "./blog.model";
import { Page, IPage } from "./page.model";

export interface IContent {
    notFound: boolean;
    blog?: IBlog;
    page?: IPage;
}

export class Content implements IContent {
    notFound: boolean = false;
    blog: IBlog;
    page: IPage;

    constructor(params: any) {
        if (params["post_type"] == "post") {
            this.blog = new Blog(params);
        } else if (params["post_type"] == "page") {
            this.page = new Page(params);
        }
        if (!this.blog && !this.page) {
            this.notFound = true;
        }
    }
}