const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'))

// May cause prob in production. Check this out then.
// app.enable('view cache');

app.get('/', function (req, res) {
    res.redirect('/dashboard')
});
app.get('/dashboard', function (req, res) {
    res.render('dashboard', {
        title: 'Dashboard | WMMA',
        dashboard: {
            networth: '-49,800',
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
    });
});
app.get('/add-transaction', function (req, res) {
    res.render('add-transaction', {
        title: 'Add Transaction | WMMA'
    });
});
app.get('/accounts', function (req, res) {
    res.render('accounts', {
        title: 'Accounts | WMMA',
        accountTotal: '19,500',
        accounts: [{
            accountName: 'ICICI',
            accountType: 'Savings',
            statsInfo: 'Included in Stats',
            currentBal: '11,352',
            accountTypeClass: 'text-green-800'
        }, {
            accountName: 'HDFC',
            accountType: 'Savings',
            statsInfo: 'Included in Stats',
            currentBal: '4500',
            accountTypeClass: 'text-green-800'
        }, {
            accountName: 'Wallet',
            accountType: 'Savings',
            statsInfo: 'Included in Stats',
            currentBal: '4500',
            accountTypeClass: 'text-green-800'
        }, {
            accountName: 'Amazon Pay',
            accountType: 'Savings',
            statsInfo: 'Included in Stats',
            currentBal: '600',
            accountTypeClass: 'text-green-800'
        }, {
            accountName: 'DBS',
            accountType: 'Savings',
            statsInfo: 'Excluded from Stats',
            currentBal: '13,290',
            accountTypeClass: 'text-yellow-700'
        }]
    });
});
app.get('/credit-cards', function (req, res) {
    res.render('credit', {
        title: 'Credit Cards | WMMA'
    });
});
app.get('/investments', function (req, res) {
    res.render('investments', {
        title: 'Investments | WMMA'
    });
});
app.get('/loans', function (req, res) {
    res.render('loans', {
        title: 'Loans | WMMA'
    });
});
app.get('/stats', function (req, res) {
    res.render('stats', {
        title: 'Statistics | WMMA'
    });
});
app.get('/user', function (req, res) {
    res.render('user', {
        title: 'User | WMMA'
    });
});

app.listen(3000);