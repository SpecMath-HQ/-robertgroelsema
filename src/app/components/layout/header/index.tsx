import pageData from "@/data/page-data.json";
import { getPosts } from "@/lib/insights";
import Link from "next/link";

const { profile } = pageData;

const Header = () => {
  // Insights appears in the navigation once a post is published.
  const links = [
    { href: "/#about", label: "About Robert" },
    { href: "/#career", label: "Career" },
    { href: "/#work", label: "Selected work" },
    { href: "/#publications", label: "Publications" },
    ...(getPosts().length > 0 ? [{ href: "/insights", label: "Insights" }] : []),
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="container">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 py-6">
        <Link href="/" className="font-display text-h3 text-ink no-underline">
          {profile.name}
        </Link>
        <nav aria-label="Main">
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-link text-ink no-underline hover:text-ocean hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
