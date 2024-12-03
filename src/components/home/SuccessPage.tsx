import finalImg from '@/assets/magic form final message image.jpg'

const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-3xl">
            <div
                className=""

            >
                <div className="space-y-2 text-center">
                    <h1 className="text-xl lg:text-2xl font-bold text-[#20659a]">Vielen Dank für Deine Bewerbung. Wir freuen uns darauf Dich kennenzulernen.</h1>
                    <p className="text-xl text-black">So geht es jetzt weiter: </p>
                    <p className="text-xl text-black">Wir sehen uns Deine Bewerbung an und melden uns innerhalb der nächsten 48 Stunden telefonisch bei Dir. </p>
                    <p className="text-xl text-black">Speicher Dir dafür gerne schon einmal die folgenden Nummern ein, denn unter einer der drei werden wir Dich kontaktieren:</p>
                    <p className="text-xl text-black">+49 151 51589830</p>
                    <p className="text-xl text-black">+49 151 25006663</p>
                    <p className="text-xl text-black">+49 160 96703175</p>
                    <p className="text-xl text-black">Gemeinsam vereinbaren wir einen Termin für ein unverbindliches Kennenlerngespräch. </p>
                    <p className="text-xl text-black">Beim Kennenlernen kannst uns alle Fragen stellen, die Du gerne beantwortet haben möchtest.
                    </p>
                    <p className="text-xl text-black">Deine Ansprechpartnerin:</p>
                    <p className="text-xl text-black">Jasemin Bergmann</p>
                </div>
                <div className='flex items-center justify-center rounded-lg'>
                    <img src={finalImg} alt="" className="w-[684px] h-[584px] object-contain rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default SuccessPage