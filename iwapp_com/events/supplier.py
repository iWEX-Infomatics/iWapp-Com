import frappe


def after_insert(doc, method):
    address=frappe.get_doc({
    'doctype': 'Address',
    'address_title': doc.supplier_name,
    'address_type':'Billing',
    'address_line1':doc.custom_address_line_1,
    'address_line2':doc.custom_address_line_2,
    'county':doc.custom_county,
    'city':doc.custom_citytown,
    'state':doc.custom_stateprovince,
    'country':doc.country,
    'pincode':doc.custom_postal_code,
    'phone':doc.custom_phone,
    'email_id':doc.custom_email,
    'custom_taluk':doc.custom_taluk,
    'custom_gstin':doc.custom_gstin,
    'custom_post_office':doc.custom_post_office
    })
    address.append('links',
        {
            "link_doctype": "Supplier",
            "link_name":doc.name

        })
    address.insert()
    address.save()
    frappe.db.set_value("Supplier", doc.name, "supplier_primary_address", address.name)
    doc.reload()

    contact=frappe.get_doc({
    'doctype': 'Contact',
    'address': doc.supplier_primary_address,
    'first_name':doc.custom_first_name,
    'middle_name':doc.custom_middle_name,
    'last_name':doc.custom_last_name,
    'salutation':doc.custom_salutation,
    'designation':doc.custom_designation,
    'gender':doc.custom_gender,
    'company_name':doc.custom_organisation_name
    })
    contact.append('links',
        {
            "link_doctype": "Supplier",
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
    if doc.custom_phone:
        contact.append("phone_nos",{
            "phone":doc.custom_phone,
            "is_primary_phone":1
        })
    contact.insert()
    contact.save()
    frappe.db.set_value("Supplier", doc.name, "supplier_primary_contact", contact.name)
    doc.reload()