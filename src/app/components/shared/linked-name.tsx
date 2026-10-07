type NameLink = { name: string; url: string };

// Renders an organization's name with the parts listed in `links` turned
// into links to the organization's official website (opening in a new
// tab). The visible wording never changes; anything not listed stays plain.
const LinkedName = ({ text, links }: { text: string; links?: NameLink[] }) => {
  if (!links?.length) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let rest = text;
  for (const link of links) {
    const at = rest.indexOf(link.name);
    if (at === -1) continue;
    if (at > 0) parts.push(rest.slice(0, at));
    parts.push(
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink no-underline hover:text-ocean hover:underline"
      >
        {link.name}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
    rest = rest.slice(at + link.name.length);
  }
  if (rest) parts.push(rest);

  return <>{parts}</>;
};

export default LinkedName;
