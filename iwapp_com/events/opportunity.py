import frappe
import re
import json


def before_insert(doc, method):
    if doc.custom_customerlead_found == 0:
        lead = frappe.get_doc({
            "doctype":"Lead",
            "first_name":doc.custom_first_name,
            "middle_name":doc.custom_middle_name,
            "last_name":doc.custom_last_name,
            "mobile_no":doc.custom_mobile,
            "email_id":doc.custom_email,
            "industry":doc.industry,
            "company_name":doc.custom_organization_name,
            "whatsapp_no":doc.custom_whatsapp,
            "salutation":doc.custom_salutation,
            "gender":doc.custom_gender,
            "job_title":doc.custom_job_title,
            "custom_door_building_street":doc.custom_door_building_street,
            "city":doc.city,
            "state":doc.state,
            "country":doc.country,
            "custom_zippostal_code":doc.custom_zippostal_code,
            "custom_post_office":doc.custom_post_office,
            "custom_districtcounty": doc.custom_districtcounty,
            "custom_taluk":doc.custom_taluk,
            "job_title":doc.custom_job_title,
            "custom_department":doc.custom_department
        }).insert()
        doc.opportunity_from = "Lead"
        doc.party_name = lead.name
def after_insert(doc, method):
    if (doc.opportunity_from and doc.party_name):
        frappe.db.set_value("Opportunity", doc.name, "custom_customerlead_found", 1)
        frappe.db.set_value("Opportunity", doc.name, "custom_opportunity_created", 1)
        doc.reload()
    if doc.custom_pincode_details:
        pincode=frappe.get_doc({
        'doctype': 'Pincode',
        'country': doc.country,
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

# def remove_suffixes_from_field(field_value, suffixes=None):
#     if suffixes is None:
#         suffixes = ["Pvt Ltd", "Ltd", "LLP", "Co Ltd"]

#     # Create a regular expression pattern for matching suffixes
#     pattern = r"\s*({})\s*$".format("|".join(map(re.escape, suffixes)))

#     # Remove matching suffixes from the field value
#     cleaned_value = re.sub(pattern, "", field_value)

#     return cleaned_value
def remove_suffixes_from_field(field_value, suffixes=None):
    if suffixes is None:
        suffixes = ["Pvt Ltd", "Ltd", "LLP", "Co Ltd"]

    # Create a regular expression pattern for matching suffixes
    pattern = r"\s*({})\s*$".format("|".join(map(re.escape, suffixes)))

    # Remove matching suffixes from the field value
    cleaned_value = re.sub(pattern, "", field_value)
    
    return cleaned_value  # Add this line to return the cleaned value

@frappe.whitelist()
def create_dummy_lead():
    dummy_exists = frappe.db.exists("Lead", {"first_name": "Dummy"})
    if dummy_exists:
        return dummy_exists
    else:
        dummy_create = frappe.get_doc({
            "doctype":"Lead",
            "first_name":"Dummy"
        }).insert()
        return dummy_create.name

@frappe.whitelist()
def get_cust_or_lead(email=None, mobile=None, organisation=None, first_name=None):
    cleaned_organization_name = remove_suffixes_from_field(str(organisation))
    mob_no = frappe.db.get_list('Contact',
        filters={
            'custom_mob': '',
            'custom_organisation_name': ''
        },
        fields=['company_name', 'mobile_no', 'name'],
        as_list=False
    )
    for mob in mob_no:
        mob_10_digits = mob.get('mobile_no')[-10:]
        org_name = remove_suffixes_from_field(str(mob.get('company_name')))  # Convert to string

        if mob.get('company_name') and mob_10_digits:
            frappe.db.set_value("Contact", mob.get('name'), {"custom_mob": mob_10_digits, "custom_organisation_name": org_name}, update_modified=False)

    last_10_digits = mobile[-10:] if mobile else ""
    opp_organisation_exists = frappe.db.exists("Contact", {"email_id": email, "custom_mob": last_10_digits, "custom_organisation_name": cleaned_organization_name})
    result = get_customer_or_lead_result(opp_organisation_exists)

    opp_firstname_exists = frappe.db.exists("Contact", {"email_id": email, "custom_mob": last_10_digits, "first_name": first_name})
    if not result and opp_firstname_exists:
        result = get_customer_or_lead_result(opp_firstname_exists)

    organisation_with_mob_exists = frappe.db.exists("Contact", {"custom_mob": last_10_digits, "custom_organisation_name": cleaned_organization_name})
    if not result and organisation_with_mob_exists:
        result = get_customer_or_lead_result(organisation_with_mob_exists)

    organisation_with_mail_exists = frappe.db.exists("Contact", {"email_id": email, "custom_organisation_name": cleaned_organization_name})
    if not result and organisation_with_mail_exists:
        result = get_customer_or_lead_result(organisation_with_mail_exists)

    firstname_with_mob_exists = frappe.db.exists("Contact", {"custom_mob": last_10_digits, "first_name": first_name})
    if not result and firstname_with_mob_exists:
        result = get_customer_or_lead_result(firstname_with_mob_exists)

    firstname_with_mail_exists = frappe.db.exists("Contact", {"email_id": email, "first_name": first_name})
    if not result and firstname_with_mail_exists:
        result = get_customer_or_lead_result(firstname_with_mail_exists)
    
    email_with_mob_exists = frappe.db.exists("Contact", {"email_id": email, "custom_mob": last_10_digits})
    if not result and email_with_mob_exists:
        result = get_customer_or_lead_result(email_with_mob_exists)
    
    only_org_exists = frappe.db.exists("Contact", {"custom_organisation_name": cleaned_organization_name})
    if not result and only_org_exists:
        result = get_customer_or_lead_result(only_org_exists)
    
    only_mob_exists = frappe.db.exists("Contact", {"custom_organisation_name": cleaned_organization_name})
    if not result and only_org_exists:
        result = get_customer_or_lead_result(only_org_exists)
    
    only_email_exists = frappe.db.exists("Contact", {"email_id": email})
    if not result and only_email_exists:
        result = get_customer_or_lead_result(only_email_exists)
    
    only_first_name_exists = frappe.db.exists("Contact", {"first_name": first_name})
    if not result and only_first_name_exists:
        result = get_customer_or_lead_result(only_first_name_exists)
    return result

def get_customer_or_lead_result(parent_exists):
    if parent_exists:
        organisation = frappe.db.get_all('Dynamic Link',
            filters={
                'parent': parent_exists
            },
            fields=['link_doctype', 'link_name'],
            as_list=False
        )
        if organisation:
            customer_result, lead_result = None, None

            for i in organisation:
                if "Customer" in i.get('link_doctype'):
                    customer_result = (i.get('link_doctype'), i.get('link_name'))
                    break
                elif "Lead" in i.get('link_doctype'):
                    lead_result = (i.get('link_doctype'), i.get('link_name'))

            return customer_result or lead_result
    return None



