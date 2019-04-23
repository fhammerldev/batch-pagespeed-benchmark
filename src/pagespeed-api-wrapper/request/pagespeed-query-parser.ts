import { URL } from "url";
import { BenchmarkStrategy } from "./benchmark-strategy";

export class PagespeedQueryParser {
    private static readonly api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
    private readonly apiKey?: string; // TODO: remove null with inheritance and a factory
    constructor(apiKey?: string) {
        this.apiKey = apiKey;
    }

    public parse(baseUrl: string, benchmarkStrategy: BenchmarkStrategy): URL {
        if (baseUrl.indexOf("http") === -1) {
            throw new Error("Invalid URL, must contain schema");
        }

        const query: URL = new URL(PagespeedQueryParser.api);
        query.searchParams.append("url", baseUrl);
        query.searchParams.append("strategy", benchmarkStrategy);
        if (this.apiKey) {
            query.searchParams.append("key", this.apiKey);
        }

        return query;
    }
}
