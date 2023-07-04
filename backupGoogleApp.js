require('./controllers/auth');
const passport = require('passport');
const session = require("express-session");


const jwt = require("jsonwebtoken");
app.use(session({ secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());



//google auth begins here
//jwt token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}
function isLoggedIn(req, res, next) {
    req.user ? next(): res.sendStatus(401);
}

app.get('/google/callback', 
passport.authenticate('google', {
    successRedirect: '/api/google/protected',
    failureRedirect: '/api/google/failure',
})
)

app.get('/api/google/failure', (req, res) => {
    res.send('something went wrong');
})

app.get('/api/google/protected', isLoggedIn, (req, res, next ) => {
        const userToken = generateToken(req.user.id);
        res.cookie("token", userToken, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: false
        });
    res.send(`Hello ${req.user.displayName}`);
    console.log(req.user);
})
app.get('/api/google/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye');
})
app.get('/api/google/auth', 
passport.authenticate('google', {scope: ['email', 'profile']})
);
//google auth ends here