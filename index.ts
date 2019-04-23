import { PagespeedApi } from "./src/pagespeed-api";
import { PagespeedApiWrapper } from "./src/pagespeed-api-wrapper/pagespeed-api-wrapper";
import { HttpClient } from "./src/pagespeed-api-wrapper/http-client";
import { PagespeedResponseParser } from "./src/pagespeed-api-wrapper/response/pagespeed-response-parser";
import { PagespeedQueryParser } from "./src/pagespeed-api-wrapper/request/pagespeed-query-parser";
import { BenchmarkResult } from "./src/benchmark-result";



export async function runBenchmarkAsync(urls: string[], msBetweenRequests: number = 2000, apiKey: string = "") {
    // DI right?
    const queryParser: PagespeedQueryParser = new PagespeedQueryParser(apiKey);
    const resultParser: PagespeedResponseParser = new PagespeedResponseParser();
    const client: HttpClient = new HttpClient();
    const apiWrapper: PagespeedApiWrapper = new PagespeedApiWrapper(queryParser, resultParser, client);
    const api: PagespeedApi = new PagespeedApi(apiWrapper);
    const result: BenchmarkResult = await api.runBenchmarkAsync(urls, msBetweenRequests);
    return result;
};
