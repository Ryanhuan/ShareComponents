import React from "react";
import styled from "styled-components";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Pagination, SortDescriptor, Selection } from "@nextui-org/react";
import { TTableProps } from "./table.type";
import { getValue, hasRenderByKey } from "./utils";
import { clsx } from "clsx";
import { isNil } from "ramda";

const TableStyled = styled(Table)``;

function CustomTableStyled<T = any>(props: TTableProps<T>) {
  const { columns, dataSource, selection = false, selectionMode = "single", isLoading = false, className, onChange, ...otherProps } = props;
  const { content = [], total = 0, pageSize = 0, totalPages } = dataSource;
  const [selectionBehavior, __] = React.useState(selection ? "toggle" : "replace");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    direction: "ascending",
  });

  const list = React.useMemo(() => {
    return [...content].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column || ""] as number;
      const second = b[sortDescriptor.column || ""] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, content]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {total} rows</span>
        </div>
      </div>
    );
  }, [dataSource]);

  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    totalPages > 0 && setPage(1);
  }, [totalPages]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          initialPage={1}
          page={page}
          total={totalPages || 1}
          onChange={(page) => {
            setPage(page);
            onChange({ offset: page });
          }}
        />
      </div>
    );
  }, [dataSource, totalPages, content]);

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const keys = columnKey.includes(",") ? columnKey.split(",") : columnKey;
    const _hasRender = hasRenderByKey(keys, columns, item);

    if (!isNil(_hasRender)) {
      return <>{_hasRender}</>;
    }

    const cellValue = typeof keys === "string" ? item[keys as keyof any] : getValue(item, keys);
    return cellValue;
  }, []);

  const _classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <TableStyled
      aria-label="table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={clsx(
        {
          table: "min-h-[400px]",
        },
        _classNames,
        className
      )}
      selectionMode={selectionMode}
      selectionBehavior={selectionBehavior}
      topContent={topContent}
      bottomContent={bottomContent}
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      {...otherProps}
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn allowsSorting={column.isSorting || false} key={column.key} className={clsx(column.className)}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={list} isLoading={isLoading} loadingContent={<Spinner label="Loading..." />} emptyContent={"No Data"}>
        {(item: any) => <TableRow key={item._id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </TableStyled>
  );
}

const _Table = React.memo(CustomTableStyled);
export { _Table as Table };
// export { CustomTableStyled as Table };
