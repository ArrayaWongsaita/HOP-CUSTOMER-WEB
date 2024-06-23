import { useState } from "react";
import { AxiosError } from "axios";

import Input from "../components/Input";
import CommonButton from "../components/CommonButton";
import registerValidate from "../validators/register-validate";
import customerApi from "../apis/customerApi";

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

    const handleSubmitForm = async (event) => {
        try {
            event.preventDefault();
            const error = registerValidate(input);
            if (error) return setInputError(error);
            setInputError(initialInputError);
            console.log('Register Success!!');

            await customerApi.register(input);

        }   catch (err) {
            console.log(err)
            if (err instanceof AxiosError) {
                if (err.response.data.field === 'emailOrPhone')
                  setInputError(prev => ({
                    ...prev,
                    emailOrMobile: 'Email or Phone already in use.'
                  }));
              }
        }
    }
    
    return (
        <form onSubmit={handleSubmitForm} >
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
                        type="password"
                        placeholder={"Password"}
                        name={"password"}
                        value={input.password}
                        onChange={handleChangeInput}
                        error={inputError.password}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        type="password"
                        placeholder={"Confirm Password"}
                        name={"confirmPassword"}
                        value={input.confirmPassword}
                        onChange={handleChangeInput}
                        error={inputError.confirmPassword}
                    />
                </div>
            </div>
            <div className="flex justify-center py-4">
                <CommonButton >
                    Register
                </CommonButton>
            </div>
        </form>
    )
}