
import passport from 'passport';
import passportFacebook from "passport-facebook";
import passportTwitter from 'passport-twitter';
import passportGoogle from 'passport-google-oauth2';
import passportInstagram from 'passport-instagram';

const FacebookStrategy = passportFacebook.Strategy;
const TwitterStrategy = passportTwitter.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const InstagramStrategy = passportInstagram.Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY;
const LINKEDIN_SECRET_KEY = process.env.LINKEDIN_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const initPassport = function async(app: any) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj: any, done) {
        done(null, obj);
    });
    app.use(passport.initialize());

    // Passport strategy for login via facebook
    passport.use(
        new FacebookStrategy(
            {
                clientID: "435374618093710",
                clientSecret: "a47d3302aeb31ef5977b7349d2a71a66",
                callbackURL: `http://localhost:7000/web/auth/facebook/callback`,
                profileFields: ['id', 'emails', 'name'],
                passReqToCallback: true
            },
            async (req: any, accessToken, refreshToken, profile: any, done) => {
                if (req.session?.user_id){
                    profile.user_id = req.session.user_id;
                    profile.toLinkAccount = true
                }
                profile.token = accessToken;
                profile.refreshToken = refreshToken;
                profile.tokenSecret = "";
                done(null, profile);
            }
        )
    );

    // Passport strategy for login via twitter
    passport.use(new TwitterStrategy({
        consumerKey: TWITTER_API_KEY ? TWITTER_API_KEY : "ba33IMXWwktueZR9kZWrwwZZC",
        consumerSecret: TWITTER_API_SECRET ? TWITTER_API_SECRET : "UNRxoeujZ9NXJBfWz5K1kZN3GN3wd9Tg34Km1FcOiWhdCTwwvu",
        callbackURL: "http://localhost:7000/web/auth/twitter/callback",
        passReqToCallback: true
    },
        async function (req: any, token, tokenSecret, profile: any, done) {
            try {
                if (req.session?.user_id){
                    profile.user_id = req.session.user_id;
                    profile.toLinkAccount = true
                }
                profile.token = token;
                profile.tokenSecret = tokenSecret;
                //profile.user_id = user_id;
                done(null, profile);
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    ));
   // scope: ['r_emailaddress','r_liteprofile','w_member_social'],
    // Passport strategy for login via linkedin
    passport.use(new LinkedInStrategy({
        clientID: LINKEDIN_API_KEY ? LINKEDIN_API_KEY : "861vgle8kdy9cz",
        clientSecret: LINKEDIN_SECRET_KEY ? LINKEDIN_SECRET_KEY : "AG1MFu6Gz7YmR8at",
        callbackURL: "http://localhost:7000/web/auth/linkedin/callback",
        scope: ['r_emailaddress','r_liteprofile','w_member_social'],
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'public-profile-url'],
        passReqToCallback: true,
        state:true
    },
        async function (req: any, token: any, refreshToken: any, profile: any, done: any) {
            try {
                if (req.session?.user_id){
                    profile.user_id = req.session.user_id;
                    profile.toLinkAccount = true
                }
                profile.token = token;
                profile.tokenSecret = "";
                done(null, profile);
            } catch (error) {
                done(error);
            }
        }
    ));

    // Passport strategy for login via google
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID ? GOOGLE_CLIENT_ID : "651333743125-l9qrmnctoe78fj432oq956dbr8icqco5.apps.googleusercontent.com",
        clientSecret: GOOGLE_CLIENT_SECRET ? GOOGLE_CLIENT_SECRET : "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",
        callbackURL: "http://localhost:7000/web/auth/google/callback",
        passReqToCallback: true
    },
        async function (req: any, accessToken: string, refreshToken: string, profile: any, done: any) {
            try {
                if (req.session?.user_id)
                    profile.user_id = req.session.user_id;
                profile.token = accessToken;
                profile.tokenSecret = "";
                done(null, profile);
            } catch (error) {
                done(error);
            }
        }
    ));

    passport.use(new InstagramStrategy({
        clientID: "784485809232390",
        clientSecret: "04cc6c71bace4058cc1ed34fae228d25",
        callbackURL: "http://localhost:7000/web/auth/instagram/callback",
        passReqToCallback: true
      },
      async function(req:any,accessToken:string, refreshToken:string, profile:any, done:any) {
        try {
            if (req.session?.user_id)
                profile.user_id = req.session.user_id;
            profile.token = accessToken;
            profile.tokenSecret = "";
            done(null, profile);
        } catch (error) {
            done(error);
        }
      }
    ));
    //return true;
}

export default initPassport;