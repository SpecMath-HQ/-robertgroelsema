// Entries in two columns, read left to right, with a thin vertical rule
// between the columns and a black line under every entry. One column on
// small screens.
const TwoColumnList = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <ul className="m-0 grid list-none grid-cols-1 p-0 sm:-mx-6 sm:grid-cols-2">
      {children.map((child, index) => (
        <li key={index} className="border-rule pb-8 sm:px-6 sm:[&:nth-child(even)]:border-l">
          <div className="h-full border-b border-ink pb-8">{child}</div>
        </li>
      ))}
    </ul>
  );
};

export default TwoColumnList;
