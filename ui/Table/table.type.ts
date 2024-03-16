import type * as React from "react";
import { TableProps } from "@nextui-org/react";

export declare type Key = React.Key;
export declare type DataIndex = string | number | readonly (string | number)[];
export declare type GetComponentProps<DataType> = (data: DataType, index?: number) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>;
/* eslint-disable */
interface ColumnSharedType<_RecordType> {
  title?: React.ReactNode;
  key?: Key;
  className?: string;
}

export interface ColumnGroupType<RecordType> extends ColumnSharedType<RecordType> {
  children: ColumnsType<RecordType>;
}

export interface ColumnType<RecordType> extends ColumnSharedType<RecordType> {
  colSpan?: number;
  dataIndex?: DataIndex;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode | RenderedCell<RecordType>;
  shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;
  rowSpan?: number;
  width?: number | string;
  onCell?: GetComponentProps<RecordType>;
  /** @deprecated Please use `onCell` instead */
  onCellClick?: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;

  key: any;
  label: string;
  isSorting?: boolean;
}

export declare type ColumnsType<RecordType = unknown> = readonly (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];

export interface CellType<RecordType> {
  key?: Key;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  column?: ColumnsType<RecordType>[number];
  colSpan?: number;
  rowSpan?: number;
  /** Only used for table header */
  hasSubColumns?: boolean;
  colStart?: number;
  colEnd?: number;
}

export interface RenderedCell<RecordType> {
  props?: CellType<RecordType>;
  children?: React.ReactNode;
}

export type TColumns<RecordType> = {
  key: any;
  label: string;
  isSorting?: boolean;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode | RenderedCell<RecordType>;
};

type TDataSource = {
  key: any;
};

export interface ColumnProps<RecordType> extends ColumnType<RecordType> {
  children?: null;
}

export type TTableProps<T> = TableProps & {
  columns: TColumns<T>[];
  //   columns: ColumnProps<T>[];
  dataSource: TDataSource[];
  selection?: boolean;
  selectionMode?: "single" | "multiple";
  isLoading?: boolean;
};
