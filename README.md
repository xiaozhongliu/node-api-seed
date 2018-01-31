# node-api-seed
A node api seed project.

### Techs involved:

|Aspect     |Tech                                                             |
|:---       |:---                                                             |
|web fx     |[express](https://github.com/expressjs/express)                  |
|task       |[node-schedule](https://github.com/node-schedule/node-schedule)  |
|db postgres|[sequelize](https://github.com/sequelize/sequelize)              |
|db mongodb |[mongoose](https://github.com/Automattic/mongoose)               |
|memcache   |[node_redis](https://github.com/NodeRedis/node_redis)            |
|http client|[axios](https://github.com/axios/axios)                          |
|logger     |[log4js-node](https://github.com/log4js-node/log4js-node)        |
|mailer     |[nodemailer](https://github.com/nodemailer/nodemailer)           |
|jwt auth   |[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)       |
|validation |[express-validator](https://github.com/ctavan/express-validator) |
|async flow |[async/await of ES7](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) |
|test fx    |[jest](https://github.com/facebook/jest)                         |
|dashboard  |[express-status-monitor](https://github.com/RafalWilinski/express-status-monitor) |
|log auth   |[http-auth](https://github.com/http-auth/http-auth)              |
|js checker |[eslint](https://eslint.org/)                                    |
|proc mana  |[pm2](http://pm2.keymetrics.io/)                                 |

### Other features offering:
Api access control via ts & token.  
Elaborate api request log into files.  
Flexible declarative request validation.  
Request log online view behind http auth.  
Server status monitor dashboard behind http auth.  
Centralized system level config & messages management.  
Ready made api samples with jwt and latest js features.  
Elaborate api test: test samples & ready made debug config.  
Reasonable multi-env config merging mechanism.  
Definite DRY, SRP, AOP, ES6/ES7, OCD, etc.

### Npm commands usage:
```bash
cnpm i      # install all packages for dev env
npm t       # run api tests written on the basis of jest
npm start   # run service in dev env, or hit F5 to debug in vsc
npm run pm2start        # host via pm2 in prod env
npm run pm2startqa      # host via pm2 in qa env
npm run pm2starttest    # host via pm2 in test env
npm run pm2restart      # restart hosted service in prod env
npm run pm2restartqa    # restart hosted service in qa env
npm run pm2restarttest  # restart hosted service in test env
npm run pm2stop         # hang up hosted service
npm run pm2delete       # remove hosted service
```