"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Details = {
  member_number: string;
  created_at: string;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  zone: string;
  service_unit: string;
  conference_shirt: string;
  fee_payment: string;
  paid: boolean;
};
export const columns: ColumnDef<Details>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "paid",
    header: "Paid",
  },

  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },

  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "service_unit",
    header: "Service unit",
  },
  {
    accessorKey: "conference_shirt",
    header: "Conference shirt",
  },
  {
    accessorKey: "fee_payment",
    header: "Fee payment",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const detail = row.original;
      // const handleUpdate = () =>
      //   updateDetailsByID(detail.member_number, !detail.paid);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(detail.member_number);
              }}
            >
              Copy Member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={handleUpdate}>
              Update payment status
            </DropdownMenuItem> */}

            <DropdownMenuItem>Send Message</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
