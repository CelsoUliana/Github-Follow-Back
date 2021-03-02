import { Config } from './Dotenv'
import { OptionsInterface } from '../Interfaces/OptionsInterface'

export class Options{

    constructor(){
        Config()
    }

    public getFollowersOptions(): OptionsInterface{
        let url = process.env.apigetlink + process.env.login + process.env.sufixf
        const options = {
            uri: url,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Node-Js',
                'Authorization': process.env.token,
            }
        }
        return options
    }

    public getFollowingOptions(): OptionsInterface{
        let url = process.env.apigetlink + process.env.login + process.env.sufixing
        const options = {
            uri: url,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Node-Js',
                'Authorization': process.env.token,
            }
        }
        return options
    }

    public followOptions(username: string): OptionsInterface{
        let url = process.env.apiputlink + username
        const options = {
            uri: url,
            resolveWithFullResponse: true,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Node-Js',
                'Content-Length': '0',
                'Authorization': process.env.token,
            }
        }
        return options
    }

    public unfollowOptions(username: string): OptionsInterface{
        let url = process.env.apiputlink + username
        const options = {
            uri: url,
            resolveWithFullResponse: true,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Node-Js',
                'Authorization': process.env.token,
            }
        }
        return options
    }
}