# Codes under /task are independent, so they should have least conjunction with codes from other folders.

### For example:
only config util should be loaded other than all the utils:
```javascript
let config = require('../util/toolset').getConfig();
```
below is the right way:
```javascript
let config = require('../util').config;
```
Otherwise, logger of TASK will conflict with logger of SITE.