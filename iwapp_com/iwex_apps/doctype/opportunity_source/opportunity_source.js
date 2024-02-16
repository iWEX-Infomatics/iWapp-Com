// Copyright (c) 2024, iWEX and contributors
// For license information, please see license.txt

frappe.ui.form.on("Opportunity Source", {
    check(frm) {
        if (frm.doc.organisation_name) {
            frappe.db.get_list('Customer', {
                fields: ['name', 'custom_email',
                    'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'mobile_no', 'email_id'],
                filters: {
                    "name": ["like", "%" + frm.doc.organisation_name + "%"],
                },
            }).then(records => {
                if (records.length > 0) {
                    console.log("kkkkkjj")
                    $.each(records, function (i, cust) {
                        var child = cur_frm.add_child("hidden_details");
                        child.email = cust.custom_email ?? cust.email_id;
                        child.id = cust.name
                        child.document = "Customer"
                        child.first_name = cust.custom_first_name
                        child.mobile_no = cust.custom_mobile_no ?? cust.mobile_no;
                        child.organisation_name = cust.custom_organisation_name ?? cust.name
                        frm.refresh_fields("hidden_details");
                    })
                }
                else {
                    frappe.db.get_list('Customer', {
                        fields: ['name', 'custom_email',
                            'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'mobile_no', 'email_id', 'customer_name'],
                        filters: {
                            "customer_name": ["like", "%" + frm.doc.organisation_name + "%"],
                        },
                    }).then(records => {
                        if (records.length > 0) {
                            $.each(records, function (i, cust) {
                                var child = cur_frm.add_child("hidden_details");
                                child.email = cust.custom_email ?? cust.email_id;
                                child.id = cust.name
                                child.document = "Customer"
                                child.first_name = cust.custom_first_name ?? cust.customer_name
                                child.mobile_no = cust.custom_mobile_no ?? cust.mobile_no;
                                child.organisation_name = cust.custom_organisation_name ?? cust.customer_name
                                frm.refresh_fields("hidden_details");
                            })
                        }
                        else {
                            frappe.db.get_list('Lead', {
                                fields: ['name', 'email_id',
                                    'first_name', 'mobile_no', 'company_name'],
                                filters: {
                                    "company_name": ["like", "%" + frm.doc.organisation_name + "%"],
                                },
                            }).then(records => {
                                if (records.length > 0) {
                                    $.each(records, function (i, lead) {
                                        console.log("vaaaaaa", child.id)
                                        var child = cur_frm.add_child("hidden_details");
                                        child.email = lead.email_id
                                        child.id = lead.name
                                        child.document = "Lead"
                                        child.first_name = lead.first_name
                                        child.mobile_no = lead.mobile_no
                                        child.organisation_name = lead.company_name
                                        frm.refresh_fields("hidden_details");
                                    })

                                }
                            })
                        }
                    })

                }
            })
        }
        if (frm.doc.first_name) {
            frappe.db.get_list('Customer', {
                fields: ['name', 'custom_email',
                    'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'mobile_no', 'email_id'],
                filters: {
                    "name": ["like", "%" + frm.doc.first_name + "%"],
                },
            }).then(records => {
                if (records.length > 0) {
                    $.each(records, function (i, cust) {
                        var child = cur_frm.add_child("hidden_details");
                        child.email = cust.custom_email ?? cust.email_id;
                        child.id = cust.name
                        child.document = "Customer"
                        child.first_name = cust.custom_first_name
                        child.mobile_no = cust.custom_mobile_no ?? cust.mobile_no;
                        child.organisation_name = cust.custom_organisation_name ?? cust.name
                        frm.refresh_fields("hidden_details");
                    })
                }
                else {
                    frappe.db.get_list('Customer', {
                        fields: ['name', 'custom_email',
                            'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'mobile_no', 'email_id', 'customer_name'],
                        filters: {
                            "customer_name": ["like", "%" + frm.doc.first_name + "%"],
                        },
                    }).then(records => {
                        if (records.length > 0) {
                            $.each(records, function (i, cust) {
                                var child = cur_frm.add_child("hidden_details");
                                child.email = cust.custom_email ?? cust.email_id;
                                child.id = cust.name
                                child.document = "Customer"
                                child.first_name = cust.custom_first_name ?? cust.customer_name
                                child.mobile_no = cust.custom_mobile_no ?? cust.mobile_no;
                                child.organisation_name = cust.custom_organisation_name ?? cust.customer_name
                                frm.refresh_fields("hidden_details");
                            })
                        }
                        else {
                            frappe.db.get_list('Contact', {
                                fields: ['name', 'email_id',
                                    'first_name', 'company_name', 'mobile_no', 'phone'],
                                filters: {
                                    "first_name": ["like", "%" + frm.doc.first_name + "%"]
                                },
                            }).then(records => {
                                if (records.length > 0) {
                                    $.each(records, function (i, contact) {
                                        frappe.db.get_doc('Contact', contact.name)
                                            .then(doc => {
                                                if (doc.links.length > 1) {
                                                    $.each(doc.links, function (i, link) {
                                                        if (link.link_doctype == "Customer") {
                                                            var child = cur_frm.add_child("hidden_details");
                                                            child.email = contact.email_id
                                                            child.id = link.link_name
                                                            child.document = "Customer"
                                                            child.first_name = contact.first_name
                                                            child.mobile_no = contact.mobile_no ?? contact.phone
                                                            child.organisation_name = contact.company_name ?? link.link_name
                                                            frm.refresh_fields("hidden_details");
                                                        }
                                                    })
                                                }
                                                if (doc.links.length == 1) {
                                                    $.each(doc.links, function (i, link) {
                                                        if (link.link_doctype == "Customer") {
                                                            var child = cur_frm.add_child("hidden_details");
                                                            child.email = contact.email_id
                                                            child.id = link.link_name
                                                            child.document = "Customer"
                                                            child.first_name = contact.first_name
                                                            child.mobile_no = contact.mobile_no ?? contact.phone
                                                            child.organisation_name = contact.company_name ?? link.link_name
                                                            frm.refresh_fields("hidden_details");
                                                        }
                                                        else {
                                                            console.log("kkkkkk")
                                                            if (link.link_doctype == "Lead")
                                                                var child = cur_frm.add_child("hidden_details");
                                                            child.email = contact.email_id
                                                            child.id = link.link_name
                                                            child.document = link.link_doctype
                                                            child.first_name = contact.first_name
                                                            child.mobile_no = contact.mobile_no ?? contact.phone
                                                            child.organisation_name = contact.company_name ?? link.link_name
                                                            frm.refresh_fields("hidden_details");
                                                        }
                                                    })
                                                }
                                            })
                                    })
                                }
                                else {
                                    frappe.db.get_list('Lead', {
                                        fields: ['name', 'email_id',
                                            'first_name', 'mobile_no', 'company_name'],
                                        filters: {
                                            "first_name": ["like", "%" + frm.doc.first_name + "%"],
                                        },
                                    }).then(records => {
                                        if (records.length > 0) {
                                            $.each(records, function (i, lead) {
                                                var child = cur_frm.add_child("hidden_details");
                                                child.email = lead.email_id
                                                child.id = lead.name
                                                child.document = "Lead"
                                                child.first_name = lead.first_name
                                                child.mobile_no = lead.mobile_no
                                                child.organisation_name = lead.company_name
                                                frm.refresh_fields("hidden_details");
                                            })
                                        }
                                    })
                                }
                            })
                        }

                    })

                }
            })
        }
        if (frm.doc.mobile_no) {
            frappe.db.get_list('Contact', {
                fields: ['name', 'email_id',
                    'first_name', 'company_name', 'mobile_no'],
                filters: {
                    "mobile_no": ["=", frm.doc.mobile_no]
                },
            }).then(records => {
                if (records.length > 0) {
                    console.log("contact")
                    $.each(records, function (i, contact) {
                        frappe.db.get_doc('Contact', contact.name)
                            .then(doc => {
                                if (doc.links.length > 1) {
                                    $.each(doc.links, function (i, link) {
                                        if (link.link_doctype == "Customer") {
                                            var child = cur_frm.add_child("hidden_details");
                                            child.email = contact.email_id
                                            child.id = link.link_name
                                            child.document = "Customer"
                                            child.first_name = contact.first_name
                                            child.mobile_no = contact.mobile_no;
                                            child.organisation_name = contact.company_name ?? link.link_name
                                            frm.refresh_fields("hidden_details");
                                        }
                                    })
                                }
                                if (doc.links.length == 1) {
                                    $.each(doc.links, function (i, link) {
                                        if (link.link_doctype == "Customer") {
                                            var child = cur_frm.add_child("hidden_details");
                                            child.email = contact.email_id
                                            child.id = link.link_name
                                            child.document = "Customer"
                                            child.first_name = contact.first_name
                                            child.mobile_no = contact.mobile_no;
                                            child.organisation_name = contact.company_name ?? link.link_name
                                            frm.refresh_fields("hidden_details");
                                        }
                                        else {
                                            if (link.link_doctype == "Lead") {
                                                var child = cur_frm.add_child("hidden_details");
                                                child.email = contact.email_id
                                                child.id = link.link_name
                                                child.document = link.link_doctype
                                                child.first_name = contact.first_name
                                                child.mobile_no = contact.mobile_no;
                                                child.organisation_name = contact.company_name ?? link.link_name
                                                frm.refresh_fields("hidden_details");
                                            }
                                        }
                                    })
                                }

                            })

                    })
                }
                else {
                    frappe.db.get_list('Contact', {
                        fields: ['name', 'email_id',
                            'first_name', 'company_name', 'phone'],
                        filters: {
                            "phone": ["=", frm.doc.mobile_no]
                        },
                    }).then(records => {
                        if (records.length > 0) {
                            $.each(records, function (i, contact) {
                                frappe.db.get_doc('Contact', contact.name)
                                    .then(doc => {
                                        if (doc.links.length > 1) {
                                            $.each(doc.links, function (i, link) {
                                                if (link.link_doctype == "Customer") {
                                                    var child = cur_frm.add_child("hidden_details");
                                                    child.email = contact.email_id
                                                    child.id = link.link_name
                                                    child.document = "Customer"
                                                    child.first_name = contact.first_name
                                                    child.mobile_no = contact.phone;
                                                    child.organisation_name = contact.company_name ?? link.link_name
                                                    frm.refresh_fields("hidden_details");
                                                }
                                            })
                                        }
                                        if (doc.links.length == 1) {
                                            $.each(doc.links, function (i, link) {
                                                if (link.link_doctype == "Customer") {
                                                    var child = cur_frm.add_child("hidden_details");
                                                    child.email = contact.email_id
                                                    child.id = link.link_name
                                                    child.document = "Customer"
                                                    child.first_name = contact.first_name
                                                    child.mobile_no = contact.phone
                                                    child.organisation_name = contact.company_name ?? link.link_name
                                                    frm.refresh_fields("hidden_details");
                                                }
                                                else {
                                                    if (link.link_doctype == "Lead") {
                                                        var child = cur_frm.add_child("hidden_details");
                                                        child.email = contact.email_id
                                                        child.id = link.link_name
                                                        child.document = link.link_doctype
                                                        child.first_name = contact.first_name
                                                        child.mobile_no = contact.phone;
                                                        child.organisation_name = contact.company_name ?? link.link_name
                                                        frm.refresh_fields("hidden_details");
                                                    }
                                                }
                                            })
                                        }
                                    })

                            })
                        }
                        else {
                            frappe.db.get_list('Customer', {
                                fields: ['name', 'custom_email',
                                    'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'mobile_no', 'email_id', 'customer_name'],
                                filters: {
                                    "mobile_no": ["=", frm.doc.mobile_no],
                                },
                            }).then(records => {
                                if (records.length > 0) {
                                    $.each(records, function (i, cust) {
                                        var child = cur_frm.add_child("hidden_details");
                                        child.email = cust.custom_email ?? cust.email_id;
                                        child.id = cust.name
                                        child.document = "Customer"
                                        child.first_name = cust.custom_first_name ?? cust.customer_name
                                        child.mobile_no = cust.custom_mobile_no ?? cust.mobile_no;
                                        child.organisation_name = cust.custom_organisation_name ?? cust.customer_name
                                        frm.refresh_fields("hidden_details");
                                    })
                                }
                                else {
                                    frappe.db.get_list('Lead', {
                                        fields: ['name', 'email_id',
                                            'first_name', 'mobile_no', 'company_name'],
                                        filters: {
                                            "mobile_no": ["=", frm.doc.mobile_no],
                                        },
                                    }).then(records => {
                                        if (records.length > 0) {
                                            $.each(records, function (i, lead) {
                                                var child = cur_frm.add_child("hidden_details");
                                                child.email = lead.email_id
                                                child.id = lead.name
                                                child.document = "Lead"
                                                child.first_name = lead.first_name
                                                child.mobile_no = lead.mobile_no
                                                child.organisation_name = lead.company_name
                                                frm.refresh_fields("hidden_details");
                                            })
                                        }
                                        else {
                                            frappe.db.get_list('Lead', {
                                                fields: ['name', 'email_id',
                                                    'first_name', 'mobile_no', 'company_name'],
                                                filters: {
                                                    "phone": ["=", frm.doc.mobile_no],
                                                },
                                            }).then(records => {
                                                if (records.length > 0) {
                                                    $.each(records, function (i, lead) {
                                                        var child = cur_frm.add_child("hidden_details");
                                                        child.email = lead.email_id
                                                        child.id = lead.name
                                                        child.document = "Lead"
                                                        child.first_name = lead.first_name
                                                        child.mobile_no = lead.phone
                                                        child.organisation_name = lead.company_name
                                                        frm.refresh_fields("hidden_details");
                                                    })
                                                }
                                                else {
                                                    frappe.db.get_list('Address', {
                                                        fields: ['name', 'email_id',
                                                            'phone'],
                                                        filters: {
                                                            // "first_name": ["like", "%" + frm.doc.first_name + "%"],
                                                            // "email_id" : ["=", frm.doc.email],
                                                            "phone": ["=", frm.doc.mobile_no],
                                                        },
                                                    }).then(records => {
                                                        if (records.length > 0) {
                                                            console.log("address_mob")
                                                            $.each(records, function (i, address) {
                                                                frappe.db.get_doc('Address', address.name)
                                                                    .then(doc => {
                                                                        $.each(doc.links, function (i, link) {
                                                                            if (doc.links.length > 1) {
                                                                                $.each(doc.links, function (i, link) {
                                                                                    if (link.link_doctype == "Customer") {
                                                                                        var child = cur_frm.add_child("hidden_details");
                                                                                        child.email = address.email_id
                                                                                        child.id = link.link_name
                                                                                        child.document = "Customer"
                                                                                        child.first_name = link.link_name
                                                                                        child.mobile_no = address.phone
                                                                                        child.organisation_name = link.link_name
                                                                                        frm.refresh_fields("hidden_details");
                                                                                    }
                                                                                })
                                                                            }
                                                                            if (doc.links.length == 1) {
                                                                                $.each(doc.links, function (i, link) {
                                                                                    if (link.link_doctype == "Customer") {
                                                                                        var child = cur_frm.add_child("hidden_details");
                                                                                        child.email = address.email_id
                                                                                        child.id = link.link_name
                                                                                        child.document = "Customer"
                                                                                        child.first_name = link.link_name
                                                                                        child.mobile_no = address.phone
                                                                                        child.organisation_name = link.link_name
                                                                                        frm.refresh_fields("hidden_details");
                                                                                    }
                                                                                    else {
                                                                                        if (link.link_doctype == "Customer") {
                                                                                            var child = cur_frm.add_child("hidden_details");
                                                                                            child.email = address.email_id
                                                                                            child.id = link.link_name
                                                                                            child.document = link.link_doctype
                                                                                            child.first_name = link.link_name
                                                                                            child.mobile_no = address.phone
                                                                                            child.organisation_name = link.link_name
                                                                                            frm.refresh_fields("hidden_details");
                                                                                        }
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    })
                                                            })
                                                        }
                                                    })

                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        if (frm.doc.email) {
            frappe.db.get_list('Contact', {
                fields: ['name', 'email_id',
                    'first_name', 'company_name', 'mobile_no'],
                filters: {
                    "email_id": ["=", frm.doc.email]
                },
            }).then(records => {

                if (records.length > 0) {
                    $.each(records, function (i, contact) {
                        frappe.db.get_doc('Contact', contact.name)
                            .then(doc => {
                                if (doc.links.length > 1) {
                                    $.each(doc.links, function (i, link) {
                                        if (link.link_doctype == "Customer") {
                                            var child = cur_frm.add_child("hidden_details");
                                            child.email = contact.email_id
                                            child.id = link.link_name
                                            child.document = "Customer"
                                            child.first_name = contact.first_name
                                            child.mobile_no = contact.mobile_no ?? contact.phone
                                            child.organisation_name = contact.company_name ?? link.link_name
                                            frm.refresh_fields("hidden_details");
                                        }
                                    })
                                }
                                if (doc.links.length == 1) {
                                    $.each(doc.links, function (i, link) {
                                        if (link.link_doctype == "Customer") {
                                            var child = cur_frm.add_child("hidden_details");
                                            child.email = contact.email_id
                                            child.id = link.link_name
                                            child.document = "Customer"
                                            child.first_name = contact.first_name
                                            child.mobile_no = contact.mobile_no ?? contact.phone
                                            child.organisation_name = contact.company_name ?? link.link_name
                                            frm.refresh_fields("hidden_details");
                                        }
                                        else {
                                            var child = cur_frm.add_child("hidden_details");
                                            child.email = contact.email_id
                                            child.id = link.link_name
                                            child.document = link.link_doctype
                                            child.first_name = contact.first_name
                                            child.mobile_no = contact.mobile_no ?? contact.phone
                                            child.organisation_name = contact.company_name ?? link.link_name
                                            frm.refresh_fields("hidden_details");
                                        }
                                    })
                                }


                            })

                    })
                }
                else {
                    frappe.db.get_list('Address', {
                        fields: ['name', 'email_id',
                            'phone'],
                        filters: {
                            // "first_name": ["like", "%" + frm.doc.first_name + "%"],
                            "email_id": ["=", frm.doc.email],
                        },
                    }).then(records => {
                        if (records.length > 0) {
                            $.each(records, function (i, address) {
                                frappe.db.get_doc('Address', address.name)
                                    .then(doc => {
                                        // $.each(doc.links, function (i, link) {
                                        //     if (link.link_doctype == "Customer") {
                                        var child = cur_frm.add_child("hidden_details");
                                        child.email = address.email_id
                                        child.id = link.link_name
                                        child.document = "Customer"
                                        child.first_name = link.link_name
                                        child.mobile_no = address.phone
                                        child.organisation_name = link.link_name
                                        frm.refresh_fields("hidden_details");
                                        //     }
                                        // })
                                        if (doc.links.length > 1) {
                                            $.each(doc.links, function (i, link) {
                                                if (link.link_doctype == "Customer") {
                                                    var child = cur_frm.add_child("hidden_details");
                                                    child.email = address.email_id
                                                    child.id = link.link_name
                                                    child.document = "Customer"
                                                    child.first_name = link.link_name
                                                    child.mobile_no = address.phone
                                                    child.organisation_name = link.link_name
                                                    frm.refresh_fields("hidden_details");
                                                }
                                            })
                                        }
                                        if (doc.links.length == 1) {
                                            $.each(doc.links, function (i, link) {
                                                if (link.link_doctype == "Customer") {
                                                    var child = cur_frm.add_child("hidden_details");
                                                    child.email = address.email_id
                                                    child.id = link.link_name
                                                    child.document = "Customer"
                                                    child.first_name = link.link_name
                                                    child.mobile_no = address.phone
                                                    child.organisation_name = link.link_name
                                                    frm.refresh_fields("hidden_details");
                                                }
                                                else {
                                                    var child = cur_frm.add_child("hidden_details");
                                                    child.email = address.email_id
                                                    child.id = link.link_name
                                                    child.document = "Customer"
                                                    child.first_name = link.link_name
                                                    child.mobile_no = address.phone
                                                    child.organisation_name = link.link_name
                                                    frm.refresh_fields("hidden_details");
                                                }
                                            })
                                        }
                                    })
                            })
                        }
                    })
                }
            })
        }
    },
    results:function(frm){
        var uniqueData = [];
        var seen = {};
        $.each(frm.doc.hidden_details, function(i, hidden){
            var key = hidden.document + hidden.id;
            if (!seen[key]) {
                seen[key] = true;
                uniqueData.push(hidden);
            }
        })
            $.each(uniqueData, function(i, unique){
            var child = frm.add_child("details");
            child.email = unique.email
            child.id = unique.id
            child.document = unique.document
            child.first_name = unique.first_name
            child.mobile_no = unique.mobile_no
            child.organisation_name = unique.organisation_name
            frm.refresh_fields("details");
            frm.clear_table("hidden_details");
            frm.refresh_fields("details");
            frm.set_value({ "organisation_name": "", "device_id": "", "first_name": "", "mobile_no": "", "email": "" })

        })
    }
})