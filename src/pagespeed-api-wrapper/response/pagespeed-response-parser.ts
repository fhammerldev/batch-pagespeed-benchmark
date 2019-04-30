import { Audit } from "./audit";
import { ErrorPageSpeedResult } from "./error-pagespeed-result";
import { PageSpeedResult } from "./pagespeed-result";

export class PagespeedResponseParser {
    public parse(dump: any): PageSpeedResult {
        if (dump.error) {
            return new ErrorPageSpeedResult(dump.id, dump.error.message);
        }

        const audits: Audit[] = Object.keys(dump.lighthouseResult.audits).map(key => dump.lighthouseResult.audits[key] as Audit);
        const url: string = dump.id;
        const performance: number = dump.lighthouseResult.categories.performance.score;

        return new PageSpeedResult(url, audits, performance);
    }
}
