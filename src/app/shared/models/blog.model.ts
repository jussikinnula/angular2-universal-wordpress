import { Post, IPost } from "./post.model";

export interface IBlog extends IPost {}

export class Blog extends Post implements IBlog {
    constructor(params: any) {
        super(params);
    }
}