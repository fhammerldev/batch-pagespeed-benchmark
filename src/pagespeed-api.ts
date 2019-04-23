import { BenchmarkResult } from "./benchmark-result";
import { PagespeedApiWrapper } from "./pagespeed-api-wrapper/pagespeed-api-wrapper";
import { BenchmarkStrategy } from "./pagespeed-api-wrapper/request/benchmark-strategy";
import { PageSpeedResult } from "./pagespeed-api-wrapper/response/pagespeed-result";
export class PagespeedApi {
    public pagespeedApiWrapper: PagespeedApiWrapper;

    constructor(pagespeedApiWrapper: PagespeedApiWrapper) {
        this.pagespeedApiWrapper = pagespeedApiWrapper;
    }

    public async runBenchmarkAsync(urls: string[], msBetweenRequests: number = 500): Promise<BenchmarkResult> {
        const pageSpeedResults: PageSpeedResult[] = [];
        const benchmarkResult: BenchmarkResult = new BenchmarkResult(pageSpeedResults);
        const promises: Array<Promise<any>> = urls.map((url) => this.pagespeedApiWrapper.run(url, BenchmarkStrategy.Mobile).then((res) => {
            console.log("thehapp"); pageSpeedResults.push(res);
        }));

        return Promise.all(promises).then(() => benchmarkResult);
    }
}
