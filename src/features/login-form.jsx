import { useState } from "react";
import Input from "../components/Input";

const initialInput = {
    emailOrPhone: '',
    password: ''
};

const initialInputError = {
    emailOrPhone: '',
    password: ''
};

export default function LoginForm() {
    const [input, setInput] = useState(initialInput);
    const [inputError, setInputError] = useState(initialInputError);

    const handleChangeInput = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    };

    return (
        <form >
            <div className="w-full">
                <div >
                    <Input
                        placeholder={"Email Address or Phone"}
                        name={"emailOrPhone"}
                        value={input.emailOrPhone}
                        onChange={handleChangeInput}
                        error={inputError.emailOrPhone}
                    />
                </div>
                <div >
                    <Input
                        placeholder={"Password"}
                        name={"password"}
                        value={input.password}
                        onChange={handleChangeInput}
                        error={inputError.password}
                    />
                </div>
            </div>
        </form>
    )
}