import ShineBorder from "@/components/ui/shine-border";
import { useState } from "react";
import FinalMessage from "./FinalMessage";

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
}

interface Step1Text {
    text1: string;
    text2: string;
}

interface StepLookingForward {
    text1: string;
    text2: string;
}

const HomePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [selectedValues, setSelectedValues] = useState<SelectedValues>({
        workPreference: '',
        availability: '',
        experience: '',
        speaking: '',
    });
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        age: '',
        address: '',
    });

    const step1Text: Step1Text = {
        text1: 'Los geht´s mit der ersten Frage!',
        text2: 'Möchtest Du lieber in Teil- oder in Vollzeit arbeiten?'
    }

    const stepLookingForwardText: StepLookingForward = {
        text1: 'What are you looking forward to the most?',
        text2: '(multiple selection possible)'
    }

    const steps: (string | Step1Text | StepLookingForward)[] = [
        step1Text,
        'Do you have a completed education as an MFA?',
        'How many years of professional experience do you bring?',
        'How would you judge your German skills in written and spoken?',
        stepLookingForwardText,
        'Review',
    ];

    const handleNext = (field: string, value: string) => {
        setSelectedValues((prev) => ({ ...prev, [field]: value }));
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleReviewResults = (field: string, value: string) => {
        setSelectedValues((prev) => ({ ...prev, [field]: value }));
        setCurrentStep((prevStep) => prevStep + 1);
        // You can add final logic here if needed
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleFinalMessage = () => {
        setShowFinalMessage(true); // Show the final message
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

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
            if ('text1' in step && step.text2 === 'Möchtest Du lieber in Teil- oder in Vollzeit arbeiten?') {
                return (
                    <div className="space-y-6">
                        <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text1}</h1>
                        <p className="text-lg lg:text-xl text-[#20659a]">{step.text2}</p> {/* Style specific to Step1Text */}
                    </div>
                );
            } else {
                return (
                    <div className="space-y-6">
                        <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text1}</h1>
                        <p className="text-xl text-black">{step.text2}</p> {/* Style specific to StepLookingForward */}
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
                        className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl "
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
                                        onClick={handleNext}
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