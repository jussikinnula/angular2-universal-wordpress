import * as url from "url";

export interface IMedia {
    id: number;
    title?: string;
    alt?: string;
    full: string;
    large?: string;
    medium?: string;
    mediumLarge?: string;
    thumbnail?: string;
}

export class Media implements IMedia {
    id: number;
    title: string;
    alt: string;
    full: string;
    large: string;
    medium: string;
    mediumLarge: string;
    thumbnail: string;

    constructor(params: any) {
        this.id = params["id"];

        if (params["media_details"]) {
            this.title = params["title"]["rendered"];
            this.alt = params["alt_text"];
            this.full = params["source_url"];
            this.large = this.getMedia(params, "large");
            this.medium = this.getMedia(params, "medium");
            this.mediumLarge = this.getMedia(params, "medium_large");
            this.thumbnail = this.getMedia(params, "thumbnail");
        } else {
            this.alt = params["alt"];
            this.full = params["url"];
            this.large = params["sizes"]["large"];
            this.medium = params["sizes"]["medium"];
            this.mediumLarge = params["sizes"]["mediumLarge"];
            this.thumbnail = params["sizes"]["thumbnail"];
        }
    }

    private getMedia(params: any, size: string) {
        if (params["media_details"] && params["media_details"]["sizes"] && params["media_details"]["sizes"][size]) {
            return params["media_details"]["sizes"][size]["source_url"];
        }
    }
}