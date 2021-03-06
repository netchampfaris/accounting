const GeneralLedgerView = require('../reports/generalLedger/GeneralLedgerView');
const frappe = require('frappejs');

module.exports = {
    start() {
        // require modules
        frappe.registerModels(require('../models'), 'client');

        frappe.registerView('List', 'ToDo', require('frappejs/models/doctype/ToDo/ToDoList.js'));
        frappe.registerView('Form', 'FilterSelector', require('frappejs/models/doctype/FilterSelector/FilterSelectorForm.js'));

        frappe.registerView('List', 'Customer', require('../models/doctype/Party/CustomerList.js'));

        frappe.router.add('report/general-ledger', async (params) => {
            if (!frappe.views.generalLedger) {
                frappe.views.generalLedger = new GeneralLedgerView();
            }
            await frappe.views.generalLedger.show(params);
        })

        frappe.desk.menu.addItem('ToDo', '#list/ToDo');
        frappe.desk.menu.addItem('Accounts', '#list/Account');
        frappe.desk.menu.addItem('Items', '#list/Item');
        frappe.desk.menu.addItem('Customers', '#list/Customer');
        frappe.desk.menu.addItem('Invoice', '#list/Invoice');
        frappe.desk.menu.addItem('Address', "#list/Address");
        frappe.desk.menu.addItem('Contact', "#list/Contact");
        frappe.desk.menu.addItem('Settings', () => frappe.desk.showFormModal('SystemSettings'));

        frappe.router.default = '#list/ToDo';

        frappe.router.show(window.location.hash);

    }
}