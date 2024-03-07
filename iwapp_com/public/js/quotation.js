
frappe.ui.form.on("Quotation", {
    onload: function (frm) {
        frm.clear_table("custom_pincode_details")
        frm.refresh_fields("custom_pincode_details");
        if (frm.doc.__islocal == 1) {
            if (frm.doc.quotation_to == "Lead" && frm.doc.party_name) {
                frappe.db.get_doc('Lead', frm.doc.party_name)
                    .then(doc => {
                        frm.set_value({
                            "custom_country": doc.country, "custom_zippostal_code": doc.custom_zippostal_code,
                            "custom_door_building_street": doc.custom_door_building_street, "custom_citytown": doc.city,
                            "custom_post_office": doc.custom_post_office, "custom_taluk": doc.custom_taluk,
                            "custom_districtcounty": doc.custom_districtcounty, "custom_stateprovince": doc.state,
                            "custom_salutation": doc.salutation, "custom_first_name": doc.first_name,
                            "custom_middle_name": doc.middle_name, "custom_last_name": doc.last_name,
                            "custom_mobile": doc.mobile_no, "custom_email": doc.email_id,
                            "custom_designation": doc.job_title, "custom_department": doc.custom_department,
                            "custom_gender": doc.gender
                        })
                    })
            }
            if (frm.doc.quotation_to == "Customer" && frm.doc.party_name) {
                frappe.db.get_doc('Customer', frm.doc.party_name)
                    .then(doc => {
                        frm.set_value({
                            "custom_country": doc.custom_country, "custom_zippostal_code": doc.custom_postal_code,
                            "custom_door_building_street": doc.custom_address_line_1, "custom_citytown": doc.custom_citytown,
                            "custom_post_office": doc.custom_post_office, "custom_taluk": doc.custom_taluk,
                            "custom_districtcounty": doc.custom_county, "custom_stateprovince": doc.custom_stateprovince,
                            "custom_salutation": doc.salutation, "custom_first_name": doc.custom_first_name,
                            "custom_middle_name": doc.custom_middle_name, "custom_last_name": doc.custom_last_name,
                            "custom_mobile": doc.custom_mobile_no, "custom_email": doc.custom_email,
                            "custom_designation": doc.custom_designation, "custom_department": doc.custom_department,
                            "custom_gender": doc.gender, "custom_tax_id":doc.tax_id
                        })
                        // if (doc.customer_type == "Company"){
                        //     frm.set_value("custom_company_name", doc.name)
                        // }
                    })
            }
        }
    },
    party_name: function (frm) {
        frm.clear_table("custom_pincode_details")
        frm.refresh_fields("custom_pincode_details");
        if (frm.doc.quotation_to == "Lead" && frm.doc.party_name) {
            frappe.db.get_doc('Lead', frm.doc.party_name)
                .then(doc => {
                    frm.set_value({
                        "custom_country": doc.country, "custom_zippostal_code": doc.custom_zippostal_code,
                        "custom_door_building_street": doc.custom_door_building_street, "custom_citytown": doc.city,
                        "custom_post_office": doc.custom_post_office, "custom_taluk": doc.custom_taluk,
                        "custom_districtcounty": doc.custom_districtcounty, "custom_stateprovince": doc.state,
                        "custom_salutation": doc.salutation, "custom_first_name": doc.first_name,
                        "custom_middle_name": doc.middle_name, "custom_last_name": doc.last_name,
                        "custom_mobile": doc.mobile_no, "custom_email": doc.email_id,
                        "custom_designation": doc.job_title, "custom_department": doc.custom_department,
                        "custom_gender": doc.gender
                    })
                })
        }
        if (frm.doc.quotation_to == "Customer" && frm.doc.party_name) {
            frappe.db.get_doc('Customer', frm.doc.party_name)
                .then(doc => {
                    frm.set_value({
                        "custom_country": doc.custom_country, "custom_zippostal_code": doc.custom_postal_code,
                        "custom_door_building_street": doc.custom_address_line_1, "custom_citytown": doc.custom_citytown,
                        "custom_post_office": doc.custom_post_office, "custom_taluk": doc.custom_taluk,
                        "custom_districtcounty": doc.custom_county, "custom_stateprovince": doc.custom_stateprovince,
                        "custom_salutation": doc.salutation, "custom_first_name": doc.custom_first_name,
                        "custom_middle_name": doc.custom_middle_name, "custom_last_name": doc.custom_last_name,
                        "custom_mobile": doc.custom_mobile_no, "custom_email": doc.custom_email,
                        "custom_designation": doc.custom_designation, "custom_department": doc.custom_department,
                        "custom_gender": doc.gender, "custom_tax_id":doc.tax_id
                    })
                    // if (doc.customer_type == "Company"){
                    //     frm.set_value("custom_company_name", doc.name)
                    // }
                })
        }

    },
    custom_zippostal_code: function (frm) {
        frm.clear_table("custom_pincode_details")
        frm.refresh_fields("custom_pincode_details");
        if (frm.doc.custom_country == "India" && frm.doc.custom_automate == 1 && frm.doc.custom_zippostal_code) {
            frappe.db.exists('Pincode', frm.doc.custom_zippostal_code)
                .then(exists => {
                    if (exists) {
                        frappe.db.get_doc('Pincode', frm.doc.custom_zippostal_code)
                            .then(doc => {
                                if (doc.pincode_details) {
                                    $.each(doc.pincode_details, function (i, pin) {
                                        frm.set_value({ "custom_stateprovince": pin.state, "custom_taluk": pin.taluk, "custom_districtcounty": pin.district })
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
                                    frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "custom_districtcounty": "", "custom_post_office": "" })
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
                                        frm.set_value({ "custom_stateprovince": pin.State, "custom_taluk": pin.Block, "custom_districtcounty": pin.District })
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
                                    frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "county": "", "custom_post_office": "" })
                                }
                            }
                        })
                    }
                })
        }
    },
})