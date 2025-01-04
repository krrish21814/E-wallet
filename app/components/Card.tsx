export function Card({
    title,
    children,
    hover = true
}: {
    title?: string;
    children?: React.ReactNode;
    hover?: boolean
}) {
    return (
        <div className={`w-full p-4 bg-white rounded-lg shadow-md ${hover?" hover:scale-105 hover:shadow-lg" : ""}  transition-all duration-300`}>

            <h1 className={`text-xl ${title? "border-b mb-5" : ""}  pb-2 font-medium `}>
                {title}
            </h1>

            <div className="w-full ">
                {children}
            </div>

        </div>
    );
}