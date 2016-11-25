import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { FrontpageComponent } from "./frontpage.component";
import { FrontpageRoutingModule } from "./frontpage-routing.module";

@NgModule({
    imports: [
        SharedModule,
        FrontpageRoutingModule
    ],
    declarations: [
        FrontpageComponent
    ]
})
export class FrontpageModule { }
