
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery : fetchBaseQuery ({baseUrl: "https://l2-ph-assingment-04-server.vercel.app/api"}),
    tagTypes: ["task", "books","borrow"],
    endpoints: (builder)=>({
        getBooks: builder.query({
            query:()=> `/books`,
            providesTags: ["books"],
        }),
        getSingleBook: builder.query({
            query:(id)=> `/books/${id}`,
            providesTags: ["books"],
        }),
        createBook: builder.mutation({
            query: (bookData)=>({
                url:"/books",
                method:"POST",
                body: bookData
            }),
            invalidatesTags: ["books"]
        }),
        updateBook :  builder.mutation({
            query: (updatedBookData)=>({
                url:`/books/${updatedBookData._id}`,
                method: "PUT",
                body: updatedBookData
            }),
            invalidatesTags: ["books"]
        }),
        deleteBook: builder.mutation ({
            query: (id)=>({
                url:`/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["books"]
        }),
        createBorrow: builder.mutation({
            query:(borrowData)=>({
                url: "/borrow",
                method:"POST",
                body: borrowData
            }),
            invalidatesTags: ["books","borrow"]
        }),
        getBorrowBookSummary : builder.query({
            query: ()=> "/borrow",
            providesTags:["borrow"]
        })
    }),
})
export const {useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useGetSingleBookQuery, useCreateBorrowMutation,useGetBorrowBookSummaryQuery} = baseApi;