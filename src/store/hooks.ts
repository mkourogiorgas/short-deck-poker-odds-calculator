import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { PokerDispatch, RootState } from "./index";

type DispatchFunction = () => PokerDispatch;

export const usePokerDispatch: DispatchFunction = useDispatch;
export const usePokerSelector: TypedUseSelectorHook<RootState> = useSelector;
