import { Outlet } from "react-router";
import Sidebar from "../../components/sidebar/sidebar";

export default function LayoutWithSidebar(props){
    return (
        <main className="main-container">
             {/* <section style={{width:"15%"}}>
              <Sidebar></Sidebar>
            </section> */}
            <section style={{width:"100%"}}>
                <Outlet/>
            </section>
        </main>
    )
}