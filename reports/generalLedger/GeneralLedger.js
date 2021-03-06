const frappe = require('frappejs');

module.exports = function execute(params) {
    return new GeneralLedger().run(params);
}

class GeneralLedger {
    async run(params) {
        const filters = {};
        if (params.account) filters.account = params.account;
        if (params.party) filters.party = params.party;
        if (params.referenceType) filters.referenceType = params.referenceType;
        if (params.referenceName) filters.referenceName = params.referenceName;
        if (params.fromDate) filters.date = ['>=', params.fromDate];
        if (params.toDate) filters.date = ['<=', params.toDate];

        let data = await frappe.db.getAll({
            doctype: 'AccountingLedgerEntry',
            fields: ['date', 'account', 'party', 'referenceType', 'referenceName', 'debit', 'credit'],
            filters: filters
        });

        return data;
    }
}