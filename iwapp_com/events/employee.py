import frappe


def after_insert(doc, method):
    address=frappe.get_doc({
    'doctype': 'Address',
    'address_title': doc.first_name,
    'address_type':'Billing',
    'address_line1':doc.custom_address_line_1,
    'address_line2':doc.custom_address_line_2,
    'county':doc.custom_county,
    'city':doc.custom_citytown,
    'state':doc.custom_stateprovince,
    'country':doc.custom_country,
    'pincode':doc.custom_postal_code,
    'phone':doc.custom_phone,
    'custom_taluk':doc.custom_taluk,
    'custom_gstin':doc.custom_gstin,
    'custom_post_office':doc.custom_postal_office
    })
    if doc.prefered_email:
        address.email_id = doc.prefered_email
    address.append('links',
        {
            "link_doctype": "Employee",
            "link_name":doc.name

        })
    address.insert()
    address.save()
    frappe.db.set_value("Employee", doc.name, "custom_employee_primary_address", address.name)
    doc.reload()

    contact=frappe.get_doc({
    'doctype': 'Contact',
    'address': address.name,
    'first_name':doc.first_name,
    'middle_name':doc.middle_name,
    'last_name':doc.last_name,
    'salutation':doc.salutation,
    'designation':doc.designation,
    'gender':doc.gender,
    'company_name':doc.custom_organisation_name
    })
    contact.append('links',
        {
            "link_doctype": "Employee",
            "link_name":doc.name

        })
    if doc.prefered_email:
        contact.append("email_ids",{
                "email_id":doc.prefered_email,
                "is_primary":1
            })
    if doc.cell_number:
        contact.append("phone_nos",{
                "phone":doc.cell_number,
                "is_primary_mobile_no":1
            })
    if doc.custom_phone:
        contact.append("phone_nos",{
            "phone":doc.custom_phone,
            "is_primary_phone":1
        })
    contact.insert()
    contact.save()
    # frappe.db.set_value("Customer", doc.name, "custom_contact_created", 1)
    frappe.db.set_value("Employee", doc.name, "custom_employee_primary_contact", contact.name)
    doc.reload()