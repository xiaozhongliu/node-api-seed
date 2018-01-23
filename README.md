# node-api-seed
A node api seed project.

### Techs involve:

|Aspect     |Tech               |
|:---       |:---               |
|fx         |express            |
|task       |node-schedule      |
|db         |sequelize          |
|memcache   |redis              |
|flow ctrl  |co                 |
|validation |express-validator  |
|log        |log4js             |
|log auth   |http-auth          |

### Special funcs offer:
Api access ctrl via ts & token.  
Elaborate api req log.  
Flexible req params validation.  
Log online view and its access ctrl via basic http auth.  
Reasonable config merging mechanism.  
Definite DRY, AOP, ES6, OCD, etc.

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