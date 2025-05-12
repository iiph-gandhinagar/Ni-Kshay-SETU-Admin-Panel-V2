
export const instituteQueryReport = (jsonData: any) => {
    const combinedQueries: any = [];

    // Open Queries
    jsonData?.openQueries?.openQueries?.forEach((query: any) => {
        combinedQueries.push([
            "Open",
            query.queryId || "-",
            query.age || "-",
            query.sex || "-",
            query.diagnosis || "-",
            query.dateOfAdmission || "-",
            query.chiefComplaint || "-",
            query.currentTreatmentPlan || "-",
            query.query || "-",
            query.raisedBy.name || "-",
            query.queryRaisedRole.name || "-",
            query.queryRaisedInstitute.title || "-",
            query.queryRespondedInstitute.title || "-",
            query.status || "-",
            query.createdAt || "-",
            query.updatedAt || "-",
            "-"
        ]);
    });

    // Open Responded Queries
    jsonData?.openQueries?.openRespondedQueries?.forEach((query: any) => {
        combinedQueries.push([
            "Open Responded",
            query.queryId || "-",
            query.age || "-",
            query.sex || "-",
            query.diagnosis || "-",
            query.dateOfAdmission || "-",
            query.chiefComplaint || "-",
            query.currentTreatmentPlan || "-",
            query.query || "-",
            query.raisedBy.name || "-",
            query.queryRaisedRole.name || "-",
            query.queryRaisedInstitute.title || "-",
            query.queryRespondedInstitute.title || "-",
            query.status || "-",
            query.createdAt || "-",
            query.updatedAt || "-",
            query.response || "-",
        ]);
    });

    // Closed Queries
    jsonData?.closedQueries?.closedQueries?.forEach((query: any) => {
        combinedQueries.push([
            "Closed",
            query.queryId || "-",
            query.age || "-",
            query.sex || "-",
            query.diagnosis || "-",
            query.dateOfAdmission || "-",
            query.chiefComplaint || "-",
            query.currentTreatmentPlan || "-",
            query.query || "-",
            query.raisedBy.name || "-",
            query.queryRaisedRole.name || "-",
            query.queryRaisedInstitute.title || "-",
            query.queryRespondedInstitute.title || "-",
            query.status || "-",
            query.createdAt || "-",
            query.updatedAt || "-",
            query.response || "-",
        ]);
    });

    // Closed Responded Queries
    jsonData?.closedQueries?.closedRespondedQueries?.forEach((query: any) => {
        combinedQueries.push([
            "Closed Responded",
            query.queryId || "-",
            query.age || "-",
            query.sex || "-",
            query.diagnosis || "-",
            query.dateOfAdmission || "-",
            query.chiefComplaint || "-",
            query.currentTreatmentPlan || "-",
            query.query || "-",
            query.raisedBy.name || "-",
            query.queryRaisedRole.name || "-",
            query.queryRaisedInstitute.title || "-",
            query.queryRespondedInstitute.title || "-",
            query.status || "-",
            query.createdAt || "-",
            query.updatedAt || "-",
            query.response || "-",
        ]);
    });

    // Transfer Queries
    jsonData?.transferQueries?.transferQueries?.forEach((query: any) => {
        combinedQueries.push([
            "Transfer",
            query.queryId || "-",
            query.age || "-",
            query.sex || "-",
            query.diagnosis || "-",
            query.dateOfAdmission || "-",
            query.chiefComplaint || "-",
            query.currentTreatmentPlan || "-",
            query.query || "-",
            query.raisedBy.name || "-",
            query.queryRaisedRole.name || "-",
            query.queryRaisedInstitute.title || "-",
            query.queryRespondedInstitute?.title || "-",
            query.status || "-",
            query.createdAt || "-",
            query.updatedAt || "-",
            query.transferInInstitute.instituteTitle || "-",
        ]);
    });

    jsonData?.transferQueries?.transferRespondedQueries?.forEach((query: any) => {
        combinedQueries.push([
            "Transfer Responded",
            query.queryId || "-",
            query.age || "-",
            query.sex || "-",
            query.diagnosis || "-",
            query.dateOfAdmission || "-",
            query.chiefComplaint || "-",
            query.currentTreatmentPlan || "-",
            query.query || "-",
            query.raisedBy.name || "-",
            query.queryRaisedRole.name || "-",
            query.queryRaisedInstitute.title || "-",
            query.queryRespondedInstitute?.title || "-",
            query.status || "-",
            query.createdAt || "-",
            query.updatedAt || "-",
            query.response || "-",
        ]);
    });


    // Construct the CSV string
    const csvRows = [];
    const headers = [
        "Type",
        "Query ID",
        "Age",
        "Sex",
        "Diagnosis",
        "Date of Admission",
        "Chief Complaint",
        "Current Treatment Plan",
        "Query",
        "Raised By",
        "Raised Role",
        "Raised Institute",
        "Responded Institute",
        "Status",
        "Created At",
        "Updated At",
        "Response/Transfer Institute",
    ];

    csvRows.push(headers.join(","));

    for (const row of combinedQueries) {
        csvRows.push(row.map((item: any) => `"${item}"`).join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "institue_query_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
