import {useTypedSelector} from "../typedReduxHooks";
import PromoCodes from "./PromoCodes";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PromoEdit from "./PromoEdit";

function Main() {
    const { sidebarOpen, promoFilter } = useTypedSelector(({dataGlobal}) => dataGlobal)

    return (
        <main className="main" style={sidebarOpen ? {paddingLeft: "250px"} : {paddingLeft: "0"}}>
            <div className="main__container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/promo" element={<PromoCodes promoFilter={promoFilter}/>}/>
                    <Route path="/promo/:id" element={<PromoEdit/>}/>
                </Routes>
            </div>
        </main>
    );
}

export default Main;