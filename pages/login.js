/**
 * Created by Pedro Luz on 23/08/2014.
 */
var commonStrings = require('../commonStrings');
var _ = require('underscore')
var passport = require('passport');

/* GET users listing. */
var loginController = {
    get: {
        action: function (req, res) {
            res.render("login", {layout: 'standalone'});
        },
        allowAnonymous: true
    },
    post: {
        action: function (req, res, next) {
            passport.authenticate('local', function (err, user) {
                if (err) {
                    debugger;
                    return res.render('login', {currentPage: {error: err}, layout: 'standalone'});
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/pessoa/nova');
                });
            })(req, res, next);
        },
        allowAnonymous: true}
};

var loginPage =
{
    controller: loginController,
    allowSignup: false,
    leftFooter: {
        text: "© 2014. Todos os direitos reservados. Sistema BigJS"
    },
    rightFooter: {
        text: "Criado pela: ",
        link: {
            url: "http://www.luzsistemas.com.br",
            text: "Luz Sistemas"
        }
    },
    topics: [
        {icon: 'fa-cogs', text: 'Ainda em desenvolvimento'},
        {icon: 'fa-eye', text: 'Dados fictícios'},
        {icon: 'fa-flash', text: 'Desenvolvimento a jato com JS!'},
    ]
};

/**
 * Extend login page object with specific common strings.
 */
_.extend(loginPage, commonStrings.login);

module.exports = loginPage;
