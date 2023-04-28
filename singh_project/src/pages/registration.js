import { useEffect, useReducer } from "react"
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

// registration page 

const Registration = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    //console.log(state);

    const sendUserData = async() => {

        const endpoint = `http://localhost:3080/registration/register?username=${state.username}&password=${state.password}`;
        const body = state;

        try {
            // try to upload data
            const response = await axios.get(endpoint, body);
            //console.log(response);
            const status = await response.status;

            // handle http accepted but not successful
            if (status !== 200){
                throw(`resource not updated returned ${status}`);
            }

            // push route if successful
            router.push('/account');

        }catch(error){
            console.log(error.response.data);

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
        sendUserData()
    }

    return (
        // <h1>Registration Page</h1>
        // <!-- component -->
        <div class = "flex h-screen w-screen">
            <div class="flex-1 bg-registration_pattern bg-cover bg-center bg-no-repeat">
            <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Register</h1>
                  
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="username" id="username" placeholder="Username" onChange={onChange}/> 
                    <input type="password" class="block border border-grey-light w-full p-3 rounded mb-4" name="password" id="password" placeholder="******************" onChange={onChange}/>
                    <label class="block text-red-700 text-sm font-bold mb-2" for="password-incorrect" id="password-incorrect"></label>
                    <button class="rounded-lg bg-yellow-600 px-3 py-2 text-white transition hover:bg-red-700 items-center" type="button" onClick={submitFunction}>
                        Submit
                    </button>

                    <div class="text-center text-grey-dark mt-6">
                        Already have an account?
                        <a class="no-underline border-b border-blue text-blue" href="../#/">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        
    )
}

export default Registration;