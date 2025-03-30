import { Card, ValidationTable } from "../../../types";

const hasEmptySlots = (validation: ValidationTable): boolean =>
  Object.values(validation).some((values) => values.includes(false));

const hasCommunity = (community: Card[]): boolean => community[0].index !== -1;

export default { hasEmptySlots, hasCommunity };
