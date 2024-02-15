frappe.listview_settings['Contact'] = {
    onload: function(listview) {
        listview.page.add_inner_button(__('Update'), function() {
            // frappe.call({
            //     "method": "iwapp_com.events.contact.set_primary_to_mob_and_email",
            //     // "args": {
            //     // },
            //     callback: function (r) {
            //         frappe.msgprint("Contact updated for all lead and customers")
            //     }
            // })
        });
    }
};