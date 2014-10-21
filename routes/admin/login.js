/**
 * Created by Pedro Luz on 23/08/2014.
 */
var commonStrings = require(luzUtil.getAppPath('commonStrings'));
var _ = require('lodash-node');
var passport = require('passport');

/* GET users listing. */
var loginController = {
    get: {
        action: function (req, res) {
            res.render("login", {layout: 'standalone'});
        },
        auth: luzUtil.allowAnonymous
    },
    post: {
        action: function (req, res, next) {
            passport.authenticate('local', function (err, user) {
                if (err) {
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
        auth: luzUtil.allowAnonymous
    }
};

var loginPage =
{
    controller: loginController,
    page: {
        allowSignup: false,
        title: 'Big JS - Login',
        systemTitle: 'BigJS',
        loginTitle: 'BigJS',
        welcomeText: 'Bem vindo ao BigJS beta!',
        footer: {
            left: {
                text: "© 2014. Todos os direitos reservados. Sistema BigJS"
            },
            right: {
                text: "Criado pela: ",
                link: {
                    url: "http://www.luzsistemas.com.br",
                    text: "Luz Sistemas"
                }
            }
        },
        topics: [
            {icon: 'fa-cogs', text: 'Ainda em desenvolvimento'},
            {icon: 'fa-eye', text: 'Dados fictícios'},
            {icon: 'fa-flash', text: 'Desenvolvimento a jato com JS!'},
        ]
    }
};
module.exports = loginPage;
