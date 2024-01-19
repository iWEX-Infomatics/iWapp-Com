import frappe


def after_insert(doc, method):
    contact = frappe.db.get_value("Dynamic Link", {"link_doctype":"Lead", "link_name":doc.name, "link_title":doc.title}, "parent")
    if contact:
        frappe.db.set_value("Lead", doc.name, "custom_contact", contact)
        # create_address(doc,method)
    frappe.db.set_value("Lead", doc.name, "custom_lead_created", 1)
    doc.reload()
    # frappe.db.set_value("Lead", doc.name, "custom_address_created", 1)
    # doc.reload()

    # if doc.custom_address_created == 0:
    #     if doc.company_name:
    #         address=frappe.get_doc({
    #         'doctype': 'Address',
    #         'address_title': doc.company_name if doc.company_name else doc.lead_name,
    #         'address_type':'Billing',
    #         'address_line1':doc.custom_address_line_1 if doc.custom_address_line_1 else "",
    #         'address_line2':doc.custom_address_line_2,
    #         'county':doc.custom_county,
    #         'city':doc.city,
    #         'state':doc.state,
    #         'country':doc.country,
    #         'pincode':doc.custom_postal_code
    #         })
    #         address.append('links',
    #             {
    #                 "link_doctype": "Lead",
    #                 "link_name":doc.name

    #             })
    #         address.insert()
    #         address.save()
    #         frappe.db.set_value("Lead", doc.name, "custom_address_created", 1)
    #         doc.reload() 

def validate(doc, method):
    if doc.company_name:
        if doc.mobile_no:
            cust_exits = frappe.db.exists("Customer", {"name":doc.company_name, "mobile_no":doc.mobile_no})
            if cust_exits:
                frappe.throw("A Customer exists with the Organisation Name and Mobile No.")
    else:
        if doc.mobile_no:
            cust_exits = frappe.db.exists("Customer", {"name":doc.lead_name, "mobile_no":doc.mobile_no})
            if cust_exits:
                frappe.throw("A Customer exists with the Same Name and Mobile No.")
    if doc.custom_lead_created == 1:
        if doc.custom_address_created == 0:
            if doc.company_name:
                address=frappe.get_doc({
                'doctype': 'Address',
                'address_title': doc.company_name if doc.company_name else doc.lead_name,
                'address_type':'Billing',
                'address_line1':doc.custom_address_line_1 if doc.custom_address_line_1 else "",
                'address_line2':doc.custom_address_line_2,
                'county':doc.custom_county,
                'city':doc.city,
                'state':doc.state,
                'country':doc.country,
                'pincode':doc.custom_postal_code,
                'email_id':doc.email_id,
                'phone':doc.phone
                })
                address.append('links',
                    {
                        "link_doctype": "Lead",
                        "link_name":doc.name

                    })
                address.insert()
                address.save()
                doc.custom_address_created = 1
                doc.custom_address = address.name
                frappe.db.set_value("Lead", doc.name, "custom_address_created", 1)
                frappe.db.set_value("Lead", doc.name, "custom_address", address.name)
                print(address.name)
                # doc.reload()

        contact = frappe.get_doc("Contact", doc.custom_contact)
        contact.first_name = doc.first_name
        contact.middle_name = doc.middle_name
        contact.last_name = doc.last_name
        contact.designation = doc.job_title
        contact.gender = doc.gender
        contact.company_name = doc.company_name
        contact.salutation = doc.salutation
        contact.address = doc.custom_address
        address = frappe.db.get_value("Dynamic Link", {"link_doctype":"Lead", "link_name":doc.name, "link_title":doc.title, "parenttype":"Address"}, "parent")
        # contact.address = frappe.db.get_value("Dynamic Link", {"link_doctype":"Lead", "link_name":doc.name, "link_title":doc.title, "parenttype":"Address"}, "parent")
        print("address", address)
        contact.email_ids.clear()
        contact.append("email_ids",{
            "email_id":doc.email_id,
            "is_primary":1
        })
        contact.phone_nos.clear()
        contact.append("phone_nos",{
            "phone":doc.mobile_no,
            "is_primary_mobile_no":1
        })
        contact.append("phone_nos",{
            "phone":doc.phone,
            "is_primary_phone":1
        })
        contact.save()


def create_address(doc,method):
    if doc.custom_address_created == 0:
        if doc.company_name:
            address=frappe.get_doc({
            'doctype': 'Address',
            'address_title': doc.company_name if doc.company_name else doc.lead_name,
            'address_type':'Billing',
            'address_line1':doc.custom_address_line_1 if doc.custom_address_line_1 else "",
            'address_line2':doc.custom_address_line_2,
            'county':doc.custom_county,
            'city':doc.city,
            'state':doc.state,
            'country':doc.country,
            'pincode':doc.custom_postal_code
            })
            address.append('links',
                {
                    "link_doctype": "Lead",
                    "link_name":doc.name

                })
            address.insert()
            address.save()
            frappe.db.set_value("Lead", doc.name, "custom_address_created", 1)
            doc.reload()
