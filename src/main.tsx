import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-quill/dist/quill.snow.css";
import "tippy.js/dist/tippy.css";
import "./assets/css/custome.css";
import "./tailwind.css";
import "./i18n";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import { Provider } from "react-redux";
import RouterWrapper from "./router/index";
import store from "./store/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.Fragment>
        <Suspense>
            <Provider store={store}>
                <MantineProvider>
                    <RouterWrapper />
                </MantineProvider>
            </Provider>
        </Suspense>
    </React.Fragment>
);
