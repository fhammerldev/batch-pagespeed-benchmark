import { PagespeedApiWrapper } from "../../src/pagespeed-api-wrapper/pagespeed-api-wrapper";
import { PageSpeedResult } from "../../src/pagespeed-api-wrapper/response/pagespeed-result";
import { PagespeedQueryParser } from "../../src/pagespeed-api-wrapper/request/pagespeed-query-parser";
import { URL } from "url";
import { from } from "rxjs/internal/observable/from";

describe("PagespeedApiWrapper", () => {
    it("should have an awaitable method run() that returns an object", async () => {
        const pagespeedApiWrapper: PagespeedApiWrapper = new PagespeedApiWrapper(
            { parse: () => { return "https://fake.com"; } } as PagespeedQueryParser,
            { parse: () => { return {} as PageSpeedResult; } },
            {
                httpGet: () => {
                    return from(Promise.resolve({ json: () => { return Promise.resolve({}); } }));
                }
            }
        );
        const result: PageSpeedResult = await pagespeedApiWrapper.run("", null).toPromise();
        expect(result).toBeDefined();
    });


    it("should return the object parsed by PageSpeedResultParser ", async () => {
        const mockResult = new PageSpeedResult(null, null, null);
        const pagespeedApiWrapper: PagespeedApiWrapper = new PagespeedApiWrapper(
            { parse: () => { return "https://fake.com"; } } as PagespeedQueryParser,
            { parse: () => { return mockResult; } },
            {
                httpGet: () => {
                    return from(Promise.resolve({ json: () => { return Promise.resolve({}); } }));
                }
            }
        );
        const result: PageSpeedResult = await pagespeedApiWrapper.run("", null).toPromise();
        expect(result).toBe(mockResult);
    });
});
