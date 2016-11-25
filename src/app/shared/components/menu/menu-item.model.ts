import * as url from "url";

export interface IMenuItem {
    id: number;
    order: number;
    title: string;
    description: string;
    link: string;
    children?: IMenuItem[];
}

export class MenuItem implements IMenuItem {
    id: number;
    order: number;
    title: string;
    description: string;
    link: string;
    children: IMenuItem[];

    constructor(params: any) {
        this.id = params["id"];
        this.order = params["order"];
        this.title = params["title"];
        this.description = params["description"];
        this.link = url.parse(params["url"]).pathname;

        let children = params["children"];
        if (children && children.length > 0) {
            this.children = children.map(child => {
                return new MenuItem(child);
            });
        }
    }
}