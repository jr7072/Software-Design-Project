import AccountForm from "@/Forms/accountForm";

const Account = () => {

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-accountForm bg-no-repeat bg-cover">
            <div className="w-1/2 h-2/3 flex items-center justify-center">
                <div className="formWrapper bg-white">
                    <AccountForm />
                </div>
            </div>
        </div>  
    )
}

export default Account;