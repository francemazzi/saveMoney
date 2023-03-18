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
  let positiveValues: valueBalance[] = [];
  let negativeValues: valueBalance[] = [];

  balance.map((data) => {
    if (data.entry) {
      positiveValues.push({
        id: data.id,
        value: data.value,
      });
      return null;
    } else {
      negativeValues.push({
        id: data.id,
        value: data.value,
      });
      return null;
    }
  });

  /**
   * @description summ an array of numbers
   * @param dataArray  is an orre of object with id and value
   * @returns summ of data
   */
  const summ = (dataArray: valueBalance[]) => {
    const summ = dataArray.reduce(
      (acc, curr) => (curr.value != undefined ? acc + curr.value : 0),
      0
    );
    return summ;
  };

  const sommaPositivi = summ(positiveValues);
  const sommaNegativi = summ(negativeValues);

  const differenza = sommaPositivi - sommaNegativi;

  return (
    <div className="flex h-[400px] w-1/2 flex-col rounded-lg shadow-lg">
      <div className="flex h-1/2 flex-col items-center justify-center rounded-t-lg bg-[#c7e8ca59] text-[35px] font-bold">
        <h1>{differenza > 0 ? "+" + differenza : differenza} €</h1>
      </div>
      <div className="flex h-1/2 flex-row items-center justify-center rounded-b-lg">
        <div className="flex h-full w-1/2 flex-col justify-center rounded-bl-lg bg-[#c7e8ca59]">
          <h2 className=" justify-center   text-center text-[25px] font-semibold">
            + {sommaPositivi} €
          </h2>
        </div>
        <div className="flex h-full w-1/2 flex-col justify-center rounded-br-lg bg-[#df2e376e] ">
          <h2 className=" text-center text-[25px] font-semibold">
            - {sommaNegativi} €
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
