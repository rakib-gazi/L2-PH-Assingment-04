import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddBookModal from "@/module/Books/AddBookModal";
import BorrowBookModal from "@/module/Borrow/BorrowBookModal";
import UpdateBookModal from "@/module/Books/UpdateBookModal";
import { useGetBooksQuery, useDeleteBookMutation } from "@/redux/api/Api";
import type { IBook } from "@/types/types";
import Swal from "sweetalert2";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { SyncLoader } from "react-spinners";
const Books = () => {
    const { data, isLoading, isFetching } = useGetBooksQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    });

    const [deleteBook] = useDeleteBookMutation();
    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Do you want to Delete?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes, Delete",
            denyButtonText: `Cancel`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteBook(id);
                if (res?.data.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Book Deleted Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                };
            }
        });
    }
    return (
        <div className="bg-white p-4 rounded-md shadow-md my-8">
            <div className="flex items-center justify-between pb-6">
                <h1 className="text-2xl text-center font-bold py-4 text-blue-600">All Books</h1>
                <AddBookModal />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Title</TableHead>
                        <TableHead className="font-bold">Author</TableHead>
                        <TableHead className="font-bold">Genre</TableHead>
                        <TableHead className="font-bold">ISBN</TableHead>
                        <TableHead className="font-bold" >Copies</TableHead>
                        <TableHead className="font-bold">Availability</TableHead>
                        <TableHead className="text-center font-bold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading || isFetching ? (
                            <TableRow>
                                <TableCell colSpan={7} className=" text-center py-8">
                                    <div className="flex justify-center items-center ">
                                        <SyncLoader color="#2032da" size={20} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-xl font-semibold">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            data?.data.map((book: IBook) => {
                                return (
                                    <TableRow key={book._id}>
                                        <TableCell className="font-medium">{book.title}</TableCell>
                                        <TableCell className="font-medium">{book.author}</TableCell>
                                        <TableCell className="font-medium">{book.genre}</TableCell>
                                        <TableCell className="font-medium">{book.isbn}</TableCell>
                                        <TableCell className="font-medium">{book.copies}</TableCell>
                                        <TableCell className="font-medium">{book.available ? "Available" : "Unavailable"}</TableCell>
                                        <TableCell className="font-medium flex justify-center items-center">
                                            <Button variant="eyeButton">
                                                <Link to={`/books/${book._id}`}>
                                                    <FaEye className="size-5" />
                                                </Link>
                                            </Button>
                                            <UpdateBookModal book={book} />
                                            <BorrowBookModal book={book} />
                                            <Button className="flex justify-center items-center" variant="iconButton" onClick={() => handleDelete(book._id)}>
                                                <IoTrashBin className="size-5 " />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )

                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default Books;