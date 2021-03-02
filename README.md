
# Github-Follow-Back

A simple Github follower follow back and unfollow back tool using typescript and node-schedule (cron job).\
Will need to change if I ever get to 100+ followers since github API uses pagination (not anytime soon I presume).

## How?
[Generating a token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)\
Rename .env.example to .env and replace XXXX's with the token generated, login and port.\
Optionally, you can change how often it runs in the FollowerJob ```followBack()``` and set out your own ```tsconfig.json```.\
Then ``` npm install ``` and finally ``` npm run serve```.


## Version

Node >= 14.15.4\
Npm >= 6.14.10