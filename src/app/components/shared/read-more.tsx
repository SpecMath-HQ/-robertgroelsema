"use client";
import { useId, useState } from "react";

// Shows the first sentence of a long description with a "Read more" link
// that reveals the rest in place. The full text is always in the HTML, so
// search engines and printouts get all of it.
const THRESHOLD = 260;

const splitFirstSentence = (text: string) => {
  const match = text.match(/^(.+?[.”])\s+(?=[A-Z“])/);
  if (!match) return [text, ""];
  return [match[1], text.slice(match[0].length)];
};

const ReadMore = ({ text, className }: { text: string; className?: string }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const [first, rest] = splitFirstSentence(text);

  if (text.length < THRESHOLD || !rest) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {first}{" "}
      <span id={id} hidden={!open} className="read-more-rest">
        {rest}{" "}
      </span>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="read-more-toggle cursor-pointer border-0 bg-transparent p-0 font-display text-link text-ink underline hover:text-ocean"
      >
        {open ? "Show less" : "Read more"}
      </button>
    </p>
  );
};

export default ReadMore;
