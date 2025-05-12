declare module "app-reducer" {
    export type translationLang = "en" | "hi" | "gu" | "mr";
    export interface appReducerProps {
        loader: boolean;
        translationLang?: translationLang;
    }
}
