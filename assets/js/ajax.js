'use strict';
/*
 * use of getFile
 * requires 'callBack(x)' to be defined in app.
 */

let Ajax = {
    init() {
        this.respObj = null;
        this.ajaxobj = false;
        try {
            this.ajaxobj = new XMLHttpRequest();
        } catch (err) {
            window.alert(err.message + " Get yourself a browser ;)");
        }
    },

    getFile(filename) {
        try {
            this.ajaxobj.addEventListener('load', function (ev) {
                if (ev.target.readyState === 4) {
                    if (ev.target.status === 200) {
                        // it was a load event, ie successful return from server
                        this.respObj = ev.target.responseText;
                        ajaxCallback(this.respObj);
                    }
                }
            });
            this.ajaxobj.open("GET", filename);
            this.ajaxobj.send("");
        } catch (err) {
            alert(err.message + 'WTF');
        }
    }
}