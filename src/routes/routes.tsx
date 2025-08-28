
import { createBrowserRouter } from "react-router";
import App from "@/App"
import Books from "@/Pages/Book/Books";
import AddBook from "@/Pages/Book/AddBook";
import BorrowSummary from "@/Pages/Borrow/BorrowSummary";
import SingleBook from "@/Pages/Book/SingleBook";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index:true,
                element: <Books/>
            },
            {
                path: "books",
                element: <Books/>
            },
            {
                path: "create-book",
                element: <AddBook/>
            },
            {
                path: "books/:id",
                element: <SingleBook/>
            },
            {
                path: "borrow-summary",
                element: <BorrowSummary/>
            },

        ]
    },
]);
export default router;



