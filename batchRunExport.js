/** 
 * Batch execute GEE Export task
 *
 * First of all, You need to generate export tasks. And run button was shown in 
 * the task panel.
 *   
 * Then press F12 get into console, then paste those scripts in it, and press 
 * enter. All the task will be start automatically. 
 * (Firefox and Chrome are supported. Other Browsers I didn't test.)
 * 
 * @Author: 
 * Dongdong Kong, 23 Jan'2018 
 * Sun Yat-sen University
 */

/**  confirm all the export task list */
function confirmAll() {
    var ok = document.getElementsByClassName('goog-buttonset-default goog-buttonset-action');
    for (var i = 0; i < ok.length; i++)
        ok[i].click();
}

/**
 *  runTaskList
 *
 *  Compared with runTaskList_wait, this function was low efficient, if too many
 *  tasks, it costs a large mount CPU resource.
 */
function runTaskList(){
    //1. task local type-EXPORT_FEATURES awaiting-user-config
    //2. task local type-EXPORT_IMAGE awaiting-user-config
    var tasklist = document.getElementsByClassName('awaiting-user-config');
    var len = tasklist.length;
    for (var i = 0; i < len; i++)
        tasklist[i].children[2].click();
    confirmAll();
}

/** Change Earth Engine Asset ID when exporting data */
function changeAssetId() {
    var divs = document.getElementsByClassName('asset-id-root-select');
    // var divs = document.getElementById(':5pn');
    for (var i = 0; i < divs.length; i++){
        var AssetId = divs[i].children[0].children[0];
        AssetId.setAttribute('aria-posinset', 2);
        AssetId.innerText = "projects/pml_evapotranspiration/";
    }
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
                    confirmAll();
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
function cancel_all(){
    var tasklist = document.getElementsByClassName('task remote submitted-to-backend');
    for (var i = 0; i < tasklist.length; i++){
        tasklist[i].children[3].click(); //indicator
        confirmAll();
    }
}

// runTaskList();
runTaskList_wait();
