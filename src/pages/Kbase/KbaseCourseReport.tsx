import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrayParam, useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../../components/buttons/primaryBtn";
import CircleWithNum from "../../components/custom/CircleWithNum";
import IconDownload from "../../components/Icon/IconDownload";
import { MultiSelectInput } from "../../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../../components/Inputs/TextInput";
import TableComponent from "../../components/Tables";
import { IRootState } from "../../store";
import { getKbaseCoursereportCsv } from "../../store/actions/plugin.action";
import { clearKbaseCoursereport, getKbaseCoursereport } from "../../store/reducer/plugin.reducer";
import { downloadCSV } from "../../utils/functions";


const KbaseCourseReport = () => {
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "50", sortBy: "", sortOrder: "",
        courseTitle: "", cadreIds: ArrayParam
    });

    const dispatch = useDispatch();
    const { kbaseCoursereport, loader } = useSelector((state: IRootState) => state.plugin);
    const { reportLoader } = useSelector((state: IRootState) => state.report);

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "50" });
        } else {
            dispatch(getKbaseCoursereport(window.location.search));
        }
    }, [window.location.search]);

    useEffect(() => {
        return () => {
            dispatch(clearKbaseCoursereport());
        };
    }, []);

    return (
        <div className="panel mt-6">
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Kbase Course Report'
                        number={kbaseCoursereport?.length || 0} />
                </div>
                <PrimaryBtn
                    title="CSV"
                    leftIcon={!reportLoader && <IconDownload />}
                    isLoading={reportLoader}
                    onClick={() => {
                        const searchParams = new URLSearchParams(window.location.search);
                        searchParams.delete("page");
                        searchParams.delete("limit");
                        searchParams.delete("view");
                        dispatch(getKbaseCoursereportCsv(`?${searchParams}`
                            , (res) => {
                                downloadCSV(res, `KbaseCourse${Date.now()}.csv`);
                            }
                        ));
                    }}
                />
            </div>
            <TableComponent
                isloading={loader}
                columns={[
                    { accessor: "_id", hidden: true },
                    {
                        accessor: "sr", title: "Sr. no", render(rec, index: number) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "50");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    },
                    {
                        accessor: "courseTitle", title: "Course Title", sortable: true,
                        filtering: query?.courseTitle ? true : false,
                        filter() {
                            return (
                                <PrimaryTextInput
                                    id="courseTitle"
                                    placeholder="Course Title"
                                    value={query?.courseTitle || ""}
                                    onChange={(e) => {
                                        setQuery({ page: "1", courseTitle: e || undefined });
                                    }}
                                />
                            );
                        },
                    },
                    {
                        accessor: "cadreTitle", title: "Cadre Title", sortable: true,
                        filtering: query?.cadreIds ? true : false,
                        render(record) {
                            return record.cadreTitle.join(", ");
                        },
                        filter(params: { close: () => void; }) {
                            return (
                                <MultiSelectInput
                                    className="min-w-48"
                                    id="cadreTitle"
                                    value={query?.cadreIds as Array<string>}
                                    onChange={(e) => {
                                        setQuery({ page: "1", cadreIds: e });

                                    }}
                                    options={[
                                        { label: "LT-Microscopy", value: "LT-Microscopy" },
                                        { label: "LT-Microscopy & NAAT", value: "LT-Microscopy & NAAT" },
                                        { label: "Health Volunteer", value: "Health Volunteer" },
                                        { label: "Pharmacist/ Storekeeper (SDS)", value: "Pharmacist/ Storekeeper (SDS)" },
                                        { label: "STLS", value: "STLS" },
                                        { label: "STS", value: "STS" },
                                        { label: "Sr. DR-TB TB-HIV Supervisor", value: "Sr. DR-TB TB-HIV Supervisor" },
                                        { label: "CHO/ MPW", value: "CHO/ MPW" },
                                        { label: "Sr. LT- CDST", value: "Sr. LT- CDST" },
                                        { label: "Pharmacist(PHI/TU)", value: "Pharmacist(PHI/TU)" },
                                        { label: "State ACSM/ IEC Officer", value: "State ACSM/ IEC Officer" },
                                        { label: "District TB Officer", value: "District TB Officer" },
                                        { label: "State TB Officer", value: "State TB Officer" },
                                        { label: "Program Managers- Others", value: "Program Managers- Others" },
                                        { label: "PPM Co-ordinator", value: "PPM Co-ordinator" },
                                        { label: "Private Provider", value: "Private Provider" },
                                        { label: "Medical Officer- TC/TU", value: "Medical Officer- TC/TU" },
                                        { label: "Medical Officer-PHI", value: "Medical Officer-PHI" },
                                        { label: "Medical Students", value: "Medical Students" },
                                        { label: "Medical College Faculty", value: "Medical College Faculty" },
                                        { label: "AYUSH Practitioners", value: "AYUSH Practitioners" },
                                        { label: "TB Champions", value: "TB Champions" },
                                    ]}
                                />
                            );
                        },
                    },
                    {
                        accessor: "totalModule", title: "Total Modules", sortable: true,
                    },
                    {
                        accessor: "totalChapter", title: "Total Chapters", sortable: true,
                    },
                    {
                        accessor: "totalContent", title: "Total Content", sortable: true,
                    },
                    {
                        accessor: "userCount", title: "User Count",
                    }
                ]}
                records={kbaseCoursereport}
                idAccessor={({ _id }) => _id}
                page={parseInt(query.page || "1")}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPageOptions={[50, 100]}
                recordsPerPage={parseInt(query?.limit || "50")}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
                onSortStatusChange={(item) => {
                    setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                totalRecords={kbaseCoursereport?.length || 0}
                className="whitespace-nowrap table-hover"
                highlightOnHover
            />
        </div>
    );
};

export default KbaseCourseReport;
