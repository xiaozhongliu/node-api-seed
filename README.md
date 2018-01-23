# node-api-seed
A node api seed project.

### Techs involve:

|Aspect     |Tech                  |
|:---       |:---                  |
|web fx     |express               |
|task       |node-schedule         |
|db postgres|sequelize             |
|db mongodb |mongoose              |
|memcache   |redis                 |
|http client|axios                 |
|logger     |log4js                |
|mailer     |nodemailer            |
|dashboard  |express-status-monitor|
|jwt auth   |jsonwebtoken          |
|validation |express-validator     |
|async flow |async/await of ES7    |
|log auth   |http-auth             |
|js checker |eslint                |
|proc mana |pm2                   |

### Special funcs offer:
Api access ctrl via ts & token.  
Elaborate api req log in files.  
Flexible declarative req params validation.  
Log online view behind http auth.  
Server status monitor dashboard behind http auth.  
Reasonable multi-env config merging mechanism.  
Definite DRY, AOP, ES6/ES7, OCD, etc.

### Usage:
```bash
cnpm i      # install all packages for dev env
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