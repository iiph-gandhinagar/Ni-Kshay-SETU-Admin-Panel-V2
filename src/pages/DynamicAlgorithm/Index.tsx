import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconArrowLeft from "../../components/Icon/IconArrowLeft";
import IconLoader from "../../components/Icon/IconLoader";
import IconPencil from "../../components/Icon/IconPencil";
import IconSettings from "../../components/Icon/IconSettings";
import IconTrash from "../../components/Icon/IconTrash";
import { BoxCard } from "../../components/Layouts/BoxCard";
import DrawerModal from "../../components/Layouts/Drawer";
import { RootDynamicAlgoEditForm } from "../../forms/RootDynamicAlgoEditForm";
import { IRootState } from "../../store";
import { deleteRootDynamicAlgoByID, updateRootDynamicAlgo } from "../../store/actions/dynamicAlgo.action";
import { cleanRootDynamicAlgoById, cleanRootDynamicAlgoList, getAllRootDynamicAlgoList, getRootDynamicAlgoById } from "../../store/reducer/dynamicAlgo.reducer";
import { ErrorToast, SuccessToast, WarningToast } from "../../utils/toasts";

const Index = () => {
    const Params = useParams();
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortBy: "", sortOrder: "",
    });
    const { RootDynamicAlgoList, loader } = useSelector((state: IRootState) => state.dynamicAlgo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModelOpen, setIsModelOpen] = useState(false);

    const currentPage = Number(query.page) || 1;

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= (RootDynamicAlgoList?.totalPages || 1)) {
            setQuery({ page: page.toString() });
        }
    };

    useEffect(() => {
        if (!window.location.search) {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllRootDynamicAlgoList(window.location.search));
        }
        return () => {
            dispatch(cleanRootDynamicAlgoList());
        };
    }, [window.location.search, query]);
    const handleEditClick = (item: any, event: any) => {
        event.stopPropagation();
        dispatch(getRootDynamicAlgoById(item?._id));
        setIsModelOpen(true);
    };

    const handleToggleActive = (item: any, event: any) => {
        event.stopPropagation();
        dispatch(updateRootDynamicAlgo(item?._id, { active: !item.active }, (res) => {
            if (res.status) {
                SuccessToast("Successfully Saved!");
                dispatch(getAllRootDynamicAlgoList(window.location.search));
            } else {
                ErrorToast(res.message);
            }
        }));
    };
    const handleDeleteClick = (item: any, event: any) => {
        event.stopPropagation();
        WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
            if (isConfirmed) {
                dispatch(deleteRootDynamicAlgoByID(
                    item?._id,
                    (res) => {
                        if (res?.status) {
                            SuccessToast("Successfully Deleted!");
                            dispatch(getAllRootDynamicAlgoList(window.location.search));
                        } else {
                            ErrorToast(res.message);
                        }
                    }));
            }
        });
    };
    return (
        <BoxCard
            headerName={
                <div className="flex items-center justify-between space-y-0">
                    <div className="flex items-center space-x-2">
                        <IconSettings className="h-8 w-8 text-blue-600" />
                        <div className="text-2xl font-bold">Dynamic Algorithms</div>
                    </div>
                </div>
            }
            rightComponent={
                <PrimaryBtn
                    title="Add New Dynamic Algorithm"
                    onClick={() => setIsModelOpen(true)}
                />
            }
        >
            <div>
                {loader && RootDynamicAlgoList == undefined ? (
                    <IconLoader
                        className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0"
                    />
                ) : (
                    <div className="space-y-6">
                        {RootDynamicAlgoList && RootDynamicAlgoList?.list?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {RootDynamicAlgoList?.list.map((item) => (
                                    <div
                                        key={item._id}
                                        className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 p-6 overflow-hidden"
                                        onClick={() => navigate(`/dynamic_algorithm/${item.title?.en}`, { state: item?._id })}
                                    >
                                        <div className="absolute top-0 right-0 mt-4 mr-4 flex space-x-2">
                                            {/* Edit Button */}
                                            <button
                                                onClick={(e) => handleEditClick(item, e)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <IconPencil className="h-5 w-5 text-gray-500 hover:text-[#5585AC]" />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) => handleDeleteClick(item, e)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <IconTrash className="h-5 w-5 text-gray-500 hover:text-red-600" />
                                            </button>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            {item.title?.en}
                                        </h3>

                                        <div className="space-y-2 mt-4">
                                            <p className="text-sm text-gray-500">
                                                Created: {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Updated: {new Date(item.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-600">Status</span>
                                            <button
                                                onClick={(e) => handleToggleActive(item, e)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5584AC] focus:ring-offset-2 ${item.active ? "bg-[#5584AC]" : "bg-gray-200"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.active ? "translate-x-6" : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-40 text-gray-500">
                                <p className="text-lg font-semibold">No Dynamic Algorithms Found</p>
                                <p className="text-sm">Try adding a new dynamic algorithm to get started.</p>
                            </div>
                        )}
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <IconArrowLeft className="h-4 w-4 mr-1 rotate-180" />
                                Previous
                            </button>

                            {Array.from({ length: RootDynamicAlgoList?.totalPages ?? 0 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === index + 1
                                        ? "bg-[#5584AC] text-white"
                                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === RootDynamicAlgoList?.totalPages}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Next
                                <IconArrowLeft className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <DrawerModal
                opened={isModelOpen}
                onClose={() => {
                    setIsModelOpen(false);
                    dispatch(getAllRootDynamicAlgoList(window.location.search));
                    dispatch(cleanRootDynamicAlgoById());
                }}
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: "55%", backgroundColor: "#FAFBFA" }}
            >
                <RootDynamicAlgoEditForm
                    close={() => {
                        setIsModelOpen(false);
                        dispatch(getAllRootDynamicAlgoList(window.location.search));
                        dispatch(cleanRootDynamicAlgoById());
                    }}
                />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
