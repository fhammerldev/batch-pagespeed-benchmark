import { Audit } from "./audit";
import { PageSpeedResult } from "./pagespeed-result";

export class PagespeedResponseParser {
    public parse(dump: any): PageSpeedResult {
        const audits: Audit[] = [];
        const rawAudits: any = dump.lighthouseResult.audits;

        if (dump.statusCode === 500) {
            console.log();
        }
        // tslint:disable-next-line:forin
        for (const auditId in rawAudits) {
            audits.push(rawAudits[auditId] as Audit);
        }
        console.log("parsed", dump.id);
        return new PageSpeedResult(dump.id, audits, dump.lighthouseResult.categories.performance.score);
    }
}
