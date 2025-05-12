export const ShimmerPlaceholder = ({ height, width, rounded, classname }: { height: string, width: string, rounded?: boolean, classname?: string }) => (
    <div
        className={`shimmer-box shimmer ${rounded ? "rounded-full" : "rounded"} ${classname}`}
        style={{ height, width }}
    ></div>
);


export const ShimmerPlaceholderSubs = ({ height, classname }: { height: string, classname?: string }) => (
    <div>
            <span className="whirly">Loading…</span>
    </div>
);
