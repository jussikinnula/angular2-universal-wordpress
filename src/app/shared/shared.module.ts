import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MediaComponent, MenuComponent } from "./components";
import { DatePipe, OrderByPipe, SanitizePipe } from "./pipes";
import { ApiService, BlogService, ContentService, MediaService, MetaService } from "./services";

const COMPONENTS = [
    MediaComponent,
    MenuComponent
];

const PIPES = [
    DatePipe,
    OrderByPipe,
    SanitizePipe
];

const SERVICES = [
    ApiService,
    BlogService,
    ContentService,
    MediaService,
    MetaService
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
        ...PIPES,
        CommonModule,
        FormsModule
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
