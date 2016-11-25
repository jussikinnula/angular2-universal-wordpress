import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { BlogRoutingModule } from "./blog-routing.module";
import { BlogService } from "./blog.service";
import { BlogListComponent } from "./blog-list";
import { SelectedBlogComponent } from "./selected-blog";

@NgModule({
    imports: [
        SharedModule,
        BlogRoutingModule
    ],
    providers: [
        BlogService
    ],
    declarations: [
        BlogListComponent,
        SelectedBlogComponent
    ]
})
export class BlogModule {}
