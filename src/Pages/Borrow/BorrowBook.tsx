import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { BackendValidationError, IBook, ICreateBook } from "@/types/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/api/Api";
import Swal from 'sweetalert2';
import { PropagateLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect } from "react";
const BorrowBook = () => {
    const navigate = useNavigate();
    const { bookId } = useParams<{ bookId: string }>();
    const { data } = useGetSingleBookQuery(bookId);

    const book = data?.data;

    const form = useForm<IBook>({
        defaultValues: {
            title: book?.title,
            author: book?.author,
            genre: book?.genre,
            isbn: book?.isbn,
            description: book?.description,
            copies: book?.copies,
            available: book?.available
        },
    });
    useEffect(() => {
        if (book) {
            form.reset(book);
        }
    }, [book, form]);
    const [updateBook, { isLoading }] = useUpdateBookMutation();
    const genreData = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];

    const onSubmit: SubmitHandler<ICreateBook> = async (data) => {
        const convertedData = {
            ...data,
            _id: book._id,
            copies: Number(data.copies),
        };
        try {

            const res = await updateBook(convertedData).unwrap();
            if (res?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Book Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                form.reset();
                navigate("/books");
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
                    });
                }
            }
        }

    }
    return (
        <div className="mx-auto bg-white rounded-3xl shadow-md my-8 p-4 grid grid-cols-2 gap-4">

            <div>
                <div>
                    <h1 className="text-blue-700 font-bold text-2xl text-center">Borrow Book</h1>

                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value ?? ""} />
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
                                        <Input {...field} value={field.value ?? ""} />
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
                                    <Select
                                        value={field.value ?? ""}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select a Genre" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {genreData.map((genre) => (
                                                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                            ))}
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
                                        <Input {...field} value={field.value ?? ""} />
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
                                        <Textarea {...field} value={field.value ?? ""} />
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
                                        <Input  {...field} value={field.value ?? ""} />
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
                                    <Select onValueChange={(value) => field.onChange(value === "true" ? true : false)} defaultValue={field.value !== undefined ? (field.value ? "true" : "false") : "true"}>
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
                        <div>
                            <Button className="w-full flex items-center justify-center">{isLoading ? <PropagateLoader className="pb-3" color="#ffffff" /> : "Submit"}</Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div>
                <DotLottieReact
                    src="https://lottie.host/79987434-603f-40c1-9785-68b45b77394a/gmmBiyWrlh.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default BorrowBook;