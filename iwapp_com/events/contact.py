import frappe
import re

def validate(doc, method):
    if doc.mobile_no:
        doc.custom_mob = doc.mobile_no[-10:]
    if doc.company_name:
        doc.custom_organisation_name = remove_suffixes_from_field(doc.company_name)

# @frappe.whitelist()
# def set_primary_to_mob_and_email():
#     contact = frappe.db.get_list("Contact", pluck ="name")
#     if contact:
#         for i in contact:
#             doc = frappe.get_doc("Contact", i)
#             if len(doc.email_ids) > 0:
#                 for i in doc.email_ids:
#                     i.is_primary = 1
#             doc.save()

def remove_suffixes_from_field(field_value, suffixes=None):
    """
    Remove specified suffixes from a field value.

    Args:
    - field_value (str): The field value (e.g., organization name).
    - suffixes (list): List of suffixes to remove. Default is None, which includes common suffixes.

    Returns:
    - str: The field value without the specified suffixes.
    """
    if suffixes is None:
        suffixes = ["Pvt Ltd", "Ltd", "LLP", "Co Ltd"]

    # Create a regular expression pattern for matching suffixes
    pattern = r"\s*({})\s*$".format("|".join(map(re.escape, suffixes)))

    # Remove matching suffixes from the field value
    cleaned_value = re.sub(pattern, "", field_value)

    return cleaned_value
