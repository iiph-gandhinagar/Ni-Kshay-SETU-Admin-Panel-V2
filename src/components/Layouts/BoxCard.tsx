import { BoxCardProps } from "components";
import { useNavigate } from "react-router-dom";
import IconArrowLeft from "../Icon/IconArrowLeft";

export const BoxCard: React.FC<BoxCardProps> = ({
    children,
    className = "",
    headerName,
    rightComponent,
    showBackBtn = false
}) => {
    const navigate = useNavigate();
    return (
        <div className={"panel pt-6" + className}>
            {headerName && <div className={"bg-white pt-5 "}>
                <div className={"w-full flex items-center bg-white"}>
                    {showBackBtn && <div className="rotate-180 mr-3 cursor-pointer"
                        onClick={() => {
                            navigate(-1);
                        }}>
                        <IconArrowLeft />
                    </div>}
                    <span className="text-xl font-bold mr-auto">{headerName} </span>
                    {rightComponent}
                </div>
                <hr className='my-4' />
            </div>}
            {children}
        </div>
    );
};
