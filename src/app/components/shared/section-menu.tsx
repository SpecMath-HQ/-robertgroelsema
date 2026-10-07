"use client";
import { useEffect, useState } from "react";

type MenuItem = { id: string; label: string; count: number };

// A list-style menu (rows with black rules, count and arrow) whose links
// jump to subsections further down the page. The row for the subsection
// currently being read is marked by a heavier rule and no arrow.
const SectionMenu = ({ label, items }: { label: string; items: MenuItem[] }) => {
  const [active, setActive] = useState(items[0].id);
  const ids = items.map((item) => item.id).join(" ");

  useEffect(() => {
    const targets = ids.split(" ");
    const update = () => {
      // The active subsection is the last one whose top has passed the
      // upper third of the screen.
      const line = window.innerHeight / 3;
      let current = targets[0];
      for (const id of targets) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return (
    <nav aria-label={label} className="border-t border-ink">
      <ul className="m-0 list-none p-0">
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActive(item.id)}
                aria-current={selected ? "true" : undefined}
                // The selected row's padding shrinks by 3px to absorb its
                // heavier rule, so the rows never change height.
                className={`flex items-baseline justify-between gap-6 border-ink pt-4 font-display text-h3 text-ink no-underline ${
                  selected ? "border-b-4 pb-[0.8125rem]" : "border-b pb-4 hover:text-ocean"
                }`}
              >
                <span>{item.label}</span>
                <span className="font-display text-link tabular-nums">
                  {item.count}
                  {selected ? "" : " →"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SectionMenu;
