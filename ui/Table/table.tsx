import React from "react";
import styled from "styled-components";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Pagination, SortDescriptor, Selection } from "@nextui-org/react";
import { TTableProps } from "./table.type";
import { getValue, hasRenderByKey } from "./utils";
import { clsx } from "clsx";
import { isNil } from "ramda";

const TableStyled = styled(Table)``;

function CustomTableStyled<T = any>(props: TTableProps<T>) {
  const { columns, dataSource, selection = false, selectionMode = "single", isLoading: _isLoading = false, className, ...otherProps } = props;

  const [isLoading, _] = React.useState(_isLoading);

  const [selectionBehavior, __] = React.useState(selection ? "toggle" : "replace");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPageNum = [5, 10, 15];

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(dataSource.length / rowsPerPage);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const _dataSource = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dataSource.slice(start, end);
  }, [page, dataSource, rowsPerPage]);

  const list = React.useMemo(() => {
    return [..._dataSource].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column || ""] as number;
      const second = b[sortDescriptor.column || ""] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, _dataSource]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        {/* <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="bg-foreground text-background" endContent={<PlusIcon />} size="sm">
              Add New
            </Button>
          </div>
        </div> */}
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {dataSource.length} rows</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange} defaultValue={rowsPerPage}>
              {rowsPerPageNum.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    dataSource.length,
    onRowsPerPageChange,
    // filterValue, statusFilter, visibleColumns, onSearchChange,  hasSearchFilter
  ]);

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
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={(page) => setPage(page)} />
        </div>
      }
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
        {(item: any) => <TableRow key={item.key}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
      </TableBody>
    </TableStyled>
  );
}

export { CustomTableStyled as Table };
