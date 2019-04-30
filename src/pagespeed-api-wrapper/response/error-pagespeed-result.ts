import { PageSpeedResult } from "./pagespeed-result";
export class ErrorPageSpeedResult extends PageSpeedResult {
    constructor(url: string, error: string) {
        super(url, [], 0);
        this.error = error;
    }
}
