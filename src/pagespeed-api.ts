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
        const promises: Array<Promise<PageSpeedResult>> = urls.map((url, i) => {
            const offsetFromStart = msBetweenRequests * i;
            return this.getDelayedPromise(url, offsetFromStart)
        });
        return Promise.all(promises).then((res) => new BenchmarkResult(res));
    }

    private getDelayedPromise(url: string, offsetFromStart: number): Promise<PageSpeedResult> {
        return new Promise<PageSpeedResult>((resolve, reject) => setTimeout(this.createExecutableRequest(url, resolve), offsetFromStart));
    }

    private createExecutableRequest(url: string, resolve: (value?: PageSpeedResult | PromiseLike<PageSpeedResult>) => void): (...args: any[]) => void {
        return async () => {
            console.log('starting ' + url);
            const result = await this.executeRequest(url);
            resolve(result);
        };
    }

    private executeRequest(url: string) {
        return this.pagespeedApiWrapper.run(url, BenchmarkStrategy.Mobile);
    }
}
