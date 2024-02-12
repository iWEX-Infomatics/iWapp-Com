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

def remove_suffixes_from_field(field_value, suffixes=None):
    if suffixes is None:
        suffixes = ["Pvt Ltd", "Ltd", "LLP", "Co Ltd"]

    # Create a regular expression pattern for matching suffixes
    pattern = r"\s*({})\s*$".format("|".join(map(re.escape, suffixes)))

    # Remove matching suffixes from the field value
    cleaned_value = re.sub(pattern, "", field_value)

    return cleaned_value
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
def get_cust_or_lead(email, mobile, organisation, first_name):
    # put filters to hidden fields in Contact for setting mob no(last10 digits) ang company name(remove suffix)
    mob_no = frappe.db.get_list('Contact',
    filters={
        'custom_mob': ['=', ''],
        'custom_organisation_name':['=', '']
    },
    fields=['company_name', 'mobile_no', 'name'],
    as_list=False
    )
    cleaned_organization_name = remove_suffixes_from_field(organisation)
    for mob in mob_no:
        mob_10_digits = mob.get('mobile_no')[-10:]
        org_name = ""
        if mob.get('company_name') != None and mob_10_digits:
            org_name = remove_suffixes_from_field(mob.get('company_name'))
            frappe.db.set_value("Contact", mob.get('name'), {"custom_mob": mob_10_digits, "custom_organisation_name":org_name}, update_modified=False)
        # if mob_10_digits and org_name:
            # frappe.db.set_value("Contact", mob.get('name'), {"custom_mob": mob_10_digits, "custom_organisation_name":org_name}, update_modified=False)
    last_10_digits = mobile[-10:]
    opp_organisation_exists = frappe.db.exists("Contact", {"email_id": email, "custom_mob": last_10_digits, "custom_organisation_name":cleaned_organization_name})
    if opp_organisation_exists:
        organisation = frappe.db.get_all('Dynamic Link',
            filters={
                'parent': opp_organisation_exists
            },
            fields=['link_doctype', 'link_name'],
            as_list=False
        )
        if organisation:
            if len(organisation) > 1:
                for i in organisation:
                    if i.get('link_doctype') == "Customer":
                        # self.party_type = i.get('link_doctype')
                        # self.party_name = i.get('link_name')
                        return i.get('link_doctype'), i.get('link_name')
            if len(organisation) == 1:
                for i in organisation:
                    if i.get('link_doctype') == "Customer":
                        # self.party_type = i.get('link_doctype')
                        # self.party_name = i.get('link_name')
                        return i.get('link_doctype'), i.get('link_name')
                    else:
                        # self.party_type = i.get('link_doctype')
                        # self.party_name = i.get('link_name')
                        return i.get('link_doctype'), i.get('link_name')
    if not opp_organisation_exists:
        # self.party_type = ""
        # self.party_name = ""
        opp_firstname_exists = frappe.db.exists("Contact", {"email_id": email, "custom_mob": last_10_digits, "first_name":first_name})
        if opp_firstname_exists:
            contact = frappe.get_doc("Contact", opp_firstname_exists)
            # if contact.middle_name == self.middle_name or contact.middle_name == self.last_name:
            firstname = frappe.db.get_all('Dynamic Link',
            filters={
                'parent': opp_firstname_exists
            },
            fields=['link_doctype', 'link_name'],
            as_list=False
            )
            if firstname:
                if len(firstname) > 1:
                    for i in firstname:
                        if i.get('link_doctype') == "Customer":
                            # self.party_type = i.get('link_doctype')
                            # self.party_name = i.get('link_name')
                            return i.get('link_doctype'), i.get('link_name')
                if len(firstname) == 1:
                    for i in firstname:
                        if i.get('link_doctype') == "Customer":
                            # self.party_type = i.get('link_doctype')
                            # self.party_name = i.get('link_name')
                            return i.get('link_doctype'), i.get('link_name')
                        else:
                            # self.party_type = i.get('link_doctype')
                            # self.party_name = i.get('link_name')
                            return i.get('link_doctype'), i.get('link_name')
            # else:
            #     firstname = frappe.db.get_all('Dynamic Link',
            #     filters={
            #         'parent': opp_firstname_exists
            #     },
            #     fields=['link_doctype', 'link_name'],
            #     as_list=False
            #     )
            #     if firstname:
            #         if len(firstname) > 1:
            #             for i in firstname:
            #                 if i.get('link_doctype') == "Customer":
            #                     self.party_type = i.get('link_doctype')
            #                     self.party_name = i.get('link_name')
            #         if len(firstname) == 1:
            #             for i in firstname:
            #                 if i.get('link_doctype') == "Customer":
            #                     self.party_type = i.get('link_doctype')
            #                     self.party_name = i.get('link_name')
            #                 else:
            #                     self.party_type = i.get('link_doctype')
            #                     self.party_name = i.get('link_name')



