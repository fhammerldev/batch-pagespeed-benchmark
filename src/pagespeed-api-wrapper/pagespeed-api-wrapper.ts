import { HttpClient } from "./http-client";
import { BenchmarkStrategy } from "./request/benchmark-strategy";
import { PagespeedQueryParser } from "./request/pagespeed-query-parser";
import { PagespeedResponseParser } from "./response/pagespeed-response-parser";
import { PageSpeedResult } from "./response/pagespeed-result";
import { map, switchMap } from "rxjs/operators";
import { Observable, from } from "rxjs";

export class PagespeedApiWrapper {
    public readonly queryParser: PagespeedQueryParser;
    public readonly resultParser: PagespeedResponseParser;
    public readonly httpClient: HttpClient;

    constructor(queryParser: PagespeedQueryParser, resultParser: PagespeedResponseParser, httpClient: HttpClient) {
        this.queryParser = queryParser;
        this.resultParser = resultParser;
        this.httpClient = httpClient;
    }

    public run(url: string, strategy: BenchmarkStrategy): Observable<PageSpeedResult> {
        return this.httpClient.httpGet(this.queryParser.parse(url, strategy)).pipe(
            switchMap(res => this.parseResult(res))
        );
    }

    private parseResult(res: any): Observable<PageSpeedResult> {
        return from(res.json()).pipe(
            map(res => this.resultParser.parse(res))
        );
    }
}
