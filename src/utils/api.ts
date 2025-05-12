
import { updateRolsbyID } from "auth-action";
import { loginObj } from "auth-reducer";
import { AlgorithmsFormProps } from "formTypes";
import NetworkClient from "./NetworkClient";

export async function getAllRolesApi(query: string) {
    return NetworkClient.get("/roles" + query);
}
export async function getAllRolesWithoutPaginationApi() {
    return NetworkClient.get("roles/get-all-roles");
}
export async function getRoleByIDApi(id: string) {
    return NetworkClient.get("/roles/" + id);
}
export async function updateRoleByIDApi(id: string, obj: updateRolsbyID) {
    return NetworkClient.patch("/roles/" + id, obj);
}
export async function createRoleApi(obj: any) {
    return NetworkClient.post("/roles", obj);
}
export async function deleteRoleByIDApi(id: string) {
    return NetworkClient.delete("/roles/" + id);
}
export async function createPermissionApi(obj: any) {
    return NetworkClient.post("/permissions", obj);
}
export async function getPermissionsApi(query: string) {
    return NetworkClient.get("/permissions" + query);
}
export async function getMasterPermissionsApi() {
    return NetworkClient.get("/permissions/master-permission");
}
export async function getPermissionByIDApi(id: string) {
    return NetworkClient.get("/permissions/" + id);
}
export async function updatePermissionByIDApi(id: string, obj: updateRolsbyID) {
    return NetworkClient.patch("/permissions/" + id, obj);
}
export async function deletePermissionByIDApi(id: string) {
    return NetworkClient.delete("/permissions/" + id);
}
export async function loginApi(obj: loginObj) {
    return NetworkClient.post("/admin-users/login", obj);
}
export async function forgotPasswordApi(obj: any) {
    return NetworkClient.post("/admin-users/forgot-password", obj);
}
export async function resetPasswordApi(obj: any) {
    return NetworkClient.post("/admin-users/changed-password", obj);
}
export async function getAuthUserApi() {
    return NetworkClient.get("/admin-users/profile");
}
export async function getAllSubscriberApi(query: string) {
    return NetworkClient.get("subscriber/get-subscriber-paginated-records" + query);
}
export async function getSubscriberByIdApi(id: string) {
    return NetworkClient.get("/subscriber/" + id);
}
export async function updateSubscriberByIdApi(id: string, obj: any) {
    return NetworkClient.patch("/subscriber/" + id, obj);
}
export async function sendForgotOtpApi(id: string) {
    return NetworkClient.get("/subscriber/forgot-otp/" + id);
}
export async function getcaderApi(query: string) {
    return NetworkClient.get("cadre" + (query || ""));
}
export async function getCountryApi(query: string) {
    return NetworkClient.get("country" + (query || ""));
}
export async function getAllCountryListApi() {
    return NetworkClient.get("country");
}
export async function getAllStateListApi() {
    return NetworkClient.get("region/admin-state");
}
export async function getAllCadreListApi() {
    return NetworkClient.get("region/cadres");
}
export async function getAllDistrictListApi(authUser: { roleType: string; isAllState: boolean }, query: string) {
    if (authUser?.roleType === "country_level") {
        return NetworkClient.get(`region/districts${query}`);
    } else {
        return NetworkClient.get(`region/admin-district${query}`);
    }
}
export async function getAllCaderTypeListApi() {
    return NetworkClient.get("region/cadre-types");
}
export async function getBlockApi(query: string) {
    return NetworkClient.get("block" + (query || ""));
}
export async function getBlockByIDApi(query: string) {
    return NetworkClient.get("block/" + (query || ""));
}
export async function getDistrictByIDApi(query: string) {
    return NetworkClient.get("district/" + (query || ""));
}
export async function getCaderByIDApi(query: string) {
    return NetworkClient.get("cadre/" + (query || ""));
}
export async function getDistrictApi(query: string) {
    return NetworkClient.get("district" + (query || ""));
}
export async function getStateApi(query: string) {
    return NetworkClient.get("state" + (query || ""));
}
export async function createStateApi(query: string, obj: any) {
    return NetworkClient.post("state/" + (query || ""), obj);
}
export async function updateStateApi(query: string, obj: any) {
    return NetworkClient.patch("state/" + (query || ""), obj);
}
export async function createDistrictApi(obj: any) {
    return NetworkClient.post("district", obj);
}
export async function updateDistrictApi(query: string, obj: any) {
    return NetworkClient.patch("district/" + (query || ""), obj);
}
export async function deleteDistrictByIdApi(query: string) {
    return NetworkClient.delete("district/" + (query || ""));
}
export async function getAllCaderTypesApi() {
    return NetworkClient.get("region/cadre-types");
}
export async function getCaderBytypesListApi(query: string) {
    return NetworkClient.get("region/cadres" + query);
}
export async function createCaderApi(obj: any) {
    return NetworkClient.post("cadre", obj);
}
export async function updateCaderApi(query: string, obj: any) {
    return NetworkClient.patch("cadre/" + (query || ""), obj);
}
export async function deleteCaderApi(query: string) {
    return NetworkClient.delete("cadre/" + (query || ""));
}
export async function getCountryByIDApi(query: string) {
    return NetworkClient.get("country/" + (query || ""));
}
export async function createCountryApi(obj: any) {
    return NetworkClient.post("country", obj);
}
export async function updateCountryApi(query: string, obj: any) {
    return NetworkClient.patch("country/" + (query || ""), obj);
}
export async function deleteCountryApi(query: string) {
    return NetworkClient.delete("country/" + (query || ""));
}
export async function getStateByIDApi(query: string) {
    return NetworkClient.get("state/" + (query || ""));
}
export async function deleteStateApi(query: string) {
    return NetworkClient.delete("state/" + (query || ""));
}
export async function createBlockApi(obj: any) {
    return NetworkClient.post("block", obj);
}
export async function updateBlockApi(query: string, obj: any) {
    return NetworkClient.patch("block/" + (query || ""), obj);
}
export async function deleteBlockApi(query: string) {
    return NetworkClient.delete("block/" + (query || ""));
}
export async function getAllBlockListApi(query: string) {
    return NetworkClient.get("region/blocks" + query);
}
export async function getHealthFacilityApi(query: string) {
    return NetworkClient.get("health-facility" + (query || ""));
}
export async function getHealthFacilityByIDApi(query: string) {
    return NetworkClient.get("health-facility/" + (query || ""));
}
export async function getAllHealthFacilityListApi(query: string) {
    return NetworkClient.get("region/health-facilities" + query);
}
export async function getRedirectNodeApi(type: string) {
    return NetworkClient.get("region/get-redirect-node/" + type);
}
export async function createHealthFacilityApi(obj: any) {
    return NetworkClient.post("health-facility", obj);
}
export async function updateHealthFacilityApi(query: string, obj: any) {
    return NetworkClient.patch("health-facility/" + query, obj);
}
export async function deleteHealthFacilityApi(query: string) {
    return NetworkClient.delete("health-facility/" + query);
}
export async function getAllAbbreviationApi(query: string) {
    return NetworkClient.get("abbreviation" + (query || ""));
}
export async function getAbbreviationByIDApi(query: string) {
    return NetworkClient.get("abbreviation/" + (query || ""));
}
export async function createAbbreviationApi(obj: any) {
    return NetworkClient.post("abbreviation", obj);
}
export async function updateAbbreviationByIDApi(query: string, obj: any) {
    return NetworkClient.patch("abbreviation/" + query, obj);
}
export async function deleteAbbreviationByIDApi(query: string) {
    return NetworkClient.delete("abbreviation/" + query);
}
export async function getAllSystemQuestionsApi(query: string) {
    return NetworkClient.get("system-question" + (query || ""));
}
export async function getSystemQuestionByIDApi(query: string) {
    return NetworkClient.get("system-question/" + (query || ""));
}
export async function createSystemQuestionApi(obj: any) {
    return NetworkClient.post("system-question", obj);
}
export async function updateSystemQuestionByIDApi(query: string, obj: any) {
    return NetworkClient.patch("system-question/" + query, obj);
}
export async function deleteSystemQuestionByIDApi(query: string) {
    return NetworkClient.delete("system-question/" + query);
}
export async function getAllPrimaryCadersApi(query: string) {
    return NetworkClient.get("primary-cadre" + (query || ""));
}
export async function getPrimaryCaderByIDApi(query: string) {
    return NetworkClient.get("primary-cadre/" + (query || ""));
}
export async function createPrimaryCaderApi(obj: any) {
    return NetworkClient.post("primary-cadre", obj);
}
export async function updatePrimaryCaderByIDApi(query: string, obj: any) {
    return NetworkClient.patch("primary-cadre/" + query, obj);
}
export async function deletePrimaryCaderByIDApi(query: string) {
    return NetworkClient.delete("primary-cadre/" + query);
}
export async function getAllPrimaryCadersListApi() {
    return NetworkClient.get("primary-cadre/get-all-primary-cadre");
}
export async function getAllConfigApi(query: string) {
    return NetworkClient.get("app-config" + query);
}
export async function getConfigByIDApi(query: string) {
    return NetworkClient.get("app-config/" + (query || ""));
}
export async function createConfigApi(obj: any) {
    return NetworkClient.post("app-config", obj);
}
export async function updateConfigByIDApi(query: string, obj: any) {
    return NetworkClient.patch("app-config/" + query, obj);
}
export async function deleteConfigByIDApi(query: string) {
    return NetworkClient.delete("app-config/" + query);
}
export async function getAllSurveyApi(query: string) {
    return NetworkClient.get("survey-master" + (query || ""));
}
export async function getAllSurveyHistoryApi(query: string) {
    return NetworkClient.get("survey-history" + (query || ""));
}
export async function getAllSurveyHistoryWithoutPaginationApi(query: string) {
    return NetworkClient.get("survey-history/survey-history-csv" + query);
}
export async function getAllTourApi(query: string) {
    return NetworkClient.get("tour" + (query || ""));
}
export async function getAllMasterInstituteApi(query: string) {
    return NetworkClient.get("master-institute/" + query);
}
export async function createMasterInstituteApi(obj: any) {
    return NetworkClient.post("master-institute", obj);
}
export async function getParentInstituteByTypeApi(type: string) {
    return NetworkClient.get("master-institute/get-parent-institute/" + type);
}
export async function getChildInstituteByTypeApi(type: string) {
    return NetworkClient.get("master-institute/get-institute/" + type);
}
export async function getMembersByInstituteApi(type: string) {   //saga & api ready but not yet used anywhere(do not delete)*
    return NetworkClient.get("institute/institute-member-list/" + type);
}
export async function getAllSubscribersSearchApi(query: string) {
    return NetworkClient.get("subscriber/get-subscribers" + query);
}
export async function getAllSubscribersWithoutpaginationApi(query: string) {
    return NetworkClient.get("subscriber/get-all-subscribers" + query);
}
export async function getMasterInstituteByIDApi(query: string) {
    return NetworkClient.get("master-institute/" + (query));
}
export async function getChildInstituteByIDApi(query: string) {
    return NetworkClient.get("institute/" + (query));
}
export async function updateMasterInstituteByIDApi(query: string, obj: any) {
    return NetworkClient.patch("master-institute/" + query, obj);
}
export async function deleteMasterInstituteByIDApi(query: string) {
    return NetworkClient.delete("master-institute/" + (query));
}
export async function getAllChildInstituteApi(query: string) {
    return NetworkClient.get("institute" + query);
}
export async function createChildInstituteApi(obj: any) {
    return NetworkClient.post("institute", obj);
}
export async function deleteChildInstituteApi(query: string) {
    return NetworkClient.delete("institute/" + query);
}
export async function createSubscriberApi(obj: any) {
    return NetworkClient.post("subscriber", obj);
}
export async function deleteSubscriberByIdApi(query: string) {
    return NetworkClient.delete("subscriber/" + (query));
}
export async function updateChildInstituteByIDApi(query: string, obj: any) {
    return NetworkClient.patch("institute/" + query, obj);
}
export async function getAllSymptomsApi(query: string) {
    return NetworkClient.get("symptom" + (query || ""));
}
export async function getSymptomByIDApi(query: string) {
    return NetworkClient.get("symptom/" + (query || ""));
}
export async function updateSymptomApi(query: string, obj: any) {
    return NetworkClient.patch("symptom/" + (query || ""), obj);
}
export async function createSymptomApi(obj: any) {
    return NetworkClient.post("symptom", obj);
}
export async function deleteSymptomByIDApi(query: string) {
    return NetworkClient.delete("symptom/" + query);
}
export async function getAllAppManagmentFlagsApi(query: string) {
    return NetworkClient.get("app-management-flag" + query);
}
export async function getAppFlagByIDApi(query: string) {
    return NetworkClient.get("app-management-flag/" + query);
}
export async function deleteAppFlagByIDApi(query: string) {
    return NetworkClient.delete("app-management-flag/" + query);
}
export async function updateAppFlagByIDApi(query: string, obj: any) {
    return NetworkClient.patch("app-management-flag/" + query, obj);
}
export async function createAppFlagApi(obj: any) {
    return NetworkClient.post("app-management-flag", obj);
}
export async function getTourByIDApi(query: string) {
    return NetworkClient.get("tour/" + query);
}
export async function deleteTourByIDApi(query: string) {
    return NetworkClient.delete("tour/" + query);
}
export async function createTourApi(obj: any) {
    return NetworkClient.post("tour", obj);
}
export async function updateTourByIDApi(query: string, obj: any) {
    return NetworkClient.patch("tour/" + query, obj);
}
export async function deleteSurveyByIDApi(query: string) {
    return NetworkClient.delete("survey-master/" + query);
}
export async function updateSurveyByIDApi(query: string, obj: any) {
    return NetworkClient.patch("survey-master/" + query, obj);
}
export async function createSurveyApi(obj: any) {
    return NetworkClient.post("survey-master", obj);
}
export async function getSurveyByIDApi(query: string) {
    return NetworkClient.get("survey-master/" + query);
}
export async function sendSurveyNotificationApi(id: string) {
    return NetworkClient.post("survey-master/send-initial-notification/" + id, {});
}
export async function getAllManageTbApi(query: string) {
    return NetworkClient.get("manage-tb" + query);
}
export async function createManageTbApi(obj: any) {
    return NetworkClient.post("manage-tb/store-manage-tb/", obj);
}
export async function createInstituteMemberApi(obj: any) {
    return NetworkClient.post("institute/add-member", obj);
}
export async function getAllMemberByInstituteIdApi(query: string) {
    return NetworkClient.get("institute/institute-member-list/" + query);
}
export async function deleteInstituteMemberByIdApi(obj: object) {
    return NetworkClient.post("institute/delete-member/", obj);
}
export async function TransferOwnershipApi(obj: any) {
    return NetworkClient.post("institute/transfer-ownership", obj);
}
export async function getAllInstituteListApi() {
    return NetworkClient.get("master-institute/institute-list");
}
export async function getAllQueryListbyIdApi(query: string) {
    return NetworkClient.get("query/get-open-queries/" + query);
}
export async function transferQueryApi(obj: any) {
    return NetworkClient.post("query/transfer-query", obj);
}
export async function getAllTransferedQueryListbyIdApi(query: string) {
    return NetworkClient.get("query/get-transfer-queries/" + query);
}
export async function getAllOpenQueryListbyIdApi(query: string) {
    return NetworkClient.get("query/get-open-queries/" + query);
}
export async function getAllClosedQueryListbyIdApi(query: string) {
    return NetworkClient.get("query/get-closed-queries/" + query);
}
export async function getAllQueryReportsListbyIdApi(query: string) {
    return NetworkClient.get("query/query-report/" + query);
}
export async function getInstituteQueryReportByIdApi(query: any, typeOfQuery: string) {
    const url = `query/query-export/${query}?type=${encodeURIComponent(typeOfQuery)}`;
    return NetworkClient.get(url);
}
export async function getAllQuestionListApi(query: string) {
    return NetworkClient.get("question-bank" + (query || ""));
}
export async function getQuestionByIdApi(query: string) {
    return NetworkClient.get("question-bank/" + query);
}
export async function createQuestionApi(obj: any) {
    return NetworkClient.post("question-bank", obj);
}
export async function updateQuestionApi(query: string, obj: any) {
    return NetworkClient.patch("question-bank/" + query, obj);
}
export async function deleteQuestionApi(query: string) {
    return NetworkClient.delete("question-bank/" + query);
}
export async function getAllAssessmentListApi(query: string) {
    return NetworkClient.get("assessment" + (query || ""));
}
export async function getAssessmentByIdApi(query: string) {
    return NetworkClient.get("assessment/" + query);
}
export async function createAssessmentApi(obj: any) {
    return NetworkClient.post("assessment", obj);
}
export async function updateAssessmentApi(query: string, obj: any) {
    return NetworkClient.patch("assessment/" + query, obj);
}
export async function deleteAssessmentApi(query: string) {
    return NetworkClient.delete("assessment/" + query);
}
export async function sendAssessmentNotificationApi(id: string) {
    return NetworkClient.post("assessment/send-initial-notification/" + id, {});
}
export async function getAllQuestionWithoutPaginationApi(query: any) {
    return NetworkClient.get("question-bank/get-all-questions" + query);
}
export async function getAllQuestionWithoutPaginationReportApi(query: any) {
    return NetworkClient.get("question-bank/get-questions-report" + query);
}
export async function copyAssessmentApi(query: string) {
    return NetworkClient.get("assessment/copy-assessment/" + query);
}
export async function getAllAssessmentCertificateListApi(query: string) {
    return NetworkClient.get("assessment-certificate" + (query || ""));
}
export async function getAssessmentCertificateByIdApi(query: string) {
    return NetworkClient.get("assessment-certificate/" + query);
}
export async function createAssessmentCertificateApi(obj: any) {
    return NetworkClient.post("assessment-certificate", obj);
}
export async function updateAssessmentCertificateApi(query: string, obj: any) {
    return NetworkClient.patch("assessment-certificate/" + query, obj);
}
export async function deleteAssessmentCertificateApi(query: string) {
    return NetworkClient.delete("assessment-certificate/" + query);
}
export async function getAllAssessmentCertificateWithoutPaginationApi() {
    return NetworkClient.get("assessment-certificate/get-all-certificates");
}
export async function uploadImageApi(body: any) {
    return NetworkClient.post("upload", body, { "Content-Type": "multipart/form-data" });
}
export async function getAssessmentResultReportApi(quey: string) {
    return NetworkClient.get("assessment/assessment-result-report/" + quey);
}
export async function getAssessmentQuestionReportApi(quey: string) {
    return NetworkClient.get("assessment/assessment-question-report/" + quey);
}
export async function getUserAssessmentApi(query: string) {
    return NetworkClient.get("assessment-response/" + query);
}
export async function getUserAssessmentWithoutApi(query: string) {
    return NetworkClient.get("assessment-response/get-all-assessment-result" + query);
}
export async function getOldAssessmentApi(query: string) {
    return NetworkClient.get("old-assessment-result" + query);
}
export async function getOldAssessmentWithoutApi(query: string) {
    return NetworkClient.get("old-assessment-result/get-old-assessment-result" + query);
}
export async function getProAssessmentApi(query: string) {
    return NetworkClient.get("pro-assessment-response/" + query);
}
export async function getProAssessmentWithoutApi(query: string) {
    return NetworkClient.get("pro-assessment-response/get-all-assessment-result" + query);
}
export async function getAllLeaderboardLevelListApi(query: string) {
    return NetworkClient.get("leader-board/level/list" + (query || ""));
}
export async function getLeaderboardLevelByIdApi(query: string) {
    return NetworkClient.get("leader-board/level/detail/" + query);
}
export async function createLeaderboardLevelApi(obj: any) {
    return NetworkClient.post("leader-board/level/create/", obj);
}
export async function updateLeaderboardLevelApi(query: string, obj: any) {
    return NetworkClient.patch("leader-board/level/update/" + query, obj);
}
export async function deleteLeaderboardLevelApi(query: string) {
    return NetworkClient.delete("leader-board/level/delete/" + query);
}
export async function getAllLeaderboardBadgeListApi(query: string) {
    return NetworkClient.get("leader-board/badge/list" + (query || ""));
}
export async function getLeaderboardBadgeByIdApi(query: string) {
    return NetworkClient.get("leader-board/badge/detail/" + query);
}
export async function createLeaderboardBadgeApi(obj: any) {
    return NetworkClient.post("leader-board/badge/create/", obj);
}
export async function updateLeaderboardBadgeApi(query: string, obj: any) {
    return NetworkClient.patch("leader-board/badge/update/" + query, obj);
}
export async function deleteLeaderboardBadgeApi(query: string) {
    return NetworkClient.delete("leader-board/badge/delete/" + query);
}
export async function getAllLeaderboardTaskListApi(query: string) {
    return NetworkClient.get("leader-board/task-list/list" + (query || ""));
}
export async function getLeaderboardTaskByIdApi(query: string) {
    return NetworkClient.get("leader-board/task/detail/" + query);
}
export async function createLeaderboardTaskApi(obj: any) {
    return NetworkClient.post("leader-board/task/create/", obj);
}
export async function updateLeaderboardTaskApi(query: string, obj: any) {
    return NetworkClient.patch("leader-board/task/update/" + query, obj);
}
export async function deleteLeaderboardTaskApi(query: string) {
    return NetworkClient.delete("leader-board/task/delete/" + query);
}
export async function getAllLeaderboardSubscriberRankApi(query: string) {
    return NetworkClient.get("subscriber-progress/all-subscriber-rank" + (query || ""));
}
export async function getAllLeaderboardSubscriberRankWithoutPaginationApi(query: string) {
    return NetworkClient.get("subscriber-progress/all-subscriber-rank-csv" + (query || ""));
}
export async function getAllFlashNewsListApi(query: string) {
    return NetworkClient.get("flash-news" + (query || ""));
}
export async function getFlashNewsByIdApi(query: string) {
    return NetworkClient.get("flash-news/" + query);
}
export async function createFlashnewsApi(obj: any) {
    return NetworkClient.post("flash-news/", obj);
}
export async function updateFlashnewsApi(query: string, obj: any) {
    return NetworkClient.patch("flash-news/" + query, obj);
}
export async function deleteFlashnewsApi(query: string) {
    return NetworkClient.delete("flash-news/" + query);
}
export async function getAllFlashSimilarAppListApi(query: string) {
    return NetworkClient.get("flash-similar-apps" + (query || ""));
}
export async function getFlashSimilarAppByIdApi(query: string) {
    return NetworkClient.get("flash-similar-apps/" + query);
}
export async function createFlashSimilarAppApi(obj: any) {
    return NetworkClient.post("flash-similar-apps/", obj);
}
export async function updateFlashSimilarAppApi(query: string, obj: any) {
    return NetworkClient.patch("flash-similar-apps/" + query, obj);
}
export async function deleteFlashSimilarAppApi(query: string) {
    return NetworkClient.delete("flash-similar-apps/" + query);
}
export async function getDisplayMasterNodesApi(slug: string) {
    if (slug === "diagnosis")
        return NetworkClient.get("algorithm-diagnosis/display-master-nodes");
    if (slug === "treatment")
        return NetworkClient.get("algorithm-treatment/display-master-nodes");
    if (slug === "adr")
        return NetworkClient.get("algorithm-guidance-on-adverse-drug-reaction/display-master-nodes");
    if (slug === "differential")
        return NetworkClient.get("algorithm-differential-care/display-master-nodes");
}
export async function getDescendantsNodeByIDApi(obj: { id: string, slug: string }) {
    if (obj?.slug === "diagnosis")
        return NetworkClient.get("algorithm-diagnosis/descendants-nodes/" + obj?.id);
    if (obj?.slug === "treatment")
        return NetworkClient.get("algorithm-treatment/descendants-nodes/" + obj?.id);
    if (obj?.slug === "adr")
        return NetworkClient.get("algorithm-guidance-on-adverse-drug-reaction/descendants-nodes/" + obj?.id);
    if (obj?.slug === "differential")
        return NetworkClient.get("algorithm-differential-care/descendants-nodes/" + obj?.id);
}
export async function addNodeApi(slug: string | undefined, obj: AlgorithmsFormProps) {
    if (slug === "diagnosis")
        return NetworkClient.post("algorithm-diagnosis", obj);
    if (slug === "treatment")
        return NetworkClient.post("algorithm-treatment", obj);
    if (slug === "adr")
        return NetworkClient.post("algorithm-guidance-on-adverse-drug-reaction", obj);
    if (slug === "differential")
        return NetworkClient.post("algorithm-differential-care", obj);
}
export async function getNodeByIdApi(obj: { id: string, slug: string }) {
    if (obj?.slug === "diagnosis")
        return NetworkClient.get("algorithm-diagnosis/" + obj?.id);
    if (obj?.slug === "treatment")
        return NetworkClient.get("algorithm-treatment/" + obj?.id);
    if (obj?.slug === "adr")
        return NetworkClient.get("algorithm-guidance-on-adverse-drug-reaction/" + obj?.id);
    if (obj?.slug === "differential")
        return NetworkClient.get("algorithm-differential-care/" + obj?.id);
}
export async function editNodeByIdApi(slug: string, id: string, obj: AlgorithmsFormProps) {
    if (slug === "diagnosis")
        return NetworkClient.patch("algorithm-diagnosis/" + id, obj);
    if (slug === "treatment")
        return NetworkClient.patch("algorithm-treatment/" + id, obj);
    if (slug === "adr")
        return NetworkClient.patch("algorithm-guidance-on-adverse-drug-reaction/" + id, obj);
    if (slug === "differential")
        return NetworkClient.patch("algorithm-differential-care/" + id, obj);
}
export async function deleteNodeByIdApi(slug: string, id: string) {
    if (slug === "diagnosis")
        return NetworkClient.delete("algorithm-diagnosis/" + id);
    if (slug === "treatment")
        return NetworkClient.delete("algorithm-treatment/" + id);
    if (slug === "adr")
        return NetworkClient.delete("algorithm-guidance-on-adverse-drug-reaction/" + id);
    if (slug === "differential")
        return NetworkClient.delete("algorithm-differential-care/" + id);
}
export async function sendAlgoNotificationApi(slug: string, id: any) {
    if (slug === "diagnosis")
        return NetworkClient.post("algorithm-diagnosis/send-initial-notification/" + id, {});
    if (slug === "treatment")
        return NetworkClient.post("algorithm-treatment/send-initial-notification/" + id, {});
    if (slug === "adr")
        return NetworkClient.post("algorithm-guidance-on-adverse-drug-reaction/send-initial-notification/" + id, {});
    if (slug === "differential")
        return NetworkClient.post("algorithm-differential-care/send-initial-notification/" + id, {});
}
export async function getAllMasterCmsApi(query: string) {
    return NetworkClient.get("master-cms" + query);
}
export async function getMasterCmsByIDApi(query: string) {
    return NetworkClient.get("master-cms/" + (query || ""));
}
export async function createMasterCmsApi(obj: any) {
    return NetworkClient.post("master-cms", obj);
}
export async function updateMasterCmsByIDApi(query: string, obj: any) {
    return NetworkClient.patch("master-cms/" + query, obj);
}
export async function deleteMasterCmsByIDApi(query: string) {
    return NetworkClient.delete("master-cms/" + query);
}
export async function getAllUserNotificationListApi(query: string) {
    return NetworkClient.get("user-notification" + query);
}
export async function createUserNotificationApi(obj: any) {
    return NetworkClient.post("user-notification", obj);
}
export async function getUserNotificationInfoApi(id: string) {
    return NetworkClient.get("user-notification/" + id);
}
export async function getAllMessageNotificationListApi(query: string) {
    return NetworkClient.get("message-notification" + query);
}
export const createMessageNotificationApi = (obj: any) => {
    return NetworkClient.post("message-notification", obj, {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
    });
};
export async function getAllAutomaticNotificationListApi(query: string) {
    return NetworkClient.get("automatic-notification" + query);
}
export async function getMasterDropdownApi() {
    return NetworkClient.get("region/get-master-drop-down");
}
export async function setActiveAssessmentApi(obj: any) {
    return NetworkClient.post("assessment/update-active-flag", obj);
}
export async function setActivityApi(obj: any) {
    return NetworkClient.post("admin-activity", obj);
}
export async function getAllAdminActivityApi(query: string) {
    return NetworkClient.get("admin-activity" + query);
}
export async function getAllUsersListApi(query: string) {
    return NetworkClient.get("admin-users" + query);
}
export async function getUserDetailByIDApi(query: string) {
    return NetworkClient.get("admin-users/" + query);
}
export async function updateUserDetailByIDApi(query: string, obj: any) {
    return NetworkClient.patch("admin-users/" + query, obj);
}
export async function deleteUserDetailByIDApi(query: string) {
    return NetworkClient.delete("admin-users/" + query);
}
export async function getAllRootMaterialApi() {
    return NetworkClient.get("resource-material/root-nodes");
}
export async function getDescendantsMaterialByIDApi(id: string) {
    return NetworkClient.get("resource-material/descendants-nodes/" + id);
}
export async function createMaterialApi(obj: any) {
    return NetworkClient.post("resource-material", obj);
}
export async function getMaterialByIDApi(id: string) {
    return NetworkClient.get("resource-material/" + id);
}
export async function editMaterialByIDApi(id: string, obj: any) {
    return NetworkClient.patch("resource-material/" + id, obj);
}
export async function deleteMaterialByIDApi(id: string,) {
    return NetworkClient.delete("resource-material/" + id);
}
export async function sendResourceMaterialNotificationApi(id: string) {
    return NetworkClient.post("resource-material/send-initial-notification/" + id, {});
}
export async function createUserApi(obj: any) {
    return NetworkClient.post("admin-users", obj);
}
export async function getAllAdminActivityWithoutPaginationApi(query: string) {
    return NetworkClient.get("admin-activity/get-all-activity" + query);
}
export async function getAllInquiryApi(query: string) {
    return NetworkClient.get("inquiry" + query);
}
export async function getAllInquiryWithoutPaginationApi(query: string) {
    return NetworkClient.get("inquiry/get-all-inquiries" + query);
}
export async function getAllSubscriberActivityApi(query: string) {
    return NetworkClient.get("subscriber-activity/subscriber-activity-records" + query);
}
export async function getAllSubscriberActivityWithoutPaginationApi(query: any) {
    return NetworkClient.get("subscriber-activity/get-all-subscriber-activity" + (query || ""));
}
export async function getAllChatbotActivityApi(query: string) {
    return NetworkClient.get("chat-conversion/get-chat-histories" + (query || ""));
}
export async function getAllChatbotActivityWithoutPaginationApi(query: any) {
    return NetworkClient.get("chat-conversion/get-chat-histories-csv" + (query || ""));
}
export async function getAllUserAppVersionApi(query: string) {
    return NetworkClient.get("user-app-version" + (query || ""));
}
export async function getAllUserAppVersionWithoutPaginationApi(query: any) {
    return NetworkClient.get("user-app-version/get-all-version" + (query || ""));
}
export async function getAllPluginManagementListApi(query: string) {
    return NetworkClient.get("plugin-management" + (query || ""));
}
export async function getPluginManagementByIDApi(query: string) {
    return NetworkClient.get("plugin-management/" + query);
}
export async function updatePluginManagementByIDApi(query: string, obj: any) {
    return NetworkClient.patch("plugin-management/" + query, obj);
}
export async function createPluginManagementByIDApi(obj: any) {
    return NetworkClient.post("plugin-management", obj);
}
export async function deletePluginManagementByIDApi(query: string) {
    return NetworkClient.delete("plugin-management/" + query);
}
export async function getAllStaticBlogListApi(query: string) {
    return NetworkClient.get("static-blog" + (query || ""));
}

export async function getStaticBlogByIdApi(query: string) {
    return NetworkClient.get("static-blog/" + query);
}

export async function createStaticBlogApi(obj: any) {
    return NetworkClient.post("static-blog/", obj);
}

export async function updateStaticBlogApi(query: string, obj: any) {
    return NetworkClient.patch("static-blog/" + query, obj);
}

export async function deleteStaticBlogApi(query: string) {
    return NetworkClient.delete("static-blog/" + query);
}
export async function getAllStaticFaqListApi(query: string) {
    return NetworkClient.get("static-faq" + (query || ""));
}

export async function getStaticFaqByIdApi(query: string) {
    return NetworkClient.get("static-faq/" + query);
}

export async function createStaticFaqApi(obj: any) {
    return NetworkClient.post("static-faq/", obj);
}

export async function updateStaticFaqApi(query: string, obj: any) {
    return NetworkClient.patch("static-faq/" + query, obj);
}

export async function deleteStaticFaqApi(query: string) {
    return NetworkClient.delete("static-faq/" + query);
}
export async function getAllStaticAppConfigListApi(query: string) {
    return NetworkClient.get("static-app-config" + (query || ""));
}

export async function getStaticAppConfigByIdApi(query: string) {
    return NetworkClient.get("static-app-config/" + query);
}

export async function createStaticAppConfigApi(obj: any) {
    return NetworkClient.post("static-app-config/", obj);
}

export async function updateStaticAppConfigApi(query: string, obj: any) {
    return NetworkClient.patch("static-app-config/" + query, obj);
}

export async function deleteStaticAppConfigApi(query: string) {
    return NetworkClient.delete("static-app-config/" + query);
}
export async function getAllStaticKeyFeatureListApi(query: string) {
    return NetworkClient.get("static-key-feature" + (query || ""));
}

export async function getStaticKeyFeatureByIdApi(query: string) {
    return NetworkClient.get("static-key-feature/" + query);
}

export async function createStaticKeyFeatureApi(obj: any) {
    return NetworkClient.post("static-key-feature/", obj);
}

export async function updateStaticKeyFeatureApi(query: string, obj: any) {
    return NetworkClient.patch("static-key-feature/" + query, obj);
}

export async function deleteStaticKeyFeatureApi(query: string) {
    return NetworkClient.delete("static-key-feature/" + query);
}
export async function getAllStaticTestimonialListApi(query: string) {
    return NetworkClient.get("static-testimonial" + (query || ""));
}

export async function getStaticTestimonialByIdApi(query: string) {
    return NetworkClient.get("static-testimonial/" + query);
}

export async function createStaticTestimonialApi(obj: any) {
    return NetworkClient.post("static-testimonial/", obj);
}

export async function updateStaticTestimonialApi(query: string, obj: any) {
    return NetworkClient.patch("static-testimonial/" + query, obj);
}

export async function deleteStaticTestimonialApi(query: string) {
    return NetworkClient.delete("static-testimonial/" + query);
}
export async function getAllStaticModuleListApi(query: string) {
    return NetworkClient.get("static-module" + (query || ""));
}

export async function getStaticModuleByIdApi(query: string) {
    return NetworkClient.get("static-module/" + query);
}

export async function createStaticModuleApi(obj: any) {
    return NetworkClient.post("static-module/", obj);
}

export async function updateStaticModuleApi(query: string, obj: any) {
    return NetworkClient.patch("static-module/" + query, obj);
}

export async function deleteStaticModuleApi(query: string) {
    return NetworkClient.delete("static-module/" + query);
}

export async function getAllStaticResourceMaterialListApi(query: string) {
    return NetworkClient.get("static-resource-material" + (query || ""));
}

export async function getStaticResourceMaterialByIdApi(query: string) {
    return NetworkClient.get("static-resource-material/" + query);
}

export async function createStaticResourceMaterialApi(obj: any) {
    return NetworkClient.post("static-resource-material/", obj);
}

export async function updateStaticResourceMaterialApi(query: string, obj: any) {
    return NetworkClient.patch("static-resource-material/" + query, obj);
}

export async function deleteStaticResourceMaterialApi(query: string) {
    return NetworkClient.delete("static-resource-material/" + query);
}
export async function getAllStaticWhatWeDoListApi(query: string) {
    return NetworkClient.get("static-what-we-do" + (query || ""));
}

export async function getStaticWhatWeDoByIdApi(query: string) {
    return NetworkClient.get("static-what-we-do/" + query);
}

export async function createStaticWhatWeDoApi(obj: any) {
    return NetworkClient.post("static-what-we-do", obj);
}

export async function updateStaticWhatWeDoApi(query: string, obj: any) {
    return NetworkClient.patch("static-what-we-do/" + query, obj);
}

export async function deleteStaticWhatWeDoApi(query: string) {
    return NetworkClient.delete("static-what-we-do/" + query);
}
export async function getAllStaticReleaseListApi(query: string) {
    return NetworkClient.get("static-release" + (query || ""));
}

export async function getStaticReleaseByIdApi(query: string) {
    return NetworkClient.get("static-release/" + query);
}

export async function createStaticReleaseApi(obj: any) {
    return NetworkClient.post("static-release/", obj);
}

export async function updateStaticReleaseApi(query: string, obj: any) {
    return NetworkClient.patch("static-release/" + query, obj);
}

export async function deleteStaticReleaseApi(query: string) {
    return NetworkClient.delete("static-release/" + (query || ""));
}
export async function getAllStaticEnquiryListApi(query: string) {
    return NetworkClient.get("static-enquiry" + (query || ""));
}

export async function getAllMasterNtepInterventionApi() {
    return NetworkClient.get("algorithm-cgc-intervention/display-master-nodes");
}
export async function getDescendantsNtepInterventionByIDApi(id: string) {
    return NetworkClient.get("algorithm-cgc-intervention/descendants-nodes/" + id);
}
export async function createNtepInterventionApi(obj: any) {
    return NetworkClient.post("algorithm-cgc-intervention", obj);
}
export async function getNtepInterventionByIDApi(id: string) {
    return NetworkClient.get("algorithm-cgc-intervention/" + id);
}
export async function editNtepInterventionByIDApi(id: string, obj: any) {
    return NetworkClient.patch("algorithm-cgc-intervention/" + id, obj);
}
export async function deleteNtepInterventionByIDApi(id: string,) {
    return NetworkClient.delete("algorithm-cgc-intervention/" + id);
}
export async function getAllFeedbackHistoryListApi(query: string) {
    return NetworkClient.get("feedback-history" + (query || ""));
}
export async function getAllFeedbackHistoryWithoutPaginationApi(query: string) {
    return NetworkClient.get("feedback-history/feedback-history-csv" + (query || ""));
};
export async function getAllFeedbackListApi(query: string) {
    return NetworkClient.get("feedback" + (query || ""));
}
export async function getFeedbackByIdApi(id: string) {
    return NetworkClient.get("feedback/" + id);
}
export async function createFeedbackApi(obj: any) {
    return NetworkClient.post("feedback", obj);
}
export async function updateFeedbackByIDApi(id: string, obj: any) {
    return NetworkClient.patch("feedback/" + id, obj);
}
export async function deleteFeedbackByIDApi(id: string,) {
    return NetworkClient.delete("feedback/" + id);
}
export async function getAllDashboardDataApi(query: string) {
    return NetworkClient.get("dashboard/get-admin-panel-dashboard" + (query || ""));
}
export async function getDashboardMapCountApi(query: string) {
    return NetworkClient.get("dashboard/get-Map-count" + (query || ""));
}
export async function getDashboardCadreWiseCountApi(query: string) {
    return NetworkClient.get("dashboard/get-cadre-wise-count" + (query || ""));
}
export async function getDashboardModuleUsageCountApi(query: string) {
    return NetworkClient.get("dashboard/get-module-usage-count" + (query || ""));
}
export async function getDashboardLeaderboardCountApi(query: string) {
    return NetworkClient.get("dashboard/get-leaderboard-count" + (query || ""));
}
export async function getDashboardManageTBCountApi(query: string) {
    return NetworkClient.get("dashboard/get-manage-tb-count" + (query || ""));
}
export async function getDashboardQuery2coeCountApi(query: string) {
    return NetworkClient.get("dashboard/get-query2coe-count" + (query || ""));
}
export async function getDashboardAssessmentGraphCountApi(query: string) {
    return NetworkClient.get("dashboard/get-assessment-graph-count" + (query || ""));
}
export async function getDashboardProAssessmentGraphCountApi(query: string) {
    return NetworkClient.get("dashboard/get-pro-assessment-graph-count" + (query || ""));
}
export async function getDashboardChatbotCountApi(query: string) {
    return NetworkClient.get("dashboard/get-chatbot-count" + (query || ""));
}
export async function getDashboardSubscriberCountApi(query: string) {
    return NetworkClient.get("dashboard/get-subscriber-count" + (query || ""));
}
export async function getDashboardAssessmentCountApi(query: string) {
    return NetworkClient.get("dashboard/get-assessment-count" + (query || ""));
}
export async function getDashboardGeneralCount1Api(query: string) {
    return NetworkClient.get("dashboard/get-total-minute-spent-count" + (query || ""));
}
export async function getDashboardGeneralCount2Api(query: string) {
    return NetworkClient.get("dashboard/get-screening-tool-count" + (query || ""));
}
export async function getDashboardGeneralCount3Api(query: string) {
    return NetworkClient.get("dashboard/get-chat-bot-count" + (query || ""));
}
export async function getDashboardAppOpenedCountApi(query: string) {
    return NetworkClient.get("dashboard/get-app-opened-count/" + (query || ""));
}
export async function getDashboardVisitorCountApi(query: string) {
    return NetworkClient.get("dashboard/get-visitor-count" + (query || ""));
}
export async function getAllKbaseDataApi(query: string) {
    return NetworkClient.get("kbase/kbase-report" + (query || ""));
}
export async function getAllKbaseCoursereportDataApi(query: string) {
    return NetworkClient.get("kbase/kbase-course-report" + (query || ""));
}
export async function getKbaseReportApi(query: string) {
    return NetworkClient.get("kbase/kbase-report-csv" + (query || ""));
}
export async function getKbaseCourseReportApi(query: string) {
    return NetworkClient.get("kbase/kbase-course-report-csv" + (query || ""));
}
export async function getAllRootDynamicAlgoListApi(query: string) {
    return NetworkClient.get("dynamic-algo-master" + (query || ""));
}

export async function getRootDynamicAlgoByIdApi(id: string) {
    return NetworkClient.get("dynamic-algo-master/" + id);
}

export async function createRootDynamicAlgoApi(obj: any) {
    return NetworkClient.post("dynamic-algo-master", obj);
}

export async function updateRootDynamicAlgoByIDApi(id: string, obj: any) {
    return NetworkClient.patch("dynamic-algo-master/" + id, obj);
}

export async function deleteRootDynamicAlgoByIDApi(id: string) {
    return NetworkClient.delete("dynamic-algo-master/" + id);
}

export async function getAllRootDynamicAlgoApi(id: string) {
    return NetworkClient.get("dynamic-algorithm/display-master-nodes/" + id);
}

export async function getDescendantsDynamicAlgoByIDApi(id: string) {
    return NetworkClient.get("dynamic-algorithm/descendants-nodes/" + id);
}

export async function createDynamicAlgoApi(obj: any) {
    return NetworkClient.post("dynamic-algorithm", obj);
}

export async function getDynamicAlgoByIDApi(id: string) {
    return NetworkClient.get("dynamic-algorithm/" + id);
}

export async function editDynamicAlgoByIDApi(id: string, obj: any) {
    return NetworkClient.patch("dynamic-algorithm/" + id, obj);
}

export async function deleteDynamicAlgoByIDApi(id: string) {
    return NetworkClient.delete("dynamic-algorithm/" + id);
}

export async function sendDynamicAlgoNotificationApi(id: string) {
    return NetworkClient.post("dynamic-algorithm/send-initial-notification/" + id, {});
}
export async function getAllPrescriptionsApi(query: string) {
    return NetworkClient.get("prescription" + query);
}
export async function getAllprescriptionWithoutPaginationApi(query: string) {
    return NetworkClient.get("prescription/prescription-report" + (query || ""));
};
// subscriber-progress/leaderboard-details/
export async function getSubscriberLeaderboardInfoApi(id: string) {
    return NetworkClient.get("subscriber-progress/leaderboard-details/" + id);
}
export async function getAllAssessmentWithoutPaginationApi() {
    return NetworkClient.get("assessment/get-all-assessment-list");
};

export async function getAllOldAssessmentWithoutPaginationApi() {
    return NetworkClient.get("old-assessment-result/title-drop-down");
};

export async function getAllSurveyListApi() {
    return NetworkClient.get("survey-master/get-all-survey-list");
};

export async function getAllActionsApi() {
    return NetworkClient.get("subscriber-activity/subscriber-action-master-data");
}

export async function getDashboardBalanceApi() {
    return NetworkClient.get("dashboard/get-balance");
}
