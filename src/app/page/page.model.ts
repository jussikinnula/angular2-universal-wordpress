import { Post, IPost } from "../shared";

export interface IPage extends IPost {}

export class Page extends Post implements IPage {
    constructor(params: any) {
        super(params);
    }
}