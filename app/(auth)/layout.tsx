import React from "react";

const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (<div className="bg-green-100 h-full">{children}</div>);
}
 
export default AuthLayout;