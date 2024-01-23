# Copyright (c) 2024, iWEX and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class OpportunitySearch(Document):
	pass
	def validate(self):
		if self.mobile_no and self.email:
			opp_organisation_exists = frappe.db.exists("Contact", {"email_id": self.email, "mobile_no": self.mobile_no, "company_name":self.organisation_name})
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
								self.party_type = i.get('link_doctype')
								self.party_name = i.get('link_name')
					if len(organisation) == 1:
						for i in organisation:
							if i.get('link_doctype') == "Customer":
								self.party_type = i.get('link_doctype')
								self.party_name = i.get('link_name')
							else:
								self.party_type = i.get('link_doctype')
								self.party_name = i.get('link_name')
			if not opp_organisation_exists:
				self.party_type = ""
				self.party_name = ""
				opp_firstname_exists = frappe.db.exists("Contact", {"email_id": self.email, "mobile_no": self.mobile_no, "first_name":self.first_name})
				if opp_firstname_exists:
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
									self.party_type = i.get('link_doctype')
									self.party_name = i.get('link_name')
						if len(firstname) == 1:
							for i in firstname:
								if i.get('link_doctype') == "Customer":
									self.party_type = i.get('link_doctype')
									self.party_name = i.get('link_name')
								else:
									self.party_type = i.get('link_doctype')
									self.party_name = i.get('link_name')