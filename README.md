# gee_monkey

Batch export Google Earth Engine (GEE) tasks with `Tampermonkey`.

+ Tired of click GEE tasks run button in browser? 
+ Tired of translate `JavaScript` into `python`, because of `JavaScript` inconvenient batch exporting? 
+ Tired of paste JavaScript into console?  

Tampermonkey can solve those problems.


Tasks submitted to GEE have two kinds:  

- `task submitted-to-backend`: just submitted and wait in the queue
- `task running-on-backend`: submitted and running now


## Functions
- **rALL** : batch run all tasks
- **cALL** : cancel all tasks
- **cSUN** : only cancel submitted-to-backend tasks, and leave running-on-backend tasks to be continue


## Installation

You need `chrome` and [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) (firefox is also OK).

+ 1 Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) extension in `chrome` or `firefox`.
+ 2 Dashboard → New script → paste the script in [gee_monkey](https://github.com/kongdd/GEE_Tools/blob/master/gee_monkey.js) → F5 refresh GEE website.

## Updates  

* 2018-07-20   
  1. `running-on-backend` task' background is set to skyblue to distinguish `submitted-to-backend` task.
