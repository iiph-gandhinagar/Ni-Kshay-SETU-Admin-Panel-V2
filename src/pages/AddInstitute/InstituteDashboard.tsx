import Tippy from "@tippyjs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "use-query-params";
import { BorderBtn, PrimaryBtn } from "../../components/buttons/primaryBtn";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import IconDownload from "../../components/Icon/IconDownload";
import IconEye from "../../components/Icon/IconEye";
import IconMultipleForwardRight from "../../components/Icon/IconMultipleForwardRight";
import IconPlus from "../../components/Icon/IconPlus";
import IconTrashLines from "../../components/Icon/IconTrashLines";
import AuthLayout from "../../components/Layouts/AuthLayout";
import TableComponent from "../../components/Tables";
import { TransferQueryModal } from "../../components/TransferQueryModal";
import { ViewQueryModal } from "../../components/ViewQueryModal";
import { IRootState } from "../../store";
import { deleteInstituteMemberById, getInstituteReport } from "../../store/actions/plugin.action";
import { logActivity } from "../../store/actions/report.action";
import { getRoleByID } from "../../store/reducer/auth.reducer";
import { clearAllClosedQueryListById, clearAllMembersByInstituteId, clearAllQuerryReportsById, clearAllTransferedQueryListbyId, getAllClosedQueryListbyId, getAllMemberByInstituteId, getAllOpenQueryListById, getAllQueryReportsListbyId, getAllTransferedQueryListById } from "../../store/reducer/plugin.reducer";
import { ErrorToast, WarningToast } from "../../utils/toasts";
import { instituteQueryReport } from "./instituteQueryDownload";


const InstituteDashboard = () => {
    const [query] = useQueryParams({
        id: "", role: "", title: ""
    });
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { loader, roleByID } = useSelector((state: IRootState) => state.auth);
    const [openModal, setOpenModal] = useState(false);
    const [openQueryModal, setOpenQueryModal] = useState(false);
    const { getMembersListById, closedQueryListById, openQueryListById, transferedQueryListById, QuerryReportsById } = useSelector((state: IRootState) => state.plugin);
    const [title, setTitle] = useState("Institute Query Data");
    const [nodalTitle, setNodalTitle] = useState("tab1");
    const [queryData, setQueryData] = useState();
    const handleSliceClick = (event: number) => {
        switch (event) {
            case 0:
                setTitle("Closed Queries");
                break;
            case 1:
                setTitle("Open Queries");
                break;
            case 2:
                setTitle("Transferred Queries");
                break;
            case 3:
                setTitle("Transfer Query");
                break;
            default:
                break;
        }
    };
    let series;
    let labels;
    switch (roleByID?.name) {
        case "COE":
            labels = ["Closed", "Open", "Received"];
            series = [QuerryReportsById?.closedQueries || 0, QuerryReportsById?.openQueries || 0, QuerryReportsById?.transferQueries || 0];
            break;
        case "DRTB":
            labels = ["Closed", "Open"];
            series = [QuerryReportsById?.closedQueries || 0, QuerryReportsById?.openQueries || 0];
            break;
        case "NODAL":
            if (nodalTitle == "tab1") {
                labels = ["Closed", "Open"];
                series = [QuerryReportsById?.queryRaised?.closedQueries || 0, QuerryReportsById?.queryRaised?.openQueries || 0];
            } else {
                labels = ["Closed", "Open", "Received", "Transfer"];
                series = [QuerryReportsById?.queryResponded?.closedQueriesResponded || 0, QuerryReportsById?.queryResponded?.openQueriesResponded || 0, QuerryReportsById?.queryResponded?.transferRespondedQueries || 0, QuerryReportsById?.queryResponded?.transferQueries || 0];
            }
            break;
        default:
            series = [QuerryReportsById?.closedQueries || 0, QuerryReportsById?.openQueries || 0, QuerryReportsById?.transferQueries || 0];

    }
    const queryStats: any = {
        series,
        options: {
            chart: {
                type: "donut",
                height: 460,
                fontFamily: "Nunito, sans-serif",
                events: {
                    click: (_: any, __: any, opts: any) => {
                        const { dataPointIndex } = opts;
                        handleSliceClick(dataPointIndex);
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: "#fff",
            },
            colors: roleByID?.name == "COE" || nodalTitle == "tab2" ? ["#e2a03f", "#5c1ac3", "#e7515a", "#00AB55"] : ["#e2a03f", "#5c1ac3"],
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "14px",
                fontFamily: "'Nunito','Raleway', sans-serif", // Font family for the legend
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: "65%",
                        background: "transparent",
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: "29px",
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: "26px",
                                color: undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: "Total Queries",
                                color: "#888ea8",
                                fontSize: "29px",
                                formatter: (w: any) => {
                                    return w?.globals?.seriesTotals?.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },

            },
            labels,
            states: {
                hover: {
                    filter: {
                        type: "none",
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: "none",
                        value: 0.15,
                    },
                },
            },
        },
    };
    useEffect(() => {
        dispatch(getRoleByID(query?.role));
        dispatch(getAllMemberByInstituteId(query.id));
        dispatch(getAllClosedQueryListbyId(query.id));
        dispatch(getAllTransferedQueryListById(query.id));
        dispatch(getAllOpenQueryListById(query.id));
        dispatch(getAllQueryReportsListbyId(query.id));
        return () => {
            dispatch(clearAllMembersByInstituteId());
            dispatch(clearAllTransferedQueryListbyId());
            dispatch(clearAllClosedQueryListById());
            dispatch(clearAllQuerryReportsById());
        };
    }, []);
    const openColumns = [
        {
            accessor: "_id",
            title: "id",
            hidden: true
        }, {
            accessor: "queryId",
            title: "Query ID",

        }, {
            accessor: "queryRaisedInstitute.title",
            title: "Created By",
            render(record: any) {
                return `${record.raisedBy?.name} (${record?.queryRaisedInstitute?.title})`;
            }
        }, {
            accessor: "queryRespondedInstitute.title",
            title: nodalTitle == "tab2" ? "To Be Responded BY" : "Forwarded To",
        }, {
            accessor: "createdAt", title: "Created At", sortable: false,
            render(record: any) {
                return moment(record?.createdAt).format("DD MMM YYYY, hh:mm a");
            }
        }, {
            accessor: "status",
            title: "Status",
        }, {
            accessor: "view",
            title: "View",
            titleClassName: "!text-right !pr-8",
            render: (item: any) => (
                <div className="flex items-center justify-end gap-6 mr-4 ">
                    <button onClick={() => { setOpenQueryModal(true); setQueryData(item); }}
                        type="button">
                        <IconEye />
                    </button>
                </div>
            )
        }
    ];
    if (roleByID?.name == "COE") {
        const respondedColumnIndex = openColumns.findIndex(column => column.accessor == "queryRespondedInstitute.title");
        if (respondedColumnIndex !== -1) {
            openColumns.splice(respondedColumnIndex, 1);
        }
    }
    return (
        <div>
            <div className="space-y-3">
                <div className="flex gap-3 items-center text-center justify-between mt-4">
                    <BorderBtn
                        borderColor='border-primary'
                        textColor='text-primary'
                        title="Back"
                        leftIcon={<IconCaretDown className="rotate-90" />}
                        onClick={() => navigation("/query2coe/institute?page=1&limit=10")} />
                    <div className="text-2xl font-bold text-blue-800">Welcome to the Query Management Module

                        {query?.title ? <div className="text-xl mt-3 text-center font-bold  text-blue-800"> Institute Name: <span className=" text-black">{query?.title}</span></div> : null}
                    </div>
                    <div className="flex gap-3">
                        <AuthLayout actions={["admin.institute-member.create"]}>
                            <PrimaryBtn
                                leftIcon={<IconPlus />}
                                title="Add New Member"
                                onClick={() => navigation("/query2coe/add-member?id=" + query.id + "&name=" + query.title + "&role=" + query.role)} />
                        </AuthLayout>
                        <PrimaryBtn
                            className="bg-success"
                            title="Transfer Ownership"
                            onClick={() => navigation("/query2coe/transfer-ownership?id=" + query.id + "&name=" + query.title + "&role=" + query.role)} />

                    </div>
                </div>
                {roleByID?.name == "NODAL" &&
                    <div className="pt-5">
                        <ul className="flex flex-wrap justify-between mt-3 border-b border-white-light dark:border-[#191e3a]">
                            <li className="flex-auto text-center"
                                onClick={() => {
                                    setNodalTitle("tab1");
                                    setTitle("Institute Query Data");
                                }}>
                                <a className={`text-[16px] font-bold p-3.5 py-2 -mb-[1px] block  border-transparent  border-2 hover:border-white-light hover:border-b-white dark:hover:border-[#191e3a] dark:hover:border-b-black ${nodalTitle == "tab1" ? "!border-white-light bg-[#EFEFEF] !border-b-white dark:!border-[#191e3a] dark:!border-b-black" : ""} `}>
                                    My Institute Queries
                                </a>
                            </li>
                            <li className="flex-auto text-center"
                                onClick={() => {
                                    setNodalTitle("tab2");
                                    setTitle("Institute Query Data");
                                }}>
                                <a className={`text-[16px] font-bold p-3.5 py-2 -mb-[1px] block  border-transparent  border-2 hover:border-white-light hover:border-b-white dark:hover:border-[#191e3a] dark:hover:border-b-black ${nodalTitle == "tab2" ? "!border-white-light bg-[#EFEFEF] !border-b-white dark:!border-[#191e3a] dark:!border-b-black" : ""} `}>
                                    Response Overview
                                </a>
                            </li>
                        </ul>
                    </div>}
                <div className={roleByID?.name == "NODAL" ? "pt-0" : "pt-5"}>
                    <ul className="flex items-center mb-[1px] bg-[#EFEFEF]">
                        <li onClick={() => setTitle("Institute Query Data")}>
                            <a className={`p-5  -mb-[1px] text-[16px] font-bold flex items-center relative before:transition-all before:duration-700 before:absolute hover:text-primary before:bottom-0 before:w-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:bg-[#5584AC] hover:before:w-full ${title == "Institute Query Data" ? "before:w-full text-primary" : ""} `}>
                                Overall Statistics
                            </a>
                        </li>
                        <li onClick={() => { setTitle("Open Queries"); }}>
                            <a className={`p-5  -mb-[1px] text-[16px] font-bold flex items-center relative before:transition-all before:duration-700 before:absolute hover:text-primary before:bottom-0 before:w-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:bg-[#5584AC] hover:before:w-full ${title == "Open Queries" ? "before:w-full text-primary" : ""} `}>
                                Open</a>
                        </li>
                        {nodalTitle === "tab2" || roleByID?.name == "COE" ? <li onClick={() => setTitle("Transferred Queries")}>
                            <a className={`p-5   -mb-[1px] text-[16px] font-bold flex items-center relative before:transition-all before:duration-700 before:absolute hover:text-primary before:bottom-0 before:w-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:bg-[#5584AC] hover:before:w-full ${title == "Transferred Queries" ? "before:w-full text-primary" : ""} `}>
                                Transfer In
                            </a>
                        </li> : null}
                        {nodalTitle === "tab2" ? <li onClick={() => setTitle("Transfer Query")}>
                            <a className={`p-5  -mb-[1px] text-[16px] font-bold flex items-center relative before:transition-all before:duration-700 before:absolute hover:text-primary before:bottom-0 before:w-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:bg-[#5584AC] hover:before:w-full ${title == "Transfer Query" ? "before:w-full text-primary" : ""} `}>
                                Transfer Out
                            </a>
                        </li> : null}

                        <li onClick={() => setTitle("Closed Queries")}>
                            <a className={`p-5  -mb-[1px] text-[16px] font-bold flex items-center relative before:transition-all before:duration-700 before:absolute hover:text-primary before:bottom-0 before:w-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:bg-[#5584AC] hover:before:w-full ${title == "Closed Queries" ? "before:w-full text-primary" : ""} `}>
                                Resolved
                            </a>
                        </li>
                    </ul>
                    <div className="panel">
                        <div className="flex justify-between">
                            <div className="flex justify-between">
                                <span className="text-xl font-bold mb-3">{title}</span>
                            </div>
                            {title == "Transfer Query" && nodalTitle == "tab2" && <PrimaryBtn
                                className="bg-[#e7515a]"
                                title="Transfer Query"
                                rightIcon={<IconMultipleForwardRight />}
                                onClick={() => { setOpenModal(true); }} />}
                            {title === "Institute Query Data" && (
                                <div className="flex flex-col gap-3">
                                    {(roleByID?.name === "DRTB" || roleByID?.name === "NODAL") && (
                                        <PrimaryBtn leftIcon={<IconDownload />}
                                            title="Institute Query Report"
                                            onClick={() => {
                                                dispatch(getInstituteReport(query?.id, "RaisedInsitute", (res) => {
                                                    if (res?.status) {
                                                        instituteQueryReport(res?.data);
                                                    }
                                                }));
                                            }} />
                                    )}
                                    {(roleByID?.name === "COE" || roleByID?.name === "NODAL") && (
                                        <PrimaryBtn leftIcon={<IconDownload />}
                                            title="Institute Response Report"
                                            onClick={() => {
                                                dispatch(getInstituteReport(query?.id, "RespondedInstitute", (res) => {
                                                    if (res?.status) {
                                                        instituteQueryReport(res?.data);
                                                    }
                                                }));
                                            }} />
                                    )}
                                </div>
                            )}
                        </div>
                        {title === "Institute Query Data" &&
                            <div className=' mt-3'>
                                {roleByID && <ReactApexChart series={queryStats?.series || 0}
                                    options={queryStats?.options || 0}
                                    type="donut"
                                    height={460} />}
                            </div>
                        }
                        {title === "Open Queries" &&
                            <div className=' mt-3'>
                                <TableComponent
                                    height="380.55px"
                                    columns={openColumns}
                                    isloading={loader}
                                    records={nodalTitle == "tab2" ? openQueryListById?.openRespondedQueries : openQueryListById?.openQueries}
                                    idAccessor={({ _id }) => _id}
                                />
                            </div>
                        }
                        {title === "Transferred Queries" &&
                            <div className=' mt-3'>
                                <TableComponent
                                    height="380.55px"
                                    columns={[
                                        {
                                            accessor: "_id",
                                            title: "id",
                                            hidden: true
                                        }, {
                                            accessor: "queryId",
                                            title: "Query ID",

                                        }, {
                                            accessor: "queryRaisedInstitute.title",
                                            title: "Created By",
                                            render(record) {
                                                return `${record.raisedBy?.name} (${record?.queryRaisedInstitute?.title})`;
                                            }
                                        }, {
                                            accessor: "transferInInstitute.instituteTitle",
                                            title: "Name of the Institute (Transfer In)",
                                        }, {
                                            accessor: "updatedAt", title: "Updated At", sortable: false,
                                            render(record: any) {
                                                return moment(record?.updatedAt).format("DD MMM YYYY, hh:mm a");
                                            }
                                        }, {
                                            accessor: "status",
                                            title: "Status",
                                        }, {
                                            accessor: "view",
                                            title: "View",
                                            titleClassName: "!text-right !pr-8",
                                            render: (item: any) => (
                                                <div className="flex items-center justify-end gap-6 mr-4 ">
                                                    <button onClick={() => { setOpenQueryModal(true); setQueryData(item); }}
                                                        type="button">
                                                        <IconEye />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    ]}
                                    isloading={loader}
                                    records={transferedQueryListById?.transferRespondedQueries}
                                    idAccessor={({ _id }) => _id}
                                />
                            </div>}
                        {title === "Transfer Query" &&
                            <div className=' mt-3'>
                                <TableComponent
                                    height="380.55px"
                                    columns={[
                                        {
                                            accessor: "_id",
                                            title: "id",
                                            hidden: true
                                        }, {
                                            accessor: "queryId",
                                            title: "Query ID",

                                        }, {
                                            accessor: "queryRaisedInstitute.title",
                                            title: "Created By",
                                            render(record) {
                                                return `${record.raisedBy?.name} (${record?.queryRaisedInstitute?.title})`;
                                            }
                                        }, {
                                            accessor: "queryRespondedInstitute.title",
                                            title: "Name of the Institute (Transfer Out)",
                                        }, {
                                            accessor: "updatedAt", title: "Updated At", sortable: false,
                                            render(record: any) {
                                                return moment(record?.updatedAt).format("DD MMM YYYY, hh:mm a");
                                            }
                                        }, {
                                            accessor: "status",
                                            title: "Status",
                                        }, {
                                            accessor: "view",
                                            title: "View",
                                            titleClassName: "!text-right !pr-8",
                                            render: (item: any) => (
                                                <div className="flex items-center justify-end gap-6 mr-4 ">
                                                    <button onClick={() => { setOpenQueryModal(true); setQueryData(item); }}
                                                        type="button">
                                                        <IconEye />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    ]}
                                    isloading={loader}
                                    records={transferedQueryListById?.transferQueries}
                                    idAccessor={({ _id }) => _id}
                                />
                            </div>}
                        {title === "Closed Queries" &&
                            <div className='mt-3'>
                                <TableComponent
                                    height="380.55px"
                                    columns={[
                                        {
                                            accessor: "_id",
                                            title: "id",
                                            hidden: true
                                        }, {
                                            accessor: "queryId",
                                            title: "Query ID",

                                        }, {
                                            accessor: "queryRaisedInstitute.title",
                                            title: "Created By",
                                            render(record) {
                                                return `${record.raisedBy?.name} (${record?.queryRaisedInstitute?.title})`;
                                            }
                                        }, {
                                            accessor: "queryRespondedInstitute.title",
                                            title: "Responded By",
                                            render(record) {
                                                return `${record.respondedBy?.name} (${record?.queryRespondedInstitute?.title})`;
                                            }
                                        }, {
                                            accessor: "updatedAt", title: "Updated At", sortable: false,
                                            render(record: any) {
                                                return moment(record?.updatedAt).format("DD MMM YYYY, hh:mm a");
                                            }
                                        }, {
                                            accessor: "status",
                                            title: "Status",
                                        }, {
                                            accessor: "view",
                                            title: "View",
                                            titleClassName: "!text-right !pr-8",
                                            render: (item: any, index) => (
                                                <div className="flex items-center justify-end gap-6 mr-3 ">
                                                    <button onClick={() => { setOpenQueryModal(true); setQueryData(item); }}
                                                        type="button">
                                                        <IconEye />
                                                    </button>
                                                </div>
                                            )
                                        }
                                    ]}
                                    idAccessor={({ _id }) => _id}
                                    isloading={loader}
                                    records={nodalTitle == "tab2" ? closedQueryListById?.closedRespondedQueries : closedQueryListById?.closedQueries}
                                />
                            </div>}
                    </div>
                </div>
            </div>
            {getMembersListById && getMembersListById?.length > 0 && <div>
                <div className='text-xl mt-8 font-bold mb-4'>Members</div>
                <div className="panel mt-4">
                    <TableComponent
                        isloading={loader}
                        columns={[
                            { accessor: "_id", hidden: true },
                            {
                                accessor: "sr", title: "Sr. no", render(rec, index) {
                                    const pageNumber = parseInt("1");
                                    const itemsPerPage = parseInt("15");
                                    return (index + 1) + (pageNumber - 1) * itemsPerPage;
                                }
                            },
                            {
                                accessor: "name", title: "Member Name", sortable: false,
                            },
                            {
                                accessor: "phoneNo", title: "Mobile Number", sortable: false,
                                render: (record) => {
                                    const phoneNo = record.phoneNo || "";
                                    const maskedPhoneNo = phoneNo.length > 4 ? `${"X".repeat(phoneNo.length - 4)}${phoneNo.slice(-4)}` : phoneNo;
                                    return maskedPhoneNo;
                                }
                            },
                            {
                                accessor: "type", title: "Responded Query", sortable: false,
                                render(record: any) {
                                    return record?.userContext.queryDetails.querySolved || 0;
                                }
                            },
                            {
                                accessor: "status", title: "Status", sortable: false,
                                render(record) {
                                    return record?.userContext.queryDetails.isActive == true ?
                                        <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Active</span>
                                        : <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Inactive</span>;
                                }
                            },
                            {
                                accessor: "action",
                                title: "Actions",
                                titleClassName: "!text-right !pr-8",
                                render: (item: any) => (
                                    <div className="flex items-center justify-end gap-6 mr-3 ">
                                        <Tippy content="Delete">
                                            <button type="button"
                                                onClick={() => {
                                                    WarningToast("Are you sure you want to delete this entry?", "This action can't be undone", (isConfirmed: any) => {
                                                        if (isConfirmed) {
                                                            dispatch(deleteInstituteMemberById(
                                                                {
                                                                    "instituteId": query.id,
                                                                    "subscriberId": item._id
                                                                },
                                                                (res) => {
                                                                    if (res.status) {
                                                                        dispatch(logActivity({
                                                                            "action": "delete",
                                                                            "moduleName": window.location.pathname,
                                                                            "payload": item
                                                                        }));
                                                                        dispatch(getAllMemberByInstituteId(query?.id));
                                                                    } else {
                                                                        ErrorToast(res?.message);
                                                                    }
                                                                }
                                                            ));
                                                        }
                                                    });
                                                }}>
                                                <IconTrashLines />
                                            </button>
                                        </Tippy>
                                    </div>
                                )
                            }
                        ]}
                        records={getMembersListById}
                        idAccessor={({ _id }) => _id}
                        className="whitespace-nowrap table-hover"
                        highlightOnHover
                    />
                </div>
            </div>
            }
            <TransferQueryModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
            />
            <ViewQueryModal
                data={queryData}
                title={title}
                isOpen={openQueryModal}
                onClose={() => {
                    setOpenQueryModal(false);
                }}
            />
        </div>
    );
};

export default InstituteDashboard;
