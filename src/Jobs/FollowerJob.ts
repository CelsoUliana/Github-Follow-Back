import { FollowerBusiness } from '../Business/FollowerBusiness'
import { RecurrenceRule, scheduleJob, Range } from 'node-schedule'

export class FollowerJob{
    private business: FollowerBusiness

    constructor(){
        this.business = new FollowerBusiness()
    }

    public followBack(){
        /*
            Everyday at 4:00 AM.
        */
        let rule = new RecurrenceRule()
        rule.dayOfWeek = [0, new Range(0, 6)]
        rule.hour = 4
        rule.minute = 0

        scheduleJob(rule, async () => {
            this.business.followBack()
            this.business.unFollowBack()
            console.log('Running jobs...')
        })
    }
}