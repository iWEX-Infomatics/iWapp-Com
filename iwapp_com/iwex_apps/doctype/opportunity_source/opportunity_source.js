// Copyright (c) 2024, iWEX and contributors
// For license information, please see license.txt

frappe.ui.form.on("Opportunity Source", {
	check(frm) {
        frm.clear_table("details")
        frm.refresh_fields("details");
        console.log("hiiiiiiiiii")
        if (frm.doc.first_name && !frm.doc.email && !frm.doc.mobile_no){
            // frm.set_value("organisation_name", "")
            console.log("first")
            frappe.db.get_list('Customer', {
                fields: ['name', 'custom_email',
                'custom_first_name', 'custom_mobile_no', 'custom_organisation_name'],
                filters: {
                    "name": ["like", "%" + frm.doc.first_name + "%"],
                },
            }).then(records => {
                console.log(records);
                if (records.length > 0){
                    console.log("custttt")
                    $.each(records, function(i, cust){
                        var child = cur_frm.add_child("details");
                        child.email= cust.custom_email
                        child.id = cust.name
                        child.document = "Customer"
                        child.first_name = cust.custom_first_name
                        child.mobile_no = cust.custom_mobile_no
                        child.organisation_name = cust.custom_organisation_name
                        frm.refresh_fields("details");
                    })
                }
                else{
                    console.log("lead")
                    frappe.db.get_list('Lead', {
                        fields: ['name', 'email_id',
                        'first_name', 'mobile_no', 'company_name'],
                        filters: {
                            "lead_name": ["like", "%" + frm.doc.first_name + "%"],
                        },
                    }).then(records => {
                        console.log(records);
                        if (records){
                            $.each(records, function(i, lead){
                                var child = cur_frm.add_child("details");
                                child.email= lead.email
                                child.id = lead.name
                                child.document = "Lead"
                                child.first_name = lead.first_name
                                child.mobile_no = lead.mobile_no
                                child.organisation_name = lead.company_name
                                frm.refresh_fields("details");
                            })
                        }
                    })
                }
            })
        }
        if (frm.doc.organisation_name && !frm.doc.email && !frm.doc.mobile_no){
            console.log("first")
            // frm.set_value("first_name", "")
            frappe.db.get_list('Customer', {
                fields: ['name', 'custom_email',
                'custom_first_name', 'custom_mobile_no', 'custom_organisation_name'],
                filters: {
                    "custom_organisation_name": ["like", "%" + frm.doc.organisation_name + "%"],
                },
            }).then(records => {
                console.log(records);
                if (records.length > 0){
                    console.log("custttt")
                    $.each(records, function(i, cust){
                        var child = cur_frm.add_child("details");
                        child.email= cust.custom_email
                        child.id = cust.name
                        child.document = "Customer"
                        child.first_name = cust.custom_first_name
                        child.mobile_no = cust.custom_mobile_no
                        child.organisation_name = cust.custom_organisation_name
                        frm.refresh_fields("details");
                    })
                }
                else{
                    console.log("lead")
                    frappe.db.get_list('Lead', {
                        fields: ['name', 'email_id',
                        'first_name', 'mobile_no', 'company_name'],
                        filters: {
                            "company_name": ["like", "%" + frm.doc.organisation_name + "%"],
                        },
                    }).then(records => {
                        console.log(records);
                        if (records){
                            $.each(records, function(i, lead){
                                var child = cur_frm.add_child("details");
                                child.email= lead.email_id
                                child.id = lead.name
                                child.document = "Lead"
                                child.first_name = lead.first_name
                                child.mobile_no = lead.mobile_no
                                child.organisation_name = lead.company_name
                                frm.refresh_fields("details");
                            })
                        }
                    })
                }
            })
        }
        if (frm.doc.organisation_name && frm.doc.email && frm.doc.mobile_no){
            console.log("full with org")
            // frm.set_value("first_name", "")
            frappe.db.get_list('Customer', {
                fields: ['name', 'custom_email',
                'custom_first_name', 'custom_mobile_no', 'custom_organisation_name'],
                filters: {
                    "custom_organisation_name": ["like", "%" + frm.doc.organisation_name + "%"],
                    "custom_email": ["=", frm.doc.email],
                    "custom_mobile_no":["=", frm.doc.mobile_no]
                },
            }).then(records => {
                console.log(records);
                if (records.length > 0){
                    console.log("custttt")
                    $.each(records, function(i, cust){
                        var child = cur_frm.add_child("details");
                        child.email= cust.custom_email
                        child.id = cust.name
                        child.document = "Customer"
                        child.first_name = cust.custom_first_name
                        child.mobile_no = cust.custom_mobile_no
                        child.organisation_name = cust.custom_organisation_name
                        frm.refresh_fields("details");
                    })
                }
                else{
                    console.log("lead")
                    frappe.db.get_list('Lead', {
                        fields: ['name', 'email_id',
                        'first_name', 'mobile_no', 'company_name'],
                        filters: {
                            "company_name": ["like", "%" + frm.doc.organisation_name + "%"],
                            "email_id": ["=", frm.doc.email],
                            "mobile_no":["=", frm.doc.mobile_no]
                        },
                    }).then(records => {
                        console.log(records);
                        if (records){
                            $.each(records, function(i, lead){
                                var child = cur_frm.add_child("details");
                                child.email= lead.email_id
                                child.id = lead.name
                                child.document = "Lead"
                                child.first_name = lead.first_name
                                child.mobile_no = lead.mobile_no
                                child.organisation_name = lead.company_name
                                frm.refresh_fields("details");
                            })
                        }
                    })
                }
            })
        }
        if (frm.doc.first_name && frm.doc.email && frm.doc.mobile_no){
            console.log("full with org")
            // frm.set_value("first_name", "")
            frappe.db.get_list('Customer', {
                fields: ['name', 'custom_email',
                'custom_first_name', 'custom_mobile_no', 'custom_organisation_name'],
                filters: {
                    "name": ["like", "%" + frm.doc.first_name + "%"],
                    "custom_email": ["=", frm.doc.email],
                    "custom_mobile_no":["=", frm.doc.mobile_no]
                },
            }).then(records => {
                console.log(records);
                if (records.length > 0){
                    console.log("custttt")
                    $.each(records, function(i, cust){
                        var child = cur_frm.add_child("details");
                        child.email= cust.custom_email
                        child.id = cust.name
                        child.document = "Customer"
                        child.first_name = cust.custom_first_name
                        child.mobile_no = cust.custom_mobile_no
                        child.organisation_name = cust.custom_organisation_name
                        frm.refresh_fields("details");
                    })
                }
                else{
                    console.log("lead")
                    frappe.db.get_list('Lead', {
                        fields: ['name', 'email_id',
                        'first_name', 'mobile_no', 'company_name'],
                        filters: {
                            "lead_name": ["like", "%" + frm.doc.first_name + "%"],
                            "email_id": ["=", frm.doc.email],
                            "mobile_no":["=", frm.doc.mobile_no]
                        },
                    }).then(records => {
                        console.log(records);
                        if (records){
                            $.each(records, function(i, lead){
                                var child = cur_frm.add_child("details");
                                child.email= lead.email_id
                                child.id = lead.name
                                child.document = "Lead"
                                child.first_name = lead.first_name
                                child.mobile_no = lead.mobile_no
                                child.organisation_name = lead.company_name
                                frm.refresh_fields("details");
                            })
                        }
                    })
                }
            })
        }
	},
});