import AccountForm from "@/Forms/accountForm";
import { parseCookies } from "@/helpers/parseCookie";

const Account = ( { cookies } ) => {


    console.log(cookies.user)
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-accountForm bg-no-repeat bg-cover">
            <div className="w-1/2 h-2/3 flex items-center justify-center">
                <div className="formWrapper bg-white">
                    <AccountForm user={cookies.user}/>
                </div>
            </div>
        </div>  
    )
}

Account.getInitialProps = async ({ req, res }) => {
    
    const data = parseCookies(req)
    
    if (res) {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        res.writeHead(301, { Location: "/" })
        res.end()
      }
    }
    
    return {
      cookies: data && data,
    }
}

export default Account;