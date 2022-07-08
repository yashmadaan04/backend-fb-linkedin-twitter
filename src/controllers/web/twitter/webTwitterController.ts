import prisma from '../../../database/database';
import Twitter from 'twitter';
import passport from 'passport';

export const tweetStatus = async (statusMessage: string) => {
    try {
        var client = new Twitter({
            consumer_key: process.env.TWITTER_API_KEY ? process.env.TWITTER_API_KEY : "",
            consumer_secret: process.env.TWITTER_API_SECRET ? process.env.TWITTER_API_SECRET : "",
            access_token_key: '541302950177669121-SnmIcLhRGV4mkricJnXk0WcEh5MA2Q',
            access_token_secret: '6XEiXPrjHaTFl70Rp3yKtmUJQDntxJ3z81pk9hqu0SIvH'
        });

        const result = client.post('statuses/update', { status: statusMessage }).then((val) => {
            return val;
        }).catch(function (e) {
            console.log(e);
            if(e[0].code == 89){
               passport.authenticate('twitter')
            }

        })
        return result
    } catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
}