import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { ContentRoutingModule } from "./content-routing.module";
import { ContentComponent } from "./content.component";
import { PageComponent } from "./page";
import { BlogComponent } from "./blog";
import { BlogListComponent } from "./blog-list";

@NgModule({
    imports: [
        SharedModule,
        ContentRoutingModule
    ],
    declarations: [
        ContentComponent,
        PageComponent,
        BlogComponent,
        BlogListComponent
    ]
})
export class ContentModule {}
