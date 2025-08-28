import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBookMutation } from '@/redux/api/Api';
import { setAddBook } from '@/redux/appSlice';
import type { RootState } from '@/redux/store';
import type { BackendValidationError, ICreateBook } from '@/types/types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AddBookModal = () => {
    const dispatch = useDispatch();
    const open = useSelector((state: RootState) => state.modal.addBook);
    const form = useForm<ICreateBook>();
    const genreData = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];
    const [createBook] = useCreateBookMutation();
    const onSubmit: SubmitHandler<ICreateBook> = async (data) => {
        try {
            const convertedData = {
                ...data,
                copies: Number(data.copies),
            };

            const res = await createBook(convertedData).unwrap();

            if (res?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Book Added Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(setAddBook(false));
                form.reset();
            }
        } catch (err: unknown) {
            if ((err as FetchBaseQueryError)?.status) {
                const error = err as FetchBaseQueryError;
                const serverError = error.data as BackendValidationError["data"];

                const validationErrors = serverError?.error?.errors;

                if (validationErrors) {
                    Object.keys(validationErrors).forEach((fieldName) => {
                        form.setError(fieldName as keyof ICreateBook, {
                            type: "server",
                            message: validationErrors[fieldName].message,
                        });
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: serverError?.message || "Something went wrong!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        }
    }
    return (
        <Dialog open={open} onOpenChange={(isOpen) => dispatch(setAddBook(isOpen))}>
            <DialogTrigger asChild>
                <Button className=''>Add Book</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogDescription className="sr-only">Fill up this form</DialogDescription>
                <DialogHeader>
                    <DialogTitle className='text-center font-bold text-blue-700 text-2xl'>Add Book</DialogTitle>
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
                                        <Input {...field} value={field.value || " "} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Input {...field} value={field.value || " "} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Genre</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                        <Input {...field} value={field.value || " "} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Textarea {...field} value={field.value || " "} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Input  {...field} value={field.value || " "} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="available"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Availability (optional)</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value === "true" ? true : false)} defaultValue="true">
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

export default AddBookModal;