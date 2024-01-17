app_name = "add_on"
app_title = "Add On"
app_publisher = "Iwex"
app_description = "Add on"
app_email = "add_on@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/add_on/css/add_on.css"
# app_include_js = "/assets/add_on/js/add_on.js"

# include js, css files in header of web template
# web_include_css = "/assets/add_on/css/add_on.css"
# web_include_js = "/assets/add_on/js/add_on.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "add_on/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {"Role Permission for Page and Report" : "public/js/role_permission_for_page_and_report.js"}
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
# 	"methods": "add_on.utils.jinja_methods",
# 	"filters": "add_on.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "add_on.install.before_install"
# after_install = "add_on.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "add_on.uninstall.before_uninstall"
# after_uninstall = "add_on.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "add_on.utils.before_app_install"
# after_app_install = "add_on.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "add_on.utils.before_app_uninstall"
# after_app_uninstall = "add_on.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "add_on.notifications.get_notification_config"

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

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"add_on.tasks.all"
# 	],
# 	"daily": [
# 		"add_on.tasks.daily"
# 	],
# 	"hourly": [
# 		"add_on.tasks.hourly"
# 	],
# 	"weekly": [
# 		"add_on.tasks.weekly"
# 	],
# 	"monthly": [
# 		"add_on.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "add_on.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "add_on.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "add_on.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["add_on.utils.before_request"]
# after_request = ["add_on.utils.after_request"]

# Job Events
# ----------
# before_job = ["add_on.utils.before_job"]
# after_job = ["add_on.utils.after_job"]

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
# 	"add_on.auth.validate"
# ]
