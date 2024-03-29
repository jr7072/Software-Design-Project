import { useReducer } from "react"
import { useCookies } from "react-cookie"
import { useRouter } from "next/router"
import axios, { AxiosError, HttpStatusCode } from 'axios'

//form initial state
const initialState = {
    username:  "",
    password: ""
}


const reducer = (state, action) => {
    switch(action.type) {

    case "username":
        return {...state, username: action.payload};
    case "password":
        return {...state, password: action.payload};
    default:
        return state;
    }
}

const RegistrationForm = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [cookie, setCookie] = useCookies(['user']);
    const router = useRouter();

    //console.log(state);

    const sendUserData = async() => {

        const endpoint = `http://localhost:3080/login/login?username=${state.username}&password=${state.password}`;
        const body = state;

        try {
            // try to upload data
            const response = await axios.get(endpoint, body);
            //console.log(response);
            const status = await response.status;

            /*await axios({
                method: 'get',
                url: endpoint,
                data: body
            }).then(function (response) {
                console.log(response);
            });*/

            // handle http accepted but not successful
            if (status !== 200){
                throw(`resource not updated returned ${status}`);
            }

            const user_data = response.data

            setCookie("user", JSON.stringify(user_data.id), {
                    path: "/",
                    maxAge: 3600, // Expires after 1hr
                    sameSite: true,
            })

            // push route if successful
            router.push('/account');

        }catch(error){

            // looking only for axios error
            if (error instanceof AxiosError){

                //just check for a bad response
                if (error.response.status === 400){
                    // use this block to display errors

                    const jsonResponse = error.response.data;
                    console.log(jsonResponse);

                    const wrongpass = document.getElementById("password-incorrect");
                    wrongpass.innerHTML = error.response.data.error;

                    return
                }
            }

            //raise everything else
            throw(error)
        }

    }

    const onChange = (e) => {
        let id = e.target.id;
        dispatch({type: id, payload: e.target.value});
    }

    const submitFunction = (e) => {
        e.preventDefault();
        //resetFields();
        sendUserData()
    }

    return (
        <div class="bgw-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="bg-gray-200 rounded-full appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={onChange}></input>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="bg-gray-200 rounded-full appearance-none w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={onChange}></input>
                    <label class="block text-red-700 text-sm font-bold mb-2" for="password-incorrect" id="password-incorrect"></label>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={submitFunction}>
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-800" href="/registration">
                        Register
                    </a>
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm