import { Post, IPost } from "../shared";

export interface IBlog extends IPost {}

export class Blog extends Post implements IBlog{
    constructor(params: any) {
        super(params);
        this.link = "/blog" + this.link;
    }
}