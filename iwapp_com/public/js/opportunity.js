frappe.ui.form.on("Opportunity", {
    refresh: function (frm) {
        if (frm.doc.custom_customerlead_found == 0) {
            frm.set_value("opportunity_from", "Lead")
        }
    },
    opportunity_from: function (frm) {
        if (frm.doc.opportunity_from == "Lead") {
            frappe.call({
                "method": "iwapp_com.events.opportunity.create_dummy_lead",
                callback: function (r) {
                    if (r.message) {
                        frm.set_value("party_name", r.message)
                        frm.set_value("custom_dummy_lead", r.message)
                    }
                }
            })
        }
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
                                    frm.set_value({ "state": "", "custom_taluk": "", "county": "", "custom_post_office": "" })
                                }
                            }
                        })
                    }
                })
        }
    },
    custom_check: function (frm) {
        if(frm.doc.custom_email && frm.doc.custom_mobile && frm.doc.custom_organization_name && frm.doc.custom_first_name){
        frappe.call({
            "method": "iwapp_com.events.opportunity.get_cust_or_lead",
            "args": {
                "email": frm.doc.custom_email,
                "mobile": frm.doc.custom_mobile,
                "organisation": frm.doc.custom_organization_name,
                "first_name": frm.doc.custom_first_name
            },
            callback: function (r) {
                if (r.message) {
                    frm.set_value({ "custom_customerlead_found": 1, "opportunity_from": r.message[0], "party_name": r.message[1] })
                    frappe.msgprint("Party Name Updated")
                } else {
                    frappe.msgprint("No Customer/Lead found")
                    frm.set_value("custom_lead_not_found", 1)
                    frm.set_value("party_name", frm.doc.custom_dummy_lead)

                }
            }
        })
    }
    },
})