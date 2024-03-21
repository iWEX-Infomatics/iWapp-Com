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
        
    },
    custom_zippostal_code: function (frm) {
        frm.clear_table("custom_pincode_details")
        frm.refresh_fields("custom_pincode_details");
        if (frm.doc.country == "India" && frm.doc.custom_zippostal_code) {
            frappe.db.exists('Pincode', frm.doc.custom_zippostal_code)
                .then(exists => {
                    if (exists) {
                        frappe.db.get_doc('Pincode', frm.doc.custom_zippostal_code)
                            .then(doc => {
                                if (doc.pincode_details) {
                                    console.log("kkkkkk")
                                    $.each(doc.pincode_details, function (i, pin) {
                                        frm.set_value({ "state": pin.state, "custom_taluk": pin.taluk, "custom_districtcounty": pin.district })
                                    })
                                    let d = new frappe.ui.Dialog({
                                        title: 'Select Your Post Office',
                                        fields: [
                                            {
                                                label: 'Post Office',
                                                fieldname: 'post',
                                                fieldtype: 'Select',
                                                options: doc.pincode_details.map(pin => pin.post_office)
                                            }
                                        ],
                                        size: 'small', // small, large, extra-large
                                        primary_action_label: 'Save',
                                        primary_action(values) {
                                            frm.set_value("custom_post_office", values.post)

                                            d.hide();
                                        }
                                    });
                                    d.show();
                                }
                                else {
                                    frm.set_value({ "state": "", "custom_taluk": "", "custom_districtcounty": "", "custom_post_office": "" })
                                }
                            })
                    }
                    else {
                        frappe.call({
                            method: 'iwapp_com.events.employee.pincode',
                            args: {
                                pin: frm.doc.custom_zippostal_code
                            },
                            callback: function (r) {
                                if (r.message) {
                                    frm.clear_table("custom_pincode_details")
                                    $.each(r.message, function (i, pin) {
                                        frm.set_value({ "state": pin.State, "custom_taluk": pin.Block, "custom_districtcounty": pin.District })
                                        var child = cur_frm.add_child("custom_pincode_details");
                                        child.post_office = pin.Name
                                        child.taluk = pin.Block
                                        child.division = pin.Division
                                        child.district = pin.District
                                        child.state = pin.State
                                        frm.refresh_fields("custom_pincode_details");
                                    })
                                    let d = new frappe.ui.Dialog({
                                        title: 'Select Your Post Office',
                                        fields: [
                                            {
                                                label: 'Post Office',
                                                fieldname: 'post',
                                                fieldtype: 'Select',
                                                options: r.message.map(pin => pin.Name)
                                            }
                                        ],
                                        size: 'small', // small, large, extra-large
                                        primary_action_label: 'Save',
                                        primary_action(values) {
                                            frm.set_value("custom_post_office", values.post)

                                            d.hide();
                                        }
                                    });
                                    d.show();
                                }
                                else {
                                    frm.set_value({ "state": "", "custom_taluk": "", "custom_districtcounty": "", "custom_post_office": "" })
                                }
                            }
                        })
                    }
                })
        }
    },
})