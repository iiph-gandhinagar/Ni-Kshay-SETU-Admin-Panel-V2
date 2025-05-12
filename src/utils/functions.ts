import store from "../store";

export function manageArray(arr: Array<string> = [], newElement: any, maxNumber: number) {
    const newArry = Object.assign([], arr);
    if (newArry?.length >= maxNumber) {
        newArry.shift();
    }
    newArry.push(newElement);
    return newArry;
}
type GenericObject = { [key: string]: any };

export const getUpdatedFields = <T extends GenericObject>(initial: T, current: T): Partial<T> => {
    const changes: Partial<T> = {};
    for (const key in current) {
        if (current[key] !== initial[key]) {
            changes[key] = current[key];
        }
    }
    return changes;
};

export function hasPermission(permissions: Array<string> | undefined, action: Array<string>, role: string): boolean {
    if (role == "Admin") {
        return true;
    } else
        if (!Array.isArray(permissions)) {
            return false;
        } else {
            return action?.some(act => permissions?.includes(act));

        }
}
export function handleAllSelection(
    selectedValues: string[],
    setFieldValue: (field: string, value: any) => void,
    optionList: any[] | undefined,
    allFieldName: string,
    fieldName: string
) {
    const authUser = store.getState()?.auth?.authUser;
    if (optionList && optionList?.length > 0) {
        const isAllSelected = selectedValues.length === optionList.length;
        if (isAllSelected && authUser?.roleType === "country_level") {
            setFieldValue(allFieldName, isAllSelected);
        }
        setFieldValue(allFieldName, isAllSelected);
        setFieldValue(fieldName, selectedValues);
    }
}

export const getCroppedImg = (imageSrc: string, pixelCrop: any) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise<string>((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject("Unable to get canvas context");
                return;
            }
            const { x, y, width, height } = pixelCrop;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
            const croppedImageUrl = canvas.toDataURL("image/jpeg");
            resolve(croppedImageUrl);
        };

        image.onerror = (error) => {
            reject(error);
        };
    });
};
export function downloadCSV(csv: any, filename: string) {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", new Date().toISOString().replace(/:/g, "-") + filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
export function hasSinglePermission(action: string) {
    const authUser = store.getState()?.auth?.authUser;
    if (authUser?.role.name === "Admin") {
        return true;
    } else
        if (!Array.isArray(authUser?.role?.permission)) {
            return false;
        } else {
            if (authUser?.role?.permission.includes(action)) {
                return true;
            } else {
                false;
            }
        }
}

export function getQueryParam(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
