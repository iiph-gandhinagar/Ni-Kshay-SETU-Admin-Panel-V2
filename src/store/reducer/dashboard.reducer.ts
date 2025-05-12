import { createSlice } from "@reduxjs/toolkit";

export interface DashboardData {
    internationalLevelSubscriber: number,
    nationalLevelSubscriber: number,
    totalSubscriberCount: number;
    todaysSubscriberCount: number;
    totalVisitorCount: number;
    todaysVisitorCount: number;
    totalCompletedAssessment: number;
    todaysCompletedAssessment: number;
    screeningTool: number | Array<{
        totalCount?: number
    }>;
    todaysSubscriber: Array<{ _id: number; count: number }>;
    totalSubscriber: Array<{ _id: string; count: number }>;
    todaysVisitor: Array<{ _id: number; count: number }>;
    totalVisitor: Array<{ _id: string; count: number }>;
    todaysAssessment: Array<{ _id: number; count: number }>;
    totalAssessment: Array<{ _id: string; count: number }>;
    totalMinuteSpent: Array<{ _id: string | null; points: number }>;
    todaysMinuteSpent: Array<{ _id: string | null; points: number }>;
    chatbotUsage: number;
    todaysChatbotUsage: number;
    stateWiseCount: Array<{
        StateName: string;
        TotalSubscriberCount: number;
        TodaysSubscriber: number;
        Percentage: number;
    }>;
    cadreWiseSubscribers: Array<{
        CadreName: string;
        TotalCadreCount: number;
        CadreType: string;
        cadreId: string;
        Percentage: number;
    }>;
    cadreWiseSubscribersLast30Days: Array<{
        CadreName: string;
        TotalCadreCount: number;
        CadreType: string;
        cadreId: string;
        Percentage: number;
    }>;
    moduleUsage: Array<{ ActivityCount: number; ModuleName: string }>;
    moduleUsageLast30Days: Array<{ ActivityCount: number; ModuleName: string }>;
    leaderboard: Array<{
        levels: Array<{ levelName: string; count: number }>;
        cadreType: string;
    }>;
    leaderboard30Days: Array<{
        levels: Array<{ levelName: string; count: number }>;
        cadreType: string;
    }>;
    chatbot: Array<{ count: number; question: string }>;
    chatbotLast30Days: Array<{ count: number; question: string }>;
    manageTb: Array<{ _id: string; count: number }>;
    drtbCounts: Array<{
        _id: { roleName: string; statusCategory: string };
        count: number;
    }>;
    appOpened4WeeksCount: Array<{ date: string; range3To5: number; range5To7: number; range7To9: number; rangeGte10: number }>;
    appOpened4MonthCount: Array<{ date: string; range3To5: number; range5To7: number; range7To9: number; rangeGte10: number }>;
    assessmentResponse: Array<{ _id: { year: number; month: number }; totalSubmitted: number }>;
    assessmentResponseLast30Days: Array<{ _id: { year: number; month: number }; totalSubmitted: number }>;
    proassessmentResponse: Array<{ _id: { year: number; month: number }; totalSubmitted: number }>;
    proassessmentResponseLast30Days: Array<{ _id: { year: number; month: number }; totalSubmitted: number }>;
    drtbCountsLast30Days: Array<{ _id: { roleName: string; statusCategory: string }; count: number }>;
    coeCounts: Array<{ _id: { roleName: string; statusCategory: string }; count: number }>;
    nodal: any;
    nodalLast30Days: any;
    isAppOpened4WeeksCount: boolean;
    coeCountsLast30Days: Array<{ _id: { roleName: string; statusCategory: string }; count: number }>;
}

const initialState: {
    loader: {
        dashboardMapCount: boolean,
        dashboardCadreWiseCount: boolean,
        dashboardModuleUsageCount: boolean,
        dashboardLeaderboardCount: boolean,
        dashboardManageTBCount: boolean,
        dashboardQuery2coeCount: boolean,
        dashboardAssessmentGraphCount: boolean,
        dashboardChatbotCount: boolean,
        dashboardSubscriberCount: boolean,
        dashboardAssessmentCount: boolean,
        dashboardGeneralCount: boolean,
        dashboardAppOpenedCount: boolean,
        dashboardVisitorCount: boolean,
        dashboardProAssessmentGraphCount: boolean
    },
    dashboardData: Partial<DashboardData> | undefined,
} = {
    loader: {
        dashboardMapCount: false,
        dashboardCadreWiseCount: false,
        dashboardModuleUsageCount: false,
        dashboardLeaderboardCount: false,
        dashboardManageTBCount: false,
        dashboardQuery2coeCount: false,
        dashboardAssessmentGraphCount: false,
        dashboardProAssessmentGraphCount: false,
        dashboardChatbotCount: false,
        dashboardSubscriberCount: false,
        dashboardAssessmentCount: false,
        dashboardGeneralCount: false,
        dashboardAppOpenedCount: false,
        dashboardVisitorCount: false,
    },
    dashboardData: {},
};

const dashboardReducer = createSlice({
    name: "dashboardReducer",
    initialState: initialState,
    reducers: {
        getAllDashboardData(state, { payload }) {
        },
        getAllDashboardDataSuccess(state, { payload }) {
            state.dashboardData = payload;
        },

        getDashboardMapCount(state, { payload }) {
            state.loader.dashboardMapCount = true;
        },
        getDashboardMapCountSuccess(state, { payload }) {
            state.loader.dashboardMapCount = false;
            if (state?.dashboardData) {
                state.dashboardData.stateWiseCount = payload?.stateWiseCount;
                state.dashboardData.internationalLevelSubscriber = payload?.internationalLevelSubscriber;
                state.dashboardData.nationalLevelSubscriber = payload?.nationalLevelSubscriber;
            }
        },

        getDashboardCadreWiseCount(state, { payload }) {
            state.loader.dashboardCadreWiseCount = true;
        },
        getDashboardCadreWiseCountSuccess(state, { payload }) {
            state.loader.dashboardCadreWiseCount = false;
            if (state?.dashboardData) {
                state.dashboardData.cadreWiseSubscribers = payload;
                state.dashboardData.cadreWiseSubscribersLast30Days = payload;
            }
        },

        getDashboardModuleUsageCount(state, { payload }) {
            state.loader.dashboardModuleUsageCount = true;
        },
        getDashboardModuleUsageCountSuccess(state, { payload }) {
            state.loader.dashboardModuleUsageCount = false;
            if (state?.dashboardData) {
                state.dashboardData.moduleUsage = payload;
                state.dashboardData.moduleUsageLast30Days = payload;
            }
        },
        getDashboardLeaderboardCount(state, { payload }) {
            state.loader.dashboardLeaderboardCount = true;
        },
        getDashboardLeaderboardCountSuccess(state, { payload }) {
            state.loader.dashboardLeaderboardCount = false;
            if (state?.dashboardData) {
                state.dashboardData.leaderboard = payload;
                state.dashboardData.leaderboard30Days = payload;
            }
        },

        getDashboardManageTBCount(state, { payload }) {
            state.loader.dashboardManageTBCount = true;
        },
        getDashboardManageTBCountSuccess(state, { payload }) {
            state.loader.dashboardManageTBCount = false;
            if (state?.dashboardData) {
                state.dashboardData.manageTb = payload?.manageTb;
            }
        },


        getDashboardQuery2coeCount(state, { payload }) {
            state.loader.dashboardQuery2coeCount = true;
        },
        getDashboardQuery2coeCountSuccess(state, { payload }) {
            state.loader.dashboardQuery2coeCount = false;
            if (state?.dashboardData) {
                state.dashboardData.coeCounts = payload?.coeCounts;
                state.dashboardData.coeCountsLast30Days = payload?.coeCountsLast30Days;
                state.dashboardData.drtbCounts = payload?.drtbCounts;
                state.dashboardData.drtbCountsLast30Days = payload?.drtbCountsLast30Days;
                state.dashboardData.nodal = payload?.nodal;
                state.dashboardData.nodalLast30Days = payload?.nodalLast30Days;
            }
        },


        getDashboardAssessmentGraphCount(state, { payload }) {
            state.loader.dashboardAssessmentGraphCount = true;
        },
        getDashboardAssessmentGraphCountSuccess(state, { payload }) {
            state.loader.dashboardAssessmentGraphCount = false;
            if (state?.dashboardData) {
                state.dashboardData.assessmentResponse = payload?.assessmentResponse;
                state.dashboardData.assessmentResponseLast30Days = payload?.assessmentResponseLast30Days;
            }
        },

        getDashboardProAssessmentGraphCount(state, { payload }) {
            state.loader.dashboardProAssessmentGraphCount = true;
        },
        getDashboardProAssessmentGraphCountSuccess(state, { payload }) {
            state.loader.dashboardProAssessmentGraphCount = false;
            if (state?.dashboardData) {
                state.dashboardData.proassessmentResponse = payload?.proAssessmentResponse;
                state.dashboardData.proassessmentResponseLast30Days = payload?.proAssessmentResponseLast30Days;
            }
        },


        getDashboardChatbotCount(state, { payload }) {
            state.loader.dashboardChatbotCount = true;
        },
        getDashboardChatbotCountSuccess(state, { payload }) {
            state.loader.dashboardChatbotCount = false;
            if (state?.dashboardData) {
                state.dashboardData.chatbot = payload?.chatbot;
                state.dashboardData.chatbotLast30Days = payload?.chatbotLast30Days;
            }
        },


        getDashboardSubscriberCount(state, { payload }) {
            state.loader.dashboardSubscriberCount = true;
        },
        getDashboardSubscriberCountSuccess(state, { payload }) {
            state.loader.dashboardSubscriberCount = false;
            if (state?.dashboardData) {
                state.dashboardData.totalSubscriber = payload.totalSubscriber;
                state.dashboardData.totalSubscriberCount = payload.totalSubscriberCount;
                state.dashboardData.todaysSubscriber = payload.todaysSubscriber;
                state.dashboardData.todaysSubscriberCount = payload.todaysSubscriberCount;
            }
        },


        getDashboardAssessmentCount(state, { payload }) {
            state.loader.dashboardAssessmentCount = true;
        },
        getDashboardAssessmentCountSuccess(state, { payload }) {
            state.loader.dashboardAssessmentCount = false;
            if (state?.dashboardData) {
                state.dashboardData.totalAssessment = payload?.totalAssessment;
                state.dashboardData.totalCompletedAssessment = payload?.totalCompletedAssessment;
                state.dashboardData.todaysAssessment = payload?.todaysAssessment;
                state.dashboardData.todaysCompletedAssessment = payload?.todaysCompletedAssessment;
            }
        },


        getDashboardGeneralCount(state, { payload }) {
            state.loader.dashboardGeneralCount = true;
        },
        getDashboardGeneralCountSuccess(state, { payload }) {
            state.loader.dashboardGeneralCount = false;
            if (state?.dashboardData) {
                state.dashboardData.chatbotUsage = payload?.chatbotUsage;
                state.dashboardData.screeningTool = payload?.screeningTool;
                state.dashboardData.totalMinuteSpent = payload?.totalMinuteSpent;
            }
        },


        getDashboardAppOpenedCount(state, { payload }) {
            state.loader.dashboardAppOpenedCount = true;
            if (state?.dashboardData) {
                state.dashboardData.isAppOpened4WeeksCount = (payload == "week");
            }
        },
        getDashboardAppOpenedCountSuccess(state, { payload }) {
            state.loader.dashboardAppOpenedCount = false;
            if (state?.dashboardData) {
                if (state.dashboardData.isAppOpened4WeeksCount) {
                    state.dashboardData.appOpened4WeeksCount = payload;
                } else {
                    state.dashboardData.appOpened4MonthCount = payload;
                }
            }
        },
        getDashboardVisitorCount(state, { payload }) {
            state.loader.dashboardVisitorCount = true;
        },
        getDashboardVisitorCountSuccess(state, { payload }) {
            state.loader.dashboardVisitorCount = false;
            if (state?.dashboardData) {
                state.dashboardData.totalVisitor = payload?.totalVisitor;
                state.dashboardData.totalVisitorCount = payload?.totalVisitorCount;
                state.dashboardData.todaysVisitorCount = payload?.todaysVisitorCount;
                state.dashboardData.todaysVisitor = payload?.todaysVisitor;
            }
        },
        cleanDashboardData(state) {
            state.dashboardData = {};
        },
        fetchAllDashboardData(state, { payload }) {
            state.loader = {
                dashboardAssessmentCount: state.loader?.dashboardAssessmentCount,
                dashboardSubscriberCount: state.loader?.dashboardSubscriberCount,
                dashboardVisitorCount: state.loader.dashboardVisitorCount,
                dashboardMapCount: true,
                dashboardCadreWiseCount: true,
                dashboardModuleUsageCount: true,
                dashboardLeaderboardCount: true,
                dashboardManageTBCount: true,
                dashboardQuery2coeCount: true,
                dashboardAssessmentGraphCount: true,
                dashboardChatbotCount: true,
                dashboardGeneralCount: true,
                dashboardAppOpenedCount: state.loader?.dashboardAppOpenedCount,
                dashboardProAssessmentGraphCount: true
            };
        },
        setAllLoaders(state) {
            state.loader = {
                dashboardAssessmentCount: true,
                dashboardSubscriberCount: true,
                dashboardVisitorCount: true,
                dashboardMapCount: true,
                dashboardCadreWiseCount: true,
                dashboardModuleUsageCount: true,
                dashboardLeaderboardCount: true,
                dashboardManageTBCount: true,
                dashboardQuery2coeCount: true,
                dashboardAssessmentGraphCount: true,
                dashboardChatbotCount: true,
                dashboardGeneralCount: true,
                dashboardAppOpenedCount: true,
                dashboardProAssessmentGraphCount: true
            };
        }
    }
}
);

export const {
    setAllLoaders,
    fetchAllDashboardData,
    cleanDashboardData,
    getAllDashboardData,
    getAllDashboardDataSuccess,
    getDashboardMapCount,
    getDashboardMapCountSuccess,
    getDashboardCadreWiseCount,
    getDashboardCadreWiseCountSuccess,
    getDashboardModuleUsageCount,
    getDashboardModuleUsageCountSuccess,
    getDashboardLeaderboardCount,
    getDashboardLeaderboardCountSuccess,
    getDashboardChatbotCount,
    getDashboardChatbotCountSuccess,
    getDashboardManageTBCount,
    getDashboardManageTBCountSuccess,
    getDashboardQuery2coeCount,
    getDashboardQuery2coeCountSuccess,
    getDashboardAssessmentGraphCount,
    getDashboardAssessmentGraphCountSuccess,
    getDashboardSubscriberCount,
    getDashboardSubscriberCountSuccess,
    getDashboardAssessmentCount,
    getDashboardAssessmentCountSuccess,
    getDashboardGeneralCount,
    getDashboardGeneralCountSuccess,
    getDashboardAppOpenedCount,
    getDashboardAppOpenedCountSuccess,
    getDashboardVisitorCount,
    getDashboardVisitorCountSuccess,
    getDashboardProAssessmentGraphCount,
    getDashboardProAssessmentGraphCountSuccess
} = dashboardReducer.actions;

export default dashboardReducer?.reducer;
