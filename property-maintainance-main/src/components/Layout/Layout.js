import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = (props) => {
    return (
        <div className="flex w-full">
            <Sidebar/>
            <main className="w-full pt-3 px-10">
                <Header/>
                <div className="">
                    <h1 className='text-gray-600 text-lg font-bold my-3'>Dashboard/{props.title}</h1>
                    {props.children}
                </div>
            </main>
        </div>
    )
}

export default Layout;
