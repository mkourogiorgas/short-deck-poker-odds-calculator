import { useState } from "react";
import { deckActions } from "../../../store/deckSlice";
import { tableActions } from "../../../store/tableSlice";
import { validationActions } from "../../../store/validationSlice";
import { resultsActions } from "../../../store/resultsSlice";
import { usePokerDispatch, usePokerSelector } from "../../../store/hooks";
import Button from "./Button";
import Modal from "../../modal/Modal";
import { runPokerOdds } from "../../poker/runCalculator";
import U from "./utils";

const ButtonArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = usePokerDispatch();

  const deck = usePokerSelector((state) => state.deck);
  const table = usePokerSelector((state) => state.table);
  const validation = usePokerSelector((state) => state.validation);
  const isDisabled = U.hasEmptySlots(validation);

  const handleReset = (): void => {
    dispatch(deckActions.reset());
    dispatch(tableActions.reset());
    dispatch(validationActions.reset());
    dispatch(resultsActions.reset());
  };

  const handleRun = () => {
    setIsLoading(true);
    runPokerOdds(deck, table).then((results) => {
      dispatch(resultsActions.updateResults({ results }));
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-row place-items-center gap-4 my-4 ">
      <Modal isOpen={isLoading && !U.hasCommunity(table.community)} />
      <Button handleClick={handleRun} isDisabled={isDisabled} name={"Run"} />
      <Button handleClick={handleReset} isDisabled={false} name={"Reset"} />
    </div>
  );
};

export default ButtonArea;
