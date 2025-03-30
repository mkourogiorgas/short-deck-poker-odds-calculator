import { useMemo } from "react";
import { usePokerSelector } from "../../../store/hooks";
import U from "./utils";
import C from "./constants";

const EquityTable = () => {
  const results = usePokerSelector((state) => state.results);
  const equityTable = useMemo(() => U.updateEquityTable(results), [results]);

  const fontColor = C.EQUITY_TABLE_FONT_COLOR;
  const fontSize = C.EQUITY_TABLE_FONT_SIZE;

  const getFontStyle = (index: number) => `
    ${index > 2 ? "text-xs" : fontSize[index % fontSize.length]}
    ${fontColor[index % fontSize.length]}
    ${index > 8 ? "col-span-3 text-[#393939]" : "col-span-1"}
    text-center font-sans font-medium 
  `;

  return (
    <div className="grid grid-cols-3 grid-rows-4 place-items-center bg-white p-2 rounded-lg">
      {equityTable.map((item, index) => (
        <div key={index} className={getFontStyle(index)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default EquityTable;
