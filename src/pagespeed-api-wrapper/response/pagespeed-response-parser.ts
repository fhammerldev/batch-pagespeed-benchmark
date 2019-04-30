import { Audit } from "./audit";
import { PageSpeedResult } from "./pagespeed-result";

export class PagespeedResponseParser {
    public parse(dump: any): PageSpeedResult {
        const audits: Audit[] = [];
        if(!dump.lighthouseResult) {
            console.log("went wrong: ", dump);
            return new PageSpeedResult(dump.id, [], 0)
        }
        const rawAudits: any = dump.lighthouseResult.audits;
        for (const key in rawAudits) {
            if (rawAudits.hasOwnProperty(key)) {
                audits.push(rawAudits[key] as Audit);
            }
        }

        return new PageSpeedResult(dump.id, audits, dump.lighthouseResult.categories.performance.score);
    }
}
