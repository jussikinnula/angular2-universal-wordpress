import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { PageComponent } from "./page.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "**", component: PageComponent, pathMatch: "full" }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PageRoutingModule { }
