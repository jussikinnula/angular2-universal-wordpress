import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "./shared";
import { ContentModule } from "./content";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule.forRoot(),
        ContentModule,
        AppRoutingModule
    ]
})
export class AppModule {}
