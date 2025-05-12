import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconLoader from "../../components/Icon/IconLoader";
import IconPlus from "../../components/Icon/IconPlus";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { BoxCard } from "../../components/Layouts/BoxCard";
import DrawerModal from "../../components/Layouts/Drawer";
import TreeDropDownMaterial from "../../components/TreeView/TreeDropDownMaterial";
import TreeItemMaterials from "../../components/TreeView/TreeItemMaterials";
import { MaterialForm } from "../../forms/MaterialForm";
import { IRootState } from "../../store";
import { clearCaderBytypesList, cleartAllCountryList, cleartAllStateList, getAllCountryList, getAllStateList, getCaderBytypesList } from "../../store/reducer/masterTable.reducer";
import { clearDescendantsMaterialByID, clearMaterialByID, getDescendantsMaterialByID } from "../../store/reducer/materials.reducer";

const MaterialsList = () => {
    const Params = useParams();
    const dispatch = useDispatch();
    const [opened, { open, close }] = useDisclosure(false);
    const { descendantsMaterial, loader } = useSelector((state: IRootState) => state.materials);
    useEffect(() => {
        dispatch(getDescendantsMaterialByID(Params?.id));
        dispatch(getCaderBytypesList(""));
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        return () => {
            dispatch(clearMaterialByID());
            dispatch(clearCaderBytypesList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
            dispatch(clearDescendantsMaterialByID());
        };
    }, []);
    const OncleseApicall = () => {
        dispatch(clearMaterialByID());
        dispatch(getDescendantsMaterialByID(Params?.id));
    };
    return (
        <BoxCard headerName={descendantsMaterial?.title?.en}
            rightComponent={
                <AuthLayout actions={["admin.resource-material.create"]}>
                    <PrimaryBtn
                        title="Add New"
                        leftIcon={<IconPlus />}
                        onClick={() => open()} />
                </AuthLayout>
            }>

            {loader && descendantsMaterial == undefined ? (
                <IconLoader
                    className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"
                />
            ) : (
                <ul>
                    {descendantsMaterial?.children?.length ? (
                        descendantsMaterial.children
                            .slice()
                            .sort((a, b) => a.index - b.index)
                            .map((item) => {
                                if (item?.typeOfMaterials === "folder") {
                                    return (
                                        <TreeDropDownMaterial
                                            isOpen
                                            id={item?._id || ""}
                                            key={item?._id}
                                            name={item?.title?.en}
                                            subMenu={item?.children?.slice()?.sort((a, b) => a.index - b.index)}
                                            OncleseApicall={OncleseApicall}
                                        />
                                    );
                                }
                                return (
                                    <TreeItemMaterials
                                        type={item?.typeOfMaterials}
                                        name={item?.title?.en}
                                        key={item?._id}
                                        id={item?._id || ""}
                                        OncleseApicall={OncleseApicall}
                                    />
                                );
                            })
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
                            <p className="text-lg font-semibold">No Materials Found</p>
                            <p className="text-sm">Try adding a new material to get started.</p>
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
                <MaterialForm
                    id={Params?.id as string}
                    close={() => {
                        OncleseApicall();
                        close();
                    }} />
            </DrawerModal>
        </BoxCard>
    );
};

export default MaterialsList;
