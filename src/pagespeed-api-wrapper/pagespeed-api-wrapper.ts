import { URL } from "url";
import { HttpClient } from "./http-client";
import { BenchmarkStrategy } from "./request/benchmark-strategy";
import { PagespeedQueryParser } from "./request/pagespeed-query-parser";
import { PagespeedResponseParser } from "./response/pagespeed-response-parser";
import { PageSpeedResult } from "./response/pagespeed-result";

export class PagespeedApiWrapper {
    public readonly queryParser: PagespeedQueryParser;
    public readonly resultParser: PagespeedResponseParser;
    public readonly httpClient: HttpClient;

    constructor(queryParser: PagespeedQueryParser, resultParser: PagespeedResponseParser, httpClient: HttpClient) {
        this.queryParser = queryParser;
        this.resultParser = resultParser;
        this.httpClient = httpClient;
    }

    public async run(url: string, strategy: BenchmarkStrategy): Promise<PageSpeedResult> {
        return this.httpClient.httpGet(this.parseUrl(url, strategy)).then(this.parseResult);
    }

    private readonly parseResult = async (res: any): Promise<PageSpeedResult> => {
        return this.resultParser.parse(await res.json());
    }

    private parseUrl(url: string, strategy: BenchmarkStrategy): string {
        return this.queryParser.parse(url, strategy).toString();
    }
}
