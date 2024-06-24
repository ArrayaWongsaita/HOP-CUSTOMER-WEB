import { useState } from "react";
import { AxiosError } from "axios";

import Input from "../components/Input";
import CommonButton from "../components/CommonButton";
import registerValidate from "../validators/register-validate";
import customerApi from "../apis/customerApi";

const initialInput = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
};

const initialInputError = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
            console.log(error)
            if (error) return setInputError(error);
            setInputError(initialInputError);
            console.log('Register Success!!');

            await customerApi.register(input);

        }   catch (err) {
            console.log(err)
            if (err instanceof AxiosError) {
                if (err.response.data.field === 'email')
                  setInputError(prev => ({
                    ...prev,
                    email: 'Email already in use.'
                  }));
              }
            if (err instanceof AxiosError) {
                if (err.response.data.field === 'phone')
                  setInputError(prev => ({
                    ...prev,
                    phone: 'Phone number already in use.'
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
                        name="firstName"
                        value={input.firstName}
                        onChange={handleChangeInput}
                        error={inputError.firstName}
                    />
                </div>
                <div>
                    <Input
                        placeholder={"Last name"}
                        name="lastName"
                        value={input.lastName}
                        onChange={handleChangeInput}
                        error={inputError.lastName}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        placeholder={"Email Address"}
                        name="email"
                        value={input.email}
                        onChange={handleChangeInput}
                        error={inputError.email}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        placeholder={"Phone number"}
                        name="phone"
                        value={input.phone}
                        onChange={handleChangeInput}
                        error={inputError.phone}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        type="password"
                        placeholder={"Password"}
                        name="password"
                        value={input.password}
                        onChange={handleChangeInput}
                        error={inputError.password}
                    />
                </div>
                <div className="col-span-2" >
                    <Input
                        type="password"
                        placeholder={"Confirm Password"}
                        name="confirmPassword"
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