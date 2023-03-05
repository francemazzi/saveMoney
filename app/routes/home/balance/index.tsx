import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import BalanceCard from "~/components/molecols/balanceCard";
import { getImportsFromUsers } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);

  const listUserImport = await getImportsFromUsers(userId);

  return json({ userId, listUserImport });
}

const Balance = () => {
  const { listUserImport } = useLoaderData<typeof loader>();
  return (
    <div className="flex  flex-col items-center justify-center ">
      <BalanceCard balance={listUserImport} />
    </div>
  );
};

export default Balance;
