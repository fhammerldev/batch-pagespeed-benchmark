import { from, interval, of } from "rxjs";
import { catchError, concatMap, filter, take, switchMap, delay } from "rxjs/operators";
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
        const results: PageSpeedResult[] = [];
        const benchmarkResult: BenchmarkResult = new BenchmarkResult(results);
        let promiseResolve:any;
        this.getRequestTimer(urls).pipe(delay(0)).subscribe(
            res => results.push(res),
            () => { },
            () => { promiseResolve(benchmarkResult); }
        );

        return new Promise((resolve, reject) => { promiseResolve = resolve; })
    }


    private getRequestTimer(urls: string[]) {
        return interval(this.retryInterval)
            .pipe(
                take(urls.length),
                switchMap(i => this.executeRequest(urls[i]))
            );
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
