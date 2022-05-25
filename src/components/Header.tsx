import {useTypedDispatch, useTypedSelector} from "../typedReduxHooks";
import {toggleSidebar} from "../redux/slices/dataGlobalSlice";
import {storage} from "../storage";



function Header() {
    const { sidebarOpen } = useTypedSelector(({dataGlobal}) => dataGlobal)
    const dispatch = useTypedDispatch()

    const toggleTheme = (): void => {
       let currentTheme: string = (storage.getItem('theme') || 'light') === "light" ? "dark" : "light"
        document.documentElement.dataset.theme = currentTheme
        storage.setItem('theme', currentTheme)
    }

    const toggleBurger = (): void => {
        dispatch(toggleSidebar(!sidebarOpen))
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__container-left">
                    <button onClick={toggleBurger} className="btn-reset burger" aria-label="Открыть меню">
                        <span className="burger__line"/>
                    </button>
                    <h1 className="header__container-title">Тестовое задание</h1>
                </div>
                <div className="header__container-right">
                    <div onClick={toggleTheme} className="switch">
                        <span className="switch__block"/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;