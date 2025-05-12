import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AlgorithmsViewCard from "../../components/AlgorithmsViewCard";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconLoader from "../../components/Icon/IconLoader";
import { BoxCard } from "../../components/Layouts/BoxCard";
import DrawerModal from "../../components/Layouts/Drawer";
import { RootAlgorithmForm } from "../../forms/RootAlgorithmForm";
import { IRootState } from "../../store";
import { deleteNodeById, sendAlgoNotification } from "../../store/actions/patientManagement.action";
import { getAllCadreList, getAllStateList } from "../../store/reducer/masterTable.reducer";
import { clearDisplayMasterNodes, getDisplayMasterNodes } from "../../store/reducer/patientManagement.reducer";
import { ErrorToast, SuccessToast, WarningToast } from "../../utils/toasts";

const DisplayNodesList = () => {
    const Params = useParams();
    const { displayMasterNodes, loader } = useSelector((stste: IRootState) => stste.patient);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [node, setNode] = useState<any>(null);
    const getTitle = () => {
        if (Params?.slug == "diagnosis") {
            return "Diagnosis Algorithm";
        }
        if (Params?.slug == "treatment") {
            return "Treatment Algorithm";
        }
        if (Params?.slug == "adr") {
            return "Ddverse Drug Reaction Algorithm";
        }
        if (Params?.slug == "differential") {
            return "Differential Care Algorithm";
        }
    };
    useEffect(() => {
        dispatch(getDisplayMasterNodes(Params?.slug));
        dispatch(getAllStateList());
        dispatch(getAllCadreList());
        return () => {
            dispatch(clearDisplayMasterNodes());
        };
    }, [Params?.slug]);
    return (
        <BoxCard headerName={getTitle()}
            rightComponent={<PrimaryBtn title="Add New Algorithm"
                onClick={() => {
                    setNode(null);
                    setIsModelOpen(true);
                }} />}>
            {loader ? (
                <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
            ) : (
                <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                    {displayMasterNodes?.length ? (
                        displayMasterNodes
                            .slice()
                            .sort((a, b) => a.index - b.index)
                            .map((e) => (
                                <AlgorithmsViewCard
                                    className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                                    onEdit={() => {
                                        setNode(e);
                                        setIsModelOpen(true);
                                    }}
                                    onNotify={() => {
                                        dispatch(sendAlgoNotification(Params?.slug as string, e?._id, (res) => {
                                            if (res?.status) {
                                                dispatch(getDisplayMasterNodes(Params?.slug));
                                                SuccessToast(res?.message);
                                            } else {
                                                ErrorToast(res?.message);
                                            }
                                        }));
                                    }}
                                    onDelete={() => {
                                        WarningToast("Are you sure you want to delete this algorithm?", "This action can't be undone", (isConfirmed: any) => {
                                            if (isConfirmed) {
                                                dispatch(deleteNodeById(Params?.slug as string, e._id, (res) => {
                                                    if (res?.status) {
                                                        dispatch(getDisplayMasterNodes(Params?.slug));
                                                    }
                                                }));
                                            }
                                        });
                                    }}
                                    onClick={() => {
                                        if (e._id) navigate("/patient/" + Params?.slug + "/" + e._id);
                                    }}
                                    key={e?.title?.en}
                                    title={e?.title?.en as string}
                                    icon={e?.icon}
                                />
                            ))
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
                            <p className="text-lg font-semibold">No Algorithms Found</p>
                            <p className="text-sm">Try adding a new algorithm to get started.</p>
                        </div>)}
                </div>
            )}
            <DrawerModal
                opened={isModelOpen}
                onClose={() => {
                    setIsModelOpen(false);
                    dispatch(getDisplayMasterNodes(Params?.slug));
                }}
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: "85%", backgroundColor: "#FAFBFA" }}>
                <RootAlgorithmForm
                    node={node}
                    close={() => {
                        setIsModelOpen(false);
                        dispatch(getDisplayMasterNodes(Params?.slug));
                    }}
                />
            </DrawerModal>
        </BoxCard>
    );
};

export default DisplayNodesList;
