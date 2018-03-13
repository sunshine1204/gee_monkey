// ==UserScript==
// @name         GEE_tools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dongdong Kong
// @match        https://code.earthengine.google.com/
// @grant        none
// @updateURL    https://raw.githubusercontent.com/kongdd/GEE_Tools/master/gee_monkey.js
// @downloadURL  https://raw.githubusercontent.com/kongdd/GEE_Tools/master/gee_monkey.js
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==
(function() {
    'use strict';

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

    $(document).ready(function() {
        // alert('hello world!');
        var x = $("div.user");
        //         var x = $('div.task:first')
        var $Run_all = $('<a id="run_all" style="cursor:pointer;text-decoration:none;padding:0 5px;border:1px solid;">Run All</a>');
        var $Cancel_all = $('<a id="Cancel_all" style="cursor:pointer;text-decoration:none;padding:0 5px;border:1px solid;">Cancel All</a>');

        $Run_all.click(function() {
            //alert('Run_all 2');
            runTaskList_wait();
        });
        $Cancel_all.click(function() {
            //alert('Cancel_all');
            cancel_all();
        });

        x.after($Cancel_all);
        x.after($Run_all);
    });
})();
