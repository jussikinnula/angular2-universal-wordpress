import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "./shared";

import { BlogModule } from "./blog";
import { FrontpageModule } from "./frontpage";
import { PageModule } from "./page";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule.forRoot(),
        BlogModule,
        FrontpageModule,
        PageModule,
        AppRoutingModule
    ]
})
export class AppModule {}
