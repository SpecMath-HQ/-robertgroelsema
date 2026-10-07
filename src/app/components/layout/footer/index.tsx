import Link from "next/link";
import pageData from "@/data/page-data.json";

const { contact, profile } = pageData;

const siteLinks = [
  { href: "/#about", label: "About Robert" },
  { href: "/#career", label: "Career" },
  { href: "/#work", label: "Selected work" },
  { href: "/#publications", label: "Publications" },
  { href: "/#contact", label: "Contact" },
];

const linkClass = "font-display text-link text-paper no-underline hover:underline";

const Column = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
  <div className="border-t border-paper pt-4">
    <h2 className="m-0 font-sans text-label text-paper">{heading}</h2>
    <ul className="mt-6 mb-0 flex list-none flex-col gap-3 p-0">{children}</ul>
  </div>
);

// A full-width ocean block, white text only (6.7:1).
const Footer = () => {
  return (
    <footer className="on-ocean bg-ocean text-paper">
      <div className="container py-16 lg:py-24">
        <p className="m-0 font-display text-display text-paper">{profile.name}</p>
        <p className="mt-6 mb-0 max-w-[46rem] text-lead text-paper">{profile.statement}</p>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
          <Column heading="Contact">
            <li>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </li>
            <li className="text-small">{contact.location}</li>
          </Column>
          <Column heading="On this site">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Column>
          {contact.linkedin && (
            <Column heading="Elsewhere">
              <li>
                <a href={contact.linkedin} className={linkClass}>
                  LinkedIn
                </a>
              </li>
            </Column>
          )}
        </div>

        <p className="mt-16 mb-0 text-small text-paper">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
