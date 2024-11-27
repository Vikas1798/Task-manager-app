import React from "react";

const AppWrapper = ({ children }) => {
    return (
        <section className={`w-full lg:w-[50%] px-2 md:px-10 mx-auto`}>
            {children}
        </section>
    );
};

export default AppWrapper;

