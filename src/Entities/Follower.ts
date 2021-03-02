import { Serializable } from '../Interfaces/Deseriealize'
import { FollowerInterface } from '../Interfaces/FollowerInterface'

export class Follower implements Serializable<Follower>, FollowerInterface{
    id: number
    login: string
    node_id: string
    avatar_url: string
    gravatar_id: string

    deserialize(json: any): Array<Follower>{
        let list = new Array<Follower>()

        json.forEach((e: any) => {
            let follower = new Follower()
            follower.id = e.id,
            follower.login = e.login,
            follower.node_id = e.node_id,
            follower.avatar_url = e.avatar_url,
            follower.gravatar_id = e.gravatar_id

            list.push(follower)
        })

        return list
    }
}