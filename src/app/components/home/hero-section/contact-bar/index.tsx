import pageData from "@/data/page-data.json";

const { contact } = pageData;

const ContactBar = () => {
  return (
    <ul className="mt-8 mb-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 text-small text-ink">
      <li>
        <a href={`mailto:${contact.email}`} className="text-ink underline hover:text-ocean">
          {contact.email}
        </a>
      </li>
      <li>{contact.location}</li>
      {contact.linkedin && (
        <li>
          <a href={contact.linkedin} className="text-ink underline hover:text-ocean">
            LinkedIn
          </a>
        </li>
      )}
    </ul>
  );
};

export default ContactBar;
