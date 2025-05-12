import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./auth.saga";
import { watchAbbreviationSaga } from "./chatModule.saga";
import { watchConfigSaga } from "./config.saga";
import { watchDashboardSaga } from "./dashboard.saga";
import { watchDynmicAlgoSaga } from "./dynamicAlgo.saga";
import { watchFeedbackSaga } from "./feedback.saga";
import { watchFlashNewsSaga } from "./flasNews.saga";
import { watchLeaderboardSaga } from "./leaderboard.saga";
import { watchMasterTableSaga } from "./masterTable.saga";
import { watchMaterialsSaga } from "./materials.saga";
import { watchPatientManagementSaga } from "./patientManagement.saga";
import { watchPluginSaga } from "./plugin.saga";
import { watchReportSaga } from "./report.saga";
import { watchStaticSaga } from "./static.saga";
import { watchSubscriberSaga } from "./subscriber.saga";
import { watchSurveySaga } from "./survey.saga";
import { watchTourSaga } from "./tour.saga";
export default function* rootSaga() {
        yield all([
                watchMasterTableSaga(),
                watchAuthSaga(),
                watchSubscriberSaga(),
                watchAbbreviationSaga(),
                watchConfigSaga(),
                watchSurveySaga(),
                watchPluginSaga(),
                watchTourSaga(),
                watchReportSaga(),
                watchPatientManagementSaga(),
                watchLeaderboardSaga(),
                watchFlashNewsSaga(),
                watchMaterialsSaga(),
                watchStaticSaga(),
                watchFeedbackSaga(),
                watchDashboardSaga(),
                watchDynmicAlgoSaga()
        ]);
}
