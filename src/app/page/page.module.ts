import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { PageComponent } from "./page.component";
import { PageRoutingModule } from "./page-routing.module";

@NgModule({
    imports: [
        SharedModule,
        PageRoutingModule
    ],
    declarations: [
        PageComponent
    ]
})
export class PageModule { }
