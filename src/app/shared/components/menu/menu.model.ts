import { MenuItem, IMenuItem } from "./menu-item.model";

export interface IMenu {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
    items?: IMenuItem[];
}

export class Menu implements IMenu {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
    items: IMenuItem[];

    constructor(params: any) {
        this.id = parseInt(params["ID"], 10);
        this.name = params["name"];
        this.slug = params["slug"];
        this.description = params["description"];
        this.count = parseInt(params["count"], 10);

        let items = params["items"];
        if (items && items.length > 0) {
            this.items = items.map(item => {
                return new MenuItem(item);
            });
        }
    }
}