import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

import { MediaService } from "./media.service";

@Injectable()
export class MetaService {
    title: string = "";
    description: string = "";
    image: string = "";
    link: string = "";
    private siteUrl: string = process.env.SITE_URL || "http://localhost:5000";

    constructor(
        @Inject(DOCUMENT) private document: any,
        private mediaService: MediaService
    ) {
        this.updateFields();
    }

    setMeta(params: any) {
        this.title = params["title"] ? params["title"] : "Default title";
        this.description = params["description"] ? params["description"]: "Default description";
        this.link = this.siteUrl + "/" + (params["link"] ? params["link"] : "");
        if (params["image"] && params["image"] > 0) {
            this.mediaService.get(params["image"]).subscribe(
                media => {
                    this.image = media.full;
                    this.updateFields();
                },
                error => {})
        } else {
            this.image = "https://placehold.it/512x512";
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
        for (let element of headChildren) {
            if (element.tagName.toLowerCase() === "meta" && element.getAttribute("name") === "description") {
                element.setAttribute("content", content);
            }
        }
    }

    private setMetaProperty(property: string, content: string) {
        let headChildren = this.document.head.children;
        for (let element of headChildren) {
            if (element.tagName.toLowerCase() === "meta" && element.getAttribute("property") === property) {
                element.setAttribute("content", content);
            }
        }
    }
}
