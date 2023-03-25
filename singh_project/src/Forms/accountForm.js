import States from "../components/states"
import { useEffect, useReducer } from "react"
import { useRouter } from "next/router"
import axios, { AxiosError, HttpStatusCode } from 'axios'


//assume user 1 in logged in for now
const user_id = 1;


//form initial state
const initialState = {
  firstName:  "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: ""
}


const reducer = (state, action) => {
  switch(action.type) {

    case "firstName":
      return {...state, firstName: action.payload};
    case "lastName":
      return {...state, lastName: action.payload};
    case "addressLine1":
      return {...state, addressLine1: action.payload};
    case "addressLine2":
      return {...state, addressLine2: action.payload};
    case "city":
      return {...state, city: action.payload};
    case "state":
      return {...state, state: action.payload};
    case "zipCode":
      return {...state, zipCode: action.payload};
    default:
      return state;
  }
}


const AccountForm = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const fetchUserData = async () => {
    
    const endpoint = `http://localhost:3080/users/${user_id}`;
    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }

    const response = await axios.get(endpoint, config);
    const jsonResponse = await response.data;

    for (const [field, value] of Object.entries(jsonResponse)) {
      
      if (field === "id") {
        continue;
      }

      const inputField = document.getElementById(field);
      inputField.value = value;
      
      dispatch({type: field, payload: value});

    }

  }


  const sendUserData = async() => {
    
    const endpoint = `http://localhost:3080/users/${user_id}`;
    const body = state;

    try {

      // try to upload data
      const response = await axios.put(endpoint, body);
      const status = await response.status;

      // handle http accepted but not successful
      if (status !== 204){
        throw(`resource not updated returned ${status}`);
      }

      // push route if successful
      router.push('/fuel_quote');

    }catch(error){
    
      // looking only for axios error
      if (error instanceof AxiosError){

        //just check for a bad response
        if (error.response.status === 400){
          // use this block to display errors

          const jsonResponse = error.response.data;

          // add form styling to indicate errors
          for (const [field, status] of Object.entries(jsonResponse)){
    
            if (!status.valid){
              const fieldElement = document.getElementById(field);
              fieldElement.classList.add('border-red-500');
              
              // get parent element
              const fieldParent = fieldElement.parentElement;
              const warningElement = document.createElement('p');
              warningElement.classList.add('text-red-500');
              warningElement.innerHTML = status.message;

              fieldParent.appendChild(warningElement);
            }
    
          }

          return
        }
      }

      //raise everything else
      throw(error)
    }
    
  }

  const resetFields = () => {

    for (const field of Object.keys(state)){

      // get element and reset border
      const fieldElement = document.getElementById(field);
      fieldElement.classList.remove('border-red-500');
      fieldElement.classList.add('border-gray-200');
      
      // remove message
      const parentElement = fieldElement.parentElement;
      const pElement = parentElement.querySelector('p');

      if (!pElement){
        continue;
      }

      pElement.remove();
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  const onChange = (e) => {
    let id = e.target.id;
    dispatch({type: id, payload: e.target.value});
  }

  const submitFunction = (e) => {
    e.preventDefault();
    resetFields();
    sendUserData()
  }

  return(
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="firstName">
              First Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="firstName" type="text" placeholder="Jane" onChange={onChange}></input>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="lastName">
              Last Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastName" type="text" placeholder="Doe" onChange={onChange}></input>
          
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="addressLine1">
              Address Line 1
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="addressLine1" type="text" placeholder="ex. 12345 Sesame St." onChange={onChange}></input>
        
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="addressLine2">
              Address Line 2
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="addressLine2" type="text" placeholder="Apt 4206" onChange={onChange}></input>
     
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="city">
              City
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city" type="text" placeholder="Houston" onChange={onChange}></input>

          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="state">
              State
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="state" onChange={onChange}>
                <States />
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>

            </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="zipCode">
              Zip
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="zipCode" type="text" placeholder="90210" onChange={onChange}></input>

          </div>
        </div>
        <div class='flex w-full justify-end items-center mt-10 mb-3'>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type='submit' onClick={submitFunction}>
            Submit
          </button>

        </div>
      </form>
  )
}

export default AccountForm