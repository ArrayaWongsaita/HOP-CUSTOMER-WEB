import RegisterForm from "../features/register-form";

export default function RegisterPage() {
    return (
        <div className="h-[100vh] max-w-[430px] bg-black" >
            <div className="
            w-[100%] h-[25%]
            text-white text-5xl font-extrabold flex justify-center items-center
            ">
                Logo HOP
            </div>
            <div className="w-[90%] mx-auto flex justify-between">
                <div className="
                text-white h-[40px] w-[100px] bg-[#1D2B53]
                flex justify-center items-center rounded-tr-2xl
                ">
                    Register
                </div>
                <div className="
                text-white h-[40px] w-[100px] bg-[#FF004D]
                flex justify-center items-center rounded-tl-2xl
                ">
                    Login
                </div>
            </div>
            <div className="
            rounded-b-2xl rounded-tr-2xl w-[90%] mx-auto h-[50%] flex items-center
            bg-gradient-to-br from-[#1D2B53] from-50% to-[#FF004D] to-100% 
            " >
                <div className="p-5 my-auto" >
                    < RegisterForm />
                </div>
            </div>
        </div>
    )
}