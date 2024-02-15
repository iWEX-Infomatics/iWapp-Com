// Copyright (c) 2024, iWEX and contributors
// For license information, please see license.txt

frappe.ui.form.on("Opportunity Source", {
    check(frm) {
        // frm.clear_table("details")
        // frm.refresh_fields("details");
        if (frm.doc.organisation_name) {
            // frm.set_value("organisation_name", "")
            frappe.db.get_list('Customer', {
                fields: ['name', 'custom_email',
                    'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'mobile_no', 'email_id'],
                filters: {
                    "name": ["like", "%" + frm.doc.organisation_name + "%"],
                },
            }).then(records => {
                if (records.length > 0) {
                    $.each(records, function (i, cust) {
                        var child = cur_frm.add_child("details");
                        child.email = cust.custom_email ?? cust.email_id;
                        child.id = cust.name
                        child.document = "Customer"
                        child.first_name = cust.custom_first_name
                        child.mobile_no = cust.custom_mobile_no ?? cust.mobile_no;
                        child.organisation_name = cust.custom_organisation_name ?? cust.name
                        frm.refresh_fields("details");
                        frm.set_value({"organisation_name": "" , "device_id": "", "first_name" : "", "mobile_no" : "", "email" : ""})
                    })
                }
                else{
                    if(frm.doc.first_name){
                    frappe.db.get_list('Customer', {
                        fields: ['name', 'custom_email',
                            'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'mobile_no', 'email_id'],
                        filters: {
                            "name": ["like", "%" + frm.doc.first_name + "%"],
                        },
                    }).then(records => {
                        if (records.length > 0) {
                            $.each(records, function (i, cust) {
                                var child = cur_frm.add_child("details");
                                child.email = cust.custom_email ?? cust.email_id;
                                child.id = cust.name
                                child.document = "Customer"
                                child.first_name = cust.custom_first_name
                                child.mobile_no = cust.custom_mobile_no ?? cust.mobile_no;
                                child.organisation_name = cust.custom_organisation_name ?? cust.name
                                frm.refresh_fields("details");
                                frm.set_value({"organisation_name": "" , "device_id": "", "first_name" : "", "mobile_no" : "", "email" : ""})
                            })
                        }
                        else{
                            if(frm.doc.email && frm.doc.mobile_no){
                            frappe.db.get_list('Contact', {
                                fields: ['name', 'email_id',
                                    'first_name', 'company_name', 'mobile_no'],
                                filters: {
                                    "first_name": ["like", "%" + frm.doc.first_name + "%"],
                                    "email_id" : ["=", frm.doc.email],
                                    "mobile_no" : ["=", frm.doc.mobile_no],
                                },
                            }).then(records => {
                                if (records.length > 0) {
                                    $.each(records, function (i, cust) {
                                        frappe.db.get_doc('Contact', cust.name)
                                        .then(doc => {
                                            $.each(doc.links, function (i, link) {
                                                if (link.link_doctype == "Customer"){
                                                    var child = cur_frm.add_child("details");
                                                    child.email = cust.email_id
                                                    child.id = link.link_name
                                                    child.document = "Customer"
                                                    child.first_name = cust.first_name
                                                    child.mobile_no = cust.mobile_no;
                                                    child.organisation_name = cust.company_name ?? cust.name
                                                    frm.refresh_fields("details");
                                                    frm.set_value({"organisation_name": "" , "device_id": "", "first_name" : "", "mobile_no" : "", "email" : ""})
                                                }
                                            })
                                        })
                            
                                    })
                                }
                                else{
                                    frappe.db.get_list('Address', {
                                        fields: ['name', 'email_id',
                                            'phone'],
                                        filters: {
                                            // "first_name": ["like", "%" + frm.doc.first_name + "%"],
                                            "email_id" : ["=", frm.doc.email],
                                            "phone" : ["=", frm.doc.mobile_no],
                                        },
                                    }).then(records => {
                                        if(records.length > 0){
                                            $.each(records, function (i, address) {
                                                frappe.db.get_doc('Address', address.name)
                                                .then(doc => {
                                                    $.each(doc.links, function (i, link) {
                                                        if(link.link_doctype == "Customer"){
                                                            var child = cur_frm.add_child("details");
                                                            child.email = address.email_id
                                                            child.id = link.link_name
                                                            child.document = "Customer"
                                                            child.first_name = link.link_name
                                                            child.mobile_no = address.phone
                                                            child.organisation_name = link.link_name
                                                            frm.refresh_fields("details");
                                                            frm.set_value({"organisation_name": "" , "device_id": "", "first_name" : "", "mobile_no" : "", "email" : ""})
                                                        }
                                                    })
                                                })
                                            })
                                        }
                                        else{
                                            frappe.db.get_list('Lead', {
                                                fields: ['name', 'email_id',
                                                    'first_name', 'mobile_no', 'company_name'],
                                                filters: {
                                                    "company_name": ["like", "%" + frm.doc.organisation_name + "%"],
                                                },
                                            }).then(records => {
                                                if(records.length > 0){
                                                    $.each(records, function (i, lead) {
                                                        var child = cur_frm.add_child("details");
                                                        child.email = lead.email_id
                                                        child.id = lead.name
                                                        child.document = "Lead"
                                                        child.first_name = lead.first_name
                                                        child.mobile_no = lead.mobile_no
                                                        child.organisation_name = lead.company_name
                                                        frm.refresh_fields("details");
                                                        frm.set_value({"organisation_name": "" , "device_id": "", "first_name" : "", "mobile_no" : "", "email" : ""})
                                                    })
                                                }
                                                else{
                                                    frappe.db.get_list('Lead', {
                                                        fields: ['name', 'email_id',
                                                            'first_name', 'mobile_no', 'company_name'],
                                                        filters: {
                                                            "first_name": ["like", "%" + frm.doc.first_name + "%"],
                                                        },
                                                    }).then(records => {
                                                        if(records.length > 0){
                                                            $.each(records, function (i, lead) {
                                                                var child = cur_frm.add_child("details");
                                                                child.email = lead.email_id
                                                                child.id = lead.name
                                                                child.document = "Lead"
                                                                child.first_name = lead.first_name
                                                                child.mobile_no = lead.mobile_no
                                                                child.organisation_name = lead.company_name
                                                                frm.refresh_fields("details");
                                                                frm.set_value({"organisation_name": "" , "device_id": "", "first_name" : "", "mobile_no" : "", "email" : ""})
                                                            })
                                                        }
                                                        else{
                                                            frappe.msgprint("No results found")
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                } 
                            })
                        }}
                    })
                }
                }
            })
        }
        },
    });
        // }
        // else if (frm.doc.organisation_name)
                // else {
                //     frappe.db.get_list('Lead', {
                //         fields: ['name', 'email_id',
                //             'first_name', 'mobile_no', 'company_name'],
                //         filters: {
                //             "lead_name": ["like", "%" + frm.doc.first_name + "%"],
                //         },
                //     }).then(records => {
                //         if (records) {
                //             $.each(records, function (i, lead) {
                //                 var child = cur_frm.add_child("details");
                //                 child.email = lead.email
                //                 child.id = lead.name
                //                 child.document = "Lead"
                //                 child.first_name = lead.first_name
                //                 child.mobile_no = lead.mobile_no
                //                 child.organisation_name = lead.company_name
                //                 frm.refresh_fields("details");
                //                 frm.set_value({"first_name" :"", "device_id": ""})
                //             })
                //         }
                //     })
                // }
         
        // if (frm.doc.organisation_name && !frm.doc.email && !frm.doc.mobile_no) {
        //     // frm.set_value("first_name", "")
        //     frappe.db.get_list('Customer', {
        //         fields: ['name', 'custom_email',
        //             'custom_first_name', 'custom_mobile_no', 'custom_organisation_name'],
        //         filters: {
        //             "custom_organisation_name": ["like", "%" + frm.doc.organisation_name + "%"],
        //         },
        //     }).then(records => {
        //         if (records.length > 0) {
        //             $.each(records, function (i, cust) {
        //                 var child = cur_frm.add_child("details");
        //                 child.email = cust.custom_email
        //                 child.id = cust.name
        //                 child.document = "Customer"
        //                 child.first_name = cust.custom_first_name
        //                 child.mobile_no = cust.custom_mobile_no
        //                 child.organisation_name = cust.custom_organisation_name
        //                 frm.refresh_fields("details");
        //                 frm.set_value({"organisation_name": "" , "device_id": ""})
        //             })
        //         }
        //         else {
        //             frappe.db.get_list('Lead', {
        //                 fields: ['name', 'email_id',
        //                     'first_name', 'mobile_no', 'company_name'],
        //                 filters: {
        //                     "company_name": ["like", "%" + frm.doc.organisation_name + "%"],
        //                 },
        //             }).then(records => {
        //                 if (records) {
        //                     $.each(records, function (i, lead) {
        //                         var child = cur_frm.add_child("details");
        //                         child.email = lead.email_id
        //                         child.id = lead.name
        //                         child.document = "Lead"
        //                         child.first_name = lead.first_name
        //                         child.mobile_no = lead.mobile_no
        //                         child.organisation_name = lead.company_name
        //                         frm.refresh_fields("details");
        //                         frm.set_value("organisation_name", "")
        //                     })
        //                 }
        //             })
        //         }
        //     })
        // }
        // if (frm.doc.organisation_name && frm.doc.email && frm.doc.mobile_no) {
        //     // frm.set_value("first_name", "")
        //     frappe.db.get_list('Customer', {
        //         fields: ['name', 'custom_email',
        //             'custom_first_name', 'custom_mobile_no', 'custom_organisation_name'],
        //         filters: {
        //             "custom_organisation_name": ["like", "%" + frm.doc.organisation_name + "%"],
        //             "custom_email": ["=", frm.doc.email],
        //             "custom_mobile_no": ["=", frm.doc.mobile_no]
        //         },
        //     }).then(records => {
        //         if (records.length > 0) {
        //             $.each(records, function (i, cust) {
        //                 var child = cur_frm.add_child("details");
        //                 child.email = cust.custom_email
        //                 child.id = cust.name
        //                 child.document = "Customer"
        //                 child.first_name = cust.custom_first_name
        //                 child.mobile_no = cust.custom_mobile_no
        //                 child.organisation_name = cust.custom_organisation_name
        //                 frm.refresh_fields("details");
        //                 frm.set_value({ "organisation_name": "", "mobile_no": "", "email": "", "device_id": ""})
        //             })
        //         }
        //         else {
        //             frappe.db.get_list('Customer', {
        //                 fields: ['name', 'email_id',
        //                     'custom_first_name', 'mobile_no', 'custom_organisation_name'],
        //                 filters: {
        //                     "name": ["like", "%" + frm.doc.organisation_name + "%"],
        //                     "email_id": ["=", frm.doc.email],
        //                     "mobile_no": ["=", frm.doc.mobile_no]
        //                 },
        //             }).then(records => {
        //                 if (records.length > 0) {
        //                     $.each(records, function (i, cust) {
        //                         var child = cur_frm.add_child("details");
        //                         child.email = cust.email_id
        //                         child.id = cust.name
        //                         child.document = "Customer"
        //                         child.first_name = cust.custom_first_name
        //                         child.mobile_no = cust.mobile_no
        //                         child.organisation_name = cust.custom_organisation_name
        //                         frm.refresh_fields("details");
        //                         frm.set_value({ "organisation_name": "", "mobile_no": "", "email": "", "device_id": "" })
        //                     })
        //                 }
        //                 else {
        //                     frappe.db.get_list('Lead', {
        //                         fields: ['name', 'email_id',
        //                             'first_name', 'mobile_no', 'company_name'],
        //                         filters: {
        //                             "company_name": ["like", "%" + frm.doc.organisation_name + "%"],
        //                             "email_id": ["=", frm.doc.email],
        //                             "mobile_no": ["=", frm.doc.mobile_no]
        //                         },
        //                     }).then(records => {
        //                         if (records.length > 0) {
        //                             $.each(records, function (i, lead) {
        //                                 var child = cur_frm.add_child("details");
        //                                 child.email = lead.email_id
        //                                 child.id = lead.name
        //                                 child.document = "Lead"
        //                                 child.first_name = lead.first_name
        //                                 child.mobile_no = lead.mobile_no
        //                                 child.organisation_name = lead.company_name
        //                                 frm.refresh_fields("details");
        //                                 frm.set_value({ "organisation_name": "", "mobile_no": "", "email": "", "device_id": ""})
        //                             })
        //                         }
        //                         else {
        //                             frappe.msgprint("No Customer/Lead found")
        //                         }
        //                     })
        //                 }
        //             })

        //         }
        //     })
        // }
        // if (frm.doc.first_name && frm.doc.email && frm.doc.mobile_no) {
        //     // frm.set_value("first_name", "")
        //     frappe.db.get_list('Customer', {
        //         fields: ['name', 'email_id',
        //             'custom_first_name', 'mobile_no', 'custom_organisation_name'],
        //         filters: {
        //             "name": ["like", "%" + frm.doc.first_name + "%"],
        //             "email_id": ["=", frm.doc.email],
        //             "mobile_no": ["=", frm.doc.mobile_no]
        //         },
        //     }).then(records => {
        //         if (records.length > 0) {
        //             $.each(records, function (i, cust) {
        //                 var child = cur_frm.add_child("details");
        //                 child.email = cust.email_id
        //                 child.id = cust.name
        //                 child.document = "Customer"
        //                 child.first_name = cust.custom_first_name
        //                 child.mobile_no = cust.mobile_no
        //                 child.organisation_name = cust.custom_organisation_name
        //                 frm.refresh_fields("details");
        //                 frm.set_value({ "first_name": "", "mobile_no": "", "email": "", "device_id": ""})
        //             })
        //         }

        //         else {
        //             frappe.db.get_list('Customer', {
        //                 fields: ['name', 'custom_email',
        //                     'custom_first_name', 'custom_mobile_no', 'custom_organisation_name'],
        //                 filters: {
        //                     "name": ["like", "%" + frm.doc.first_name + "%"],
        //                     "custom_email": ["=", frm.doc.email],
        //                     "custom_mobile_no": ["=", frm.doc.mobile_no]
        //                 },
        //             }).then(records => {
        //                 if (records.length > 0) {
        //                     $.each(records, function (i, cust) {
        //                         var child = cur_frm.add_child("details");
        //                         child.email = cust.custom_email
        //                         child.id = cust.name
        //                         child.document = "Customer"
        //                         child.first_name = cust.custom_first_name
        //                         child.mobile_no = cust.custom_mobile_no
        //                         child.organisation_name = cust.custom_organisation_name
        //                         frm.refresh_fields("details");
        //                         frm.set_value({ "first_name": "", "mobile_no": "", "email": "", "device_id": "" })
        //                     })
        //                 }
        //                 else {
        //                     frappe.db.get_list('Lead', {
        //                         fields: ['name', 'email_id',
        //                             'first_name', 'mobile_no', 'company_name'],
        //                         filters: {
        //                             "lead_name": ["like", "%" + frm.doc.first_name + "%"],
        //                             "email_id": ["=", frm.doc.email],
        //                             "mobile_no": ["=", frm.doc.mobile_no]
        //                         },
        //                     }).then(records => {
        //                         if (records.length) {
        //                             $.each(records, function (i, lead) {
        //                                 var child = cur_frm.add_child("details");
        //                                 child.email = lead.email_id
        //                                 child.id = lead.name
        //                                 child.document = "Lead"
        //                                 child.first_name = lead.first_name
        //                                 child.mobile_no = lead.mobile_no
        //                                 child.organisation_name = lead.company_name
        //                                 frm.refresh_fields("details");
        //                                 frm.set_value({ "first_name": "", "mobile_no": "", "email": "", "device_id": "" })
        //           })
        //                         }
        //                         else {
        //                             frappe.msgprint("No Customer/Lead found")
        //                         }
        //                     })
        //                 }
        //             })

        //         }
        //     })
        // }