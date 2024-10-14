import { useState } from "react";
import AuthButton from "../Buttons/AuthButtons"
import RegisterModal from "../Auth/Register/RegisterModal";
import LoginModal from "../Auth/Login/LoginModal";
import handleLogout from "../Auth/Logout/HandleLogout";

const AuthModal = () => {

    const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);


    return (
        <div className="min-h-screen flex items-center justify-center">
            <AuthButton name={"Register"} onClick={() => setIsModalOpenRegister(true)}/>
            <AuthButton name={"Login"} onClick={() => setIsModalOpenLogin(true)}/>
            <AuthButton name={"LogOut"} onClick={handleLogout}/>

            {isModalOpenRegister && <RegisterModal onClose={() => setIsModalOpenRegister(false)} />}
            {isModalOpenLogin && <LoginModal onClose={() => setIsModalOpenLogin(false)} />}
        </div>
        
    )
}

export default AuthModal;