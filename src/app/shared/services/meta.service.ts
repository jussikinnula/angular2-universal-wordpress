import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { isBrowser } from "angular2-universal";

import { MediaService } from "./media.service";

@Injectable()
export class MetaService {
    title: string = "";
    description: string = "";
    image: string = "";
    link: string = "";

    constructor(
        @Inject(DOCUMENT) private document: any,
        private mediaService: MediaService
    ) {}

    setMeta(params: any) {
        this.title = params["title"] ? params["title"] : "";
        this.description = params["description"] ? params["description"]: "";
        this.link = params["link"] ? params["link"] : "";
        if (params["image"] && params["image"] > 0) {
            this.mediaService.get(params["image"]).subscribe(
                media => {
                    this.image = media.full;
                    this.updateFields();
                },
                error => {})
        } else {
            this.image = "";
            this.updateFields();
        }

    }

    private updateFields() {
        // Title
        this.document.title = this.title;
        this.updateMetaField("property", "og:title", this.title);
        this.updateMetaField("name", "twitter:title", this.title);

        // Description
        this.updateMetaField("name", "description", this.description);
        this.updateMetaField("property", "og:description", this.description);
        this.updateMetaField("name", "twitter:description", this.description);

        // Image
        this.updateMetaField("property", "og:image", this.image);
        this.updateMetaField("name", "twitter:image", this.image);

        // Link
        this.updateMetaField("property", "og:url", this.link);
    }

    private updateMetaField(name: string, value: string, content: string) {
        if (isBrowser) {
            // @TODO in browser side, what's below works only in NodeJS side...
        } else {
            let headChildren = this.document.head.children;
            for (let i = 0; i < headChildren.length; i++) {
                let element = headChildren[i];
                if (element.name === "meta" && element.attribs[name] === value){
                    element.attribs.content = content;
                }
            }
        }
    }
}
