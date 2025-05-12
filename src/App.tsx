import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import store, { IRootState } from "./store";
import { getAuthUser } from "./store/reducer/auth.reducer";
import { toggleAnimation, toggleLayout, toggleLocale, toggleMenu, toggleNavbar, toggleRTL, toggleSemidark, toggleTheme } from "./store/themeConfigSlice";
const App = ({ children }: PropsWithChildren) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const { authUser } = useSelector((state: IRootState) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem("layout") || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem("rtlClass") || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem("animation") || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem("i18nextLng") || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem("semidark") || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);
    useEffect(() => {
        if (localStorage.getItem("token") && authUser == undefined) {
            dispatch(getAuthUser());
        }
    }, [authUser]);
    return (
        <QueryParamProvider adapter={ReactRouter6Adapter}>
            <div className={`${(store.getState().themeConfig.sidebar && "toggle-sidebar") || ""} ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass
                } main-section antialiased relative font-nunito text-sm font-normal`}>
                {children}
            </div>
        </QueryParamProvider>
    );
};

export default App;
