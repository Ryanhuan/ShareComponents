import { filter, ifElse, is, identity, pathOr, isNil, of, compose } from "ramda";
import { mapIndexed } from "../utils/webHelper";

export type DataSource<T> = {
  content: T[];
  total: number;
  page?: number;
  pageSize: number;
  totalPages?: number;
  current?: number;
};

type Config<T> = {
  field?: string[];
  // field?: string | string[];
  converter?: (x: T, idx: number) => any;
};

export function convertData<T>(config: Config<T>): (data: any) => DataSource<T>;
export function convertData<T>(config: Config<T>, data: any): DataSource<T>;
export function convertData<T>({ field = ["data"], converter = (_: T) => ({}) }: Config<T>, data?: { data: any[] }) {
  // let path = compose(
  //   filter(x => !isNil(x)),
  //   ifElse(is(String), of, identity)
  // )(field)
  let path = field;

  const _convertData = (_data: any) => {
    const { pageSize } = _data;
    const content = mapIndexed(
      (x: T, idx: number) => ({
        ...x,
        ...converter(x, idx),
      }),
      pathOr([], path, _data)
    );
    const total = pathOr(0, ["data", "count"], _data);
    const dataSource: DataSource<T> = {
      // content: mapIndexed(
      //   (x: T, idx: number) => ({
      //     ...x,
      //     ...converter(x, idx),
      //   }),
      //   pathOr([], path, _data)
      // ),
      content,
      total,
      totalPages: Math.ceil(total / pageSize) || 1,
      pageSize: pageSize,
      // current: pathOr(0, ["page"], _data) + 1,
      // page: pathOr(0, ["page"], _data) + 1,
    };

    return dataSource;
  };

  if (!data) {
    return _convertData;
  }

  return _convertData(data);
}
