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
});