import { PagespeedQueryParser } from "../../../src/pagespeed-api-wrapper/request/pagespeed-query-parser";
import { BenchmarkStrategy } from "../../../src/pagespeed-api-wrapper/request/benchmark-strategy";
import { URL } from "url";

describe("PagespeedApiWrapper", () => {
    it("should have the method parse()", () => {
        const pagespeedApiWrapper: PagespeedQueryParser = new PagespeedQueryParser();
        expect(pagespeedApiWrapper.parse).toBeDefined();
    });

    it("should return a formatted query with the url and the strategy as the params", () => {
        const pagespeedApiWrapper: PagespeedQueryParser = new PagespeedQueryParser();
        const url: string = "https://google.com";
        const result: string = pagespeedApiWrapper.parse(url, BenchmarkStrategy.Mobile);
        expect(result)
            .toBe("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fgoogle.com&strategy=mobile");
    });

    it("should return a formatted query with the url, strategy and api key as the params", () => {
        const apiKey: string = "__myapikey__";
        const pagespeedApiWrapper: PagespeedQueryParser = new PagespeedQueryParser(apiKey);
        const url: string = "https://google.com";
        const strategy: BenchmarkStrategy = BenchmarkStrategy.Mobile;
        const result: string = pagespeedApiWrapper.parse(url, strategy);
        expect(result)
            .toBe("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fgoogle.com&strategy=mobile&key=__myapikey__");
    });
});
