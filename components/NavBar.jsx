import Link from "next/link";
import {useEffect, useState} from "react";
import {fetcher} from "@/lib/api";

function NavBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const user = await fetcher("/api/user");
        setUser(user);
      } catch (error) {
      }
    })()
  }, [])

  async function handleSignOut() {
    await fetcher("/api/logout")

    setUser(null);
  }

  return <nav className="px-2 py-1">
    <ul className="flex gap-2">
      <li className="text-lg font-extrabold">
        <Link href="/">
          Next Shop
        </Link>
      </li>
      <li role="separator" className="flex-1"></li>
      {user ? <>
          <li>
            {user.name}
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </> :
        <li>
          <Link href="/sign-in">
            Sign In
          </Link>
        </li>}
    </ul>
  </nav>
}

export default NavBar;