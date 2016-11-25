import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MenuComponent } from "./components";
import { DatePipe, OrderByPipe } from "./pipes";
import { ApiService } from "./services";

const COMPONENTS = [
    MenuComponent
];

const PIPES = [
    DatePipe,
    OrderByPipe
];

const SERVICES = [
    ApiService
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        ...COMPONENTS,
        ...PIPES
    ],
    exports: [
        ...COMPONENTS,
        ...PIPES
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ...SERVICES
            ]
        };
    }
}
