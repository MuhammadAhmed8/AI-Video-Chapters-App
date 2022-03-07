import { Outlet } from "react-router";
import Sidebar from "../../components/sidebar/sidebar";

export default function LayoutWithNarrowSidebar(props){
    return (
        <main className="main-container">
             <section style={{width:"7%"}}>
            </section>
            <section style={{width:"93%"}}>
                <Outlet/>
            </section>
        </main>
    )
}