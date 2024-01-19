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
doctype_js = {"Lead" : "public/js/lead.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
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
	}
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
			"Lead-custom_postal_code"
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
