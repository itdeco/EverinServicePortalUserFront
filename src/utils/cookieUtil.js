export const CookieUtil = {
    createCookie: function (name, value, days, secs) {
        let expires = "";
        let date = new Date();
        if (days) {
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; Expires=" + date.toUTCString();
        } else if (secs) {
            expires = "; Max-Age=" + secs;
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    },
    readCookie: function (name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');

        for(let i = 0;i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }

            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }

        return null;
    },
    removeCookie: function (name) {
        CookieUtil.createCookie(name,"",-1);
    }
};