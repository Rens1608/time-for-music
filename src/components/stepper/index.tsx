"use client";
import React from "react";

type StepperProps = {
    steps: string[];
    currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
    return (
        <div className="flex items-center w-full max-w-5xl px-5">
            {steps.map((step, index) => {
                const isFinished = index <= currentStep;

                return (
                    <React.Fragment key={step}>
                        <div className="relative flex flex-col items-center">
                            <p
                                className={`${isFinished
                                    ? 'text-[rgb(55,88,249)]'
                                    : 'dark:text-white text-[rgb(99,115,129)]'
                                    } font-bold text-sm`}
                            >
                                {step}
                            </p>
                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-[2px] mx-5 ${index < currentStep
                                    ? 'bg-[rgb(55,88,249)]'
                                    : 'bg-gray-200'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    )
}

export default Stepper;