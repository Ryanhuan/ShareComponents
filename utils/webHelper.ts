import {
  find,
  propEq,
  forEach,
  addIndex,
  has,
  map,
  isEmpty,
  ifElse,
  identity,
  either,
  compose,
  not,
  is,
  isNil as RisNil,
  path as Rpath,
  head,
} from "ramda";
import moment from "moment";

export const mapIndexed: any = addIndex(map);

export const getRangeDate = (date: [moment.Moment, moment.Moment], dateFormat?: string) => {
  const [startDate, stopDate] = date || [undefined, undefined];

  return [
    startDate ? (dateFormat ? startDate.format(dateFormat) : startDate.valueOf()) : undefined,
    stopDate ? (dateFormat ? stopDate.format(dateFormat) : stopDate.valueOf()) : undefined,
  ];
};
