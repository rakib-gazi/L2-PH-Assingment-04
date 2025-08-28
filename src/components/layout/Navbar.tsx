import { Link } from "react-router";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { setNavbar } from "../../redux/appSlice";
import type { RootState } from "@/redux/store";
const Navbar = () => {
    const dispatch = useDispatch();
    const open = useSelector((state: RootState) => state.modal.navbar);
    return (
        <>
            <div className="bg-white text-blue-700 shadow-md">
                <nav className="max-w-11/12 lg:max-w-10/12 mx-auto h-16 flex items-center justify-between gap-2">
                    <div className="flex items-center">
                        <Link className="font-bold text-2xl hover:text-green-950" to="/">BookGrid</Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center justify-between gap-2 font-bold ">
                            <Link className="hover:bg-blue-700 px-4 py-1 rounded-2xl hover:text-white" to="/create-book">Add Book</Link>
                            <Link className="hover:bg-blue-700 px-4 py-1 rounded-2xl hover:text-white" to="/books">All Books</Link>
                            <Link className="hover:bg-blue-700 px-4 py-1 rounded-2xl hover:text-white" to="/borrow-summary">Borrow Summary</Link>
                        </div>
                    </div>
                    <div className="block md:hidden">
                        <Sheet open={open} onOpenChange={(isOpen) => dispatch(setNavbar(isOpen))}>
                            <SheetTrigger><GiHamburgerMenu className="size-6" /></SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                                    <SheetDescription className="sr-only">
                                        Use the links below to navigate between pages.
                                    </SheetDescription>

                                </SheetHeader>
                                <div className="flex flex-col  justify-between gap-2 font-bold mt-12">
                                    <Link className="hover:bg-blue-700 px-4 py-1 rounded-2xl hover:text-white" to="/create-book"
                                        onClick={() => dispatch(setNavbar(false))}>Add Book</Link>
                                    <Separator />
                                    <Link className="hover:bg-blue-700 px-4 py-1 rounded-2xl hover:text-white" to="/books"
                                        onClick={() => dispatch(setNavbar(false))}>All Books</Link>
                                    <Separator />
                                    <Link className="hover:bg-blue-700 px-4 py-1 rounded-2xl hover:text-white" to="/borrow-summary"
                                        onClick={() => dispatch(setNavbar(false))}>Borrow Summary</Link>
                                    <Separator />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;