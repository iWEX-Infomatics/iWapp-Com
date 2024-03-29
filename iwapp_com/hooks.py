app_name = "iwapp_com"
app_title = "iWEX Apps"
app_publisher = "iWEX"
app_description = "iWEX"
app_email = "emails@iwex.in"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/iwapp_com/css/iwapp_com.css"
# app_include_js = "/assets/iwapp_com/js/iwapp_com.js"

# include js, css files in header of web template
# web_include_css = "/assets/iwapp_com/css/iwapp_com.css"
# web_include_js = "/assets/iwapp_com/js/iwapp_com.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "iwapp_com/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {"Lead" : "public/js/lead.js", "Employee" : "public/js/employee.js"}
doctype_list_js = {"Customer" : "public/js/customer_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "iwapp_com.utils.jinja_methods",
# 	"filters": "iwapp_com.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "iwapp_com.install.before_install"
# after_install = "iwapp_com.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "iwapp_com.uninstall.before_uninstall"
# after_uninstall = "iwapp_com.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "iwapp_com.utils.before_app_install"
# after_app_install = "iwapp_com.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "iwapp_com.utils.before_app_uninstall"
# after_app_uninstall = "iwapp_com.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "iwapp_com.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Lead": {
		"after_insert": "iwapp_com.events.lead.after_insert",
        "validate": "iwapp_com.events.lead.validate"
        # "on_update": "iwapp_com.events.lead.on_update"
		# "on_cancel": "method",
		# "on_trash": "method"
	},
    "Contact": {
        "validate": "iwapp_com.events.contact.validate"
	},
     "Customer": {
        "after_insert": "iwapp_com.events.customer.after_insert"
	},
     "Supplier": {
        "after_insert": "iwapp_com.events.supplier.after_insert"
	},
    "Employee": {
        "after_insert": "iwapp_com.events.employee.after_insert"
	},
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"iwapp_com.tasks.all"
# 	],
# 	"daily": [
# 		"iwapp_com.tasks.daily"
# 	],
# 	"hourly": [
# 		"iwapp_com.tasks.hourly"
# 	],
# 	"weekly": [
# 		"iwapp_com.tasks.weekly"
# 	],
# 	"monthly": [
# 		"iwapp_com.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "iwapp_com.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "iwapp_com.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "iwapp_com.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["iwapp_com.utils.before_request"]
# after_request = ["iwapp_com.utils.after_request"]

# Job Events
# ----------
# before_job = ["iwapp_com.utils.before_job"]
# after_job = ["iwapp_com.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"iwapp_com.auth.validate"
# ]

fixtures = [{
    "dt":"Custom Field",
    "filters": [
        ["name", "in", (
            "Lead-custom_address", "Lead-custom_contact",
			"Lead-custom_lead_created","Lead-custom_address_created",
			"Lead-custom_gstin","Lead-custom_county",
			"Lead-custom_taluk","Lead-custom_post_office",
			"Lead-custom_post_office","Lead-custom_address_line_1",
			"Lead-custom_postal_code", "Contact-custom_organisation_name",
            "Contact-custom_mob", "Customer-custom_postal_code",
            "Customer-custom_country", "Customer-custom_stateprovince",
            "Customer-custom_county", "Customer-custom_citytown",
            "Customer-custom_address_line_2", "Customer-custom_section_break_qt6tz",
            "Customer-custom_address_line_1", "Customer-custom_column_break_ubxah",
            "Customer-custom_contact_created", "Customer-custom_address_created",
            "Customer-custom_designation", "Customer-custom_organisation_name",
            "Customer-custom_gstin", "Customer-custom_taluk",
            "Customer-custom_post_office", "Customer-custom_phone",
            "Customer-custom_mobile_no", "Customer-custom_email",
            "Customer-custom_last_name", "Customer-custom_last_name",
            "Customer-custom_first_name", "Address-custom_gstin",
            "Address-custom_taluk", "Address-custom_post_office",
            "Supplier-custom_phone", "Supplier-custom_mobile_no",
            "Supplier-custom_email", "Supplier-custom_organisation_name",
            "Supplier-custom_gstin", "Supplier-custom_post_office",
            "Supplier-custom_taluk", "Supplier-custom_postal_code",
            "Supplier-custom_column_break_zpehd", "Supplier-custom_citytown",
            "Supplier-custom_address_line_2", "Supplier-custom_address_line_1",
            "Supplier-custom_salutation", "Supplier-custom_gender",
            "Supplier-custom_last_name", "Supplier-custom_middle_name",
            "Supplier-custom_first_name", "Supplier-custom_section_break_oyobw",
            "Supplier-custom_county", "Supplier-custom_stateprovince",
            "Supplier-custom_designation", "Employee-custom_address_html",
            "Employee-custom_column_break_q4u31", "Employee-custom_address__contact",
            "Employee-custom_employee_primary_contact", "Employee-custom_employee_primary_address",
            "Employee-custom_address_html", "Employee-custom_postal_office",
            "Employee-custom_organisation_name", "Employee-custom_county",
            "Employee-custom_gstin", "Employee-custom_taluk",
            "Employee-custom_postal_code", "Employee-custom_country",
            "Employee-custom_stateprovince", "Employee-custom_citytown",
            "Employee-custom_address_line_2", "Employee-custom_address_line_1"
            "Employee-custom_phone", "Employee-custom_section_break_duqk9",
            "Employee-custom_pincode_details"
        )]
    ]
    },
    {"dt":"Property Setter",
        "filters": [
            ["doc_type", "in", (
                "Lead"
            )]
        ]
    }
    # {
    #     "dt": "Translation",
    #     "filters": [
    #             ["name", "in", ("ec0adfc6e5")]
    #     ],
    # }
]
