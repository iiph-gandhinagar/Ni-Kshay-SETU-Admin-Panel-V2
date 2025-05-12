import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useTranslation } from "react-i18next";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { IRootState } from "../../store";
import { getAuthUserSuccess } from "../../store/reducer/auth.reducer";
import { toggleSidebar } from "../../store/themeConfigSlice";
import IconCaretDown from "../Icon/IconCaretDown";
import IconCaretsDown from "../Icon/IconCaretsDown";
import IconChatDots from "../Icon/IconChatDots";
import IconChatNotification from "../Icon/IconChatNotification";
import IconFolder from "../Icon/IconFolder";
import IconLogout from "../Icon/IconLogout";
import IconMenu from "../Icon/IconMenu";
import IconPlayCircle from "../Icon/IconPlayCircle";
import IconMenuApps from "../Icon/Menu/IconMenuApps";
import IconMenuAuthentication from "../Icon/Menu/IconMenuAuthentication";
import IconMenuDashboard from "../Icon/Menu/IconMenuDashboard";
import IconMenuDatatables from "../Icon/Menu/IconMenuDatatables";
import IconMenuDocumentation from "../Icon/Menu/IconMenuDocumentation";
import IconMenuForms from "../Icon/Menu/IconMenuForms";
import IconMenuWidgets from "../Icon/Menu/IconMenuWidgets";
import AuthLayout from "./AuthLayout";

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>("");
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? "" : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector(".sidebar ul a[href=\"" + window.location.pathname + "\"]");
        if (selector) {
            selector.classList.add("active");
            const ul: any = selector.closest("ul.sub-menu");
            if (ul) {
                let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link") || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    return (
        <div className={semidark ? "dark" : ""}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? "text-white-dark" : ""}`}
                onMouseLeave={() => setIsSidebarOpen(false)}
                onMouseEnter={() => setIsSidebarOpen(true)}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center overflow-hidden px-2 py-3">
                        <NavLink to="/"
                            className="main-logo flex items-center shrink-0">
                            {isSidebarOpen || themeConfig.sidebar ? (
                                <>
                                    <img
                                        className="h-10 ml-[5px] flex-none object-contain transition-opacity ease-in duration-700 opacity-100"
                                        src="/assets/images/logo1.png"
                                        alt="logo"
                                    />
                                    <div className="ml-2">
                                        <p className="text-lg font-semibold text-gray-800">Ni-kshay SETU</p>
                                    </div>
                                </>
                            ) : (
                                <img
                                    className="h-10 ml-[5px] flex-none rounded-md"
                                    src="/logo192.png"
                                    alt="logo"
                                />
                            )}
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <AuthLayout actions={["admin"]}>
                                <li className="nav-item">
                                    <NavLink to="/dashboard "
                                        className="group">
                                        <div className="flex items-center">
                                            <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Dashboard </span>
                                        </div>
                                    </NavLink>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.cadre.index",
                                "admin.country.index",
                                "admin.state.index",
                                "admin.district.index",
                                "admin.block.index",
                                "admin.primary-cadre.index",
                                "admin.symptom.index",
                                "admin.health-facility.index",
                                "admin.assessment-certificate.index",
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Master Tables" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Master Tables")}>
                                        <div className="flex items-center">
                                            <IconMenuDatatables
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Master Tables</span>
                                        </div>

                                        <div className={currentMenu !== "Master Tables" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Master Tables" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.primary-cadre.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/primary-cader">Primary Cadre</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.cadre.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/cader">Cadre</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.country.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/country">Country</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.state.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/State">State</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.district.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/district">District</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.block.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/block">Block</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.symptom.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/symptoms">Symptoms</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.health-facility.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/health_Facilities">Health Facilities</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.assessment-certificate.index"]}>
                                                <li>
                                                    <NavLink to="/master-table/certificate">Ass. Certificate</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>

                            <AuthLayout actions={["admin.role.index", "admin.permission.index", "admin.admin-user.index"]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Roles & Permissions" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Roles & Permissions")}>
                                        <div className="flex items-center">
                                            <IconMenuAuthentication
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Roles & Permissions</span>
                                        </div>

                                        <div className={currentMenu !== "Roles & Permissions" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Roles & Permissions" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.role.index"]}>
                                                <li>
                                                    <NavLink to="/roles">Admin Roles</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.permission.index"]}>
                                                <li>
                                                    <NavLink to="/permissions">Admin Permissions</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.admin-user.index"]}>
                                                <li>
                                                    <NavLink to="/userlist">Admin Users</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.plugin-management.show"]}>
                                                <li>
                                                    <NavLink to="/master-table/plugin_management">Plugin Management</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.kbase.index",
                                "admin.master-institute.index",
                                "admin.institute.index",
                                "admin.manage-tb.index",
                                "admin.question-bank.show",
                                "admin.assessment.show",
                                "admin.assessment-question.show"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Plug-in" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Plug-in")}>
                                        <div className="flex items-center">
                                            <IconMenu
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Plug-in</span>
                                        </div>

                                        <div className={currentMenu !== "Plug-in" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Plug-in" || currentMenu === "Query2COE" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.kbase.index"]}>
                                                <li>
                                                    <NavLink to="/plugin/ntep">Knowledge Connect</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.master-institute.index", "admin.institute.index"]}>
                                                <li>
                                                    <NavLink to="/query2coe/landing-page">Query2COE</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.manage-tb.index"]}>
                                                <li>
                                                    <NavLink to="/manage-tb/landing-page">ManageTB</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.question-bank.show", "admin.assessment.show", "admin.assessment-question.show"]}>
                                                <li>
                                                    <NavLink to="/assessment/landing-page">Knowledge Quiz</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.diagnoses-algorithm.index",
                                "admin.treatment-algorithm.index",
                                "admin.guidance-on-adverse-drug-reaction.index",
                                "admin.differential-care-algorithm.index"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Patient Management" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Patient Management")}>
                                        <div className="flex items-center">
                                            <IconMenuDatatables
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Patient Management</span>
                                        </div>
                                        <div className={currentMenu !== "Patient Management" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Patient Management" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.diagnoses-algorithm.index"]}>
                                                <li>
                                                    <NavLink to="/patient/diagnosis">Diagnostic Cascades</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.treatment-algorithm.index"]}>
                                                <li>
                                                    <NavLink to="/patient/treatment">Treatment Cascade</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.guidance-on-adverse-drug-reaction.index"]}>
                                                <li>
                                                    <NavLink to="/patient/adr">Guidance on ADR (Adverse Drug Reactions)</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.differential-care-algorithm.index"]}>
                                                <li>
                                                    <NavLink to="/patient/differential">Differentiated Care</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.dynamic-algo-master.index",
                            ]}>
                                <li className="nav-item">
                                    <NavLink to="/dynamic_algorithm"
                                        className="group">
                                        <div className="flex items-center">
                                            <IconFolder className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Dynamic Algorithms</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={["admin.abbreviation.index", "admin.system-question.index"]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Chat Module" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Chat Module")}>
                                        <div className="flex items-center">
                                            <IconChatDots
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Chat Module</span>
                                        </div>
                                        <div className={currentMenu !== "Chat Module" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Chat Module" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.abbreviation.index"]}>
                                                <li>
                                                    <NavLink to="/chat/abbreviation">Abbreviations</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <li>
                                                <AuthLayout actions={["admin.system-question.index"]}>
                                                    <NavLink to="/chat/questions">IN Memory Tool</NavLink>
                                                </AuthLayout>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={["admin.resource-material.index"]}>
                                <li className="nav-item">
                                    <NavLink to="/resource-materials "
                                        className="group">
                                        <div className="flex items-center">
                                            <IconFolder className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Resource Materials </span>
                                        </div>
                                    </NavLink>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.app-config.index",
                                "admin.app-management-flag.index",
                                "admin.master-cm.index",
                                "admin.user-notification.index",
                                "admin.message-notification.index",
                                "admin.automatic-notification.index"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "CMS Notification" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("CMS Notification")}>
                                        <div className="flex items-center">
                                            <IconChatNotification
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">CMS Notification</span>
                                        </div>

                                        <div className={currentMenu !== "CMS Notification" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "CMS Notification" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.app-config.index"]}>
                                                <li>
                                                    <NavLink to="/cms/app_config">App Config</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.app-management-flag.index"]}>
                                                <li>
                                                    <NavLink to="/cms/app_management">App Management Flag</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.master-cm.index"]}>
                                                <li>
                                                    <NavLink to="/cms/master_cms">Master CMS (Content Management System)</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.user-notification.index"]}>
                                                <li>
                                                    <NavLink to="/cms/user_notification">User Notification</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.message-notification.index"]}>
                                                <li>
                                                    <NavLink to="/cms/message_notifications">Message Notifications</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={["admin.tour.index"]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Tours" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Tours")}>
                                        <div className="flex items-center">
                                            <IconPlayCircle
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Tours</span>
                                        </div>
                                        <div className={currentMenu !== "Tours" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Tours" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.tour.index"]}>
                                                <li>
                                                    <NavLink to="/tour/">Tour</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.static-blog.index",
                                "admin.static-faq.index",
                                "admin.key-feature.index",
                                "admin.static-testimonial.index",
                                "admin.static-release.index",
                                "admin.static-enquiry.index",
                                "admin.static-what-we-do.index",
                                "admin.static-module.index"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Static Web Content" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Static Web Content")}>
                                        <div className="flex items-center">
                                            <IconMenuApps
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Static Web Content</span>
                                        </div>

                                        <div className={currentMenu !== "Static Web Content" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Static Web Content" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.static-blog.index"]}>
                                                <li>
                                                    <NavLink to="/content/blogs">Blogs</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-faq.index"]}>
                                                <li>
                                                    <NavLink to="/content/faq">Static FAQ</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-app-config.index"]}>
                                                <li>
                                                    <NavLink to="/content/app_config">Static App Config</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.key-feature.index"]}>
                                                <li>
                                                    <NavLink to="/content/features">Key Features</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-testimonial.index"]}>
                                                <li>
                                                    <NavLink to="/content/testimonials">Testimonials</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-release.index"]}>
                                                <li>
                                                    <NavLink to="/content/releases">Releases</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-enquiry.index"]}>
                                                <li>
                                                    <NavLink to="/content/inquiries">Inquiries</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-what-we-do.index"]}>
                                                <li>
                                                    <NavLink to="/content/what_we_do">What We Do</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-module.index"]}>
                                                <li>
                                                    <NavLink to="/content/module">Module</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.static-resource-materials.index"]}>
                                                <li>
                                                    <NavLink to="/content/resource_materials">Resource Materials</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.lb-level.index",
                                "admin.lb-badge.index",
                                "admin.kbase.index",
                                "admin.lb-task-list.index",
                                "admin.lb-subscriber-ranking.index",
                                "admin.lb-subscriber-ranking-history.index",
                                "admin.lb-sub-module-usage.index"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Leaderboard Content" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Leaderboard Content")}>
                                        <div className="flex items-center">
                                            <IconMenuDashboard
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Leaderboard Content</span>
                                        </div>
                                        <div className={currentMenu !== "Leaderboard Content" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Leaderboard Content" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.lb-level.index", "admin.kbase.index"]}>
                                                <li>
                                                    <NavLink to="/leaderboard/levels">LB Levels</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.lb-badge.index"]}>
                                                <li>
                                                    <NavLink to="/leaderboard/badges">LB Badges</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.lb-task-list.index"]}>
                                                <li>
                                                    <NavLink to="/leaderboard/task">LB Task Lists</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.lb-subscriber-ranking.index"]}>
                                                <li>
                                                    <NavLink to="/leaderboard/rank">LB Subscriber Rank</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.user-feedback-question.index",
                                "admin.user-feedback-detail.index",
                                "admin.user-feedback-history.index"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Feedback Content" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Feedback Content")}>
                                        <div className="flex items-center">
                                            <IconMenuForms
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Feedback Content</span>
                                        </div>
                                        <div className={currentMenu !== "Feedback Content" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Feedback Content" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.user-feedback-detail.index", "admin.user-feedback-question.index"]}>
                                                <li>
                                                    <NavLink to="/feedback/master">Feedback Master</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.user-feedback-history.index"]}>
                                                <li>
                                                    <NavLink to="/feedback/history">Feedback History</NavLink>
                                                </li>
                                            </AuthLayout>

                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={["admin.flash-news.index", "admin.flash-similar-app.index"]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Flash News" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Flash News")}>
                                        <div className="flex items-center">
                                            <IconMenuWidgets
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Flash News</span>
                                        </div>
                                        <div className={currentMenu !== "Flash News" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Flash News" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.flash-news.index"]}>
                                                <li>
                                                    <NavLink to="/news/">News Content</NavLink>
                                                </li>
                                            </AuthLayout>

                                            <AuthLayout actions={["admin.flash-similar-app.index"]}>
                                                <li>
                                                    <NavLink to="/news/apps">Related Application</NavLink>
                                                </li>
                                            </AuthLayout>

                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.survey-master.index",
                                "admin.survey-master-question.index"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Survey Forms" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Survey Forms")}>
                                        <div className="flex items-center">
                                            <IconMenuForms
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Survey Forms</span>
                                        </div>
                                        <div className={currentMenu !== "Survey Forms" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Survey Forms" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.survey-master.index", "admin.survey-master-question.index"]}>
                                                <li>
                                                    <NavLink to="/survey/master">Survey Master</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <li>
                                                <NavLink to="/survey/histories">Survey Histories</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <AuthLayout actions={[
                                "admin.user-assessment.index",
                                "admin.subscriber.index",
                                "admin.subscriber-activity.index",
                                "admin.user-app-version.index",
                                "admin.activity-log.index"
                            ]}>
                                <li className="menu nav-item">
                                    <button type="button"
                                        className={`${currentMenu === "Reports" ? "active" : ""} nav-link group w-full`}
                                        onClick={() => toggleMenu("Reports")}>
                                        <div className="flex items-center">
                                            <IconMenuDocumentation
                                                className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Reports</span>
                                        </div>
                                        <div className={currentMenu !== "Reports" ? "rtl:rotate-90 -rotate-90" : ""}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300}
                                        height={currentMenu === "Reports" ? "auto" : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <AuthLayout actions={["admin.user-assessment.index"]}>
                                                <li>
                                                    <NavLink to="/reports/user_assessments">Assessments</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.subscriber.index"]}>
                                                <li>
                                                    <NavLink to="/report/subscriber">Subscriber</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <li>
                                                <NavLink to="/reports/inquiries">Inquiries</NavLink>
                                            </li>
                                            <AuthLayout actions={["admin.subscriber-activity.index"]}>
                                                <li>
                                                    <NavLink to="/reports/subscriber_activity">Subscriber Activities</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <li>
                                                <NavLink to="/reports/chatbot_activity">Chatbot Activity</NavLink>
                                            </li>
                                            <AuthLayout actions={["admin.user-app-version.index"]}>
                                                <li>
                                                    <NavLink to="/reports/user_app_version/">User App Version</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.activity-log.index"]}>
                                                <li>
                                                    <NavLink to="/report/logs">Activity Log</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.activity-log.index"]}>
                                                <li>
                                                    <NavLink to="/report/prescription">Prescription</NavLink>
                                                </li>
                                            </AuthLayout>
                                            <AuthLayout actions={["admin.credits.show"]}>
                                                <li>
                                                    <NavLink to="/report/credits">Credits</NavLink>
                                                </li>
                                            </AuthLayout>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            </AuthLayout>
                            <li className="menu nav-item">
                                <button type='button'
                                    className={"nav-link group w-full"}
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        dispatch(getAuthUserSuccess(undefined));
                                        window.location.reload();
                                    }}>
                                    <div className="flex items-center">
                                        <IconLogout className="group-hover:!text-primary shrink-0 rotate-90" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                            Logout
                                        </span>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
