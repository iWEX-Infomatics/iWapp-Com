import frappe
import requests
import json


def after_insert(doc, method):
    frappe.db.set_value("Employee", doc.name, "custom_address_created", 1)
    doc.reload()
    # if doc.custom_same_as_current_address == 1:
    #     c_address=frappe.get_doc({
    #     'doctype': 'Address',
    #     'address_title': doc.first_name,
    #     'address_type':'Current',
    #     'address_line1':doc.custom_address_line_1,
    #     'county':doc.custom_county,
    #     'city':doc.custom_citytown,
    #     'state':doc.custom_stateprovince,
    #     'country':doc.custom_country,
    #     'pincode':doc.custom_postal_code,
    #     'custom_taluk':doc.custom_taluk,
    #     'custom_post_office':doc.custom_postal_office,
    #     'email_id':doc.prefered_email
    #     })
    #     if doc.prefered_email:
    #         c_address.email_id = doc.prefered_email
    #     c_address.append('links',
    #         {
    #             "link_doctype": "Employee",
    #             "link_name":doc.name

    #         })
    #     c_address.insert()
    #     c_address.save()
    #     frappe.db.set_value("Employee", doc.name, "custom_employee_primary_address", c_address.name)
    #     doc.reload()
    # else:
    #     c_address=frappe.get_doc({
    #     'doctype': 'Address',
    #     'address_title': doc.employee_name,
    #     'address_type':'Current',
    #     'address_line1':doc.custom_address_line_1,
    #     'county':doc.custom_county,
    #     'city':doc.custom_citytown,
    #     'state':doc.custom_stateprovince,
    #     'country':doc.custom_country,
    #     'pincode':doc.custom_postal_code,
    #     'custom_taluk':doc.custom_taluk,
    #     'custom_post_office':doc.custom_postal_office,
    #     'email_id':doc.prefered_email
    #     })
    #     c_address.append('links',
    #         {
    #             "link_doctype": "Employee",
    #             "link_name":doc.name

    #         })
    #     c_address.insert()
    #     c_address.save()
    #     frappe.db.set_value("Employee", doc.name, "custom_employee_primary_address", c_address.name)
    #     doc.reload()

    #     p_address=frappe.get_doc({
    #     'doctype': 'Address',
    #     'address_title': doc.employee_name,
    #     'address_type':'Permanent',
    #     'address_line1':doc.custom_permanent_door_building_street,
    #     'county':doc.custom_permanent_districtcounty,
    #     'city':doc.custom_permanent_citytown,
    #     'state':doc.custom_stateprovince,
    #     'country':doc.custom_permanent_country,
    #     'pincode':doc.custom_permanent_postal_code,
    #     'custom_taluk':doc.custom_permanent_taluk,
    #     'custom_post_office':doc.custom_permanent_post_office,
    #     'email_id':doc.prefered_email
    #     })
    #     p_address.append('links',
    #         {
    #             "link_doctype": "Employee",
    #             "link_name":doc.name

    #         })
    #     p_address.insert()
    #     p_address.save()
    #     doc.reload()

    # contact=frappe.get_doc({
    # 'doctype': 'Contact',
    # 'address': c_address.name,
    # 'first_name':doc.first_name,
    # 'middle_name':doc.middle_name,
    # 'last_name':doc.last_name,
    # 'salutation':doc.salutation,
    # 'designation':doc.designation,
    # 'gender':doc.gender,
    # })
    # contact.append('links',
    #     {
    #         "link_doctype": "Employee",
    #         "link_name":doc.name

    #     })
    # if doc.prefered_email:
    #     contact.append("email_ids",{
    #             "email_id":doc.prefered_email,
    #             "is_primary":1
    #         })
    # if doc.cell_number:
    #     contact.append("phone_nos",{
    #             "phone":doc.cell_number,
    #             "is_primary_mobile_no":1
    #         })
    # contact.insert()
    # contact.save()
    # frappe.db.set_value("Employee", doc.name, "custom_employee_primary_contact", contact.name)
    # doc.reload()

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
    if doc.custom_permanent_pincode_details:
        per_pincode=frappe.get_doc({
        'doctype': 'Pincode',
        'country': doc.custom_country,
        'pincode':doc.custom_permanent_postal_code
        })
        for i in doc.custom_permanent_pincode_details:
            per_pincode.append('pincode_details',
        {
            "post_office": i.post_office,
            "taluk":i.taluk,
            "division":i.division,
            "district":i.district,
            "state":i.state
        })
        per_pincode.insert()
        per_pincode.save()
        doc.reload()

@frappe.whitelist()
def pincode(pin):
    if pin and len(pin)==6:
        api=f'https://api.postalpincode.in/pincode/{pin}'
        response = requests.get(api)
        if response:
            pincode = response.text
            pincode_list = json.loads(pincode)
            for i in pincode_list:
                return i.get('PostOffice')
