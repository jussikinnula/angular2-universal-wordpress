// the polyfills must be the first thing imported
import "angular2-universal-polyfills";
import "ts-helpers";
import "./__workaround.browser"; // temporary until 2.1.1 things are patched in Core

// Angular 2
import { enableProdMode } from "@angular/core";
import { platformUniversalDynamic } from "angular2-universal/browser";

import { load as loadWebFont } from "webfontloader";

// Production mode
if (process.env.NODE_ENV === "production") {
    enableProdMode();
}

import { MainModule } from "./browser.module";

import './styles/main.styl';

export const platformRef = platformUniversalDynamic();

// on document ready bootstrap Angular 2
export function main() {
    // Load fonts async
    // https://github.com/typekit/webfontloader#configuration
    loadWebFont({
        google: {
            families: ["Slabo 27px"]
        }
    });

    return platformRef.bootstrapModule(MainModule);
}

// support async tag or hmr
switch (document.readyState) {
    case "loading":
        document.addEventListener("DOMContentLoaded", () => main());
        break;
    case "interactive":
    case "complete":
    default:
        main();
}
