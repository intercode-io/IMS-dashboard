import {AbstractControl} from "@angular/forms";

export function validateStartTime(control: AbstractControl, activityForm) {
    try {
        const endTime = activityForm.value.endTime;
        if (!endTime)
            return {endTimeUndefined: true}
    } catch (e) {
        return {endTimeUndefined: true}
    }

    try {
        if (control.value.hour <= activityForm.value.endTime.hour)
            return {ok: true}
    } catch (e) {
        return
    }
    return {endTimeUndefined: true}
}

export function validateEndTime(control: AbstractControl, activityForm) {
    try {
        const startTime = activityForm.value.startTime;
        if (!startTime) {
            return {startTimeUndefined: true}
        }
    } catch (e) {
        return {startTimeUndefined: true}
    }

    try {
        if (control.value.hour >= activityForm.value.startTime.hour) {
            return {ok: true};
        } else {
            return {endTimeIsLess: true}
        }
    } catch (e) {
        return {endTimeUndefined: true}
    }
}
