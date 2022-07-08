import express, {  Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import initPassport from './auth/passport';
import { registerRoutes } from "./routes/index";
import passport from 'passport';
import passportFacebook from "passport-facebook";
import session from 'express-session';
import cookieParser from 'cookie-parser';
const FacebookStrategy = passportFacebook.Strategy;

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});
// let user = {};


invokePassport();

async function invokePassport() {
  const x = await initPassport(app);
}

 
// app.use(passport.initialize());
// Facebook Strategy
// passport.use(new FacebookStrategy({
//   clientID: "551424233147329",
//   clientSecret: "262a6fd7d3e78d3671133a3038a1d381",
//   callbackURL: `http://localhost:7000/web/auth/facebook/callback`
// },
// (accessToken, refreshToken, profile, cb) => {
//   console.log(JSON.stringify(profile));
//   return cb(null, profile);
// }));

// app.get("/web/auth/facebook", passport.authenticate("facebook"));

// app.get(
//   "/web/auth/facebook/callback",
//   passport.authenticate("facebook", {
//       failureRedirect: "/fail",
//       successRedirect:"/success"
//   })
// );

app.get("/", async (req: Request, res: Response) => {
  res.send("Noble Page Api Implementations!");
});
app.use("/", registerRoutes());

// app.get("/fail",(req,res)=>{
// 	res.send("YOUR FAILED LOGIN !!!")
// })

// app.get("/success",(req,res)=>{
// 	console.log("ssss")
// 	res.send("successs login " + JSON.stringify(req.user))
// })

const port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log('\x1b[33m', `Noble page Server Started at http://localhost:${port}/`);
});