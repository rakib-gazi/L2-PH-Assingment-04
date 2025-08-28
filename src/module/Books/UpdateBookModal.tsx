import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateBookMutation } from '@/redux/api/Api';
import type { IBook, UpdateBookModalProps } from '@/types/types';
import { useState } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
const UpdateBookModal = ({ book }: UpdateBookModalProps) => {
    const [open, setOpen] = useState(false);
    const form = useForm<IBook>({
        defaultValues: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            description: book.description,
            copies: book.copies,
            available: book.available
        },
    });
    const genreData = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];
    const [updateBook] = useUpdateBookMutation();
    const onSubmit: SubmitHandler<IBook> = async (data) => {
        const convertedData = {
            ...data,
            _id: book._id,
            copies: Number(data.copies),
        }
        const res = await updateBook(convertedData).unwrap();
        if (res?.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Book Added Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            setOpen(false);
        }

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="updateButton"><FaEdit className='size-5' /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogDescription className="sr-only">Fill up this form</DialogDescription>
                <DialogHeader>
                    <DialogTitle className='text-center font-bold text-blue-700 text-2xl'>Update Book</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genre</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select a Genre" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                genreData.map((genre) => (

                                                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="copies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input  {...field} value={field.value} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="available"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Availability (optional)</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value === "true" ? true : false)} value={field.value ? "true" : "false"}>
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select Availability" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="true">Available</SelectItem>
                                            <SelectItem value="false">Not Available</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='mt-2'>
                            <DialogClose asChild>
                                <Button variant="destructive" className='cursor-pointer '>Cancel</Button>
                            </DialogClose>
                            <Button variant="default" type="submit" className='cursor-pointer'>Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
};

export default UpdateBookModal;