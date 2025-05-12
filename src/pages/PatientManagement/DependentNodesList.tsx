import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconLoader from "../../components/Icon/IconLoader";
import IconPlus from "../../components/Icon/IconPlus";
import { BoxCard } from "../../components/Layouts/BoxCard";
import DrawerModal from "../../components/Layouts/Drawer";
import TreeDropDown from "../../components/TreeView/TreeDropDown";
import TreeItem from "../../components/TreeView/TreeItem";
import { AlgorithmForm } from "../../forms/AlgorithmForm";
import { IRootState } from "../../store";
import { clearCaderBytypesList, clearRedirectNode, getAllStateList, getCaderBytypesList } from "../../store/reducer/masterTable.reducer";
import { clearDescendantsNodeByID, clearNodeById, getDescendantsNodeByID } from "../../store/reducer/patientManagement.reducer";

const DependentNodesList = () => {
    const Params = useParams();
    const dispatch = useDispatch();
    const { descendantsNodesBtId, loader } = useSelector((state: IRootState) => state.patient);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        dispatch(getAllStateList());
        dispatch(getCaderBytypesList(""));
        dispatch(getDescendantsNodeByID({ id: Params?.id, slug: Params?.slug }));
        return () => {
            dispatch(clearDescendantsNodeByID());
            dispatch(clearRedirectNode());
            dispatch(clearNodeById());
            dispatch(clearCaderBytypesList());
        };
    }, []);
    const OncleseApicall = () => {
        dispatch(clearRedirectNode());
        dispatch(clearNodeById());
        dispatch(getDescendantsNodeByID({ id: Params?.id, slug: Params?.slug }));
    };
    return (
        <BoxCard headerName={descendantsNodesBtId?.title?.en}
            rightComponent={
                <PrimaryBtn
                    title="Add New"
                    leftIcon={<IconPlus />}
                    onClick={() => open()} />}>
            {loader ? (
                <IconLoader
                    className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"
                />
            ) : (
                <ul>
                    {descendantsNodesBtId?.children?.length ? (
                        descendantsNodesBtId.children
                            .slice()
                            .sort((a, b) => a.index - b.index)
                            .map((item) => {
                                if (item?.isExpandable) {
                                    return (
                                        <TreeDropDown
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
                                    <TreeItem
                                        name={item?.title?.en}
                                        key={item?._id}
                                        id={item?._id}
                                        OncleseApicall={OncleseApicall}
                                    />
                                );
                            })
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
                            <p className="text-lg font-semibold">No Algorithms Found</p>
                            <p className="text-sm">Try adding a new algorithm to get started.</p>
                        </div>
                    )}
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
                <AlgorithmForm id={Params?.id as string}
                    close={() => {
                        OncleseApicall();
                        close();
                    }} />
            </DrawerModal>
        </BoxCard>
    );
};

export default DependentNodesList;
