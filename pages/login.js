/**
 * Created by Pedro Luz on 23/08/2014.
 */
var commonStrings = require('../commonStrings');
var _ = require('underscore')


/* GET users listing. */
var loginController = {
    get: function (req, res) {
        debugger;
        res.render("login", {layout: 'standalone'});
    },
    post: function(req,res)
    {
        debugger;
        passport.authenticate('local', { failureRedirect: '/login' }),
            function (req, res) {
                res.redirect('/');
            };
    }
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
