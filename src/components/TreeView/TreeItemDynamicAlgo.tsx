import { useDisclosure } from "@mantine/hooks";
import Tippy from "@tippyjs/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AlgorithmForm } from "../../forms/AlgorithmForm";
import { deleteNodeById } from "../../store/actions/patientManagement.action";
import { clearDescendantsNodeByID, getNodeById } from "../../store/reducer/patientManagement.reducer";
import { WarningToast } from "../../utils/toasts";
import IconPencil from "../Icon/IconPencil";
import IconTrashLines from "../Icon/IconTrashLines";
import IconTxtFile from "../Icon/IconTxtFile";
import DrawerModal from "../Layouts/Drawer";
import { deleteDynamicAlgoByID } from "../../store/actions/dynamicAlgo.action";
import { DecendentEditForm } from "../../pages/DynamicAlgorithm/DecendentEditForm";
import { getDynamicAlgoByID } from "../../store/reducer/dynamicAlgo.reducer";

const TreeItemDynamicAlgo: React.FC<{ name?: string, id: string, OncleseApicall: () => void }> = ({ name, id, OncleseApicall }) => {
    const Params = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <li className="py-[5px] flex items-center gap-5 ">
                <div className="flex items-center">
                    <IconTxtFile className="w-4.5 h-4.5 text-primary inline ltr:mr-2 rtl:ml-2" />
                    <p className="text-lg font-medium">{name}</p>
                </div>
                <Tippy content="Edit">
                    <button type="button"
                        onClick={() => {
                            dispatch(getDynamicAlgoByID(id));
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
                                    dispatch(deleteDynamicAlgoByID(
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
            </li>
            <DrawerModal
                opened={opened}
                onClose={() => {
                    OncleseApicall();
                    close();
                }}
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: "85%", backgroundColor: "#FAFBFA" }}>
                <DecendentEditForm id={id}
                    close={() => {
                        OncleseApicall();
                        close();
                    }} />
            </DrawerModal>
        </React.Fragment>
    );
};
export default TreeItemDynamicAlgo;
