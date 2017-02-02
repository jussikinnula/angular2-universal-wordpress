import { Component, Input, OnInit, HostBinding, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

import { MediaService } from "../../services";

import { IMedia } from "../../models";

@Component({
    selector: "[media]",
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.Emulated,
    template: ""
})
export class MediaComponent implements OnInit {
    @Input("media") media: any;
    @Input("size") size: string = "full";
    @HostBinding("src") image: string;
    @HostBinding("alt") alt: string;
    @HostBinding("hidden") hidden: boolean = true;

    constructor(private mediaService: MediaService) {}

    ngOnInit() {
        if (this.media) {
            this.getMedia(this.media);
        } else {
            this.hidden = true;
        }
    }

    private getMedia(id: number) {
        this.mediaService.get(id).subscribe(
            media => {
                if (media[this.size] || media.full) {
                    this.image = media[this.size] || media.full;
                    if (media.alt) {
                        this.alt = media.alt;
                    }
                    this.hidden = false;
                } else {
                    this.hidden = true;
                }
            },
            error => {}
        );
    }
}