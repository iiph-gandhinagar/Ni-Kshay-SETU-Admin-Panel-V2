import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BlankLayout from "../components/Layouts/BlankLayout";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import UserEditForm from "../forms/UserEditForm";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import privateRoute, { GuestRoute } from "./checkRoutes";
const PrimaryCader = lazy(() => import("../pages/MasterTables/PrimaryCader"));
const Cader = lazy(() => import("../pages/MasterTables/Cader"));
const Country = lazy(() => import("../pages/MasterTables/Country"));
const Block = lazy(() => import("../pages/MasterTables/Block"));
const District = lazy(() => import("../pages/MasterTables/District"));
const State = lazy(() => import("../pages/MasterTables/State"));
const Health_Facilities = lazy(() => import("../pages/MasterTables/Health_Facilities"));
const Subscriber = lazy(() => import("../pages/Reports/Subscriber"));
const Roles = lazy(() => import("../pages/setting/Roles"));
const User = lazy(() => import("../pages/setting/UserList"));
const Permissions = lazy(() => import("../pages/setting/Permissions"));
const Abbreviation = lazy(() => import("../pages/ChatModule/Abbreviation"));
const AppConfig = lazy(() => import("../pages/CmsNotification/AppConfig/index"));
const RoleWisePermissionsPage = lazy(() => import("../pages/setting/Roles/RoleWisePermissionsPage"));
const ChatQuestionAdd = lazy(() => import("../pages/ChatModule/Questions/ChatQuestionEditForm"));
const Query2COE = lazy(() => import("../pages/Query2COE"));
const AddInstitute = lazy(() => import("../pages/AddInstitute"));
const InstituteDashboard = lazy(() => import("../pages/AddInstitute/InstituteDashboard"));
const AddMemberForm = lazy(() => import("../pages/AddInstitute/AddMemberForm"));
const AddSubscriberForm = lazy(() => import("../pages/AddInstitute/AddSubscriberForm"));
const NewLandingPage = lazy(() => import("../landingPages/Query2COELandingPage"));
const LandingPage = lazy(() => import("../landingPages/AssessmentLandingPage"));
const ManageTbLandingPage = lazy(() => import("../landingPages/ManageTbLandingPage"));
const Questions = lazy(() => import("../pages/ChatModule/Questions"));
const SurveyMaster = lazy(() => import("../pages/Survey/surveyQuestions/index"));
const Tours = lazy(() => import("../pages/Tours/Index"));
const ToursEditForm = lazy(() => import("../forms/TourEditForm"));
const Symptoms = lazy(() => import("../pages/MasterTables/Symptoms/index"));
const QuestionBank = lazy(() => import("../pages/Assessment/QuestionBank/Index"));
const QuestionBankEditForm = lazy(() => import("../forms/QuestionBankEditForm"));
const Assessments = lazy(() => import("../pages/Assessment/Index"));
const AssessmentForm = lazy(() => import("../forms/AssessmentEditForm"));
const SurveyQuestionEditForm = lazy(() => import("../pages/Survey/surveyQuestions/SurveyQuestionsEditForm"));
const AppManagment = lazy(() => import("../pages/CmsNotification/AppManagment/Index"));
const ManageTb = lazy(() => import("../pages/ManageTb"));
const TransferOwnershipForm = lazy(() => import("../pages/AddInstitute/TransferOwnershipForm"));
const Dashboard = lazy(() => import("../pages/Dashboard/Index"));
const AssessmentCertificate = lazy(() => import("../pages/MasterTables/AssessmentCerificate/Index"));
const UserAssessments = lazy(() => import("../pages/Reports/UserAssessments/Index"));
const DisplayNodesList = lazy(() => import("../pages/PatientManagement/DisplayNodesList"));
const DependentNodesList = lazy(() => import("../pages/PatientManagement/DependentNodesList"));
const LB_Level = lazy(() => import("../pages/Leaderbord/LB_Levels/Index"));
const LB_Badge = lazy(() => import("../pages/Leaderbord/LB_Badges/Index"));
const LB_TaskList = lazy(() => import("../pages/Leaderbord/LB_TaskList/Index"));
const LB_subscriberRanking = lazy(() => import("../pages/Leaderbord/LB_subscriberRanking/Index"));
const Flash_News = lazy(() => import("../pages/FlashNews/NewsContent/Index"));
const Flash_Similar_App = lazy(() => import("../pages/FlashNews/FlashSimilarApps/Index"));
const MasterCms = lazy(() => import("../pages/CmsNotification/MasterCms/Index"));
const ResourceMaterials = lazy(() => import("../pages/ResourceMaterials/ResourceMaterials"));
const MaterialsList = lazy(() => import("../pages/ResourceMaterials/MaterialsList"));
const ActivityLog = lazy(() => import("../pages/Reports/ActivityLog/Index"));
const SubscriberActivity = lazy(() => import("../pages/Reports/SubscriberActivity/Index"));
const InquiriesReport = lazy(() => import("../pages/Reports/Inquiry/Index"));
const UserAppVersion = lazy(() => import("../pages/Reports/UserAppVersion/Index"));
const PlugInManagement = lazy(() => import("../pages/MasterTables/Plugin_Managment/Index"));
const StaticBlogs = lazy(() => import("../pages/Static/SaticBlog/Index"));
const StaticFaq = lazy(() => import("../pages/Static/StaticFaq/Index"));
const StaticAppConfig = lazy(() => import("../pages/Static/StaticAppConfig/Index"));
const StaticKeyFeatures = lazy(() => import("../pages/Static/StaticKeyFeatures/Index"));
const StaticTestimonial = lazy(() => import("../pages/Static/StaticTestimonial/Index"));
const StaticRelease = lazy(() => import("../pages/Static/StaticRelease/Index"));
const StaticWhatWeDo = lazy(() => import("../pages/Static/StaticWhatWeDo/Index"));
const StaticModule = lazy(() => import("../pages/Static/StaticModule/Index"));
const StaticEnquiry = lazy(() => import("../pages/Static/StaticEnquiries/Index"));
const StaticResourceMaterial = lazy(() => import("../pages/Static/StaticResourceMaterial/Index"));
const UserNotification = lazy(() => import("../pages/CmsNotification/UserNotification/Index"));
const MessageNotification = lazy(() => import("../pages/CmsNotification/MessageNotification/Index"));
const SurveyHistory = lazy(() => import("../pages/Survey/SurveyHistory/Index"));
const FeedbackMaster = lazy(() => import("../pages/Feedback/FeedbackMaster/Index"));
const FeedbackHistory = lazy(() => import("../pages/Feedback/FeedbackHistory/Index"));
const Profile = lazy(() => import("../pages/Profile/Index"));
const Kbase = lazy(() => import("../pages/Kbase/Index"));
const DynamicAlgo = lazy(() => import("../pages/DynamicAlgorithm/Index"));
const DynamicAlgoNodeList = lazy(() => import("../pages/DynamicAlgorithm/dynamicAlgoNodeList"));
const DynamicAlgoDependentNodeList = lazy(() => import("../pages/DynamicAlgorithm/dynamicAlgoDependentNodeList"));
const ChatbotActivity = lazy(() => import("../pages/Reports/ChatBotActivity/Index"));
const Prescription = lazy(() => import("../pages/Reports/Prescription/Index"));
const Credits = lazy(() => import("../pages/Reports/Credits/Index"));



function getRouters(user?: boolean): RouteObject[] {
    return [
        {
            path: "/login",
            element: (<GuestRoute user={user}><BlankLayout><Login /></BlankLayout></GuestRoute>),
        }, {
            path: "/forgotpassword",
            element: (<GuestRoute user={user}><BlankLayout><ForgotPassword /></BlankLayout></GuestRoute>),
        }, {
            path: "/resetpassword/:token",
            element: (<GuestRoute user={user}><BlankLayout><ResetPassword /></BlankLayout></GuestRoute>),
        },
        {
            path: "/master-table/primary-cader",
            element: <DefaultLayout><PrimaryCader /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/master-table/cader",
            element: <DefaultLayout><Cader /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/master-table/country",
            element: <DefaultLayout><Country /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/master-table/block",
            element: <DefaultLayout><Block /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/master-table/district",
            element: <DefaultLayout><District /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/master-table/State",
            element: <DefaultLayout><State /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/master-table/health_facilities",
            element: <DefaultLayout><Health_Facilities /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/dynamic_algorithm",
            element: <DefaultLayout><DynamicAlgo /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/dynamic_algorithm/:slug",
            element: <DefaultLayout><DynamicAlgoNodeList /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/dynamic_algorithm/:slug/:id",
            element: <DefaultLayout><DynamicAlgoDependentNodeList /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/master-table/certificate",
            element: <DefaultLayout><AssessmentCertificate /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/chat/abbreviation",
            element: <DefaultLayout><Abbreviation /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/report/subscriber",
            element: <DefaultLayout><Subscriber /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/reports/subscriber_activity",
            element: <DefaultLayout><SubscriberActivity /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/reports/inquiries",
            element: <DefaultLayout><InquiriesReport /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/reports/user_app_version",
            element: <DefaultLayout><UserAppVersion /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/reports/chatbot_activity",
            element: <DefaultLayout><ChatbotActivity /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/report/logs",
            element: <DefaultLayout><ActivityLog /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/report/prescription",
            element: <DefaultLayout><Prescription /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/report/credits",
            element: <DefaultLayout><Credits /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/roles",
            element: <DefaultLayout><Roles /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/roles/add",
            element: <DefaultLayout><RoleWisePermissionsPage /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/permissions",
            element: <DefaultLayout><Permissions /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/userlist",
            element: <DefaultLayout><User /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/user/upsert",
            element: <DefaultLayout><UserEditForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/chat/questions",
            element: <DefaultLayout><Questions /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/chat/questions/upsert",
            element: <DefaultLayout><ChatQuestionAdd /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/query2coe/masterdata",
            element: <DefaultLayout><Query2COE /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/query2coe/institute",
            element: <DefaultLayout><AddInstitute /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/query2coe/dashboard",
            element: <DefaultLayout><InstituteDashboard /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/query2coe/add-subscriber",
            element: <DefaultLayout><AddSubscriberForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/query2coe/landing-page",
            element: <DefaultLayout hideFooter={true}><NewLandingPage /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/query2coe/add-member",
            element: <DefaultLayout><AddMemberForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/cms/app_config",
            element: <DefaultLayout><AppConfig /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/survey/master",
            element: <DefaultLayout><SurveyMaster /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/survey/master/add",
            element: <DefaultLayout><SurveyQuestionEditForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/tour",
            element: <DefaultLayout><Tours /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/tour/add",
            element: <DefaultLayout><ToursEditForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/master-table/symptoms",
            element: <DefaultLayout><Symptoms /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/assessment/landing-page",
            element: <DefaultLayout hideFooter={true}><LandingPage /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/assessment/question_bank",
            element: <DefaultLayout><QuestionBank /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/assessment/question_bank/add",
            element: <DefaultLayout><QuestionBankEditForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/assessment/create",
            element: <DefaultLayout><Assessments /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/assessment/create/add",
            element: <DefaultLayout><AssessmentForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "cms/app_management",
            element: <DefaultLayout><AppManagment /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/manage-tb/landing-page",
            element: <DefaultLayout hideFooter={true}><ManageTbLandingPage /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "plugin/manage_tb",
            element: <DefaultLayout><ManageTb /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "query2coe/transfer-ownership",
            element: <DefaultLayout><TransferOwnershipForm /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/dashboard",
            element: <DefaultLayout><Dashboard /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/plugin/ntep",
            element: <DefaultLayout><Kbase /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/resource-materials",
            element: <DefaultLayout><ResourceMaterials /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/resource-materials/:id",
            element: <DefaultLayout><MaterialsList /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/cms/master_cms",
            element: <DefaultLayout><MasterCms /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/cms/message_notifications",
            element: <DefaultLayout><MessageNotification /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/cms/user_notification",
            element: <DefaultLayout><UserNotification /></DefaultLayout>,
            loader: () => privateRoute(user)
        }, {
            path: "/content/blogs",
            element: <DefaultLayout><StaticBlogs /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/faq",
            element: <DefaultLayout><StaticFaq /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/app_config",
            element: <DefaultLayout><StaticAppConfig /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/features",
            element: <DefaultLayout><StaticKeyFeatures /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/testimonials",
            element: <DefaultLayout><StaticTestimonial /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/releases",
            element: <DefaultLayout><StaticRelease /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/inquiries",
            element: <DefaultLayout><StaticEnquiry /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/what_we_do",
            element: <DefaultLayout><StaticWhatWeDo /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/module",
            element: <DefaultLayout><StaticModule /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/content/resource_materials",
            element: <DefaultLayout><StaticResourceMaterial /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/leaderboard/levels",
            element: <DefaultLayout><LB_Level /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/leaderboard/badges",
            element: <DefaultLayout><LB_Badge /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/leaderboard/task",
            element: <DefaultLayout><LB_TaskList /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/leaderboard/rank",
            element: <DefaultLayout><LB_subscriberRanking /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/feedback/master",
            element: <DefaultLayout><FeedbackMaster /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/feedback/history",
            element: <DefaultLayout><FeedbackHistory /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/news/",
            element: <DefaultLayout><Flash_News /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/news/apps",
            element: <DefaultLayout><Flash_Similar_App /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/survey/histories",
            element: <DefaultLayout><SurveyHistory /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/patient/:slug",
            element: <DefaultLayout><DisplayNodesList /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/patient/:slug/:id",
            element: <DefaultLayout><DependentNodesList /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/reports/user_assessments",
            element: <DefaultLayout><UserAssessments /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/master-table/plugin_management",
            element: <DefaultLayout><PlugInManagement /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/profile",
            element: <DefaultLayout><Profile /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
        {
            path: "/*",
            element: <DefaultLayout><Dashboard /></DefaultLayout>,
            loader: () => privateRoute(user)
        },
    ];
}
export default getRouters;
