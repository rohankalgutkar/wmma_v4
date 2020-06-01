const mongo = require('./mongodb.js')
const _ = require('lodash')

const addNewAccount = async (addAccData) => {
    //todo: Add some server side validations

    //1: Process the data. If statsFlag is not present, that means its false. Set it so. Add it to mongo
    console.log(addAccData)
    if(!addAccData.statsFlag) {
        addAccData.statsFlag = "off"
    }

    let db = await mongo.connect()

    // Inserting directly without taking into consideration the "logged in" account
    await db.collection('bankAccounts').insertOne(addAccData)

    // Fetching directly from bankAccount w/o user login
    const bankAccountDetails = await getAccountsPayload();

    return bankAccountDetails

}

const fetchBankAccounts = async () => {
    let db = await mongo.connect()

    const bankAccounts = await db.collection('bankAccounts').find().toArray()

    return bankAccounts
}

const postProcessBankAccounts = (bankAccounts) => {
    let totalbalance = 0
    _.each(bankAccounts, (acc) => {
        if(acc.statsFlag == "on"){
            totalbalance = totalbalance + (+acc.currentBal)
            acc.accountTypeClass = 'text-green-800'
            acc.statsFlag = 'Included in Stats'
        } else {
            acc.accountTypeClass = 'text-yellow-700'
            acc.statsFlag = 'Excluded from Stats'
        }

        if(acc.last4Digits) {
            acc.last4DigitsFlag = true
        }

    })
    return {totalbalance, bankAccounts}
}

const getAccountsPayload = async () => {
    let bankAccounts = await fetchBankAccounts();
    const bankAccDetails = postProcessBankAccounts(bankAccounts);

    return bankAccDetails
}

module.exports = {
    addNewAccount,
    fetchBankAccounts,
    getAccountsPayload
};