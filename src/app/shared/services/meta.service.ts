import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

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
        this.setMetaProperty("og:title", this.title);
        this.setMetaProperty("twitter:title", this.title);

        // Description
        this.setMetaDescription(this.description);
        this.setMetaProperty("og:description", this.description);
        this.setMetaProperty("twitter:description", this.description);

        // Image
        this.setMetaProperty("og:image", this.image);
        this.setMetaProperty("twitter:image", this.image);

        // Link
        this.setMetaProperty("og:url", this.link);
    }

    private setMetaDescription(content: string) {
        let headChildren = this.document.head.children;
        for (let i = 0; i < headChildren.length; i++) {
            let element = headChildren[i];
            if (element.name === "meta" && element.attribs.name === "description"){
                element.attribs.content = content;
            }
        }
    }

    private setMetaProperty(property: string, content: string) {
        let headChildren = this.document.head.children;
        for (let i = 0; i < headChildren.length; i++) {
            let element = headChildren[i];
            if (element.name === "meta" && element.attribs.property === property){
                element.attribs.content = content;
            }
        }
    }
}
