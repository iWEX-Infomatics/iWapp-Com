import frappe
import datetime

def after_insert(doc, method):
    if doc.custom_is_from_lead == 0:
        address=frappe.get_doc({
        'doctype': 'Address',
        'address_title': doc.customer_name,
        'address_type':'Billing',
        'address_line1':doc.custom_address_line_1,
        'county':doc.custom_county,
        'city':doc.custom_citytown,
        'state':doc.custom_stateprovince,
        'country':doc.custom_country,
        'pincode':doc.custom_postal_code,
        'email_id':doc.custom_email,
        'custom_taluk':doc.custom_taluk,
        'custom_post_office':doc.custom_post_office,
        'tax_category':doc.tax_category,
        'gstin':doc.tax_id if doc.tax_id else "",
        'is_primary_address':1,
        'is_shipping_address':1
        })
        address.append('links',
            {
                "link_doctype": "Customer",
                "link_name":doc.name

            })
        address.insert()
        address.save()
        frappe.db.set_value("Customer", doc.name, "custom_address_created", 1)
        frappe.db.set_value("Customer", doc.name, "customer_primary_address", address.name)
        doc.reload()
    else:
        lead_address = frappe.db.get_value("Dynamic Link", {"link_doctype":"Lead", "link_name":doc.lead_name, "parenttype":"Address"}, "parent")
        if lead_address:
            doc.customer_primary_address = lead_address
            # doc.save()
    if doc.custom_is_from_lead == 0:
        contact=frappe.get_doc({
        'doctype': 'Contact',
        'address': doc.customer_primary_address,
        'first_name':doc.custom_first_name,
        'middle_name':doc.custom_middle_name,
        'last_name':doc.custom_last_name,
        'salutation':doc.salutation,
        'designation':doc.custom_designation,
        'gender':doc.gender,
        'is_primary_contact':1,
        'is_billing_contact':1,
        'company_name':doc.name if doc.customer_type == "Company" else ""
        })
        contact.append('links',
            {
                "link_doctype": "Customer",
                "link_name":doc.name

            })
        contact.append("email_ids",{
                "email_id":doc.custom_email,
                "is_primary":1
            })
        contact.append("phone_nos",{
                "phone":doc.custom_mobile_no,
                "is_primary_mobile_no":1
            })
        contact.insert()
        contact.save()
        frappe.db.set_value("Customer", doc.name, "custom_contact_created", 1)
        frappe.db.set_value("Customer", doc.name, "customer_primary_contact", contact.name)
        doc.reload()
    else:
        lead_contact = frappe.db.get_value("Dynamic Link", {"link_doctype":"Lead", "link_name":doc.lead_name, "parenttype":"Contact"}, "parent")
        if lead_contact:
            doc.customer_primary_contact = lead_contact
            # doc.save()

    if doc.custom_pincode_details:
        pincode=frappe.get_doc({
        'doctype': 'Pincode',
        'country': doc.custom_country,
        'pincode':doc.custom_postal_code
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
