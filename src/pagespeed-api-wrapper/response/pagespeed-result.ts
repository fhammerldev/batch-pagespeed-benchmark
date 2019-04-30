import { Audit } from "./audit";
export class PageSpeedResult {
    public url: string = "";
    public audits: Audit[] = [];
    public performance: number;
    public error: string;

    constructor(url: string, audits: Audit[], performance: number) {
        this.url = url;
        this.audits = audits;
        this.performance = performance;
    }
}
