import { NgModule, ModuleWithProviders } from "@angular/core";

import { ApiService } from "./api.service";
import { DatePipe } from "./date.pipe";
import { OrderByPipe } from "./order-by.pipe";

const PIPES: any[] = [
    DatePipe,
    OrderByPipe
];

const SERVICES = [
    ApiService
]

@NgModule({
    declarations: [
        ...PIPES
    ],
    exports: [
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
