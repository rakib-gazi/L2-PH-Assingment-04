import { useGetSingleBookQuery } from "@/redux/api/Api";
import { Link, useParams } from "react-router";
import { SyncLoader } from "react-spinners";


const SingleBook = () => {
    const { id } = useParams<{ id: string }>();
    const { data,isLoading,isFetching } = useGetSingleBookQuery(id);

    if (isLoading || isFetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <SyncLoader color="#2032da" size={20} />
            </div>
        );
    }
    const book = data?.data;
    return (
        <div className="mx-auto bg-white rounded-3xl shadow-md my-8 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-start">
                <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg shadow-lg w-[100%] md:w-auto">
                    <img
                        src="/book1.jpg"
                        alt="Book Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-[15%] left-0 right-0 p-6 text-center">
                        <h2 className="w-[75%] mx-auto text-xl md:text-4xl capitalize font-bold text-[#2c503e]">
                            {book?.title}
                        </h2>
                        <p className="text-[#2c503e] text-sm md:text-base">
                            by {book?.author}
                        </p>
                    </div>
                    <div className="absolute bottom-[10%] font-semibold left-0 right-0 p-6 text-center">
                        <p className="w-[90%] mx-auto capitalize  text-[#d3e7bb]">
                            {book?.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 hidden md:block">
                    <Link className="bg-blue-700 text-primary-foreground shadow-xs hover:bg-green-950 px-3 py-1.5 font-bold rounded-md" to="/books">Go Back</Link>
                </div>
                <h2 className="text-2xl md:text-4xl capitalize font-bold mb-6">{book?.title}</h2>
                <p className="text-gray-600 mb-4 capitalize text-lg">Author: {book?.author}</p>
                <p className="text-gray-700 leading-relaxed">
                    {book?.description}
                </p>
            </div>
        </div>
    );
};

export default SingleBook;