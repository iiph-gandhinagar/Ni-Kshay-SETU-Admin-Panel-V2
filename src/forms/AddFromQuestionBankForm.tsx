import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import { Checkbox } from "../components/CheckBox/checkbox";
import { MultiSelectInput, SelectInput } from "../components/Inputs/SelectInput";
import { PrimaryTextInput } from "../components/Inputs/TextInput";
import TableComponent from "../components/Tables";
import { IRootState } from "../store";
import { getQuestionsWithoutPagination, setSelectedQestions } from "../store/reducer/plugin.reducer";

const AddFromQuestionBankForm = ({ close, language, initialQuestions, cadreId, isAllCadre }: { close: () => void, language: string, initialQuestions: any[], cadreId: string[], isAllCadre: boolean | null }) => {
    const { QuestionListWithoutPagination, loader } = useSelector((state: IRootState) => state?.plugin);
    const { selectedQuestionList } = useSelector((state: IRootState) => state.plugin);
    const dispatch = useDispatch();
    const [query, setQuery] = useState<any>({
        language: language || "en",
        categories: null,
        question: "",
        qLevel: null,
        isAllCadre: isAllCadre ?? true,
        cadreIds: cadreId || ""
    });

    const toggleQuestion = useCallback((question: any) => {
        if (selectedQuestionList?.some(selected => selected._id === question._id)) {
            dispatch(setSelectedQestions(selectedQuestionList?.filter(questionId => questionId._id !== question?._id)));
        } else {
            dispatch(setSelectedQestions([...selectedQuestionList || [], question]));
        }
    }, [selectedQuestionList, dispatch]);

    const clearFilters = () => {
        setQuery({
            language: language || "en",
            categories: null,
            question: "",
            qLevel: null,
        });
    };

    useEffect(() => {
        const queryString = Object.entries(query)
            .filter(([key, value]) => value && (Array.isArray(value) ? value.length > 0 : true))
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.map((val) => `${key}[]=${encodeURIComponent(val)}`).join("&");
                }
                return `${key}=${encodeURIComponent(String(value))}`;
            })
            .join("&");
        const finalQueryString = queryString ? `?${queryString}` : "";
        dispatch(getQuestionsWithoutPagination({ params: finalQueryString }));
    }, [query, dispatch]);

    const handleInputChange = (value: string | string[], name: string) => {
        setQuery((prevQuery: any) => ({
            ...prevQuery,
            [name]: value,
        }));
    };

    return (
        <div className="p-4">
            <div className="flex gap-5 mb-5 ">
                <PrimaryTextInput
                    id="searchQuestion"
                    className="!w-96"
                    value={query.question}
                    placeholder="Search..."
                    onChange={(e: any) => {
                        handleInputChange(e, "question");
                    }} />
                <PrimaryBtn
                    title="Clear Filters"
                    onClick={clearFilters} />
            </div>
            <TableComponent
                columns={[
                    {
                        accessor: "_id",
                        title: "id",
                        hidden: true
                    }, {
                        accessor: "checkbox",
                        title: "Select",
                        render: (item: any) => (
                            <Checkbox
                                id={item._id}
                                checked={selectedQuestionList?.find((v) => {
                                    return v._id === item._id;
                                }) ? true : false}
                                onChange={() => toggleQuestion(item)} />
                        )
                    },
                    {
                        accessor: "question",
                        title: "Questions",
                    },
                    {
                        accessor: "category",
                        title: "Category",
                        filtering: query?.categories ? true : false,
                        filter(params) {
                            return (
                                <MultiSelectInput
                                    menuPortalTarget={null}
                                    className="min-w-48"
                                    label="Category*"
                                    id="Category"
                                    value={query?.categories}
                                    onChange={(e) => {
                                        handleInputChange(e, "categories");
                                    }}
                                    options={[
                                        { value: "Adverse Drug Reaction Management", label: "Adverse Drug Reaction Management" },
                                        { value: "Case Findings and Diagnostic Strategy", label: "Case Findings and Diagnostic Strategy" },
                                        { value: "Infection Control Measures", label: "Infection Control Measures" },
                                        { value: "Public Health Actions (PHA)", label: "Public Health Actions (PHA)" },
                                        { value: "Recordings and Reporting", label: "Recordings and Reporting" },
                                        { value: "Treatment of TB", label: "Treatment of TB" },
                                        { value: "New PMDT", label: "New PMDT" },
                                        { value: "Programmatic Management of TB preventive Treatment (PMTPT)", label: "Programmatic Management of TB preventive Treatment (PMTPT)" },
                                        { value: "Supply Chain Management", label: "Supply Chain Management" },
                                        { value: "Diagnostic QA Mechanism", label: "Diagnostic QA Mechanism" },
                                        { value: "Surveillance", label: "Surveillance" },
                                        { value: "Supervision and M&E", label: "Supervision and M&E" },
                                        { value: "NPY - Incentive", label: "NPY - Incentive" },
                                        { value: "Programmatic Knowledge on NTEP", label: "Programmatic Knowledge on NTEP" },
                                        { value: "ACSM", label: "ACSM" },
                                        { value: "Program Implementation Plan - NHM", label: "Program Implementation Plan - NHM" },
                                        { value: "TB Comorbidities", label: "TB Comorbidities" },
                                        { value: "No Category", label: "No Category" }
                                    ]}
                                />
                            );
                        }
                    }, {
                        accessor: "qLevel",
                        title: "Type",
                        filtering: query?.qLevel ? true : false,
                        filter(params) {
                            return (
                                <SelectInput
                                    menuPortalTarget={null}
                                    className="min-w-48"
                                    id="qLevel"
                                    value={query.qLevel}
                                    onChange={(e) => {
                                        handleInputChange(e, "qLevel");

                                    }}
                                    options={["Easy", "Moderate", "Hard"].map((v) => {
                                        return {
                                            label: v,
                                            value: v.toLowerCase(),
                                        };
                                    })}
                                />
                            );
                        }
                    },
                ]}
                onRowClick={({ record }) => {
                    toggleQuestion(record);
                }}
                isloading={loader}
                idAccessor={({ _id }) => _id}
                records={QuestionListWithoutPagination}
            />
        </div>
    );
};

export default AddFromQuestionBankForm;
