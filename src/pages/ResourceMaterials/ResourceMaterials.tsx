import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlgorithmsViewCard from "../../components/AlgorithmsViewCard";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconLoader from "../../components/Icon/IconLoader";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { BoxCard } from "../../components/Layouts/BoxCard";
import DrawerModal from "../../components/Layouts/Drawer";
import { MaterialForm } from "../../forms/MaterialForm";
import { IRootState } from "../../store";
import { deleteMaterialByID, sendResourceMaterialNotification } from "../../store/actions/materials.action";
import { clearCaderBytypesList, cleartAllCountryList, cleartAllStateList, getAllCountryList, getAllStateList, getCaderBytypesList } from "../../store/reducer/masterTable.reducer";
import { clearAllRootMaterial, getAllRootMaterial } from "../../store/reducer/materials.reducer";
import { ErrorToast, SuccessToast, WarningToast } from "../../utils/toasts";

const ResourceMaterials = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allRootMaterial, loader } = useSelector((stste: IRootState) => stste.materials);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [rootMaterial, setRootMaterial] = useState<any>(null);
    useEffect(() => {
        dispatch(getAllRootMaterial());
        dispatch(getCaderBytypesList(""));
        dispatch(getAllCountryList());
        dispatch(getAllStateList());
        return () => {
            dispatch(clearAllRootMaterial());
            dispatch(clearCaderBytypesList());
            dispatch(cleartAllStateList());
            dispatch(cleartAllCountryList());
        };
    }, []);
    return (
        <BoxCard headerName={"Resource Materials"}
            rightComponent={<PrimaryBtn title="Add Resource Material"
                onClick={() => {
                    setRootMaterial(null);
                    setIsModelOpen(true);
                }} />}>
            {loader ? (
                <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
            ) : (
                <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                    {allRootMaterial?.length ? (
                        allRootMaterial
                            .slice()
                            .sort((a: any, b: any) => a.index - b.index)
                            .map((e) => (
                                <AuthLayout key={e?._id}
                                    actions={["admin.resource-material.master-nodes"]}>
                                    <AlgorithmsViewCard
                                        className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                                        onNotify={() => {
                                            dispatch(sendResourceMaterialNotification(e?._id, (res) => {
                                                if (res?.status) {
                                                    dispatch(getAllRootMaterial());
                                                    SuccessToast(res?.message);
                                                } else {
                                                    ErrorToast(res?.message);
                                                }
                                            }));
                                        }}
                                        onEdit={() => {
                                            setRootMaterial(e);
                                            setIsModelOpen(true);
                                        }}
                                        onDelete={() => {
                                            WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                if (isConfirmed) {
                                                    dispatch(deleteMaterialByID(e?._id, (res) => {
                                                        if (res?.status) {
                                                            dispatch(getAllRootMaterial());
                                                        }
                                                    }));
                                                }
                                            });
                                        }}
                                        onClick={() => {
                                            navigate("/resource-materials/" + e._id);
                                        }}
                                        key={e?.title?.en}
                                        title={e?.title?.en || ""}
                                    />
                                </AuthLayout>
                            ))
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
                            <p className="text-lg font-semibold">No Materials Found</p>
                            <p className="text-sm">Try adding a new material to get started.</p>
                        </div>)}
                </div>
            )}
            <DrawerModal
                opened={isModelOpen}
                onClose={() => {
                    setIsModelOpen(false);
                    dispatch(getAllRootMaterial());
                }}
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: "85%", backgroundColor: "#FAFBFA" }}>
                <MaterialForm
                    isRoot={true}
                    rootMaterial={rootMaterial}
                    close={() => {
                        setIsModelOpen(false);
                        dispatch(getAllRootMaterial());
                    }} />
            </DrawerModal>
        </BoxCard>
    );
};

export default ResourceMaterials;
