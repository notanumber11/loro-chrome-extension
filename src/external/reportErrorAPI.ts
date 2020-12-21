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

    public static readonly API = "https://transferendum-backend.herokuapp.com/api/v1/translations/mistake";
    constructor() {

    }

    async reportError(reportErrorInputInterface
        :ReportErrorInputInterface) : Promise<boolean> {
        console.log("Reporting error...");
        console.log("The reported error is: " + JSON.stringify(reportErrorInputInterface));
        const {
            user = "default",
            phrase = "default",
            time = "default",
            web_page = reportErrorInputInterface.web_page,
            word = reportErrorInputInterface.word,
            translation = reportErrorInputInterface.translation,
            type = reportErrorInputInterface.type,
            other_description = reportErrorInputInterface.other_description
        }
                = reportErrorInputInterface;

        const response = await fetch(ReportErrorAPI.API, {
            method: 'POST',
            body: JSON.stringify(reportErrorInputInterface),
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        });

        if (response) {
            console.log("Error reported correctly");
            return true;
        }
        console.error("Problems reporting error");
        return false;
    }
}