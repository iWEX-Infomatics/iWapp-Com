import frappe

def after_insert(doc, method):
    frappe.db.set_value("Quotation", doc.name, "custom_opportunity_saved", 1)
    doc.reload()
    if doc.custom_pincode_details:
        pincode=frappe.get_doc({
        'doctype': 'Pincode',
        'country': doc.custom_country,
        'pincode':doc.custom_zippostal_code
        })
        for i in doc.custom_pincode_details:
            pincode.append('pincode_details',
        {
            "post_office": i.post_office,
            "taluk":i.taluk,
            "division":i.division,
            "district":i.district,
            "state":i.state
        })
        pincode.insert()
        pincode.save()
        doc.reload()
def before_submit(doc, method):
    address_name = frappe.db.get_value("Dynamic Link", {"link_doctype":doc.quotation_to, "link_name":doc.party_name, "parenttype":"Address"}, "parent")
    if address_name:
        frappe.db.set_value("Address", address_name, {
            'custom_gstin': doc.custom_tax_id,
            'address_line1':doc.custom_door_building_street,
            'county':doc.custom_districtcounty,
            'city':doc.custom_citytown,
            'state':doc.custom_stateprovince,
            'country':doc.custom_country,
            'pincode':doc.custom_zippostal_code,
            'custom_post_office':doc.custom_post_office,
            'custom_taluk':doc.custom_taluk,
            'email_id':doc.custom_email,
            'is_primary_address':1,
            'is_shipping_address':1,
            'custom_gst_category':doc.custom_gst_category,
            'custom_gstin':doc.custom_tax_id
        })
    else:
        address=frappe.get_doc({
        'doctype': 'Address',
        'address_title': doc.custom_first_name,
        'address_type':'Billing',
        'address_line1':doc.custom_door_building_street,
        'county':doc.custom_districtcounty,
        'city':doc.custom_citytown,
        'state':doc.custom_stateprovince,
        'country':doc.custom_country,
        'pincode':doc.custom_zippostal_code,
        'custom_post_office':doc.custom_post_office,
        'custom_taluk':doc.custom_taluk,
        'email_id':doc.custom_email,
        'is_primary_address':1,
        'is_shipping_address':1,
        'custom_gst_category':doc.custom_gst_category,
        'custom_gstin':doc.custom_tax_id
        })
        address.append('links',
            {
                "link_doctype": doc.quotation_to,
                "link_name":doc.party_name

            })
        address.insert()
        address.save()
    
    contact_name = frappe.db.get_value("Dynamic Link", {"link_doctype":doc.quotation_to, "link_name":doc.party_name, "parenttype":"Contact"}, "parent")
    if contact_name:
        contact = frappe.get_doc("Contact", contact_name)
        contact.first_name = doc.custom_first_name
        contact.middle_name = doc.custom_middle_name
        contact.last_name = doc.custom_last_name
        contact.designation = doc.custom_designation
        contact.gender = doc.custom_gender
        contact.company_name = doc.custom_company_name
        contact.salutation = doc.custom_salutation
        contact.address = address_name
        contact.department = doc.custom_department
        contact.is_primary_contact = 1
        contact.is_billing_contact = 1
        contact.email_ids.clear()
        contact.append("email_ids",{
            "email_id":doc.custom_email,
            "is_primary":1
        })
        contact.phone_nos.clear()
        contact.append("phone_nos",{
            "phone":doc.custom_mobile,
            "is_primary_mobile_no":1
        })
        # contact.append("phone_nos",{
        #     "phone":doc.phone,
        #     "is_primary_phone":1
        # })
        contact.save()        
