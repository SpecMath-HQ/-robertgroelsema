// The site's address, used for link previews, robots.txt and the sitemap.
export const SITE_URL = "https://robertgroelsema.com";

// FormSubmit endpoint, delivering to the site's own address. The mailbox
// must exist before the first submission: FormSubmit then sends a one-time
// activation email there. After activating, replace the address below with
// the random alias FormSubmit provides so it is not exposed in the page
// source.
export const FORM_ENDPOINT = "https://formsubmit.co/ajax/contact@robertgroelsema.com";

// Headlines inside the color blocks (CLAUDE.md section 6).
export const STATEMENTS = {
  // From the resume summary.
  expertise: "From humanitarian relief to sustainable development.",
  // Summaries under the section titles, drawn from the resume.
  career:
    "From Peace Corps volunteer in Zaire to Chief of Party in Ghana and Kenya and team leader at Catholic Relief Services: nearly five decades with international, governmental and non-governmental organizations.",
  consulting:
    "Short-term assignments alongside these posts: leading evaluations in Liberia and the DRC, writing winning USAID proposals and assessing governance in Guinea, as well as university teaching and grant writing.",
  // Lead line of the Contact section: working relationships, not CV requests.
  contact:
    "Robert works with organizations and individuals on peacebuilding, governance and development. To explore how his experience could support your work, please get in touch.",
  // Placeholder wording until the owner supplies a line for the blog.
  insights: "Reflections from four decades in sub-Saharan Africa and Southeast Asia.",
};
