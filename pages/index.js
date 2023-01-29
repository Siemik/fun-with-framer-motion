import Link from "next/link";

let links = [
  { path: "/form-project", label: "Formularz" },
];

export default function HomePage() {
  return (
    <div className="p-8">
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link href={link.path}>
              <a className="text-blue-600 underline">{link.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
