import { Link } from "react-router";
const Footer = () => {
    return (
        <>
            <div className="bg-white text-blue-700 shadow-md">
                <div className="max-w-11/12 lg:max-w-10/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-1 md:gap-2 px-4 py-4 md:py-6">
                    <p className="text-center font-bold"> 
                        @ {new Date().getFullYear()}
                        <Link to="/" className="text-sky-700 ms-2">BookGrid</Link> 
                        All Right Reserved.
                    </p>
                    <p className="text-center font-bold"> 
                        Developed By - Rakib Gazi
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;