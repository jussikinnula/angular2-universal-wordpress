import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { BlogListComponent } from './blog-list';
import { SelectedBlogComponent } from './selected-blog';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: "blog/:slug", component: SelectedBlogComponent },
            { path: "blog", component: BlogListComponent, pathMatch: "full" }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class BlogRoutingModule { }
