frappe.ui.form.on('Employee', {
    refresh: function (frm) {
        // if (frm.doc.custom_employee_primary_address) {
        frm.fields_dict.custom_address_html.html("");
        var template1 = `
                <form>
                            <div class="frappe-control input-max-width" data-fieldtype="Float" data-fieldname="total_qty" title="total_qty">
                              <div class="form-group">
                                  <div class="clearfix">
                                     <label class="control-label" style="padding-right: 0px;"><b>Current Address</b></label>
                                       <span class="help"></span>
                                   </div>
                                   <div class="control-input-wrapper">
                                   <div class="control-input" style="display: none;"></div>
                                   <p class="help-box small text-muted">Address : ${frm.doc.custom_address_line_1}, ${frm.doc.custom_citytown}, 
                                   ${frm.doc.custom_postal_office}, ${frm.doc.custom_taluk}, ${frm.doc.custom_county}, ${frm.doc.custom_stateprovince}, 
                                   ${frm.doc.custom_country} - ${frm.doc.custom_postal_code}</p>
                                   <p class="help-box small text-muted">Address is : ${frm.doc.current_accommodation_type}</p>
                                </div>
                                </div>
                            </div>
                            </div></form>
                `
        frm.fields_dict.custom_address_html.html(template1);

        frm.fields_dict.custom_permanent_address_html.html("");
        var template2 = `
                <form>
                               <div class="frappe-control input-max-width" data-fieldtype="Float" data-fieldname="total_qty" title="total_qty">
                              <div class="form-group">
                                  <div class="clearfix">
                                     <label class="control-label" style="padding-right: 0px;"><b>Permanent Address</b></label>
                                       <span class="help"></span>
                                   </div>
                                   <div class="control-input-wrapper">
                                   <div class="control-input" style="display: none;"></div>
                                   <p class="help-box small text-muted">Address : ${frm.doc.custom_permanent_door_building_street}, ${frm.doc.custom_permanent_citytown} 
                                   ${frm.doc.custom_permanent_post_office}, ${frm.doc.custom_permanent_taluk}, 
                                   ${frm.doc.custom_permanent_districtcounty}, ${frm.doc.custom_permanent_stateprovince}, 
                                   ${frm.doc.custom_permanent_country} - ${frm.doc.custom_permanent_postal_code}</p>
                                   <p class="help-box small text-muted">Address is : ${frm.doc.permanent_accommodation_type}</p>
                                </div>
                                </div>
                            </div>
                            </div></form>
                `
        frm.fields_dict.custom_permanent_address_html.html(template2);
        // }
        // if (frm.doc.custom_employee_primary_contact) {
        //     frappe.db.get_doc('Contact', frm.doc.custom_employee_primary_contact)
        //         .then(doc => {
        //             frm.fields_dict.custom_contact_html.html("");
        //             var template1 = `
        //         <form>
        //                        <div class="frappe-control input-max-width" data-fieldtype="Float" data-fieldname="total_qty" title="total_qty">
        //                       <div class="form-group">
        //                           <div class="clearfix">
        //                              <label class="control-label" style="padding-right: 0px;"><b>${doc.first_name} - ${doc.designation}</b></label>
        //                                <span class="help"></span>
        //                            </div>
        //                            <div class="control-input-wrapper">
        //                             <div class="control-input" style="display: none;"></div>
        //                                 <p class="help-box small text-muted">Email : ${doc.email_id}</p>
        //                                 <p class="help-box small text-muted">Mobile : ${doc.mobile_no}</p>
        //                                 <p class="help-box small text-muted">phone : ${doc.phone}</p>
        //                                 <p class="help-box small text-muted">Company Name : ${doc.company_name}</p>
        //                           </div>
        //                         </div>
        //                     </div>
        //                     </div></form>
        //         `
        //             frm.fields_dict.custom_contact_html.html(template1);
        //         })
        // }
    },
    custom_postal_code: function (frm) {
        frm.clear_table("custom_pincode_details")
        frm.refresh_fields("custom_pincode_details");
        if (frm.doc.custom_country == "India" && frm.doc.custom_postal_code) {
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
                                            frm.set_value("custom_postal_office", values.post)

                                            d.hide();
                                        }
                                    });
                                    d.show();
                                }
                                else {
                                    frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "custom_county": "", "custom_postal_office": "" })
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
                                    frm.set_value({ "custom_stateprovince": "", "custom_taluk": "", "custom_county": "", "custom_postal_office": "" })
                                }
                            }
                        })
                    }
                })
        }
    },
    custom_permanent_postal_code: function (frm) {
        frm.clear_table("custom_permanent_pincode_details")
        frm.refresh_fields("custom_permanent_pincode_details");
        if (frm.doc.custom_permanent_country == "India" && frm.doc.custom_permanent_postal_code && frm.doc.custom_same_as_current_address == 0) {
            frappe.db.exists('Pincode', frm.doc.custom_permanent_postal_code)
                .then(exists => {
                    if (exists) {
                        frappe.db.get_doc('Pincode', frm.doc.custom_permanent_postal_code)
                            .then(doc => {
                                if (doc) {
                                    frm.clear_table("custom_permanent_pincode_details")
                                    if (doc.pincode_details) {
                                        $.each(doc.pincode_details, function (i, pin) {
                                            frm.set_value({ "custom_permanent_stateprovince": pin.state, "custom_permanent_taluk": pin.taluk, "custom_permanent_districtcounty": pin.district, "custom_permanent_post_office": "" })
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
                                                frm.set_value("custom_permanent_post_office", values.post)

                                                d.hide();
                                            }
                                        });
                                        d.show();
                                    }
                                    else {
                                        frm.set_value({ "custom_permanent_stateprovince": "", "custom_permanent_taluk": "", "custom_permanent_districtcounty": "", "custom_permanent_post_office": "" })
                                    }
                                }
                            })
                    }
                    else {
                        frappe.call({
                            method: 'iwapp_com.events.employee.pincode',
                            args: {
                                pin: frm.doc.custom_permanent_postal_code
                            },
                            callback: function (r) {
                                if (r.message) {
                                    frm.clear_table("custom_permanent_pincode_details")
                                    $.each(r.message, function (i, pin) {
                                        frm.set_value({ "custom_permanent_stateprovince": pin.State, "custom_permanent_taluk": pin.Block, "custom_permanent_districtcounty": pin.District })
                                        var child = cur_frm.add_child("custom_permanent_pincode_details");
                                        child.post_office = pin.Name
                                        child.taluk = pin.Block
                                        child.division = pin.Division
                                        child.district = pin.District
                                        child.state = pin.State
                                        frm.refresh_fields("custom_permanent_pincode_details");
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
                                            frm.set_value("custom_permanent_post_office", values.post)

                                            d.hide();
                                        }
                                    });
                                    d.show();
                                }
                                else {
                                    frm.set_value({ "custom_permanent_stateprovince": "", "custom_permanent_taluk": "", "custom_permanent_districtcounty": "", "custom_permanent_post_office": "" })
                                }
                            }
                        })
                    }
                })
        }
    },
    custom_same_as_current_address: function (frm) {
        frm.set_value({ "custom_permanent_country": "", "custom_permanent_postal_code": "", "custom_permanent_door_building_street": "", "custom_permanent_citytown": "", "custom_permanent_stateprovince": "", "custom_permanent_post_office": "", "custom_permanent_taluk": "", "custom_permanent_districtcounty": "" })
        if (frm.doc.custom_same_as_current_address == 1) {
            frm.set_value({
                "custom_permanent_country": frm.doc.custom_country, "custom_permanent_postal_code": frm.doc.custom_postal_code, "custom_permanent_door_building_street": frm.doc.custom_address_line_1, "custom_permanent_citytown": frm.doc.custom_citytown, "custom_permanent_stateprovince": frm.doc.custom_stateprovince, "custom_permanent_post_office": frm.doc.custom_postal_office,
                "custom_permanent_taluk": frm.doc.custom_taluk, "custom_permanent_districtcounty": frm.doc.custom_county, "permanent_accommodation_type": frm.doc.current_accommodation_type
            })
        }
    }
});
