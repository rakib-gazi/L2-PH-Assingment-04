

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowBookSummaryQuery } from "@/redux/api/Api";
import type { IBorrow } from "@/types/types";   
import { Link } from "react-router";


const BorrowSummary = () => {
    const { data } = useGetBorrowBookSummaryQuery(undefined, {
        // pollingInterval: 6000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    });
    return (
        <div className="bg-white p-4 rounded-md shadow-md my-8">
            <div className="flex items-center justify-between pb-6">
                <h1 className="text-2xl text-center font-bold py-4">Borrow Summary</h1>
                <Link className="bg-blue-700 text-primary-foreground shadow-xs hover:bg-green-950 px-3 py-1.5 font-bold rounded-md" to="/books">All Books</Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead  className="font-bold">Book Title</TableHead>
                        <TableHead className="font-bold">ISBN</TableHead>
                        <TableHead className="font-bold" >Total Quantity Borrowed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.data.map((book: IBorrow, index:number) => {
                            return (
                                <TableRow key={index+1}>
                                    <TableCell className="font-medium">{book.book.title}</TableCell>
                                    <TableCell className="font-medium">{book.book.isbn}</TableCell>
                                    <TableCell className="font-medium">{book.totalQuantity}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default BorrowSummary;