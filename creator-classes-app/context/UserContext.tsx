import { createContext, useContext, ReactNode, useState } from "react";

type userContextType = {
    userId: number;
    userType : string;
    login: (userId: number, userType: string) => void;
    logout: () => void;
};

const userContextDefaultValues: userContextType = {
    userId: 0,
    userType: "STUDENT",
    login: (userId: number, userType: string) => {},
    logout: () => {},
};

type Props = {
    children: ReactNode;
};


const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUserContext()
{
    return useContext(UserContext);
}

export function UserProvider({ children }: Props) {
    const [userId, setUser] = useState<number>(0);
    const [userType, setUserType] = useState<string>("");

    const login = (userId : number, userType: string) => {
        setUser(userId);
    };

    const logout = () => {
        setUser(0);
        setUserType("");
    };

    const value = {
        userId,
        userType,
        login,
        logout,
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
}