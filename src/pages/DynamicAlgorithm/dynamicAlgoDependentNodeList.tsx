import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconLoader from "../../components/Icon/IconLoader";
import IconPlus from "../../components/Icon/IconPlus";
import { BoxCard } from "../../components/Layouts/BoxCard";
import DrawerModal from "../../components/Layouts/Drawer";
import TreeDropDownDynamicAlgo from "../../components/TreeView/TreeDropDownDynamicAlgo";
import TreeItemDynamicAlgo from "../../components/TreeView/TreeItemDynamicAlgo";
import { IRootState } from "../../store";
import { clearDescendantsDynamicAlgoByID, clearDynamicAlgoByID, getDescendantsDynamicAlgoByID } from "../../store/reducer/dynamicAlgo.reducer";
import { clearCaderBytypesList, getAllStateList, getCaderBytypesList } from "../../store/reducer/masterTable.reducer";
import { DecendentEditForm } from "./DecendentEditForm";

const dynamicAlgoDependentNodeList = () => {
    const Params = useParams();
    const dispatch = useDispatch();
    const { descendantsDynamicAlgo, loader } = useSelector((state: IRootState) => state.dynamicAlgo);
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getCaderBytypesList(""));
        dispatch(getDescendantsDynamicAlgoByID(Params?.id));
        return () => {
            dispatch(clearDescendantsDynamicAlgoByID());
            dispatch(clearDynamicAlgoByID());
            dispatch(clearCaderBytypesList());
        };
    }, []);
    const OncleseApicall = () => {
        dispatch(clearDynamicAlgoByID());
        dispatch(getDescendantsDynamicAlgoByID(Params?.id));
    };
    return (
        <BoxCard headerName={descendantsDynamicAlgo?.title?.en}
            rightComponent={
                <PrimaryBtn
                    title="Add New"
                    leftIcon={<IconPlus />}
                    onClick={() => open()} />}>
            {loader && descendantsDynamicAlgo == undefined ? (
                <IconLoader
                    className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"
                />
            ) : (
                <ul>
                    {descendantsDynamicAlgo?.children?.length ? (
                        descendantsDynamicAlgo.children
                            .slice()
                            .sort((a, b) => a.index - b.index)
                            .map((item) => {
                                if (item?.isExpandable) {
                                    return (
                                        <TreeDropDownDynamicAlgo
                                            isOpen
                                            id={item?._id}
                                            key={item?._id}
                                            name={item?.title?.en}
                                            subMenu={item?.children?.slice()?.sort((a, b) => a.index - b.index)}
                                            OncleseApicall={OncleseApicall}
                                        />
                                    );
                                }
                                return (
                                    <TreeItemDynamicAlgo
                                        name={item?.title?.en}
                                        key={item?._id}
                                        id={item?._id}
                                        OncleseApicall={OncleseApicall}
                                    />
                                );
                            })
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
                            <p className="text-lg font-semibold">No Dynamic Algorithms Found</p>
                            <p className="text-sm">Try adding a new dynamic algorithm to get started.</p>
                        </div>)}
                </ul>
            )}
            <DrawerModal
                opened={opened}
                onClose={() => {
                    OncleseApicall();
                    close();
                }}
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: "85%", backgroundColor: "#FAFBFA" }}>
                <DecendentEditForm id={Params?.id as string}
                    close={() => {
                        OncleseApicall();
                        close();
                    }} />
            </DrawerModal>
        </BoxCard>
    );
};
export default dynamicAlgoDependentNodeList;
