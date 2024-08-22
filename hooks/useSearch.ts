import React from "react";
import { assocPath, identity, ifElse, is, of } from "ramda";
// import { FormInstance } from 'antd/lib/form'
// import { TablePaginationConfig } from 'antd/lib/table'
// import type {
//   FilterValue,
//   SorterResult,
//   TableCurrentDataSource,
// } from 'antd/lib/table/interface'
import { getRangeDate } from "../utils/webHelper";
// export type TableChangeHandler<T = any> = (
//   pagination: TablePaginationConfig,
//   filters: Record<string, FilterValue | null>,
//   sorter: SorterResult<T> | SorterResult<T>[],
//   extra: TableCurrentDataSource<T>
// ) => void

export type UseSearchProps = {
  form?: any;
  initial?: { [key: string]: any };
  dateRangeField?: [string, string];
  dateFormat?: string;
  transform?: (values: any) => any;
  keepPreviousQuery?: boolean;
};

export default function useSearch({
  form,
  initial = {
    limit: 10,
  },
  dateFormat,
  dateRangeField = ["start", "end"],
  transform = (values) => values,
  keepPreviousQuery = true,
}: UseSearchProps = {}) {
  const limit = initial.limit || 10;

  const [query, setQuery] = React.useState<any>({
    ...initial,
    offset: 0,
    limit,
  });

  const [offset, setOffset] = React.useState(1);

  const handleChange =
    <T = any>(field: string | string[]) =>
    (value: T, converter: (value: T) => any = (value: T) => value) => {
      const _field = ifElse(is(Array), identity, of)(field);

      setQuery(assocPath(_field, converter(value), query));
    };

  const handleSearch = () => {
    if (!form) {
      return;
    }

    const { date = [], ...values } = form.getFieldsValue();
    const [startDate, endDate] = getRangeDate(date, dateFormat);
    const [startField, endField] = dateRangeField;

    setOffset(1);
    setQuery((prev: any) => {
      const q = {
        ...(keepPreviousQuery && prev),
        ...values,
        offset: 0,
        limit,
        [startField]: startDate,
        [endField]: endDate,
        reactQueryCache: new Date().getTime(),
      };

      if (transform) {
        return transform(q);
      }
      return q;
    });
  };

  const handleTableChange = ({ offset }: any) => {
    if (!!offset) {
      setOffset(offset);
      setQuery((prev: any) => {
        const q = {
          ...prev,
          offset: Number(offset) - 1,
        };

        return q;
      });
    }
  };

  const handleSortChange = (props: any) => {
    setQuery((prev: any) => {
      const q = {
        ...prev,
        sort: {
          key: props?.column,
          order: props?.direction,
        },
      };
      return q;
    });
  };

  return {
    query,
    offset,
    setQuery,
    setOffset,
    handleChange,
    handleSearch,
    handleTableChange,
    handleSortChange,
  };
}
