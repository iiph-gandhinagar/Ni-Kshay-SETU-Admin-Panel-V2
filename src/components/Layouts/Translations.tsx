import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { setTranslationsLang } from "../../store/reducer/app.reducer";
import { language } from "../../utils/globle";
import { SelectInput } from "../Inputs/SelectInput";
import { PrimaryBtn } from "../buttons/primaryBtn";

const TranslationsManagement = () => {
    const [isTranslation, setTranslation] = useState(false);
    const { translationLang } = useSelector((state: IRootState) => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isTranslation)
            dispatch(setTranslationsLang(language[0]?.value));
        return () => {
            dispatch(setTranslationsLang(undefined));
        };
    }, [isTranslation]);
    return (
        <div>
            {!isTranslation ?
                <PrimaryBtn
                    className=" bg-gray-300 text-black shadow-none"
                    title={"Manage translations"}
                    isFullWidth
                    isUpper
                    onClick={() => setTranslation(!isTranslation)} />
                :
                <div className="flex row justify-center items-center">
                    <SelectInput
                        className="min-w-40 mr-3"
                        menuPortalTarget={null}
                        id="date"
                        options={language}
                        value={translationLang}
                        onChange={(e) => {
                            dispatch(setTranslationsLang(e));
                        }}
                    />
                    <PrimaryBtn
                        className="bg-gray-300 text-black shadow-none"
                        title={"Hide translations"}
                        isFullWidth
                        isUpper
                        onClick={() => setTranslation(!isTranslation)} />
                </div>
            }
        </div>
    );
};

export default TranslationsManagement;
