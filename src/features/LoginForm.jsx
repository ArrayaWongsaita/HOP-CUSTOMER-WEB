import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../components/Input";
import CommonButton from "../components/CommonButton";
import useCustomer from "../hooks/customerHook";
import loginValidate from "../validators/login-validate";

const initialInput = {
  emailOrPhone: "",
  password: "",
};

const initialInputError = {
  emailOrPhone: "",
  password: "",
};

export default function LoginForm() {
  const { login } = useCustomer();

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (event) => {
    const toastId = toast.loading(" Please wait a moment...");
    try {
      event.preventDefault();
      const error = loginValidate(input);
      console.log(error);
      if (error) return setInputError(error);
      setInputError(initialInputError);
      console.log("Login Success!!");

      await login(input);
      toast.update(toastId, {
        render: "Login successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/");
    } catch (err) {
      //   console.log(err);
      if (err instanceof AxiosError) {
        const message =
          err.response.status === 400
            ? "Invalid email or mobile or password"
            : "Internal server error";
        return toast.update(toastId, {
          render: message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="flex flex-col">
        <div className="flex-1">
          <Input
            placeholder={"Email Address or Phone"}
            name={"emailOrPhone"}
            value={input.emailOrPhone}
            onChange={handleChangeInput}
            error={inputError.emailOrPhone}
          />
        </div>
        <div className="flex-1">
          <Input
            type="password"
            placeholder={"Password"}
            name={"password"}
            value={input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
      </div>
      <div className="flex justify-center py-4">
        <CommonButton bg="white" text="torchRed" borderColor="torchRed">
          Login
        </CommonButton>
      </div>
    </form>
  );
}
