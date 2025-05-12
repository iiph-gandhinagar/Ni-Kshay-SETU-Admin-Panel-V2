import { combineReducers } from "redux";
import themeConfigSlice from "../themeConfigSlice";
import appReducer from "./app.reducer";
import AuthReducer from "./auth.reducer";
import chatModuleReducer from "./chatModule.reducer";
import configReducer from "./config.reducer";
import dashboardReducer from "./dashboard.reducer";
import dynamicAlgoReducer from "./dynamicAlgo.reducer";
import feedbackReducer from "./feedback.reducer";
import flashNewsReducer from "./flashNews.reducer";
import leaderboardReducer from "./leaderboard.reducer";
import masterTableReducer from "./masterTable.reducer";
import materialsReducer from "./materials.reducer";
import patientManagementReducer from "./patientManagement.reducer";
import pluginReducer from "./plugin.reducer";
import reportReducer from "./report.reducer";
import staticReducer from "./static.reducer";
import subscriberReducer from "./subscriber.reducer";
import surveyReducer from "./survey.reducer";
import tourReducer from "./tour.reducer";
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    master: masterTableReducer,
    auth: AuthReducer,
    subscriber: subscriberReducer,
    app: appReducer,
    chatModule: chatModuleReducer,
    config: configReducer,
    plugin: pluginReducer,
    survey: surveyReducer,
    tour: tourReducer,
    report: reportReducer,
    patient: patientManagementReducer,
    leaderboard: leaderboardReducer,
    flashNews: flashNewsReducer,
    materials: materialsReducer,
    static: staticReducer,
    feedback: feedbackReducer,
    dashboard: dashboardReducer,
    dynamicAlgo: dynamicAlgoReducer,
});
export default rootReducer;
