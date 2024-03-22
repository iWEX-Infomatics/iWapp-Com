import frappe

def after_insert(doc, method):
   if doc.custom_pincode_details:
    pincode=frappe.get_doc({
    'doctype': 'Pincode',
    'country': doc.country,
    'pincode':doc.pincode
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