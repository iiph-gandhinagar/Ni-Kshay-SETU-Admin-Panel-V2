import React from "react";
import Dropdown from "../Dropdown";
import IconFilter from "../Icon/IconFilter";

interface CustomHeaderProps {
    column: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ column, }) => {
    return (
        <div className='flex flex-1 '>
            <div className='flex flex-1 justify-between '>{column.name}
                <div className="dropdown relative">
                    <Dropdown
                        placement={"bottom-end"}
                        btnClassName="!flex font-semibold  rounded-md px-4 py-2 "
                        button={
                            <IconFilter className='mr-3' />
                        }
                    >
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default CustomHeader;
