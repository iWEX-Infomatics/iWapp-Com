frappe.ui.form.on('Employee', {
    refresh: function (frm) {
        if (frm.doc.custom_employee_primary_address) {
            frappe.db.get_doc('Address', frm.doc.custom_employee_primary_address)
                .then(doc => {
                    frm.fields_dict.custom_address_html.html("");
                    var template1 = `
                <form>
                               <div class="frappe-control input-max-width" data-fieldtype="Float" data-fieldname="total_qty" title="total_qty">
                              <div class="form-group">
                                  <div class="clearfix">
                                     <label class="control-label" style="padding-right: 0px;"><b>${doc.name}</b></label>
                                       <span class="help"></span>
                                   </div>
                                   <div class="control-input-wrapper">
                                    <div class="control-input" style="display: none;"></div>
                                        <p class="help-box small text-muted">Address : ${doc.address_line1}</p>
                                        <p class="help-box small text-muted">Address 2 :${doc.address_line2}</p>
                                        <p class="help-box small text-muted">city : ${doc.city}</p>
                                        <p class="help-box small text-muted">County : ${doc.county}</p>
                                        <p class="help-box small text-muted">State : ${doc.state}</p>
                                        <p class="help-box small text-muted"> Pincode : ${doc.pincode}</p>
                                        <p class="help-box small text-muted"> Post Office : ${doc.custom_post_office}</p>
                                        <p class="help-box small text-muted"> Taluk : ${doc.custom_taluk}</p>
                                        <p class="help-box small text-muted"> GSTIN : ${doc.custom_gstin}</p>
                                        <p class="help-box small text-muted">Country : ${doc.country}</p>
                                  </div>
                                </div>
                            </div>
                            </div></form>
                `
                    frm.fields_dict.custom_address_html.html(template1);
                })
        }
        if (frm.doc.custom_employee_primary_contact) {
            frappe.db.get_doc('Contact', frm.doc.custom_employee_primary_contact)
                .then(doc => {
                    frm.fields_dict.custom_contact_html.html("");
                    var template1 = `
                <form>
                               <div class="frappe-control input-max-width" data-fieldtype="Float" data-fieldname="total_qty" title="total_qty">
                              <div class="form-group">
                                  <div class="clearfix">
                                     <label class="control-label" style="padding-right: 0px;"><b>${doc.first_name} - ${doc.designation}</b></label>
                                       <span class="help"></span>
                                   </div>
                                   <div class="control-input-wrapper">
                                    <div class="control-input" style="display: none;"></div>
                                        <p class="help-box small text-muted">Email : ${doc.email_id}</p>
                                        <p class="help-box small text-muted">Mobile : ${doc.mobile_no}</p>
                                        <p class="help-box small text-muted">phone : ${doc.phone}</p>
                                        <p class="help-box small text-muted">Company Name : ${doc.company_name}</p>
                                  </div>
                                </div>
                            </div>
                            </div></form>
                `
                    frm.fields_dict.custom_contact_html.html(template1);
                })
        }
    },
    custom_postal_code: function (frm) {
        if (frm.doc.custom_country == "India" && frm.doc.custom_postal_code) {
            frappe.db.exists('Pincode', frm.doc.custom_postal_code)
                .then(exists => {
                    if (exists) {
                        frappe.db.get_doc('Pincode', frm.doc.custom_postal_code)
                            .then(doc => {
                                if (doc) {
                                    frm.clear_table("custom_pincode_details")
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
                                                frm.set_value("custom_postal_office", values.post)

                                                d.hide();
                                            }
                                        });
                                        d.show();
                                    }
                                    else {
                                        frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "custom_county": "" })
                                    }
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
                                            frm.set_value("custom_postal_office", values.post)

                                            d.hide();
                                        }
                                    });
                                    d.show();
                                }
                                else {
                                    frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "custom_county": "" })
                                }


                            }
                        })
                    }
                })


        }
    }
});
