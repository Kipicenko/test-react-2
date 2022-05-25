import {useTypedDispatch, useTypedSelector} from "../typedReduxHooks";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {ReactComponent as HomeSVG } from "../svgs/home.svg";
import {ReactComponent as PromoSVG } from "../svgs/promosvg.svg";
import { Scrollbars } from "react-custom-scrollbars";
import {filterPromoCodes} from "../redux/slices/dataGlobalSlice";
import cn from "classnames";


function Sidebar() {
    const [path, setPath] = useState<string>(window.location.pathname)
    const { sidebarOpen, promoFilter } = useTypedSelector(({dataGlobal}) => dataGlobal)
    const dispatch = useTypedDispatch()
    let location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location]);

    return (
        <aside className={"sidebar" + (sidebarOpen ? "" : " sidebar-hidden")}>
            <div className="sidebar__container">
                <div className="sidebar__container-scroll">
                    <Scrollbars
                        autoHide
                        autoHideTimeout={500}
                        autoHideDuration={200}
                        className="container-scroll-parent"
                    >
                        <ul className="sidebar__list">
                            <li onClick={() => {
                                dispatch(filterPromoCodes(""))
                            }}
                                className={cn('sidebar__item', {
                                    'sidebar__item-active': path === "/",
                                })}
                            >
                                <Link className="sidebar__link" to="/">
                                    <div className="sidebar__icon">
                                        <HomeSVG width={24} height={24}/>
                                    </div>
                                    <span className="sidebar__text">Главная</span>
                                </Link>
                            </li>
                            <li onClick={() => {
                                dispatch(filterPromoCodes(""))
                            }}
                                className={cn('sidebar__item', {
                                    'sidebar__item-active': path.includes("/promo")
                                })}
                            >
                                <Link className="sidebar__link" to="promo">
                                    <div className="sidebar__icon">
                                       <PromoSVG width={24} height={24}/>
                                    </div>
                                    <span className="sidebar__text">Промокоды</span>
                                </Link>
                                <ul onClick={(e) => e.stopPropagation()} className="sidebar__sublist">
                                    <li
                                        onClick={() => dispatch(filterPromoCodes("Новый"))}
                                        className="sidebar__sublist-item"
                                    >
                                        <Link
                                            className={cn('sidebar__sublist-link', {
                                                'sidebar__sublist-link-active': promoFilter === "Новый"
                                            })}
                                            to="promo"
                                        >
                                            Новые
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() => dispatch(filterPromoCodes("Использованный"))}
                                        className="sidebar__sublist-item"
                                    >
                                        <Link
                                            className={cn('sidebar__sublist-link', {
                                                'sidebar__sublist-link-active': promoFilter === "Использованный"
                                            })}
                                            to="promo"
                                        >
                                            Использованные
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Scrollbars>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;