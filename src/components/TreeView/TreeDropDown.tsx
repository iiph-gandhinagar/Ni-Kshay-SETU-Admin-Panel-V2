import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import { diagnosisNodesDetailsWithChildren } from "patient-management-reducer";
import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AlgorithmForm } from "../../forms/AlgorithmForm";
import { deleteNodeById } from "../../store/actions/patientManagement.action";
import { getNodeById } from "../../store/reducer/patientManagement.reducer";
import { WarningToast } from "../../utils/toasts";
import IconCaretDown from "../Icon/IconCaretDown";
import IconFolder from "../Icon/IconFolder";
import IconPencil from "../Icon/IconPencil";
import IconPlus from "../Icon/IconPlus";
import IconTrashLines from "../Icon/IconTrashLines";
import DrawerModal from "../Layouts/Drawer";
import TreeItem from "./TreeItem";

const TreeDropDown: React.FC<{ name?: string, subMenu?: Array<diagnosisNodesDetailsWithChildren>, isOpen: boolean, id: string, OncleseApicall: () => void }>
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
                            <IconCaretDown className={`w-6 h-6 text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2 ${pagesSubMenu && "rotate-180"}`} />
                            <IconFolder className="text-primary inline relative -top-1 ltr:mr-2 rtl:ml-2" />
                            {name}
                        </button>
                        <Tippy content="Add">
                            <button type="button"
                                onClick={() => {
                                    open();
                                }}>
                                <IconPlus />
                            </button>
                        </Tippy>
                        <Tippy content="Edit">
                            <button type="button"
                                onClick={() => {
                                    dispatch(getNodeById({ id: id, slug: Params?.slug, }));
                                    open();
                                }}>
                                <IconPencil className="w-4 h-4 text-primary" />
                            </button>
                        </Tippy>
                        <Tippy content="Delete">
                            <button type="button"
                                onClick={() => {
                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                        if (isConfirmed) {
                                            dispatch(deleteNodeById(
                                                Params?.slug,
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
                    </div>
                    <AnimateHeight duration={300}
                        height={pagesSubMenu ? "auto" : 0}>
                        <ul className="ltr:pl-14 rtl:pr-14  ">
                            {subMenu?.map((item) => {
                                if (item.nodeType === "Linking Node")
                                    return (
                                        <TreeDropDown
                                            key={item?.title?.en}
                                            id={item?._id}
                                            name={item?.title?.en || ""}
                                            subMenu={item.children?.slice()?.sort((a, b) => a.index - b.index)}
                                            isOpen={pagesSubMenu ? true : false}
                                            OncleseApicall={OncleseApicall}
                                        />
                                    );
                                return (
                                    <TreeItem
                                        name={item?.title?.en || ""}
                                        key={item?.title?.en}
                                        id={item?._id}
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
                    <AlgorithmForm id={id}
                        close={() => {
                            OncleseApicall();
                            close();
                        }} />
                </DrawerModal>
            </React.Fragment>
        );
    };
export default TreeDropDown;
