declare module "auth-reducer" {
    export interface loginObj {
        email: string;
        password: string;
    }
    export interface authUserProps {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: roleProps;
        roleType: string;
        permissions: string[],
        countryId: string;
        state: string[{
            _id:string,
            title:string,
        }];
        profileImage: string;
        district: string[{
            _id:string,
            title:string,
        }];
        cadre: string;
        isAllState:boolean;
        isAllDistrict:boolean;
        isAllCadre:boolean;
        createdAt: string;
        updatedAt: string;
    }
    export interface roleProps {
        createdAt: string;
        description: string;
        name: string;
        permission: Array<string>
    }
    export interface RolesProps {
        permission: Array<string>,
        _id: string,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string,
    }
    export interface RolesDeatilsProps {
        list: Array<RolesProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface permissionsListprops {
        isActive: boolean,
        _id: string;
        id?: number,
        name: string;
        description: string;
        guradName: string;
        moduleName: string;
        createdAt: string;
        updatedAt: string;
    }
    export interface permissionsDetailsProps {
        list: Array<permissionsListprops>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface userListsProps {
        list: Array<authUserProps>,
        totalItems: number,
        currentPage: number,
        totalPages: number,
    }
    export interface userListprops {
        isActive: boolean,
        _id: string;
        id?: number,
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }
    export interface authReducerProps {
        loader: boolean;
        isToken: boolean;
        authUser?: authUserProps,
        rolesDetails?: RolesDeatilsProps,
        roleByID?: RolesProps,
        permissionByID?: permissionsListprops,
        permissionsDetails?: permissionsDetailsProps,
        userDetails?: userListsProps,
        userDetailById?: authUserProps,
        allPermissions?: Array<permissionsListprops>,
        rolesWithoutPagination?: Array<RolesProps>,
    }
}
