/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import ShineBorder from "@/components/ui/shine-border";
import { useEffect, useState } from "react";
import FinalMessage from "./FinalMessage";
import { BadgeEuro, BookText, Flag, History, Users } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

type CountryCode = 'us' | 'bd' | 'ca' | 'de' | 'fr' | string;

interface FormValues {
    name: string;
    email: string;
    age: string;
    address: string;
}

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


const HomePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [selectedValues, setSelectedValues] = useState<SelectedValues>({
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
    const [formValues] = useState<FormValues>({
        name: '',
        email: '',
        age: '',
        address: '',
    });

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

    console.log(phone);

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
        'Review',
    ];

    const handleNext = (field: string, value: string[] | string) => {
        setSelectedValues((prev) => ({ ...prev, [field]: value }));
        setCurrentStep((prevStep) => prevStep + 1);
    };

    // const handleReviewResults = (field: string, value: string) => {
    //     setSelectedValues((prev) => ({ ...prev, [field]: value }));
    //     setCurrentStep((prevStep) => prevStep + 1);

    // };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleFinalMessage = () => {
        setShowFinalMessage(true); // Show the final message
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

    const handleSubmit = () => {
        alert('Form submitted: ' + JSON.stringify(formValues));
    };

    const renderStepTitle = () => {
        const step = steps[currentStep];
        if (typeof step === 'string') {
            return (
                <div>
                    <h1 className="text-xl lg:text-3xl font-bold text-[#20659a] text-center max-w-3xl">
                        {step}
                    </h1>
                </div>
            );
        } else if ('text1' in step && 'text2' in step) {
            if ('text1' in step && step.text2 === '(Mehrfachauswahl möglich)' || 'Nun würden wir Dich gern unverbindlich kennenlernen:') {
                return (
                    <div className="space-y-6">
                        <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text1}</h1>
                        <p className="text-xl text-black">{step.text2}</p>
                        <p className="text-xl text-black">{step.text3}</p>
                    </div>

                );
            } else {
                return (
                    <div className="space-y-6">
                        <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text1}</h1>
                        <p className="text-lg lg:text-xl text-[#20659a]">{step.text2}</p>
                    </div>
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
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('workPreference', 'Part time')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Part time</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('workPreference', 'Full time')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Full time</h1>
                        </div>

                    </div>
                );
            case 1:
                return (
                    <div className="space-y-2">
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('availability', '✔️ Yes! of course')}>
                            <h1 className="text-[#20659a] text-xl font-normal">✔️ Yes! ofcourse</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}>
                            <h1 className="text-[#20659a] text-xl font-normal">❌ Unfortunately not</h1>
                        </div>

                    </div>
                );
            case 2:
                return (
                    <div className="space-y-2">
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}>
                            <h1 className="text-[#20659a] text-xl font-normal">1-4 Years</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('experience', '5-10 Years')}>
                            <h1 className="text-[#20659a] text-xl font-normal">5-10 Years</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('experience', '11-15 Years')}>
                            <h1 className="text-[#20659a] text-xl font-normal">11-15 Years</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('experience', '16 and more Years')}>
                            <h1 className="text-[#20659a] text-xl font-normal">16 and more Years</h1>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-2">
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('speaking', 'Mother Speaking')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Mother Speaking</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('speaking', 'Flowing')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Flowing</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}>
                            <h1 className="text-[#20659a] text-xl font-normal">Negotiating safe</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}>
                            <h1 className="text-[#20659a] text-xl font-normal">Basic Knowledge</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}>
                            <h1 className="text-[#20659a] text-xl font-normal">I dont know basic german</h1>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-2">
                        {['Above average remuneration', '30 days holiday', '3 free afternoons', 'Great advancement', 'A family team'].map((option) => (
                            <div
                                key={option}
                                className={`w-full h-14 border ${lookingForwardOptions.includes(option)
                                    ? 'bg-[#20659a] text-white' // Selected state
                                    : 'bg-[#f0f8fd] text-[#20659a]' // Default state
                                    } rounded flex items-center justify-start gap-5 pl-5 cursor-pointer`}
                                onClick={() => toggleLookingForwardOption(option)}
                            >
                                {option === 'Above average remuneration' ? <BadgeEuro fill="#f0e2c0" color="#f0b728" size={25} /> : option === '30 days holiday' ? <Flag color="#20659a" size={25} /> : option === '3 free afternoons' ? <History color="gray" size={25} /> : option === 'Great advancement' ? <BookText color="brown" size={25} /> : <Users color="purple" size={25} />}
                                <h1 className=" text-xl font-normal">{option}</h1>
                            </div>
                        ))}
                        <RainbowButton
                            onClick={() => handleNext('lookingForward', lookingForwardOptions)}
                            // className={`w-full h-14 mt-4 rounded bg-[#20659a] text-white font-bold ${lookingForwardOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            //     }`}
                            disabled={lookingForwardOptions.length === 0}
                        >
                            On The Last Question
                        </RainbowButton>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-2">
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('time', 'Zwischen 8-12 Uhr. ')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Zwischen 8-12 Uhr. </h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('time', 'Zwischen 12- 14 Uhr. ')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Zwischen 12- 14 Uhr. </h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('time', 'Zwischen 14 - 17 Uhr. ')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Zwischen 14 - 17 Uhr. </h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={() => handleNext('time', 'Zwischen 17 - 19 Uhr.')}>
                            <h1 className="text-[#20659a] text-xl font-normal">Zwischen 17 - 19 Uhr. </h1>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-3">
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
                        <p className="text-lg lg:text-xl text-[#20659a] max-w-2xl">🔒  100% sichere Datenverbindung mit SSL. Wir respektieren Deine Privatsphäre.</p>
                        <RainbowButton
                            onClick={() => handleNext('lookingForward', lookingForwardOptions)}
                            // className={`w-full h-14 mt-4 rounded bg-[#20659a] text-white font-bold ${lookingForwardOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            //     }`}
                            disabled={lookingForwardOptions.length === 0}
                        >
                            Jetzt unverbindliches Kennenlerngespräch vereinbaren! 📩
                        </RainbowButton>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Review Your Details</h2>
                        <p>
                            <strong>Work Preference:</strong> {selectedValues.workPreference}
                        </p>
                        <p>
                            <strong>Availability:</strong> {selectedValues.availability}
                        </p>
                        <p>
                            <strong>Experience:</strong> {selectedValues.experience}
                        </p>
                        <p>
                            <strong>Speaking:</strong> {selectedValues.speaking}
                        </p>
                        <p>
                            <strong>Looking Forward:</strong> {selectedValues.lookingForward.map((el) => (
                                <p>{el}</p>
                            ))}
                        </p>
                        <p>
                            <strong>Time:</strong> {selectedValues.time}
                        </p>
                    </div>
                );
            default:
                return <div>Not Found</div>;
        }
    };
    return (
        <div className="py-32">
            {showFinalMessage ? <FinalMessage /> : (
                <div>
                    <ShineBorder
                        className="relative flex h-[800px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl "
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    >
                        <div className="">
                            {/* p-5 border rounded-md max-w-md mx-auto */}
                            {renderStepTitle()}
                            <div className="mt-5">{renderStepContent()}</div>
                            <div className="flex justify-between mt-5">
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
                            </div>
                        </div>
                    </ShineBorder>
                </div>
            )}
        </div>
    )
}

export default HomePage