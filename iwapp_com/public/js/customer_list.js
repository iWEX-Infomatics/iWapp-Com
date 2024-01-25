frappe.listview_settings['Customer'] = {
    onload: function(listview) {
        listview.page.add_inner_button(__('Update Contact'), function() {
            frappe.call({
                "method": "iwapp_com.events.lead.update_customer",
                // "args": {
                // },
                callback: function (r) {
                    frappe.msgprint("Updated Contacts for all Customers")
                }
            })
        });
    }
};