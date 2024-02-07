frappe.ui.form.on("Supplier",{
    custom_postal_code: function (frm) {
        console.log("kkkkkkkkkkk")
        frm.clear_table("custom_pincode_details")
        frm.refresh_fields("custom_pincode_details");
        if (frm.doc.country == "India" && frm.doc.custom_postal_code) {
            frappe.db.exists('Pincode', frm.doc.custom_postal_code)
                .then(exists => {
                    if (exists) {
                        frappe.db.get_doc('Pincode', frm.doc.custom_postal_code)
                            .then(doc => {
                                if (doc.pincode_details) {
                                    $.each(doc.pincode_details, function (i, pin) {
                                        frm.set_value({ "custom_stateprovince": pin.state, "custom_taluk": pin.taluk, "custom_county": pin.district })
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
                                    frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "custom_county": "", "custom_post_office":"" })
                                }
                            })
                    }
                    else {
                        frappe.call({
                            method: 'iwapp_com.events.employee.pincode',
                            args: {
                                pin: frm.doc.custom_postal_code
                            },
                            callback: function (r) {
                                if (r.message) {
                                    frm.clear_table("custom_pincode_details")
                                    $.each(r.message, function (i, pin) {
                                        frm.set_value({ "custom_stateprovince": pin.State, "custom_taluk": pin.Block, "custom_county": pin.District })
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
                                    frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "custom_county": "", "custom_post_office": "" })
                                }
                            }
                        })
                    }
                })
        }
    }
    })