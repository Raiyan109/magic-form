import ShineBorder from "@/components/ui/shine-border";
import { useState } from "react";
import FinalMessage from "./FinalMessage";

interface FormValues {
    name: string;
    email: string;
    age: string;
    address: string;
}

interface Step1Text {
    text1: string;
    text2: string;
}
const HomePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
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


    const steps: (string | Step1Text)[] = [
        step1Text,
        'Do you have a completed education as an MFA?',
        'Address',
        'Review',
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
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
            return <div>
                <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step}</h1>
            </div>;
        } else {
            return (
                <div className="space-y-6">
                    <h1 className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text1}</h1>
                    <p className="text-xl lg:text-3xl font-bold text-[#20659a]">{step.text2}</p>
                </div>
            );
        }
    };



    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-2">
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleNext}>
                            <h1 className="text-[#20659a] text-xl font-normal">Part time</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleNext}>
                            <h1 className="text-[#20659a] text-xl font-normal">Full time</h1>
                        </div>

                    </div>
                );
            case 1:
                return (
                    <div className="space-y-2">
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleNext}>
                            <h1 className="text-[#20659a] text-xl font-normal">✔️ Yes! ofcourse</h1>
                        </div>
                        <div className="w-full h-14 bg-[#f0f8fd] border border-[#cde8fc] rounded flex items-center justify-start pl-5 cursor-pointer" onClick={handleFinalMessage}>
                            <h1 className="text-[#20659a] text-xl font-normal">❌ Unfortunately not</h1>
                        </div>

                    </div>
                );
            case 2:
                return (
                    <div>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={formValues.address}
                                onChange={handleChange}
                                className="border p-2 w-full mt-2"
                            />
                        </label>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2>Review Your Details</h2>
                        <p>
                            <strong>Name:</strong> {formValues.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {formValues.email}
                        </p>
                        <p>
                            <strong>Address:</strong> {formValues.address}
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