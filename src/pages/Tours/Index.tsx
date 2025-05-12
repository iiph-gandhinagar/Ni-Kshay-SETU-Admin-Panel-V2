import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import CustomSwitch from "../../components/CheckBox/Switch";
import CircleWithNum from "../../components/custom/CircleWithNum";
import IconPencil from "../../components/Icon/IconPencil";
import IconPlus from "../../components/Icon/IconPlus";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { BoxCard } from "../../components/Layouts/BoxCard";
import TableComponent from "../../components/Tables";
import { IRootState } from "../../store";
import { logActivity } from "../../store/actions/report.action";
import { deleteTourByID, updateTourByID } from "../../store/actions/tours.action";
import { cleanAllTour, cleanTourById, fetchTourStart } from "../../store/reducer/tour.reducer";
import { hasSinglePermission } from "../../utils/functions";
import { ErrorToast, SuccessToast, WarningToast } from "../../utils/toasts";


const Tours = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", search: "", sortBy: "", sortOrder: ""
    });
    const dispatch = useDispatch();
    const { tourDetails, tourById } = useSelector((v: IRootState) => v.tour);
    const navigate = useNavigate();


    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15", sortBy: "active", sortOrder: "desc" });
        } else {
            dispatch(fetchTourStart(window.location.search));
        }
    }, [window.location.search, query]);

    useEffect(() => {
        return () => {
            dispatch(cleanTourById());
            dispatch(cleanAllTour());
        };
    }, []);

    return (
        <>
            <BoxCard>
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap gap-3">
                        <CircleWithNum title='Tour'
                            number={tourDetails?.totalItems} />
                        <PrimaryTextInput
                            id={"search"}
                            type="text"
                            placeholder="Search..."
                            className="form-input w-auto"
                            value={query.search || ""}
                            onChange={(e) => {
                                setQuery({ search: e });
                            }}
                        />
                    </div>
                    <div className="flex items-center flex-wrap gap-3">
                        <AuthLayout actions={["admin.tour.create"]}>
                            <PrimaryBtn
                                title="Add New Tour"
                                leftIcon={<IconPlus />}
                                onClick={() => {
                                    navigate(`/tour/add${window.location.search}`);
                                }}
                            />
                        </AuthLayout>
                    </div>
                </div>
                <TableComponent columns={[{ accessor: "_id", hidden: true }, { accessor: "title.en", title: "Title" }
                    , {
                    accessor: "active",
                    title: "Active",
                    sortable: true,
                    render(record: any) {
                        return <CustomSwitch
                            id="active"
                            checked={record?.active}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                dispatch(updateTourByID(record?._id, { active: e }, (res) => {
                                    if (res.status) {
                                        SuccessToast("Successfully Saved!");
                                        dispatch(fetchTourStart(window.location.search));
                                    } else {
                                        ErrorToast(res.message);
                                    }
                                }));
                            }} />;
                    }
                }, {
                    accessor: "default",
                    title: "Default",
                    sortable: true,
                    render(record: any) {
                        return record?.default === "active" ? "Yes" : "No";
                    }
                }, {
                    accessor: "createdAt",
                    title: "Created At", sortable: true,
                    render(record: any) {
                        return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                    }
                }, {
                    accessor: "action",
                    title: "Actions",
                    titleClassName: "!text-right !pr-8",
                    render: (item: any) => (
                        <AuthLayout actions={["admin.tour.edit", "admin.tour.delete"]}
                            showDash>
                            <div className="flex items-center justify-end gap-6 mr-3 ">
                                <AuthLayout actions={["admin.tour.edit"]}>
                                    {!item?.active &&
                                        <Tippy content="Edit">
                                            <button type="button"
                                                onClick={() => {
                                                    navigate(`/tour/add${window.location.search}&id=${item?._id}`);
                                                }}>
                                                <IconPencil />
                                            </button>
                                        </Tippy>
                                    }
                                </AuthLayout>
                                <AuthLayout actions={["admin.tour.delete"]}>
                                    <Tippy content="Delete">
                                        <button type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                    if (isConfirmed) {
                                                        dispatch(deleteTourByID(
                                                            item._id,
                                                            (res) => {
                                                                if (res.status) {
                                                                    close();
                                                                    dispatch(logActivity({
                                                                        "action": "delete",
                                                                        "moduleName": window.location.pathname,
                                                                        "payload": item
                                                                    }));
                                                                    dispatch(fetchTourStart(window.location.search));

                                                                } else {
                                                                    ErrorToast(res?.message);
                                                                }
                                                            }
                                                        ));
                                                    }
                                                });
                                            }}
                                        >
                                            <IconTrashLines />
                                        </button>
                                    </Tippy>
                                </AuthLayout>

                            </div>
                        </AuthLayout>
                    )
                }]}
                    records={tourDetails?.list}
                    idAccessor={({ _id }) => _id}
                    onRowClick={({ record }) => {
                        if (hasSinglePermission("admin.tour.edit")) {
                            navigate(`/tour/add${window.location.search}&id=${record?._id}`);
                        }
                    }
                    }
                    recordsPerPage={parseInt(query?.limit || "15")}
                    recordsPerPageOptions={[15, 25, 35, 55, 100]}
                    onSortStatusChange={(item) => {
                        setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                    }}
                    sortStatus={{
                        columnAccessor: query?.sortBy || "_id",
                        direction: query?.sortOrder === "desc" ? "desc" : "asc"
                    }}
                />
            </BoxCard>
        </>
    );
};



export default Tours;
