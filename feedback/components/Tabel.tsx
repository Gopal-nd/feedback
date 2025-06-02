"use client"
import React from "react"
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search } from "lucide-react"
import Ratings from "./Rating"

import {
  type Column,
  type ColumnDef,
  type PaginationState,
  type Table as TanstackTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type { InferSelectModel } from "drizzle-orm"
import type { feedbacks } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Feedback = InferSelectModel<typeof feedbacks>

function Table(props: { data: Feedback[] }) {
  const columns = React.useMemo<ColumnDef<Feedback>[]>(
    () => [
      {
        accessorKey: "userName",
        header: "Name",
        cell: (info) => <div className="font-medium text-foreground">{info.getValue() as string}</div>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.userEmail,
        id: "userEmail",
        cell: (info) => <div className="text-muted-foreground">{info.getValue() as string}</div>,
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.rating,
        id: "rating",
        cell: (info) =>
          info.getValue() === null ? (
            <span className="italic text-muted-foreground">N/A</span>
          ) : (
            <Ratings rating={info.getValue() as number} count={5} />
          ),
        header: () => <span>Rating</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "message",
        header: () => "Message",
        cell: (info) => (
          <div className="max-w-md text-sm text-foreground leading-relaxed">{info.getValue() as string}</div>
        ),
        footer: (props) => props.column.id,
        size: 400,
        minSize: 200,
        maxSize: 600,
      },
    ],
    [],
  )

  return (
    <>
      <MyTable data={props.data} columns={columns} />
    </>
  )
}

function MyTable({
  data,
  columns,
}: {
  data: Feedback[]
  columns: ColumnDef<Feedback>[]
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border bg-muted/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="h-12 p-4 mt-10 border text-left align-middle font-medium text-muted-foreground"
                      colSpan={header.colSpan}
                    >
                      <div
                        className={`flex items-center space-x-2 ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none hover:text-foreground transition-colors"
                            : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.column.getIsSorted() && (
                          <span className="text-foreground">{header.column.getIsSorted() === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                      {header.column.getCanFilter() && (
                        <div className="mt-2">
                          <Filter column={header.column} table={table} />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-border transition-colors hover:bg-muted/50 ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-top border" style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getPreFilteredRowModel().rows.length,
              )}{" "}
              of {table.getPreFilteredRowModel().rows.length} entries
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Page</span>
              <Input
                type="number"
                min={1}
                max={table.getPageCount()}
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="h-8 w-16 text-center"
              />
              <span className="text-sm text-muted-foreground">of {table.getPageCount()}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>

            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: TanstackTable<any>
}) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === "number" ? (
    <div className="flex space-x-1 " onClick={(e) => e.stopPropagation()}>
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder="Min"
        className="h-8 w-20 text-xs"
      />
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder="Max"
        className="h-8 w-20 text-xs"
      />
    </div>
  ) : (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder="Search..."
        className="h-8 w-32 pl-7 text-xs"
      />
    </div>
  )
}

export default Table
