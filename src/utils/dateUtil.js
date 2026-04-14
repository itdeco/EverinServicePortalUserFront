const DateUtil = {
    checkDateType: (date) => {
        if (!date) {
            date = new Date();
        } else {
            if (typeof date === 'string') {
                date = new Date(date);
            }
        }

        return date;
    },
    addYears: (date, yearsToAdd) => {
        date = DateUtil.checkDateType(date);

        let newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + yearsToAdd);
        return newDate;
    },
    addMonths: (date, monthsToAdd) => {
        date = DateUtil.checkDateType(date);

        let newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + monthsToAdd);
        return newDate;
    },
    addDays: (date, daysToAdd) => {
        date = DateUtil.checkDateType(date);

        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + daysToAdd);
        return newDate;
    },
    addWorkingDays: (date, daysToAdd) => {
        date = DateUtil.checkDateType(date);

        let count = 0;
        const newDate = new Date(date);
        while (count < daysToAdd) {
            const dayOfWeek = newDate.getDay();
            if (0 === dayOfWeek || 6 === dayOfWeek) {
                newDate.setDate(newDate.getDate() + 1);
                continue;
            }

            newDate.setDate(newDate.getDate() + 1);
            count++;
        }

        return newDate;
    },
    getPrevMonthDate: () => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        return new Date (firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1));
    },
    // 다음 달의 지정한 날짜
    getNextMonthDate: (days, krFormat) => {
        const today = new Date();
        const nextDate = new Date(today.getFullYear(), today.getMonth() + 1, days, 0, 0, 0);

        return krFormat ? nextDate.getFullYear() + "년 " + (nextDate.getMonth() + 1) + "월 " + nextDate.getDate() + "일" : DateUtil.formattedDate(nextDate);
    },
    // 특정 날짜의 다음 달의 지정한 날짜
    getDateOfNextMonthDate: (date, days, krFormat) => {
        date = DateUtil.checkDateType(date);
        const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, days, 0, 0, 0);

        return krFormat ? nextDate.getFullYear() + "년 " + (nextDate.getMonth() + 1) + "월 " + nextDate.getDate() + "일" : DateUtil.formattedDate(nextDate);
    },
    getLastDateOfMonth: (date) =>  {
        date = DateUtil.checkDateType(!date ? new Date() : date);

        const nextMonthDate = new Date(date.getFullYear(), date.getMonth(), 1);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

        return new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), 0); // date 가 0 이면 이전 달의 마지막 날짜
    },
    getDays: (date) => {
        date = DateUtil.checkDateType(date);

        return date.getDate();
    },
    getHours: (date) => {
        date = DateUtil.checkDateType(date);

        return date.getHours();
    },
    getMinutes: (date) => {
        date = DateUtil.checkDateType(date);

        return date.getMinutes();
    },
    // 특정 날짜 주의 특정 요일 날짜 반환 (dayToFind 는 요일)
    getDateOnDay: (date, dayToFind) => {
        date = DateUtil.checkDateType(date);

        let day = date.getDay(),
            diff = date.getDate() - day + (day === 0 ? -6 : dayToFind);

        return new Date(date.setDate(diff));
    },
    // 특정 날짜 월의 특정 주의 특정 요일 날짜 반환 (dayToFind: 요일, weekCount: 몇 번째 주)
    getDateOnDayWeek: (date, dayToFind, weekCount) => {
        date = DateUtil.checkDateType(date);

        let newDate = new Date(date);
        newDate.setDate(1);

        let day = newDate.getDay();
        let diff = 0;

        if (day < dayToFind) {
            diff = dayToFind - day;
        } else if (day > dayToFind) {
            diff = 7 - (day - dayToFind);
        }

        newDate.setDate(diff);

        if (1 < weekCount) {
            newDate.setDate(newDate.getDate() + (weekCount - 1) * 7);
        }

        return newDate;
    },
    getTimeFromDate: (date) => {
        date = DateUtil.checkDateType(date);
        return {hours: date.getHours(), minutes: date.getMinutes()}
    },
    // 특정 날짜에 시간을 설정해서 반환
    setTimeToDate: (date, hours, minutes) => {
        date = DateUtil.checkDateType(date);

        const years = date.getFullYear();
        const months = date.getMonth();
        const days = date.getDate();

        return new Date(years, months, days, hours || 0, minutes || 0, 0);
    },
    // 특정 날짜에 시간을 설정해서 반환
    setDaysToDate: (date, days) => {
        date = DateUtil.checkDateType(date);

        const years = date.getFullYear();
        const months = date.getMonth();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return new Date(years, months, days, hours, minutes, 0);
    },
    // 지정한 날짜의 마지막 시간 반환
    setEndDateTime: (date) => {
        date = DateUtil.checkDateType(date);

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    },
    calcIntervalDays: (startDate, endDate) => {
        startDate = DateUtil.checkDateType(startDate);
        endDate = DateUtil.checkDateType(endDate);

        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        const interval = endDate.getTime() - startDate.getTime();
        return Math.ceil(interval / (1000 * 60 * 60 * 24));
    },
    // 이번 달의 지정한 days, hours, minutes 로 date 값 반환
    getThisMonthDayDate: (days, hours, minutes) => {
        let date = new Date();
        const years = date.getFullYear();
        const months = date.getMonth();

        return new Date(years, months, days, hours, minutes, 0);
    },
    // 올해 지정한 months, days, hours, minutes 로 date 값 반환
    getThisYearDate: (months, days, hours, minutes) => {
        let date = new Date();
        const years = date.getFullYear();

        return new Date(years, months, days, hours, minutes, 0);
    },
    getElapsedSeconds: (date, date2) => {
        let elapsedMSec = Math.abs(date.getTime() - date2.getTime());
        return elapsedMSec / 1000;
    },
    // UTC 시간을 현지 시간으로 변환(Locale 시간으로 변환이 아니라 UTC와 동일한 로컬 시간)
    getLocalDateTimeFromUTC: (date) => {
        const sDate = new Date(date).toUTCString();
        const utcDate = new Date(sDate.substring(0, sDate.length - 4)).toISOString();
        return new Date(utcDate);
    },
    formattedYearMonth: (year, month) => {
        month = month >= 10 ? month : '0' + month;
        return year.toString() + "-" + month.toString();
    },
    formattedDate: (date, kr) => {
        if (!date) {
            date = new Date();
        } else {
            date = new Date(date);
        }

        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

        return true === kr ? date.getFullYear() + '년 ' + month + '월 ' + day + '일' : date.getFullYear() + '-' + month + '-' + day;
    },
    formattedDateTime: (date) => {
        if (!date) {
            date = new Date();
        } else {
            date = new Date(date);
        }

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;

        return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    },
    // Date 형식에서 00:00 형식의 시간 문자열만 반환
    formattedTime: (date) => {
        if (!date) {
            return null;
        }

        date = new Date(date);

        let hour = date.getHours();
        let minute = date.getMinutes();

        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;

        return hour + ':' + minute;
    },
    toUTCDate: (date) => {
        if (!date) {
            date = new Date();
        } else {
            date = new Date(date);
        }

        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    },
    isToday: (date) => {
        if (!date) {
            return false;
        }

        date = new Date(date);

        let now = new Date();
        let day = 1000 * 3600 * 24; //24시간

        let dayInterval = parseInt(((date - now) / day).toString(), 10);

        return 0 === dayInterval;
    },
    isSameDate: (date1, date2) => {
        date1 = new Date(date1);
        date2 = new Date(date2);

        return date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate();
    },
    isSameUTCDate: (date1, date2) => {
        date1 = new Date(date1);
        date2 = new Date(date2);

        return date1.getUTCFullYear() === date2.getUTCFullYear()
            && date1.getUTCMonth() === date2.getUTCMonth()
            && date1.getUTCDate() === date2.getUTCDate();
    },
    isTodayInRange: (startDate, endDate) => {
        startDate = new Date(startDate).getTime();
        endDate = new Date(endDate).getTime();
        const now = new Date().getTime();

        return now >= startDate && now <= endDate;
    },
    isDatePassed: (date, fromDate) => {
        const dateTime = new Date(date).getTime();
        const compareDate = fromDate ? new Date(fromDate).getTime() : new Date().getTime();

        return compareDate > dateTime;
    },
    getDateDiff: (date1, date2) => {
        date1 = new Date(date1);
        date2 = new Date(date2);

        let diffDate = 0;
        if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()) {
            diffDate = Math.abs(date2.getDate() - date1.getDate());
        } else {
            diffDate = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
        }

        return Math.abs(diffDate);
    },
    getUTCDateDiff: (date1, date2) => {
        date1 = new Date(date1);
        date2 = new Date(date2);

        let diffDate = 0;
        if (date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth()) {
            diffDate = Math.abs(date2.getUTCDate() - date1.getUTCDate());
        } else {
            diffDate = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
        }

        return Math.abs(diffDate);
    },
    getLastUTCDateOfMonth: (year, month) =>  {
        return new Date(Date.UTC(year, month, 0)); // date 가 0 이면 이전 달의 마지막 날짜
    },
    getFirstUTCDateOfMonth: (year, month) =>  {
        return new Date(Date.UTC(year, month - 1, 1));
    },
    getLastUTCDayOfMonth: (year, month) =>  {
        const date = new Date(Date.UTC(year, month, 0)); // date 가 0 이면 이전 달의 마지막 날짜
        return date.getDate();
    },
}

export default DateUtil;