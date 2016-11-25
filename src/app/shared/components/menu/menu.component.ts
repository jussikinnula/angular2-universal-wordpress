import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";

import { ApiService } from "../../services";

import { Menu, IMenu } from "./menu.model";
import { MenuItem, IMenuItem } from "./menu-item.model";

@Component({
    selector: "menu",
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ["./menu.component.styl"],
    templateUrl: "./menu.component.pug"
})
export class MenuComponent implements OnInit {
    @Input("id") private id: number;
    @Input("slug") private slug: string;
    items: IMenuItem[] = [];
    private baseUrl = "/wp-json/wp-api-menus/v2/menus";
    private defaultItem: IMenuItem = { id: 0, order: 1, title: "Home", description: "", link: "/" };

    constructor(private apiService: ApiService) {}

    ngOnInit() {
        if (this.id) {
            this.getMenu(this.id).subscribe(menu => this.items = menu.items);
        } else if (this.slug) {
            this.findMenuFromSlug(this.slug)
                .subscribe(
                    menu => {
                        this.getMenu(menu.id).subscribe(menu => this.items = menu.items);
                    },
                    error => {
                        console.error(error);
                    }
                );
        } else {
            console.log("No slug nor id found :-(");
            this.items = [this.defaultItem];
        }
    }

    private getMenu(id: number): Observable<any> {
        return this.apiService.get(this.baseUrl + "/" + id)
            .map( menu => new Menu(menu) )
            .catch( error => Observable.of([this.defaultItem]) );
    }

    private findMenuFromSlug(slug: string): Observable<any> {
        return this.apiService.get(this.baseUrl)
            .map( menus => menus.map(menu => new Menu(menu)) )
            .map( menus => menus.filter(menu => {
                return menu.slug === slug;
            }))
            .map( menus => menus[0] );
    }
}
