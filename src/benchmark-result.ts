import { PageSpeedResult } from "./pagespeed-api-wrapper/response/pagespeed-result";

export class BenchmarkResult {
    public readonly results: PageSpeedResult[];
    public readonly timestamp: Date;
    constructor(results: PageSpeedResult[], timestamp: Date = new Date()) {
        this.results = results;
        this.timestamp = timestamp;
    }

    public serialize(): any {
        return { results: this.results, timestamp: this.timestamp.toISOString(), average: this.averagePerformance() };
    }

    public averagePerformance() {
        return this.results.map((x) => x.performance).reduce((total, amount, index, array) => {
            total += amount;
            if (index === array.length - 1) {
                return total / array.length;
            } else {
                return total;
            }
        });
    }
}
