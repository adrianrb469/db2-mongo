import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer  sm:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay drawer-button sm:hidden cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <div className="h-full">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <div className="menu p-4  w-auto min-h-full bg-base-200 text-base-content ">
          <ul>
            <li>
              <a href="#" className="menu-title">
                Napster
              </a>
            </li>

            <li>
              <Link href="/dashboard">Home</Link>
            </li>
            <li>
              <Link href="/dashboard/upload">Songs</Link>
            </li>
            <li>
              <Link href="/dashboard/artist">Artists</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
