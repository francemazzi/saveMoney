import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import React from "react";
import Navbar from "~/components/molecols/header";
import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

const Homepage = () => {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  const path = useLocation();

  return (
    <div>
      <Navbar email={user.email} pathName={path.pathname} />
      <div className="flex flex-row items-center justify-center ">
        <Link to="balance" className="m-2 p-2">
          Balancio
        </Link>
        <Link to="category" className="p-2">
          Categorie
        </Link>
        <Link to="list" className="p-2">
          Categorie
        </Link>
      </div>
      {path.pathname == "/home" ? (
        <div>
          <div>a</div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Homepage;
