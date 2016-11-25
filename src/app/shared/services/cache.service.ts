import { Inject, Injectable, isDevMode } from "@angular/core";

@Injectable()
export class CacheService {
    static KEY = "CacheService";

    constructor(@Inject("LRU") private cache: Map<string, any>) {}

    /**
     * check if there is a value in our store
     */
    has(key: string | number): boolean {
        key = this.normalizeKey(key);
        return this.cache.has(key);
    }

    /**
     * store our state
     */
    set(key: string | number, value: any): void {
        key = this.normalizeKey(key);
        this.cache.set(key, value);
    }

    /**
     * get our cached value
     */
    get(key: string | number): any {
        key = this.normalizeKey(key);
        return this.cache.get(key);
    }

    /**
     * release memory refs
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * convert to json for the client
     */
    dehydrate(): any {
        let json = {};
        this.cache.forEach((value: any, key: string) => json[key] = value);
        return json;
    }

    /**
     * convert server json into out initial state
     */
    rehydrate(json: any): void {
        Object.keys(json).forEach((key: string) => {
            key = this.normalizeKey(key);
            let value = json[key];
            this.cache.set(key, value);
        });
    }

    /**
     * allow JSON.stringify to work
     */
    toJSON(): any {
        return this.dehydrate();
    }

    /**
     * convert numbers into strings
     */
    normalizeKey(key: string | number): string {
        if (isDevMode() && this.isInvalidValue(key)) {
            throw new Error("Please provide a valid key to save in the CacheService");
        }

        return key + "";
    }

    private isInvalidValue(key): boolean {
        return key === null ||
            key === undefined ||
            key === 0 ||
            key === "" ||
            typeof key === "boolean" ||
            Number.isNaN(<number>key);
    }
}
