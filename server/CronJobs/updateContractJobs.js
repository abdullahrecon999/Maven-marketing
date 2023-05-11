const CronJob = require('cron').CronJob

module.exports =  new CronJob("*/10 * * * * *", function(){
    console.log("this job is running expire contract")
})

