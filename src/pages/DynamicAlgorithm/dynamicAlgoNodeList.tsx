import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AlgorithmsViewCard from "../../components/AlgorithmsViewCard";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconLoader from "../../components/Icon/IconLoader";
import { BoxCard } from "../../components/Layouts/BoxCard";
import DrawerModal from "../../components/Layouts/Drawer";
import { IRootState } from "../../store";
import { deleteDynamicAlgoByID } from "../../store/actions/dynamicAlgo.action";
import { getAllRootDynamicAlgo } from "../../store/reducer/dynamicAlgo.reducer";
import { getAllCadreList, getAllStateList } from "../../store/reducer/masterTable.reducer";
import { clearDisplayMasterNodes } from "../../store/reducer/patientManagement.reducer";
import { WarningToast } from "../../utils/toasts";
import { RootChildDynamicAlgoEditForm } from "./RootChildDynamicAlgoEditForm";

const dynamicAlgoNodeList = () => {
    const Params = useParams();
    const { allRootDynamicAlgo, loader } = useSelector((stste: IRootState) => stste.dynamicAlgo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [node, setNode] = useState<any>(null);
    const location = useLocation();
    const algoId = location?.state;
    useEffect(() => {
        dispatch(getAllRootDynamicAlgo(algoId));
        dispatch(getAllStateList());
        dispatch(getAllCadreList());
        return () => {
            dispatch(clearDisplayMasterNodes());
        };
    }, [Params?.slug]);
    return (
        <BoxCard headerName={Params?.slug}
            rightComponent={<PrimaryBtn title="Add New Algorithm"
                onClick={() => {
                    setNode(null);
                    setIsModelOpen(true);
                }} />}>
            {loader && allRootDynamicAlgo?.length === 0 ? (
                <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
            ) : (
                <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                    {allRootDynamicAlgo?.length ? (
                        allRootDynamicAlgo
                            .slice()
                            .sort((a, b) => a.index - b.index)
                            .map((e) => (
                                <AlgorithmsViewCard
                                    className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                                    onEdit={() => {
                                        setNode(e);
                                        setIsModelOpen(true);
                                    }}
                                    onDelete={() => {
                                        WarningToast("Are you sure you want to delete this algorithm?", "This action can't be undone", (isConfirmed: any) => {
                                            if (isConfirmed) {
                                                dispatch(deleteDynamicAlgoByID(e._id, (res) => {
                                                    if (res?.status) {
                                                        dispatch(getAllRootDynamicAlgo(algoId));
                                                    }
                                                }));
                                            }
                                        });
                                    }}
                                    onClick={() => {
                                        if (e._id) navigate("/dynamic_algorithm/" + Params?.slug + "/" + e._id, { state: algoId });
                                    }}
                                    key={e?.title?.en}
                                    title={e?.title?.en as string}
                                    icon={e?.icon}
                                />
                            ))
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
                            <p className="text-lg font-semibold">No Dynamic Algorithms Found</p>
                            <p className="text-sm">Try adding a new dynamic algorithm to get started.</p>
                        </div>)}
                </div>
            )}
            <DrawerModal
                opened={isModelOpen}
                onClose={() => {
                    dispatch(getAllRootDynamicAlgo(algoId));
                    setIsModelOpen(false);
                }}
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: "85%", backgroundColor: "#FAFBFA" }}>
                <RootChildDynamicAlgoEditForm
                    node={node}
                    close={() => {
                        setIsModelOpen(false);
                        dispatch(getAllRootDynamicAlgo(algoId));
                    }}
                />
            </DrawerModal>
        </BoxCard>
    );
};

export default dynamicAlgoNodeList;
