import * as moment from "moment"

export class FormatHelper {

    static toShortDateString (date: Date): string {
        return moment(date).format("DD/MM/YYYY")
    }

    static formatLogs(logJson: string): string {
        const logObject = JSON.parse(logJson);
        let resultString: string  = ``;
        let startTimeMoment: moment.MomentInputObject;
        let endTimeMoment: moment.MomentInputObject;


        logObject.forEach(item => {
            startTimeMoment = {
                hours: parseInt(item.startTime.hour),
                minutes: parseInt(item.startTime.minute),
            }

            endTimeMoment = {
                hours: parseInt(item.endTime.hour),
                minutes: parseInt(item.endTime.minute),
            }

            resultString += `<p> Worked from ${moment(startTimeMoment).format("HH:MM")} to ${moment(endTimeMoment).format("HH:MM")} <p>`
        });

        return resultString;
    }

}