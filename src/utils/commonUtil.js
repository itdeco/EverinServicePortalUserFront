const CommonUtil = {
    parseJwt: (token) => {
        let decodedObj = null;
        try {
            let base64Url = token.split(".")[1];
            let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            // prettier-ignore
            decodedObj = JSON.parse(decodeURIComponent(atob(base64).split("").map(function (c) { return ("%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)); }).join("")))
        } catch (err) {
            console.log("Failed to decode");
            console.log(err);
        }

        return decodedObj;
    },

    getTimeForCheckExpiration: () => {
        let curDt = new Date();
        return curDt.getTime() / 1000;
    },

    setCookie: (name, value, day) => {
        let date = new Date();
        date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
        CommonUtil.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
    },

    getCookie: (name) => {
        let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
        return value ? value[2] : null;
    },

    deleteCookie: (name) => {
        let date = new Date();
        document.cookie = name + "= ; expires=" + date.toUTCString() + "; path=/";
    },

    fileCompare: (f1, f2) => {
        // TODO: file compare
        return f1 === f2;
    },

    niceBytes: (a) => {
        let b = 0,
            c = parseInt(a, 10) || 0;
        for (; 1024 <= c && ++b; ) c /= 1024;
        return c.toFixed(10 > c && 0 < b ? 1 : 0) + " " + ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][b];
    },
    isEmpty: (value) => {
        if (undefined === value || null === value) {
            return true;
        }

        if (typeof value === "string") {
            return 0 >= value.length;
        } else if (typeof value === "number") {
            return false;
        } else if (typeof value === "object") {
            return !Object.keys(value).length;
        } else {
            return false;
        }
    },
    makeQueryString: (obj) => {
        const keyValuePairs = [];
        for (const key in obj) {
            let value = obj[key];
            if (CommonUtil.isEmpty(value)) {
                continue;
            }

            keyValuePairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }

        return keyValuePairs.join("&");
    },
    getFileExt: (fileName) => {
        let fileExt = "";
        if (fileName && fileName.indexOf(".") > -1) {
            fileExt = fileName.substring(fileName.lastIndexOf(".")+1);
            fileExt = fileExt.toLowerCase();
        }

        return fileExt;
    },
    getFileIconCSS: (fileName) => {
        let fileExt = CommonUtil.getFileExt(fileName);
        if (!fileExt || 0 === fileExt.length) {
            return "";
        }

        return "fico-" + fileExt;
    },
    formatUserNamePart: (name) => {
        let arr = name.split("");
        if (!arr || 0 === arr.length) {
            return name;
        }

        let formattedName = arr[0];
        for (let i = 1; i < arr.length - 1; i++) {
            formattedName += "*";
        }

        return formattedName + arr[arr.length - 1];
    },

    formatPhoneNumber: (phone, hidePart) => {
        if (!phone) {
            return "";
        }

        let phoneNumber = phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

        if (hidePart) {
            phoneNumber = phoneNumber.substring(0, phoneNumber.length - 4);
            phoneNumber += "****";
        }

        return phoneNumber;
    },

    formatCreditCardNumber: (cardNumber, hidePart) => {
        if (!cardNumber || cardNumber.length > 16) {
            return "";
        }

        if (hidePart) {
            let arr = cardNumber.split("");
            let i = 0;
            while (i < 13) {
                arr[i++] = "*";
            }

            cardNumber = arr.join('');
        }

        return cardNumber.replace(/(?<=^(.{4})+)(?=.+)/g, '-');
    },

    formatEmailPart: (email) => {
        let arr = email.split("@");
        if (!arr || 0 === arr.length) {
            return email;
        }

        let id = arr[0];
        id = id.substring(0, 2);

        for (let i = 0; i < arr[0].length - 2; i++) {
            id += "*";
        }

        return id + "@" + arr[1];
    },

    preventDefault: (e) => {
        if (e && "function" === typeof e.preventDefault) {
            e.preventDefault();
        }
    },
    stopPropagation: (e) => {
        if (e && "function" === typeof e.stopPropagation) {
            e.stopPropagation(e);
        }
    },
    getRandomInt: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    },
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    isCurrentSession: (token, companyId) => {
        if (!token) {
            return false;
        }

        let tokenUser = CommonUtil.parseJwt(token);
        if (!tokenUser || !tokenUser.bpSessionId) {
            return false;
        }

        return tokenUser.bpSessionId === companyId;
    },
    isValidEmail: (email) => {
        if (!email) {
            return false;
        }

        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return regExp.test(email);
    },
    isValidMobilePhone: (mobile) => {
        if (!mobile) {
            return false;
        }

        mobile = mobile.replace("-", "");
        mobile = CommonUtil.formatPhoneNumber(mobile);

        const regExp = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
        return mobile.match(regExp)
    },
    isValidBusinessNumber: (value) => {
        const valueMap = value.replace(/-/gi, '').split('').map(function (item) {
            return parseInt(item, 10);
        });

        if (10 === valueMap.length) {
            const multiply = [1, 3, 7, 1, 3, 7, 1, 3, 5];
            let checkSum = 0;

            for (let i = 0; i < multiply.length; i++) {
                checkSum += multiply[i] * valueMap[i];
            }

            checkSum += parseInt((multiply[8] * valueMap[8]) / 10, 10);
            return Math.floor(valueMap[9]) === ((10 - (checkSum % 10)) % 10);
        }

        return false;
    },
    formatBusinessNumber: (businessNo, checkValid) => {
        if (checkValid && !CommonUtil.isValidBusinessNumber(businessNo)) {
            return businessNo;
        }

        const valueMap = businessNo.replace(/-/gi, '').split('').map(function (item) {
            return parseInt(item, 10);
        });

        let formatted = "";
        for (let i = 0; i < valueMap.length; i++) {
            if (3 === i || 5 === i) {
                formatted += "-";
            }

            formatted += valueMap[i];
        }

        return formatted;
    },
    enableElement: (css, enable) => {
        let result = css;
        if (!enable) {
            if (null === result || undefined === result || "" === result) {
                result = "state-disabled";
            } else {
                result += " state-disabled";
            }
        }

        return result;
    },
    openNewWindow: (path, target, features) =>  {
        const newWindow = window.open(path, target, features)
        if (newWindow) {
            newWindow.opener = null
        }
    },
    hideEmailPart: (email) => {
        const split = email.split("@");
        if (!split || 0 === split.length) {
            return null;
        }

        let arrEmail = split[0].split("");
        let i = 1;
        while (i < 4) {
            arrEmail[arrEmail.length - i++] = "*";
        }

        return arrEmail.join('') + "@" + split[1];
    },
    copyToClipboard: (text) => {
        if (!text) {
            return false;
        }

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then();
        } else {
            const input = document.createElement('textarea')
            input.value = text
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
        }

        return true;
    },
    onInputNumberChangeEvent: (e) => {
        if (!e || !e.target) {
            return;
        }

        let value = parseInt(e.target.value);
        let max = parseInt(e.target.max);
        let min = parseInt(e.target.min);

        if (max < value) {
            value = max;
            e.target.value = value;
        } else if (min > value) {
            value = min;
            e.target.value = value;
        }
    }
}

export default CommonUtil;