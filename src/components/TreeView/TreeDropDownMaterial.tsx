import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import { materialByid } from "materials-Props";
import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MaterialForm } from "../../forms/MaterialForm";
import { deleteMaterialByID } from "../../store/actions/materials.action";
import { getMaterialByID } from "../../store/reducer/materials.reducer";
import { WarningToast } from "../../utils/toasts";
import IconCaretDown from "../Icon/IconCaretDown";
import IconFolder from "../Icon/IconFolder";
import IconPencil from "../Icon/IconPencil";
import IconPlus from "../Icon/IconPlus";
import IconTrashLines from "../Icon/IconTrashLines";
import AuthLayout from "../Layouts/AuthLayout";
import DrawerModal from "../Layouts/Drawer";
import TreeItemMaterials from "./TreeItemMaterials";
interface TreeDropDownMaterialProps {
    name?: string,
    subMenu?: Array<materialByid>,
    isOpen: boolean,
    id: string,
    OncleseApicall: () => void
}

const TreeDropDownMaterial: React.FC<TreeDropDownMaterialProps>
    = ({ name, subMenu, isOpen, id, OncleseApicall }) => {
        const [pagesSubMenu, setPagesSubMenu] = useState(false);
        const [opened, { open, close }] = useDisclosure(false);
        const dispatch = useDispatch();
        const Params = useParams();
        useEffect(() => {
            return (
                setPagesSubMenu(false)
            );
        }, [isOpen]);
        return (
            <React.Fragment>
                <li className="py-[5px]">
                    <div className="flex gap-5">
                        <button type="button"
                            className={`${pagesSubMenu ? "open" : ""} text-lg font-semibold text-left`}
                            onClick={() => setPagesSubMenu(!pagesSubMenu)}>
                            <IconCaretDown className={`w-6 h-6 text-black inline relative -top-1 ltr:mr-2 rtl:ml-2 ${pagesSubMenu && "rotate-180"}`} />
                            <IconFolder className="w-10 h-10 text-black inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                            {name}
                        </button>
                        <AuthLayout actions={["admin.resource-material.create"]}>
                            <Tippy content="Add">
                                <button type="button"
                                    onClick={() => {
                                        open();
                                    }}>
                                    <IconPlus />
                                </button>
                            </Tippy>
                        </AuthLayout>
                        <AuthLayout actions={["admin.resource-material.edit"]}>
                            <Tippy content="Edit">
                                <button type="button"
                                    onClick={() => {
                                        dispatch(getMaterialByID(id));
                                        open();
                                    }}>
                                    <IconPencil className="w-4 h-4 text-primary" />
                                </button>
                            </Tippy>
                        </AuthLayout>
                        <AuthLayout actions={["admin.resource-material.delete"]}>
                            <Tippy content="Delete">
                                <button type="button"
                                    onClick={() => {
                                        WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                            if (isConfirmed) {
                                                dispatch(deleteMaterialByID(
                                                    id,
                                                    (res) => {
                                                        if (res?.status) {
                                                            OncleseApicall();
                                                        }
                                                    }));
                                            }
                                        });
                                    }}>
                                    <IconTrashLines className="w-4 h-4 text-[red]" />
                                </button>
                            </Tippy>
                        </AuthLayout>
                    </div>
                    <AnimateHeight duration={300}
                        height={pagesSubMenu ? "auto" : 0}>
                        <ul className="ltr:pl-14 rtl:pr-14  ">
                            {subMenu?.map((item) => {
                                if (item?.typeOfMaterials === "folder")
                                    return (
                                        <TreeDropDownMaterial
                                            key={item?._id}
                                            id={item?._id || ""}
                                            name={item?.title?.en || ""}
                                            subMenu={item.children?.slice()?.sort((a, b) => a.index - b.index)}
                                            isOpen={pagesSubMenu ? true : false}
                                            OncleseApicall={OncleseApicall}
                                        />
                                    );
                                return (
                                    <TreeItemMaterials
                                        type={item?.typeOfMaterials}
                                        name={item?.title?.en}
                                        key={item?._id}
                                        id={item?._id || ""}
                                        OncleseApicall={OncleseApicall}
                                    />
                                );
                            })}
                        </ul>
                    </AnimateHeight>
                </li>
                <DrawerModal
                    opened={opened}
                    onClose={() => {
                        OncleseApicall();
                        close();
                    }}
                    headerStyle={{ backgroundColor: "#FAFBFA" }}
                    contentStyle={{ flexBasis: "85%", backgroundColor: "#FAFBFA" }}>
                    <MaterialForm id={id}
                        close={() => {
                            OncleseApicall();
                            close();
                        }} />
                </DrawerModal>
            </React.Fragment>
        );
    };
export default TreeDropDownMaterial;
