import { BenchmarkStrategy } from "./benchmark-strategy";

export class PagespeedQueryParser {
    private static readonly api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
    private readonly apiKey?: string; // TODO: remove null with inheritance and a factory
    constructor(apiKey?: string) {
        this.apiKey = apiKey;
    }

    public parse(baseUrl: string, benchmarkStrategy: BenchmarkStrategy): string {
        if (baseUrl.indexOf("http") === -1) {
            throw new Error("Invalid URL, must contain schema");
        }

        let query: string = PagespeedQueryParser.api;
        query += `?url=${encodeURIComponent(baseUrl)}`;
        query += `&strategy=${benchmarkStrategy}`;
        if (this.apiKey) {
            query += `&key=${this.apiKey}`;
        }

        return query;
    }
}
