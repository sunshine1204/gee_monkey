// ==UserScript==
// @name         gee_monkey
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Batch export Google Earth Engine task
// @author       Dongdong Kong, Sun Yat-sen Univ
// @match        https://code.earthengine.google.com/*
// @exclude      https://code.earthengine.google.com/dataset*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/kongdd/gee_monkey/master/gee_monkey.js
// @downloadURL  https://raw.githubusercontent.com/kongdd/gee_monkey/master/gee_monkey.js
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==
'use strict';

// https://stackoverflow.com/questions/23683439/gm-addstyle-equivalent-in-tampermonkey
function GM_addStyle(css) {
    const style = document.getElementById("GM_addStyleBy8626") || (function() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = "GM_addStyleBy8626";
        document.head.appendChild(style);
        return style;
    })();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

GM_addStyle('.task.running-on-backend .content { background-color: #bee5f4;}');
GM_addStyle('.gee_monkey { ' +
    'text-align:center;padding:0 2px; margin:0 2px 0 2px;border:1px solid; ' +
    'display: inline-block; width:40px; ' +
    'font-weight:bold }');

(function() {
    /**  confirm all the export task list
    function confirm_all() {
        $$('.goog-buttonset-default.goog-buttonset-action').forEach(function(e) { e.click(); });
    }
     */
    function confirm_all() {
        var ok = document.getElementsByClassName('goog-buttonset-default goog-buttonset-action');
        for (var i = 0; i < ok.length; i++)
            ok[i].click();
    }

    function cancel_fails() {
        $$('div.modal-dialog-buttons button:nth-child(2)').forEach(function(e) { e.click(); });
    }

    /**
     *  runTaskList
     *
     *  Compared with runTaskList_wait, this function was low efficient, if too many
     *  tasks, it costs a large mount CPU resource.
     */
    function runTaskList() {
        //1. task local type-EXPORT_FEATURES awaiting-user-config
        //2. task local type-EXPORT_IMAGE awaiting-user-config
        $$('.awaiting-user-config .run-button').forEach(function(e) { e.click(); });
        confirm_all();
    }

    /**
     * runTaskList_wait
     *
     * Run each task, and wait 3 seconds to automatically click ok. And then the next
     * task.
     * @return {[type]} [description]
     */
    function runTaskList_wait() {
        //1. task local type-EXPORT_FEATURES awaiting-user-config
        //2. task local type-EXPORT_IMAGE awaiting-user-config
        var tasklist = document.getElementsByClassName('awaiting-user-config');
        var len = tasklist.length;
        // once loop wait 3 second
        // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
        (function myLoop(i) {
            setTimeout(function() {
                // alert('hello');          //  your code here
                if (i > 0) {
                    console.log('running: ', i);
                    tasklist[i - 1].children[2].click();
                    setTimeout(function() {
                        // changeAssetId();
                        confirm_all();
                    }, 90);
                    myLoop(--i); //  decrement i and call myLoop again if i > 0
                }
            }, 100);
        })(len);
        if (len === 0) {
            console.log('No task in the list ...');
        } else {
            console.log('Finished already.');
        }
    }

    /** cancel tasks in GEE */
    function cancel_all() {
        // task local type-EXPORT_IMAGE submitted-to-backend
        // task remote submitted-to-backend
        var tasklist = document.getElementsByClassName('task running-on-backend');
        for (var i = 0; i < tasklist.length; i++) {
            tasklist[i].children[3].click(); //indicator
            confirm_all();
        }
        tasklist = document.getElementsByClassName('task submitted-to-backend');
        for (var i = 0; i < tasklist.length; i++) {
            tasklist[i].children[3].click(); //indicator
            confirm_all();
        }
    }

    function cancel_submitted() {
        var tasklist = document.getElementsByClassName('task submitted-to-backend');
        for (var i = 0; i < tasklist.length; i++) {
            tasklist[i].children[3].click(); //indicator
            confirm_all();
        }
    }

    $(document).ready(function() {
        // alert('hello world!');
        var x = $("div.user");
        //         var x = $('div.task:first')
        var $Run_all = $('<a class="gee_monkey" id="run_all" style="color:green">rAll</a>');
        var $Cancel_all = $('<a class="gee_monkey" id="Cancel_all", style="color:red">cAll</a>');
        var $Cancel_submitted = $('<a class="gee_monkey" id="Cancel_all", style="color:Purple">cSUB</a>');

        $Run_all.click(function() {
            //alert('Run_all 2');
            runTaskList_wait();
        });
        $Cancel_all.click(function() {
            cancel_all();
        });
        $Cancel_submitted.click(function() {
            cancel_submitted();
        });

        x.after($Cancel_submitted);
        x.after($Cancel_all);
        x.after($Run_all);
    });
})();
