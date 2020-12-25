export interface ReportErrorInputInterface {
    user?: string,
    phrase?: string,
    time?: string
    web_page: string
    word: string,
    translation: string,
    type: string,
    other_description?: string,
}

export default class ReportErrorAPI {

    async reportError(reportErrorInputInterface
        :ReportErrorInputInterface) : Promise<boolean> {
        console.log("Reporting error...");
        reportErrorInputInterface.user = reportErrorInputInterface.user != null ? reportErrorInputInterface.user : "default";
        reportErrorInputInterface.phrase = reportErrorInputInterface.phrase != null ? reportErrorInputInterface.phrase : "default";
        reportErrorInputInterface.time = reportErrorInputInterface.time != null ? reportErrorInputInterface.time : "2020-11-11T11:11:11.111Z";
        console.log("The reported error is: " + JSON.stringify(reportErrorInputInterface));
        try {
            let response = await fetch(ReportErrorAPI.API, {
                method: 'POST',
                body: JSON.stringify(reportErrorInputInterface),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            });
            return response.status == 200;
        } catch (e) {
            return false;
        }
    }

    public static readonly API = "https://transferendum-backend.herokuapp.com/api/v1/translations/mistake";

}