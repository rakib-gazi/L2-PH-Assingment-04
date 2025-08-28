import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useCreateBorrowMutation } from '@/redux/api/Api';
import type { BackendValidationError, ICreateBorrow, UpdateBookModalProps } from '@/types/types';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaBookOpenReader } from "react-icons/fa6";
const BorrowBookModal = ({ book }: UpdateBookModalProps) => {
    const [open, setOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const form = useForm<ICreateBorrow>();
    const [createBorrow] = useCreateBorrowMutation();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<ICreateBorrow> = async (data) => {
        try {
            const convertedData = {
                ...data,
                book: book._id,
                quantity: Number(data.quantity),
            }
            const res = await createBorrow(convertedData).unwrap()
            if (res?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Book Borrowed Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setOpen(false);
                form.reset();
                navigate("/borrow-summary");
            }
        } catch (err: unknown) {
            if ((err as FetchBaseQueryError)?.status) {
                const error = err as FetchBaseQueryError;
                const serverError = error.data as BackendValidationError["data"];

                const validationErrors = serverError?.error?.errors;

                if (validationErrors) {
                    Object.keys(validationErrors).forEach((fieldName) => {
                        form.setError(fieldName as keyof ICreateBorrow, {
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
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="borrowButton" ><FaBookOpenReader className='size-5'/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogDescription className="sr-only">Fill up this form</DialogDescription>
                <DialogHeader>
                    <DialogTitle className='text-center font-bold text-blue-700 text-2xl'>Borrow Book</DialogTitle>
                    <DialogDescription className='text-center text-black font-bold'>
                        {book.title}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input  {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => {


                                return (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="secondary"
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Select date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        field.onChange(date);
                                                        setPopoverOpen(false);
                                                    }}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
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

export default BorrowBookModal;