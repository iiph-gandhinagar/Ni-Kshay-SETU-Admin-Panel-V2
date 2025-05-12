import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MaterialForm } from "../../forms/MaterialForm";
import { deleteMaterialByID } from "../../store/actions/materials.action";
import { getMaterialByID } from "../../store/reducer/materials.reducer";
import { WarningToast } from "../../utils/toasts";
import IconPDF from "../Icon/IconPDF";
import IconPencil from "../Icon/IconPencil";
import IconPPT from "../Icon/IconPPT";
import IconTrashLines from "../Icon/IconTrashLines";
import IconVideo from "../Icon/IconVideo";
import IconZipFile from "../Icon/IconZipFile";
import AuthLayout from "../Layouts/AuthLayout";
import DrawerModal from "../Layouts/Drawer";
interface TreeItemMaterialsProps {
    name?: string,
    id: string,
    OncleseApicall: () => void;
    type: string
}
const TreeItemMaterials: React.FC<TreeItemMaterialsProps> = ({ name, id, OncleseApicall, type }) => {
    const Params = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <li className="py-[5px] flex items-center gap-5 ">
                <div className="flex items-center">
                    {type == "pdfs" || type == "pdf_office_orders" ?
                        <IconPDF className="w-10 h-10 inline ltr:mr-2 rtl:ml-2" /> :
                        type === "ppt" ?
                            <IconPPT className="w-10 h-10 inline ltr:mr-2 rtl:ml-2" /> :
                            type === "videos" ?
                                <IconVideo className="w-10 h-10 inline ltr:mr-2 rtl:ml-2" /> :
                                type === "images" ?
                                    <IconZipFile className="w-10 h-10 inline ltr:mr-2 rtl:ml-2" /> :
                                    null}
                    <p className="text-lg font-medium">{name}</p>
                </div>
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
export default TreeItemMaterials;
