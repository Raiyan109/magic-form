/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import ShineBorder from "@/components/ui/shine-border";
import { useEffect, useState } from "react";
import FinalMessage from "./FinalMessage";
import { BadgeEuro, BookText, Flag, History, Users } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { motion } from "motion/react"
import finalImg from '@/assets/magic form final message image.jpg'
import { div } from "motion/react-client";

type CountryCode = 'us' | 'bd' | 'ca' | 'de' | 'fr' | string;

// interface FormValues {
//     name: string;
//     email: string;
//     age: string;
//     address: string;
// }

interface SelectedValues {
    workPreference: string;
    availability: string;
    experience: string;
    speaking: string;
    lookingForward: string[];
    time: string;
}

interface StepText {
    text1: string;
    text2: string;
    text3?: string;
}

interface AnimatedButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}


const HomePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [, setSelectedValues] = useState<SelectedValues>({
        workPreference: '',
        availability: '',
        experience: '',
        speaking: '',
        lookingForward: [],
        time: '',
    });
    const [lookingForwardOptions, setLookingForwardOptions] = useState<string[]>([]);
    const [countryCode, setCountryCode] = useState<CountryCode | undefined>('bd');
    const [ipAddress, setIpAddress] = useState('103.204.211.42');
    const [phone, setPhone] = useState()
    // const [isDelay, setIsDelay] = useState(false);
    // const [formValues] = useState<FormValues>({
    //     name: '',
    //     email: '',
    //     age: '',
    //     address: '',
    // });

    // Fetch user IP address
    useEffect(() => {
        const fetchUserIPAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org/?format=json');

                const data = await response.json();
                setIpAddress(data.ip);
            } catch (error) {
                console.error('Error fetching ip address:', error);
                // Default to Bangladesh if API fails
                setIpAddress('103.204.211.42');
            }
        };
        fetchUserIPAddress();
    }, []);


    // Fetch user's country code based on IP
    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
                // const response = await fetch('https://ipapi.co/json/'); 
                const data = await response.json();
                setCountryCode(data.country_code.toLowerCase() as CountryCode);
                // setCountryCode(data.country_code.toLowerCase());
            } catch (error) {
                console.error('Error fetching geolocation data:', error);
                // Default to Bangladesh if API fails
                setCountryCode('bd');
            }
        };
        fetchUserCountry();
    }, [ipAddress]);


    const handlePhoneChange = (value?: string) => {
        console.log('Phone number:', value);
        setPhone(phone);
    };


    const step1Text: StepText = {
        text1: 'Los geht´s mit der ersten Frage!',
        text2: 'Möchtest Du lieber in Teil- oder in Vollzeit arbeiten?'
    }

    const stepLookingForwardText: StepText = {
        text1: '✅ Worauf freust Du Dich am meisten?',
        text2: '(Mehrfachauswahl möglich)'
    }

    const stepLastQuestionText: StepText = {
        text1: 'Fast geschafft: Letzte Frage!',
        text2: 'Wann können wir Dich am besten erreichen?'
    }

    const stepContactInfoText: StepText = {
        text1: 'Glückwunsch! Du passt super in unser Praxisteam! 🎉',
        text2: 'Nun würden wir Dich gern unverbindlich kennenlernen:',
        text3: 'Wie können wir Dich am besten erreichen?'
    }

    const steps: (string | StepText | StepText)[] = [
        step1Text,
        'Hast Du eine abgeschlossene Ausbildung als MFA?',
        'Wieviele Jahre Berufserfahrung bringst Du mit?',
        'Wie würdest Du Deine Deutsch-Kenntnisse in Wort und Schrift beurteilen?',
        stepLookingForwardText,
        stepLastQuestionText,
        stepContactInfoText,
        'Vielen Dank für Deine Bewerbung. Wir freuen uns darauf Dich kennenzulernen.',
    ];

    const handleNext = (field: string, value: string[] | string) => {
        setTimeout(() => {
            setSelectedValues((prev) => ({ ...prev, [field]: value }));
            setCurrentStep((prevStep) => prevStep + 1);
        }, 600);
    };


    const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick, children }) => {
        const [isDelay, setIsDelay] = useState(false);
        const [isClicked, setIsClicked] = useState(false);

        const handleClick = () => {
            setIsDelay(true)
            setIsClicked(true)
            onClick();

        };

        return (
            <motion.div
                className={`w-full h-20 border rounded-lg flex items-center justify-start pl-5 ${isDelay ? 'cursor-wait' : 'cursor-pointer'
                    } ${isClicked ? 'bg-[#20659a] text-white' : 'bg-[#f0f8fd] text-[#20659a]'
                    }`}
                onClick={handleClick}
                whileTap={{
                    scale: 0.9,
                    transition: { type: 'spring', stiffness: 500, damping: 30 },
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                {children}
            </motion.div>
        );
    };

    // const handleReviewResults = (field: string, value: string) => {
    //     setSelectedValues((prev) => ({ ...prev, [field]: value }));
    //     setCurrentStep((prevStep) => prevStep + 1);

    // };


    const handleFinalMessage = () => {
        setTimeout(() => {
            setShowFinalMessage(true); // Show the final message after a 2-second delay
        }, 2000);
    };

    const toggleLookingForwardOption = (option: string) => {
        setLookingForwardOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option) // Remove if already selected
                : [...prev, option] // Add if not selected
        );
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormValues({ ...formValues, [name]: value });
    // };


    const renderStepTitle = () => {
        const step = steps[currentStep];
        if (typeof step === 'string') {
            return (
                <motion.div
                    whileTap={{
                        scale: 0.9,
                        transition: { type: 'spring', stiffness: 500, damping: 30 },
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    <h1 className="text-xl lg:text-3xl font-bold text-[#20659a] text-center max-w-3xl">
                        {step}
                    </h1>
                </motion.div>
            );
        } else if ('text1' in step && 'text2' in step) {
            if ('text1' in step && step.text2 === '(Mehrfachauswahl möglich)' || 'Nun würden wir Dich gern unverbindlich kennenlernen:') {
                return (
                    <motion.div className="space-y-6"
                        whileTap={{
                            scale: 0.9,
                            transition: { type: 'spring', stiffness: 500, damping: 30 },
                        }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text1}</h1>
                        <p className="text-xl text-black">{step.text2}</p>
                        <p className="text-xl text-black">{step.text3}</p>
                    </motion.div>

                );
            } else {
                return (
                    <motion.div className="space-y-6"
                        whileTap={{
                            scale: 0.9,
                            transition: { type: 'spring', stiffness: 500, damping: 30 },
                        }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text1}</h1>
                        <p className="text-lg lg:text-xl text-[#20659a]">{step.text2}</p>
                    </motion.div>
                );
            }
        } else {
            return null;
        }
    };



    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-2">
                        <AnimatedButton onClick={() => handleNext('workPreference', 'Teilzeit')}>
                            <h1 className=" text-2xl font-normal">Teilzeit</h1>
                        </AnimatedButton>

                        <AnimatedButton onClick={() => handleNext('workPreference', 'Vollzeit')}>
                            <h1 className=" text-2xl font-normal">Vollzeit</h1>
                        </AnimatedButton>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-2">
                        <AnimatedButton onClick={() => handleNext('availability', '✔️ Ja klar!')}>
                            <h1 className=" text-xl font-normal">✔️ Ja klar!</h1>
                        </AnimatedButton>
                        <motion.div className="w-full h-20 bg-[#f0f8fd] border border-[#cde8fc] rounded-lg flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}
                            whileTap={{
                                scale: 0.9,
                                transition: { type: 'spring', stiffness: 500, damping: 30 },
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        >
                            <h1 className=" text-xl font-normal">❌ Leider nicht</h1>
                        </motion.div>

                    </div>
                );
            case 2:
                return (
                    <div className="space-y-2">
                        <motion.div className="w-full h-20 rounded-lg bg-[#f0f8fd] border border-[#cde8fc]  flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}
                            whileTap={{
                                scale: 0.9,
                                transition: { type: 'spring', stiffness: 500, damping: 30 },
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        >
                            <h1 className=" text-xl font-normal">1-4 Jahre</h1>
                        </motion.div>
                        <AnimatedButton onClick={() => handleNext('experience', '5-10 Jahre')}>
                            <h1 className=" text-xl font-normal">5-10 Jahre</h1>
                        </AnimatedButton>
                        <AnimatedButton onClick={() => handleNext('experience', '11-15 Jahre')}>
                            <h1 className=" text-xl font-normal">11-15 Jahre</h1>
                        </AnimatedButton>
                        <AnimatedButton onClick={() => handleNext('experience', '16 und mehr Jahre')}>
                            <h1 className=" text-xl font-normal">16 und mehr Jahre</h1>
                        </AnimatedButton>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-2">
                        <AnimatedButton onClick={() => handleNext('speaking', 'Muttersprachlich')}>
                            <h1 className=" text-xl font-normal">Muttersprachlich</h1>
                        </AnimatedButton>
                        <AnimatedButton onClick={() => handleNext('speaking', 'Fließend')}>
                            <h1 className=" text-xl font-normal">Fließend</h1>
                        </AnimatedButton>
                        <motion.div className="w-full h-20 rounded-lg bg-[#f0f8fd] border border-[#cde8fc]  flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}
                            whileTap={{
                                scale: 0.9,
                                transition: { type: 'spring', stiffness: 500, damping: 30 },
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        >
                            <h1 className=" text-xl font-normal">Verhandlungssicher</h1>
                        </motion.div>
                        <motion.div className="w-full h-20 rounded-lg bg-[#f0f8fd] border border-[#cde8fc]  flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}
                            whileTap={{
                                scale: 0.9,
                                transition: { type: 'spring', stiffness: 500, damping: 30 },
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        >
                            <h1 className=" text-xl font-normal">Grundkenntnisse</h1>
                        </motion.div>
                        <motion.div className="w-full h-20 rounded-lg bg-[#f0f8fd] border border-[#cde8fc] flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}
                            whileTap={{
                                scale: 0.9,
                                transition: { type: 'spring', stiffness: 500, damping: 30 },
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        >
                            <h1 className=" text-xl font-normal">Ich spreche kein deutsch / I don't speak german</h1>
                        </motion.div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-8">
                        <div className="space-y-2">
                            {['Überdurchschnittliche Vergütung zzgl. Boni', '30 Tage Urlaub', '3 freie Nachmittage und die Option auf eine 4 Tage Woche', 'Tolle Fort- und Weiterbildungsmöglichkeiten', 'Ein familiäres Team, in dem Deine Leistungen wertgeschätzt werden'].map((option) => (
                                <motion.div
                                    key={option}
                                    className={`w-full h-14 border ${lookingForwardOptions.includes(option)
                                        ? 'bg-[#20659a] text-white' // Selected state
                                        : 'bg-[#f0f8fd] ' // Default state
                                        } rounded flex items-center justify-start gap-5 pl-5 cursor-pointer`}
                                    onClick={() => toggleLookingForwardOption(option)}
                                    whileTap={{
                                        scale: 0.9,
                                        transition: { type: 'spring', stiffness: 500, damping: 30 },
                                    }}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                >
                                    {option === 'Überdurchschnittliche Vergütung zzgl. Boni' ? <BadgeEuro fill="#f0e2c0" color="#f0b728" size={25} /> : option === '30 Tage Urlaub' ? <Flag color="#20659a" size={25} /> : option === '3 freie Nachmittage und die Option auf eine 4 Tage Woche' ? <History color="gray" size={25} /> : option === 'Tolle Fort- und Weiterbildungsmöglichkeiten' ? <BookText color="brown" size={25} /> : <Users color="purple" size={25} />}
                                    <h1 className=" text-xl font-normal">{option}</h1>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            <RainbowButton
                                onClick={() => handleNext('lookingForward', lookingForwardOptions)}
                                className="bg-[#daeaf3] text-[#20659a] border border-[#20659a] "
                                // className={`w-full h-14 mt-4 rounded bg-[#20659a] text-white font-bold ${lookingForwardOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                //     }`}
                                disabled={lookingForwardOptions.length === 0}
                            >
                                Zur letzten Frage! 🏁
                            </RainbowButton>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-2">
                        <AnimatedButton onClick={() => handleNext('time', 'Zwischen 8-12 Uhr. ')}>
                            <h1 className=" text-xl font-normal">Zwischen 8-12 Uhr. </h1>
                        </AnimatedButton>
                        <AnimatedButton onClick={() => handleNext('time', 'Zwischen 12- 14 Uhr. ')}>
                            <h1 className=" text-xl font-normal">Zwischen 12- 14 Uhr. </h1>
                        </AnimatedButton>
                        <AnimatedButton onClick={() => handleNext('time', 'Zwischen 14 - 17 Uhr. ')}>
                            <h1 className=" text-xl font-normal">Zwischen 14 - 17 Uhr. </h1>
                        </AnimatedButton>
                        <AnimatedButton onClick={() => handleNext('time', 'Zwischen 17 - 19 Uhr.')}>
                            <h1 className=" text-xl font-normal">Zwischen 17 - 19 Uhr. </h1>
                        </AnimatedButton>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-12">
                        <div className="space-y-2">
                            <div className="relative">
                                <input type="text" className="h-20 border border-[#daeaf3] w-full outline-none focus:border focus:border-[#20659a]  focus:transition-all focus:duration-300 transition-all duration-300 placeholder:text-2xl pl-20 text-2xl" placeholder="Dein Voller Name *" />
                                <p className="absolute top-5 left-5 text-2xl">👋</p>
                            </div>
                            <div className="relative">
                                <input type="text" className="h-20 border border-[#daeaf3] w-full outline-none focus:border focus:border-[#20659a]  focus:transition-all focus:duration-300 transition-all duration-300 placeholder:text-2xl pl-20 text-2xl" placeholder="Deine E-mail Adresse *" />
                                <p className="absolute top-5 left-5 text-2xl">📧</p>
                            </div>
                            <div className="relative">
                                {/* <input type="text" className="h-20 border border-[#daeaf3] w-full outline-none focus:border focus:border-[#20659a]  focus:transition-all focus:duration-300 transition-all duration-300 placeholder:text-2xl pl-20 text-2xl" placeholder="Dein Voller Name *" />
                            <p className="absolute top-5 left-5 text-2xl">👋</p> */}
                                <PhoneInput
                                    className="h-20 border border-[#daeaf3] w-full outline-none focus:border focus:border-[#20659a]  focus:transition-all focus:duration-300 transition-all duration-300 placeholder:text-2xl pl-3 text-2xl"
                                    placeholder="Dein Voller Name *"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    country={countryCode}
                                />
                                {/* <p className="absolute top-5 left-5 text-2xl">👋</p> */}
                            </div>
                        </div>
                        <p className="text-lg lg:text-xl text-[#20659a] max-w-2xl">🔒  100% sichere Datenverbindung mit SSL. Wir respektieren Deine Privatsphäre.</p>
                        <div className="flex items-center justify-center">
                            <RainbowButton
                                onClick={() => handleNext('lookingForward', lookingForwardOptions)}
                                className="bg-[#daeaf3] text-[#20659a] border border-[#20659a] "
                                // className={`w-full h-14 mt-4 rounded bg-[#20659a] text-white font-bold ${lookingForwardOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                //     }`}
                                disabled={lookingForwardOptions.length === 0}
                            >
                                Jetzt unverbindliches Kennenlerngespräch vereinbaren! 📩
                            </RainbowButton>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="flex flex-col items-center justify-center">
                        <div
                            className="relative flex h-full w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-lg  py-10"

                        >
                            <div className="space-y-6">
                                {/* <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">Vielen Dank für Deine Bewerbung. Wir freuen uns darauf Dich kennenzulernen.</h1> */}
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
                            <img src={finalImg} alt="" className="w-[684px] h-[584px] object-contain" />
                        </div>
                    </div>
                );
            default:
                return <div>Not Found</div>;
        }
    };
    return (
        <div>
            <div className="blob-outer-container">
                <div className="blob-inner-container">
                    <div className="blob"></div>
                </div>
            </div>
            <div className="pt-24 flex  justify-center backdrop">
                {showFinalMessage ? <FinalMessage /> : (
                    <div>
                        <ShineBorder
                            className="relative flex p-32 w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl "
                            color={["#686570", "#FE8FB5", "#FFBE7B"]}
                        >
                            <div className="">
                                {/* p-5 border rounded-md max-w-md mx-auto */}
                                <h1 className="text-center">{renderStepTitle()}</h1>
                                <div className="mt-5">{renderStepContent()}</div>
                                {/* <div className="flex justify-between mt-5">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
                                >
                                    Back
                                </button>
                                {currentStep < steps.length - 1 ? (
                                    <button
                                        // onClick={handleNext}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div> */}
                            </div>
                        </ShineBorder>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage