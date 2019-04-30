import { from, interval, of } from "rxjs";
import { catchError, concatMap, filter, take } from "rxjs/operators";
import { BenchmarkResult } from "./benchmark-result";
import { PagespeedApiWrapper } from "./pagespeed-api-wrapper/pagespeed-api-wrapper";
import { BenchmarkStrategy } from "./pagespeed-api-wrapper/request/benchmark-strategy";
import { ErrorPageSpeedResult } from "./pagespeed-api-wrapper/response/error-pagespeed-result";
import { PageSpeedResult } from "./pagespeed-api-wrapper/response/pagespeed-result";
export class PagespeedApi {
    public pagespeedApiWrapper: PagespeedApiWrapper;

    private readonly retries = 5;

    private readonly retryInterval = 2000;

    constructor(pagespeedApiWrapper: PagespeedApiWrapper) {
        this.pagespeedApiWrapper = pagespeedApiWrapper;
    }

    public async runBenchmarkAsync(urls: string[], msBetweenRequests: number = 500): Promise<BenchmarkResult> {
        const promises: Array<Promise<PageSpeedResult>> = urls.map((url, i) => {
            const offsetFromStart = msBetweenRequests * i;
            return this.getDelayedPromise(url, offsetFromStart);
        });
        return Promise.all(promises).then((res) => new BenchmarkResult(res));
    }

    private getDelayedPromise(url: string, offsetFromStart: number): Promise<PageSpeedResult> {
        return new Promise<PageSpeedResult>((resolve, reject) => setTimeout(this.createExecutableRequest(url, resolve), offsetFromStart));
    }

    private createExecutableRequest(url: string, resolve: (value?: PageSpeedResult | PromiseLike<PageSpeedResult>) => void): (...args: any[]) => void {
        return async () => {
            const result = await this.executeRequest(url);
            resolve(result);
        };
    }

    private executeRequest(url: string) {
        return interval(this.retryInterval).pipe(
            take(this.retries),
            concatMap(() => this.pagespeedApiWrapper.run(url, BenchmarkStrategy.Mobile)),
            filter((pageSpeedResult, i) => this.isValid(pageSpeedResult, i)),
            take(1)).toPromise();
    }

    private isValid(pageSpeedResult: PageSpeedResult, i: number): boolean {
        const isLast = i == this.retries - 1;
        return !pageSpeedResult.error || isLast;
    }
}
