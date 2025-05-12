import { ReactNode } from "react";
import { Navigate, redirect } from "react-router-dom";
interface guestProps {
    children: ReactNode,
    user?: boolean
}
export const privateRoute = (user?: boolean) => {
    if (!user) {
        return redirect("/login");
    }
    return null;

};

export const GuestRoute = ({ children, user }: guestProps) => {
    if (user) {
        return <Navigate to="/"
            replace />;
    }
    return <>{children}</>;
};
export default privateRoute;
