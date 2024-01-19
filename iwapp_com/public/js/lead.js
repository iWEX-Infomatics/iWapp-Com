frappe.ui.form.on("Lead",{
    mobile_no:function(frm){
        frappe.db.get_value('Customer', {mobile_no: frm.doc.mobile_no}, 'mobile_no')
        .then(r => {
            let values = r.message;
            if (values.mobile_no){
                frappe.msgprint("This mobile No. is already taken for a customer.")
            }
        })
        
    },
    email_id:function(frm){
        frappe.db.get_value('Customer', {email_id: frm.doc.email_id}, 'email_id')
        .then(r => {
            let values = r.message;
            if (values.email_id){
                frappe.msgprint("This mail id is already taken for a customer.")
                frm.set_value("email_id", "")
            }
        })
        
    },
    company_name:function(frm){
        frappe.db.get_value('Customer', {name: frm.doc.company_name}, 'name')
        .then(r => {
            let values = r.message;
            if (values.name){
                frappe.msgprint("Organisation is already taken for a customer.")
            }
        })
        
    }
})