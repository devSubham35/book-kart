"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Order {
    id: string | number;
    name: string;
    status: string;
    quantity: number;
    createdDate: string;
}

interface OrderListingTableProps {
    orders: Order[];
}

export default function OrderListingTable({ orders }: OrderListingTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-md text-xs font-medium
                    ${order.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : order.status === "Shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : order.status === "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </TableCell>
                            <TableCell>{order.createdDate}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">
                            No orders found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
