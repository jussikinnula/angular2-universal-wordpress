import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FrontpageComponent } from "./frontpage.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "", component: FrontpageComponent, pathMatch: "full" }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FrontpageRoutingModule { }
