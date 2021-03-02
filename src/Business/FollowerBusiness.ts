import { Options } from '../Config/Options'
import { Follower } from '../Entities/Follower'
import { get, put, del } from 'request-promise'

export class FollowerBusiness{
    private optionsFactory: Options

    constructor(){
        this.optionsFactory = new Options()
    }

    public async getFollowers(): Promise<Array<Follower> | any>{
        try{
            const options = this.optionsFactory.getFollowersOptions()
            const response = await get(options)
            const json = JSON.parse(response)
            
            let list = new Follower().deserialize(json)

            return list
            
        }
        catch(error){
            console.log(error)
            return error
        }
    }

    public async getFollowing(): Promise<Array<Follower> | any>{
        try{
            const options = this.optionsFactory.getFollowingOptions()
            const response = await get(options)
            const json = JSON.parse(response)
            
            let list = new Follower().deserialize(json)

            return list
            
        }
        catch(error){
            console.log(error)
            return error
        }
    }

    private async unfollow(username: string): Promise<boolean>{
        try{
            const options = this.optionsFactory.unfollowOptions(username)
            const response = await del(options)
            
            if(response.statusCode === 204){
                return true
            }
            else{
                return false
            }
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    private async follow(username: string): Promise<boolean>{
        try{
            const options = this.optionsFactory.followOptions(username)
            const response = await put(options)
            
            if(response.statusCode === 204){
                return true
            }
            else{
                return false
            }
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    /*
        Not request heavy followback, filtering before sending to followAll.
    */
    public async followBack(): Promise<void>{
        try{
            let followers = await this.getFollowers()
            let following = await this.getFollowing()
    
            let newArr = followers.filter((follower: Follower) => {
                return !following.find((iFollow: Follower) => iFollow.id === follower.id)
            })
    
            //console.log(newArr)
    
            if(newArr.length > 0){
                console.log('Found new followers...')
                return await this.followAll(newArr)
            }
        }

        catch(error){
            console.log(error)
        }
    }

    /*
        Function that gets the difference follower arr that I follow and does not follow me
        and send it to the unFollowAll.
    */
    public async unFollowBack(): Promise<void>{
        try{
            let followers = await this.getFollowers()
            let following = await this.getFollowing()
    
            let newArr = following.filter((iFollow: Follower) => {
                return !followers.find((follower: Follower) => follower.id === iFollow.id)
            })
    
            //console.log(newArr)
            
            if(newArr.length > 0){
                console.log('Found people I follow that does not follow me...')
                return await this.unFollowAll(newArr)
            }
        }

        catch(error){
            console.log(error)
        }
    }

    private async unFollowAll(arrUnfollow: Array<Follower>): Promise<void>{
        arrUnfollow.forEach(async (follower: Follower) => {
            if((await this.unfollow(follower.login))){
                console.log('Successfully unfollowed ' + follower.login)
            }
            else{
                console.log('Failed to unfollow ' + follower.login)
            }
        })
    }

    private async followAll(arrFollow: Array<Follower>): Promise<void>{
        arrFollow.forEach(async (follower: Follower) => {
            if((await this.follow(follower.login))){
                console.log('Successfully followed ' + follower.login)
            }
            else{
                console.log('Failed to follow ' + follower.login)
            }
        })
    }
}