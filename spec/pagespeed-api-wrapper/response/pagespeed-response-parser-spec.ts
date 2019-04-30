import { PagespeedResponseParser } from "../../../src/pagespeed-api-wrapper/response/pagespeed-response-parser";
import { PageSpeedResult } from "../../../src/pagespeed-api-wrapper/response/pagespeed-result";


describe("PagespeedResponseParser", () => {
    it("should have the method parse()", () => {
        const pagespeedResponseParser: PagespeedResponseParser = new PagespeedResponseParser();
        expect(pagespeedResponseParser.parse).toBeDefined();
    });

    it("should parse a pagespeedresult that", () => {
        const pagespeedResponseParser: PagespeedResponseParser = new PagespeedResponseParser();
        const result: PageSpeedResult = pagespeedResponseParser.parse(responseOK);
        expect(result.error).toBeFalsy("should not have errors");
        expect(result.audits[0].id).toBe("final-screenshot", "should parse all audits");
        expect(result.audits[1].id).toBe("efficient-animated-content", "should parse all audits");
        expect(result.audits[2].id).toBe("metrics", "should parse all audits");
    });

    it("should parse an error pagespeedresult", () => {
        const pagespeedResponseParser: PagespeedResponseParser = new PagespeedResponseParser();
        const result: PageSpeedResult = pagespeedResponseParser.parse(responseErrorNoFCP);
        expect(result.error).toBe("Lighthouse returned error: NO_FCP. Something went wrong with recording the trace over your page load. Please run Lighthouse again. (NO_FCP) (NO_FCP)", "should have errors");
    });
});

let responseOK = {
    captchaResult: 'CAPTCHA_NOT_NEEDED',
    id: 'https://wikipedia.org/',
    lighthouseResult:
    {
        requestedUrl: 'https://wikipedia.org',
        finalUrl: 'https://wikipedia.org',
        audits:
        {
            'final-screenshot': { id: 'final-screenshot' },
            'efficient-animated-content': { id: 'efficient-animated-content' },
            'metrics': { id: 'metrics' }
        },
        categories: { performance: {} },
    }
}

const responseErrorNoFCP = {
    "error": {
        "errors": [
            {
                "message": "Lighthouse returned error: NO_FCP. Something went wrong with recording the trace over your page load. Please run Lighthouse again. (NO_FCP) (NO_FCP)"
            }
        ],
        "code": 500,
        "message": "Lighthouse returned error: NO_FCP. Something went wrong with recording the trace over your page load. Please run Lighthouse again. (NO_FCP) (NO_FCP)"
    }
}