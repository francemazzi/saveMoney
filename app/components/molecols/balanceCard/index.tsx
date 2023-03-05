import React from "react";

type balanceUnit = {
  id?: string;
  created_at?: string;
  name?: string;
  value?: number;
  fixed?: boolean | null;
  entry?: boolean;
  start_date?: string | null;
  update_date?: string | null;
  due_date?: string | null;
  description?: string | null;
  category?: string | null;
};
type valueBalance = {
  id?: string;
  value?: number;
};
interface BalanceInterface {
  balance: balanceUnit[];
}

const BalanceCard: React.FC<BalanceInterface> = ({ balance }) => {
  let values: valueBalance[] = [];
  //put value and their id in values
  balance.map((data) =>
    values.push({
      id: data.id,
      value: data.value,
    })
  );

  //TODO: fare la somma dei values con reduce -> magari fare una funzione generica

  return (
    <div className="flex h-[400px] w-1/2 flex-col rounded-lg shadow-lg">
      <div className="flex h-1/2 flex-col items-center justify-center rounded-t-lg bg-[#C7E8CA] text-[35px] font-bold">
        <h1>+300 €</h1>
      </div>
      <div className="flex h-1/2 flex-row items-center justify-center rounded-b-lg">
        <div className="flex h-full w-1/2 flex-col justify-center rounded-bl-lg bg-[#C7E8CA]">
          <h2 className=" justify-center   text-center text-[25px] font-semibold">
            +1500 €
          </h2>
        </div>
        <div className="flex h-full w-1/2 flex-col justify-center rounded-br-lg bg-[#DF2E38] ">
          <h2 className=" text-center text-[25px] font-semibold">-1200 €</h2>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
