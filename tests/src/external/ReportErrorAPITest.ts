import {expect} from "chai";
import ReportErrorAPI from "../../../src/external/reportErrorAPI";
import fetchMock from "fetch-mock";

describe('ReportErrorAPITest', () => { // the tests container
    const reportErrorApi = new ReportErrorAPI();
    fetchMock.mock(ReportErrorAPI.API, 200);

    it('Report error', () => { // the single test
        let r = reportErrorApi.reportError({
            type: "testType",
            translation: "testTranslation",
            web_page: "test",
            word: "test",
            other_description: "test",
        });
        r.then(a=> expect(a).to.equal(true));
    });
});