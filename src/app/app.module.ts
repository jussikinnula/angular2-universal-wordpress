import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "./shared";

import { HomeModule } from "./home";
import { PageModule } from "./page";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule.forRoot(),
        HomeModule,
        PageModule,
        AppRoutingModule
    ]
})
export class AppModule {}
