import ShineBorder from "../ui/shine-border"
import finalImg from '@/assets/magic form final message image.jpg'

const FinalMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <ShineBorder
                className="relative flex h-full w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-lg border md:shadow-xl py-10"
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
                <div className="space-y-6 max-w-2xl">
                    <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">Danke für Dein Interesse! 🙂</h1>
                    <p className="text-xl lg:text-3xl font-bold text-[#20659a]">Für unsere offenen Positionen (m/w/d) sind gewisse Qualifikationen erforderlich.</p>
                    <p className="text-xl lg:text-3xl font-bold text-[#20659a]">Teile die Anzeige gerne mit Deinen Freunden, um uns bei der Suche zu unterstützen. 📲
                    </p>
                    <p className="text-xl lg:text-3xl font-bold text-[#20659a]">Dein Team von der Praxis Dr. Georgiadis!</p>
                </div>
                <img src={finalImg} alt="" className="w-[684px] h-[584px] object-contain" />
            </ShineBorder>
        </div>
    )
}

export default FinalMessage