## /task下代码独立运行,所以必需与其它文件夹代码关联最少.

举例:  
加载config不应该加载所有util:
```javascript
let config = require('../util/toolset').getConfig();
```
而应该这样加载:
```javascript
let config = require('../util').config;
```
不然TASK的logger和SITE的logger冲突会导致非预期结果.