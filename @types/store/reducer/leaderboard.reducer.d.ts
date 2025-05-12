

export interface leaderboardLevelByIdProps {
    _id?: string;
    content?: string;
    level?: string;
    _v?: number
}

export interface leaderboardLevelListProps {
    list: Array<leaderboardLevelByIdProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export interface leaderboardBadgeByIdProps {
    _id?: string;
    badge?: string;
    levelId?: {
        _id?: string,
        level?: string,
    };
    _v?: number
}
export interface leaderboardBadgeListProps {
    list: Array<leaderboardBadgeByIdProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export interface leaderboardTaskByIdProps {
    _id: string;
    levelId: {
        _id: string;
        level: string;
    };
    badgeId: {
        _id: string;
        badge: string;
    };
    correctnessOfAnswers: number;
    kbaseCompletion: number;
    minSpent: number;
    subModuleUsageCount: number;
    totalTask: number;
    appOpenedCount: number;
    totalAssessments: number;
    chatbotUsageCount: number;
    __v: number;
}

export interface leaderboardTaskListProps {
    list: Array<leaderboardTaskByIdProps>;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export interface ListItem {
    _id: string;
    userId: {
        _id: string;
        name: string;
    };
    levelId?: {
        _id: string;
        level: string;
    };
    badgeId?: {
        _id: string;
        badge: string;
    }
    appOpenedCount: number;
    minSpent: number;
    correctnessOfAnswers: number;
    subModuleUsageCount: number;
    chatbotUsageCount: number;
    kbaseCompletion: number;
    taskCompleted: number;
    totalAssessments: number;
    updatedAt: string;
    createdAt: string;
    __v: number;
}

export interface leaderboardSubscriberRankProps {
    list: ListItem[];
    totalSubscribers: number;
    currentPage: number;
    totalPages: number;
}

export interface leaderboardReducerProps {
    loader: boolean;
    leaderboardLevelList?: leaderboardLevelListProps;
    leaderboardLevelById?: leaderboardLevelByIdProps;
    leaderboardBadgeList?: leaderboardBadgeListProps | Array;
    leaderboardBadgeById?: leaderboardBadgeByIdProps;
    leaderboardTaskList?: leaderboardTaskListProps;
    leaderboardTaskById?: leaderboardTaskByIdProps;
    leaderboardSubscriberRank?: leaderboardSubscriberRankProps
}
