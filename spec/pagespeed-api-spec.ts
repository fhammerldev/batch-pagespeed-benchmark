import { BenchmarkResult } from "../src/benchmark-result";
import { PagespeedApi } from "../src/pagespeed-api";

describe("PagespeedApi", () => {
    it("Should be defined.", () => {
        const pagespeedApi: PagespeedApi = new PagespeedApi(null);
        expect(pagespeedApi.runBenchmarkAsync).toBeDefined("The runBenchmark should be defined.");
    });

    it("Should be awaitable.", async () => {
        const pagespeedApi: PagespeedApi = new PagespeedApi(null);
        const result: BenchmarkResult = await pagespeedApi.runBenchmarkAsync([]);
        expect(result).toBeDefined("The runBenchmark should be defined.");
    });
});
