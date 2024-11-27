import React from "react";
import { X } from 'lucide-react';

const DialogComponent = ({ isOpen, onClose, size, children, header }) => {
    let customeSize;
    if (size === "xs") {
        customeSize = "xl:!w-[25%] md:!w-1/2 !w-11/12";
    }
    if (size === "sm") {
        customeSize = "xl:!w-[30%] md:!w-1/2 !w-11/12";
    } else if (size === "md") {
        customeSize = "lg:!w-1/2 !w-11/12";
    } else if (size === "lg") {
        customeSize = "lg:!w-9/12 !w-11/12";
    } else {
        customeSize = "lg:!w-1/4 !w-11/12";
    }

    return (
        <section className={` ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300`}>
            <div className={`relative p-[10px] sm:p-5 ${customeSize} bg-zinc-800 rounded-lg overflow-hidden ${isOpen ? 'modal-animate-slide-up' : ''}`}>
                <div className="border-primaryGray">
                    <div className="flex items-center justify-between mb-4 ">
                        <h6 className="text-xl font-semibold text-[#FFFFFF]">
                            {header}
                        </h6>
                        <div onClick={() => onClose(false)} className='cursor-pointer text-[#9ca3af]'>
                            <X size={18} strokeWidth={3} />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    );
};
export default DialogComponent;
