import Sidebar from "./Sidebar";
import Header from "./Header";
import UserProfile from "../UI/UserProfile";
import RightSidebar from "./RightSidebar";

const DashboardLayout = (props) => {
    return (
        <div className="flex w-full">
            <Sidebar/>
            <main className="w-full">
                {props.children}
            </main>
        </div>
    )
}

export default DashboardLayout;
