/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import ShineBorder from "@/components/ui/shine-border";
import { useEffect, useState } from "react";
import FinalMessage from "./FinalMessage";
import { BadgeEuro, BookText, Flag, History, Users } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import 'react-phone-number-input/style.css'
import { motion } from "motion/react"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SuccessPage from "./SuccessPage";

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
    const [value, setValue] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('bd');
    const [ipAddress, setIpAddress] = useState<string>('');
    const [isClickedFinal, setIsClickedFinal] = useState(false);
    const [verh, setVerh] = useState(false);
    const [grund, setGrund] = useState(false);
    const [ich, setIch] = useState(false);
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
                console.error('Error fetching IP address:', error);
                setIpAddress('103.204.211.42'); // Default IP
            }
        };
        fetchUserIPAddress();
    }, []);

    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
                const data = await response.json();
                setCountryCode(data.country_code.toLowerCase());
            } catch (error) {
                console.error('Error fetching geolocation data:', error);
                setCountryCode('bd'); // Default to Bangladesh
            }
        };
        if (ipAddress) {
            fetchUserCountry();
        }
    }, [ipAddress]);


    // const handlePhoneChange = (value?: string) => {
    //     console.log('Phone number:', value);
    //     setValue(value);
    // };


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
        '',
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
        setIsClickedFinal(true)
        setTimeout(() => {
            setShowFinalMessage(true);
        }, 600);
    };
    const handleFinalMessageVerh = () => {
        setVerh(true)
        setTimeout(() => {
            setShowFinalMessage(true);
        }, 600);
    };
    const handleFinalMessageGrund = () => {
        setGrund(true)
        setTimeout(() => {
            setShowFinalMessage(true);
        }, 600);
    };
    const handleFinalMessageIch = () => {
        setIch(true)
        setTimeout(() => {
            setShowFinalMessage(true);
        }, 600);
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
                        <motion.div className={`w-full h-20 ${isClickedFinal ? 'bg-[#20659a] text-white' : 'bg-[#f0f8fd] text-[#20659a]'} border border-[#cde8fc] rounded-lg flex items-center justify-start pl-5 cursor-pointer`} onClick={handleFinalMessage}
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
                        <motion.div className={`w-full h-20 ${isClickedFinal ? 'bg-[#20659a] text-white' : 'bg-[#f0f8fd] text-[#20659a]'} border border-[#cde8fc] rounded-lg flex items-center justify-start pl-5 cursor-pointer`} onClick={handleFinalMessage}
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
                        <motion.div className={`w-full h-20 ${verh ? 'bg-[#20659a] text-white' : 'bg-[#f0f8fd] text-[#20659a]'} border border-[#cde8fc] rounded-lg flex items-center justify-start pl-5 cursor-pointer`} onClick={handleFinalMessageVerh}
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
                        <motion.div className={`w-full h-20 ${grund ? 'bg-[#20659a] text-white' : 'bg-[#f0f8fd] text-[#20659a]'} border border-[#cde8fc] rounded-lg flex items-center justify-start pl-5 cursor-pointer`} onClick={handleFinalMessageGrund}
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
                        <motion.div className={`w-full h-20 ${ich ? 'bg-[#20659a] text-white' : 'bg-[#f0f8fd] text-[#20659a]'} border border-[#cde8fc] rounded-lg flex items-center justify-start pl-5 cursor-pointer`} onClick={handleFinalMessageIch}
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
                                    className={`w-full h-20 border ${lookingForwardOptions.includes(option)
                                        ? 'bg-[#20659a] text-white' // Selected state
                                        : 'bg-[#f0f8fd] text-[#20659a]' // Default state
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
                                    {option === 'Überdurchschnittliche Vergütung zzgl. Boni' ? <BadgeEuro fill="#f0e2c0" color="#f0b728" size={25} /> : option === '30 Tage Urlaub' ? <Flag color="#7899b3" size={25} /> : option === '3 freie Nachmittage und die Option auf eine 4 Tage Woche' ? <History color="gray" size={25} /> : option === 'Tolle Fort- und Weiterbildungsmöglichkeiten' ? <BookText color="brown" size={25} /> : <Users color="purple" size={25} />}
                                    <h1 className=" text-xl font-normal">{option}</h1>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div className="flex items-center justify-center"
                            whileTap={{
                                scale: 0.9,
                                transition: { type: 'spring', stiffness: 500, damping: 30 },
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
                            <RainbowButton
                                onClick={() => handleNext('lookingForward', lookingForwardOptions)}
                                className="bg-[#daeaf3] text-[#20659a] border border-[#20659a] "
                                // className={`w-full h-14 mt-4 rounded bg-[#20659a] text-white font-bold ${lookingForwardOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                //     }`}
                                disabled={lookingForwardOptions.length === 0}
                            >
                                Zur letzten Frage! 🏁
                            </RainbowButton>
                        </motion.div>
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
                                <div
                                    className="h-20 border border-[#daeaf3] w-full outline-none focus:border focus:border-[#20659a]  focus:transition-all focus:duration-300 transition-all duration-300 placeholder:text-2xl text-2xl input-phone-number flex justify-center items-center pl-5"
                                >
                                    <PhoneInput
                                        country={countryCode}
                                        value={value}
                                        onChange={(phone) => setValue(phone)}
                                        inputClass="input-phone-number"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-lg lg:text-xl text-center text-[#20659a] max-w-2xl">🔒  100% sichere Datenverbindung mit SSL. Wir respektieren Deine Privatsphäre.</p>
                        <motion.div className="flex items-center justify-center"
                            whileTap={{
                                scale: 0.9,
                                transition: { type: 'spring', stiffness: 500, damping: 30 },
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        >
                            <RainbowButton
                                onClick={() => handleNext('lookingForward', lookingForwardOptions)}
                                className="bg-[#daeaf3] text-[#20659a] border border-[#20659a] "
                                // className={`w-full h-14 mt-4 rounded bg-[#20659a] text-white font-bold ${lookingForwardOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                //     }`}
                                disabled={lookingForwardOptions.length === 0}
                            >
                                Jetzt unverbindliches Kennenlerngespräch vereinbaren! 📩
                            </RainbowButton>
                        </motion.div>
                    </div>
                );
            case 7:
                return (
                    <SuccessPage />
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
            <div className="py-14 flex  justify-center backdrop">
                {showFinalMessage ? <FinalMessage /> : (
                    <div>
                        <ShineBorder
                            className="relative flex px-32 py-14 w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl "
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