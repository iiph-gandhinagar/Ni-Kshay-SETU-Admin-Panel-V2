import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "use-query-params";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import CircleWithNum from "../components/custom/CircleWithNum";
import IconInfoCircle from "../components/Icon/IconInfoCircle";
import IconPlus from "../components/Icon/IconPlus";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import SimpleFileUploadButton from "../components/Inputs/UploadButton";
import AuthLayout from "../components/Layouts/AuthLayout";
import { BoxCard } from "../components/Layouts/BoxCard";
import DrawerModal from "../components/Layouts/Drawer";
import TableComponent from "../components/Tables";
import ManageTbEditForm from "../forms/ManageTbEditForm";
import { IRootState } from "../store";
import { uploadAdminImage } from "../store/actions/auth.action";
import { clearAllManageTbList, getAllManageTb } from "../store/reducer/plugin.reducer";

const Index = () => {
    const [openModal, setOpenModal] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const { manageTbList, loader } = useSelector((e: IRootState) => e.plugin);
    const [values, setFieldValue] = useState({
        logo: "",
    });
    const dispatch = useDispatch();
    const [query, setQuery] = useQueryParams({
        page: "1", limit: "15", sortOrder: "", sortBy: "", search: ""
    });

    useEffect(() => {
        if (window.location.search === "") {
            setQuery({ page: "1", limit: "15" });
        } else {
            dispatch(getAllManageTb(window.location.search));
        }
    }, [window.location.search]);
    useEffect(() => {
        return () => {
            dispatch(clearAllManageTbList());
        };
    }, []);
    return (
        <BoxCard>
            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                <div className="flex items-center flex-wrap gap-3">
                    <CircleWithNum title='Changes'
                        number={manageTbList?.totalItems} />
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
                    <SimpleFileUploadButton
                        label="Upload Logo"
                        acceptedFileTypes="image/*"
                        action={uploadAdminImage}
                    />
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <AuthLayout actions={["admin.manage-tb.store"]}>
                        <PrimaryBtn
                            title="Add Changes"
                            leftIcon={<IconPlus />}
                            onClick={() => {
                                open();
                            }}
                        />
                    </AuthLayout>
                    <div className="mt-1 mr-3 cursor-pointer"
                        onClick={() => { setOpenModal(true); }}>
                        <IconInfoCircle />
                    </div>
                </div>
            </div>
            <Modal opened={openModal}
                size={600}
                onClose={() => setOpenModal(false)}
                centered
                title={<span className="text-lg font-bold">Apply Modification :</span>}
            >
                <div className="text-lg p-2">
                    <ul className="list-inside list-disc ml-5">
                        <li className="mt-2">Admins can apply changes after editing the logic in the Excel sheet.</li>
                        <li className="mt-2">Note: Changes take effect after 10 minutes.</li>
                        <li className="mt-2">For Excel edits, contact the IIPHG team.</li>
                    </ul>
                </div>
            </Modal>
            <TableComponent
                columns={[
                    {
                        accessor: "_id",
                        title: "id",
                        hidden: true
                    }, {
                        accessor: "sr", title: "Sr. no", render(rec, index) {
                            const pageNumber = parseInt(query.page || "1");
                            const itemsPerPage = parseInt(query.limit || "15");
                            return (index + 1) + (pageNumber - 1) * itemsPerPage;
                        }
                    }, {
                        accessor: "title",
                        title: "Title",
                    },
                    {
                        accessor: "createdBy",
                        title: "Created By",
                        render(record: any) {
                            return record?.createdBy?.firstName + " " + record?.createdBy?.lastName;
                        }
                    }, {
                        accessor: "CreatedAt",
                        title: "Created At",
                        sortable: true,
                        render(record: any) {
                            return moment(record?.createdAt).format("DD MMM YYYY hh:mm a");
                        }
                    },
                ]}
                isloading={loader}
                totalRecords={manageTbList?.totalItems}
                records={manageTbList?.list}
                idAccessor={({ _id }) => _id}
                page={manageTbList?.currentPage || undefined}
                onPageChange={(page) => {
                    setQuery({ page: page.toString() });
                }}
                recordsPerPage={parseInt(query?.limit || "15")}
                onSortStatusChange={(item) => {
                    setQuery({ page: "1", sortOrder: item?.direction, sortBy: item?.columnAccessor?.toLocaleString() });
                }}
                sortStatus={{
                    columnAccessor: query?.sortBy || "_id",
                    direction: query?.sortOrder === "desc" ? "desc" : "asc"
                }}
                recordsPerPageOptions={[15, 25, 35, 55, 100]}
                onRecordsPerPageChange={(e) => {
                    setQuery({ page: "1", limit: e.toString() });
                }}
            />
            <DrawerModal
                opened={opened}
                onClose={() => {
                    close();
                }}
                title={
                    <span className="text-xl font-bold">{"Add Changes"}</span>
                }
                headerStyle={{ backgroundColor: "#FAFBFA" }}
                contentStyle={{ flexBasis: innerWidth > 629 ? 629 : "undefined", backgroundColor: "#FAFBFA" }}
            >
                <ManageTbEditForm close={() => {
                    close();
                    dispatch(getAllManageTb(window.location.search));
                }} />
            </DrawerModal>
        </BoxCard>
    );
};

export default Index;
