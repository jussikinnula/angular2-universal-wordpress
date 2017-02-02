import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ContentComponent } from "./content.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: ":first/:second/:third/:fourth",
                component: ContentComponent
            },
            {
                path: ":first/:second/:third",
                component: ContentComponent
            },
            {
                path: ":first/:second",
                component: ContentComponent
            },
            {
                path: ":first",
                component: ContentComponent
            },
            {
                path: "",
                pathMatch: "full",
                component: ContentComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ContentRoutingModule {}
