const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();

const auth = require('./auth')
const accounts = require('./accounts')

let dashData = {
    title: 'Dashboard | WMMA',
    dashboard: {
        networth: '-49,899',
        assets: '69,800',
        debt: '1,19,600',
        liquid: '19,508',
        fixed: '50,000',
        loan: '1,10,000',
        credit: '9,600',
        spends: '2,435',
        activeEMI: '1',
        investments: '2'
    }
};

// Login & Sign up

router.get('/login', (req, res) => {

    res.render('login', {
        layout: 'basic',
        title: 'Login | WMMA'
    })
})

router.post('/login', async (req, res) => {
    const user = await auth.loginInUser(req.body)
    if (user && user.invalidCredentials) {
        res.render('login', {
            layout: 'basic',
            title: 'Login | WMMA',
            invalidCredentials: true
        })
    } else if(user && user.loginSuccess) {
        res.redirect('/dashboard')
    }
})

router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'basic',
        title: 'Signup | WMMA'
    })
})

router.post('/signup', async (req, res) => {
    const registerPayload = await auth.registerNewUser(req.body)
    // console.log(registerPayload)
    if (registerPayload && registerPayload.usernameTaken) {
        res.render('signup', {
            layout: 'basic',
            title: 'Signup | WMMA',
            userNameTaken: true,
            formName: registerPayload.formName
        })
    } else {
        res.redirect('/dashboard')
    }

})

// Dashboard --------------------------------
router.get('/', function (req, res) {
    res.redirect('/dashboard')
});

router.get('/dashboard', function (req, res) {
    res.render('dashboard', dashData);
});

// Accounts ----------------------------------
router.get('/accounts', async function (req, res) {

    const accountsData = await accounts.getAccountsPayload();
    accountsData.title = 'Accounts | WMMA';

    // console.log(accountsData)
    if (accountsData.bankAccounts.length == 0) {
        accountsData.noAccountsConfigured = true
    }

    res.render('accounts', accountsData)
});

router.post('/addAccount', async (req, res) => {
    // console.log(req.body)

    const updatedAccountsDetails = await accounts.addNewAccount(req.body);
    updatedAccountsDetails.title = 'Accounts | WMMA';
    updatedAccountsDetails.accountAddedFlag = true

    res.render('accounts', updatedAccountsDetails)
})

// Credit ------------------------------------

router.get('/credit-cards', function (req, res) {
    res.render('credit', {
        title: 'Credit Cards | WMMA'
    });
});
router.get('/investments', function (req, res) {
    res.render('investments', {
        title: 'Investments | WMMA'
    });
});
router.get('/loans', function (req, res) {
    res.render('loans', {
        title: 'Loans | WMMA'
    });
});
router.get('/stats', function (req, res) {
    res.render('stats', {
        title: 'Statistics | WMMA'
    });
});
router.get('/user', function (req, res) {
    res.render('user', {
        title: 'User | WMMA'
    });
});

router.get('/add-transaction', function (req, res) {
    res.render('add-transaction', {
        title: 'Add Transaction | WMMA'
    });
});


module.exports = router;