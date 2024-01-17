frappe.ui.form.on('Role Permission for Page and Report', {
    page: function (frm) {
        if (frm.doc.page == "backups") {
            frm.clear_custom_buttons();
            frm.page.clear_actions();
        }
    },
    refresh: function (frm) {
        frm.set_query('page', function () {
            return {
                filters: [
                    ['name', '!=', 'backups']
                ]
            };
        });
    }
})