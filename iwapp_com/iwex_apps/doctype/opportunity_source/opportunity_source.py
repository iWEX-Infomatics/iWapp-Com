# # Copyright (c) 2024, iWEX and contributors
# # For license information, please see license.txt
import re
import frappe
from frappe.model.document import Document


class OpportunitySource(Document):
	pass
# @frappe.whitelist()
# def get_lead_or_cust(first_name = None, org_name =None):
# 	if org_name:
# 		org = frappe.db.get_list('Customer', ['name', 'custom_email',
#                     'custom_first_name', 'custom_mobile_no', 'custom_organisation_name', 'email_id', 'mobile_no'],
# 					filters={
# 					'name': ['like', '%' + org_name + '%'],
# 		},
# 		)
# 		return org

# 	def validate(self):
# 		mob_no = frappe.db.get_list('Contact',
# 			filters={
# 				'custom_mob': ['=', ''],
# 				'custom_organisation_name':['=', '']
# 			},
# 			fields=['company_name', 'mobile_no', 'name'],
# 			as_list=False
# 		)
# 		cleaned_organization_name = remove_suffixes_from_field(self.organisation_name)
# 		for mob in mob_no:
# 			mob_10_digits = mob.get('mobile_no')[-10:]
# 			if mob.get('company_name') != None:
# 				org_name = remove_suffixes_from_field(mob.get('company_name'))
# 			if mob_10_digits and org_name:
# 				frappe.db.set_value("Contact", mob.get('name'), {"custom_mob": mob_10_digits, "custom_organisation_name":org_name}, update_modified=False)
# 		last_10_digits = self.mobile_no[-10:]
# 		opp_organisation_exists = frappe.db.exists("Contact", {"email_id": self.email, "custom_mob": last_10_digits, "custom_organisation_name":cleaned_organization_name})
# 		if opp_organisation_exists:
# 			organisation = frappe.db.get_all('Dynamic Link',
# 				filters={
# 					'parent': opp_organisation_exists
# 				},
# 				fields=['link_doctype', 'link_name'],
# 				as_list=False
# 			)
# 			if organisation:
# 				if len(organisation) > 1:
# 					for i in organisation:
# 						if i.get('link_doctype') == "Customer":
# 							self.party_type = i.get('link_doctype')
# 							self.party_name = i.get('link_name')
# 				if len(organisation) == 1:
# 					for i in organisation:
# 						if i.get('link_doctype') == "Customer":
# 							self.party_type = i.get('link_doctype')
# 							self.party_name = i.get('link_name')
# 						else:
# 							self.party_type = i.get('link_doctype')
# 							self.party_name = i.get('link_name')
# 		if not opp_organisation_exists:
# 			self.party_type = ""
# 			self.party_name = ""
# 			opp_firstname_exists = frappe.db.exists("Contact", {"email_id": self.email, "custom_mob": last_10_digits, "first_name":self.first_name})
# 			if opp_firstname_exists:
# 				contact = frappe.get_doc("Contact", opp_firstname_exists)
# 				if contact.middle_name == self.middle_name or contact.middle_name == self.last_name:
# 					firstname = frappe.db.get_all('Dynamic Link',
# 					filters={
# 						'parent': opp_firstname_exists
# 					},
# 					fields=['link_doctype', 'link_name'],
# 					as_list=False
# 					)
# 					if firstname:
# 						if len(firstname) > 1:
# 							for i in firstname:
# 								if i.get('link_doctype') == "Customer":
# 									self.party_type = i.get('link_doctype')
# 									self.party_name = i.get('link_name')
# 						if len(firstname) == 1:
# 							for i in firstname:
# 								if i.get('link_doctype') == "Customer":
# 									self.party_type = i.get('link_doctype')
# 									self.party_name = i.get('link_name')
# 								else:
# 									self.party_type = i.get('link_doctype')
# 									self.party_name = i.get('link_name')
# 				else:
# 					firstname = frappe.db.get_all('Dynamic Link',
# 					filters={
# 						'parent': opp_firstname_exists
# 					},
# 					fields=['link_doctype', 'link_name'],
# 					as_list=False
# 					)
# 					if firstname:
# 						if len(firstname) > 1:
# 							for i in firstname:
# 								if i.get('link_doctype') == "Customer":
# 									self.party_type = i.get('link_doctype')
# 									self.party_name = i.get('link_name')
# 						if len(firstname) == 1:
# 							for i in firstname:
# 								if i.get('link_doctype') == "Customer":
# 									self.party_type = i.get('link_doctype')
# 									self.party_name = i.get('link_name')
# 								else:
# 									self.party_type = i.get('link_doctype')
# 									self.party_name = i.get('link_name')


# def remove_suffixes_from_field(field_value, suffixes=None):
#     if suffixes is None:
#         suffixes = ["Pvt Ltd", "Ltd", "LLP", "Co Ltd"]

#     # Create a regular expression pattern for matching suffixes
#     pattern = r"\s*({})\s*$".format("|".join(map(re.escape, suffixes)))

#     # Remove matching suffixes from the field value
#     cleaned_value = re.sub(pattern, "", field_value)

#     return cleaned_value

