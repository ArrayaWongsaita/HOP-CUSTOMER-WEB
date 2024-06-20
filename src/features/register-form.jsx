import { useState } from "react";
import Input from "../components/Input";

const initialInput = {
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
};

const initialInputError = {
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
};

export default function RegisterForm() {
    const [input, setInput] = useState(initialInput);
    const [inputError, setInputError] = useState(initialInputError);

    const handleChangeInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    };

    return (
        <form >
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Input
                        placeholder={"First name"}
                        name={"firstName"}
                        value={input.firstName}
                        onChange={handleChangeInput}
                        error={inputError.firstName}
                    />
                </div>
                <div>
                    <Input
                        placeholder={"Last name"}
                        name={"lastName"}
                        value={input.lastName}
                        onChange={handleChangeInput}
                        error={inputError.lastName}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        placeholder={"Email Address or Phone"}
                        name={"emailOrPhone"}
                        value={input.emailOrPhone}
                        onChange={handleChangeInput}
                        error={inputError.emailOrPhone}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        placeholder={"Password"}
                        name={"password"}
                        value={input.password}
                        onChange={handleChangeInput}
                        error={inputError.password}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        placeholder={"Confirm Password"}
                        name={"confirmPassword"}
                        value={input.confirmPassword}
                        onChange={handleChangeInput}
                        error={inputError.confirmPassword}
                    />
                </div>
            </div>
        </form>
    )
}