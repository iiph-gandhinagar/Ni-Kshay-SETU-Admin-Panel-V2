import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IRootState } from "../store";
import getRouters from "./routes";

const RouterWrapper = () => {
    const { isToken } = useSelector((state: IRootState) => state.auth);
    const routes = useMemo(() => getRouters(isToken), [isToken]);
    const router = createBrowserRouter(routes);
    return (
        <RouterProvider router={router} />
    );
};

export default RouterWrapper;
