import { Modal } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryBtn } from "../components/buttons/primaryBtn";
import IconArrowForward from "../components/Icon/IconArrowForward";
import IconInfoCircle from "../components/Icon/IconInfoCircle";
import AuthLayout from "../components/Layouts/AuthLayout";

const AssessmentLandingPage = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="relative overflow-hidden min-h-screen">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-300 to-white opacity-90"></div>
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/assets/images/bg-gradient.png"
                    alt="background"
                    className="h-full w-full object-cover opacity-60"
                />
            </div>

            {/* Content */}
            <div className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:px-16">

                {/* Floating Images */}
                <img
                    src="/assets/images/coming-soon-object1.png"
                    alt="object 1"
                    className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2 animate-float"
                />
                <img
                    src="/assets/images/coming-soon-object2.png"
                    alt="object 2"
                    className="absolute left-24 top-0 h-40 md:left-[30%] animate-spin-slow"
                />
                <img
                    src="/assets/images/coming-soon-object3.png"
                    alt="object 3"
                    className="absolute right-0 top-0 h-[300px] animate-pulse"
                />

                {/* Card */}

                <div className="relative flex w-full max-w-[1502px] min-h-[80vh] flex-col rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/70 lg:flex-row">
                    {/* Right Section (Logo + Content) */}
                    <div className="dropdown absolute right-1 top-1 ms-auto w-max">
                        <div className="mt-1 mr-3 cursor-pointer"
                            onClick={() => { setOpenModal(true); }}>
                            <IconInfoCircle />
                        </div>

                        <Modal opened={openModal}
                            size={800}
                            onClose={() => setOpenModal(false)}
                            centered
                            title={<span className="text-lg font-bold">Welcome to Knowledge Quiz</span>}
                        >
                            <div className="text-lg p-2 font-semibold">
                                <ul className="list-inside">
                                    <li className="mt-2">Create Assessment:
                                        <ul className="list-disc list-inside ml-5 font-normal">
                                            <li>Two Type.</li>
                                            <ul className="list-disc list-inside ml-5 text-pretty">
                                                <li>Real-time: Instant assessments in various languages (no mixed language questions).
                                                </li>
                                                <li>Planned: Set assessments for future dates with start and end times.</li>
                                            </ul>
                                            <li className="mt-1">Questions are pulled from the question bank based on the selected language.</li>
                                        </ul>
                                    </li>
                                    <li className="mt-2">Question Bank:
                                        <ul className="list-disc list-inside ml-5 font-normal">
                                            <li>Contains questions for creating assessments.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </Modal>

                    </div>
                    <div className="flex flex-col items-center justify-center gap-8 px-6 py-16 w-full lg:max-w-[750px] mx-auto">
                        {/* Logo Above Heading */}
                        <Link to="/"
                            className="mb-4">
                            <img
                                src="/assets/images/logo1.png"
                                alt="logo"
                                className="w-32 transition-transform duration-300 hover:scale-110"
                            />
                        </Link>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold text-center leading-snug text-blue-800 md:text-5xl">
                            Welcome to Knowledge Quiz
                        </h1>

                        {/* Buttons */}
                        <div className="flex flex-col gap-6 items-center">
                            <AuthLayout actions={["admin.assessment.index"]}>
                                <PrimaryBtn
                                    className="text-lg font-semibold py-3 px-8 w-72 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md transition-transform hover:scale-105 hover:shadow-xl"
                                    title="Create Assessment"
                                    onClick={() => { navigate("/assessment/create"); }}
                                    rightIcon={<IconArrowForward />}
                                />
                            </AuthLayout>
                            <AuthLayout actions={["admin.assessment-question.index"]}>
                                <PrimaryBtn
                                    className="text-lg font-semibold py-3 px-8 w-72 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md transition-transform hover:scale-105 hover:shadow-xl"
                                    title="Question Bank"
                                    onClick={() => { navigate("/assessment/question_bank"); }}
                                    rightIcon={<IconArrowForward />}
                                />
                            </AuthLayout>
                        </div>

                        {/* Logos */}
                        <div className="flex flex-wrap gap-6 mt-10 justify-between sm:justify-between ">
                            <Link to="https://theunion.org/"
                                target="_blank">
                                <img
                                    src="/assets/images/The Union logo.png"
                                    alt="The Union"
                                    className="sm:h-12 h-10 md:h-12 lg:h-15 hover:scale-110 transition-transform"
                                />
                            </Link>
                            <Link to="https://iiphg.edu.in"
                                target="_blank">
                                <img
                                    src="/assets/images/IIPHG PNG Logo New (no white background).png"
                                    alt="IIPHG"
                                    className="sm:h-12 h-10 md:h-12 lg:h-15 hover:scale-110 transition-transform"
                                />
                            </Link>
                            <Link to="https://ntep.in/node/114/CP-national-tb-elimination-program-ntep"
                                target="_blank">
                                <img
                                    src="/assets/images/ntep.png"
                                    alt="NTEP"
                                    className="sm:h-12 h-10 md:h-12 lg:h-15 hover:scale-110 transition-transform"
                                />
                            </Link>
                            <Link to="https://digiflux.io"
                                target="_blank">
                                <img
                                    src="/assets/images/digilogo.png"
                                    alt="Digiflux"
                                    className="sm:h-12 h-10 md:h-12 lg:h-15 hover:scale-110 transition-transform"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default AssessmentLandingPage;
