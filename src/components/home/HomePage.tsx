import ShineBorder from "@/components/ui/shine-border";

const HomePage = () => {
    return (
        <div className="py-32">
            <ShineBorder
                className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl "
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
                <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                    Shine Border
                </span>
            </ShineBorder>
        </div>
    )
}

export default HomePage