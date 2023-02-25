import States from "../components/states"
import { useReducer, useState } from "react"
import { useRouter } from "next/router"

const initialState = {
  firstName: {value: "", required: true},
  lastName: {value: "", required: true},
  address1: {value: "", required: true},
  address2: {value: "", required: false},
  city: {value: "", required: true},
  state: {value: "", required: true},
  zip: {value: "", required: true},
}
  
const reducer = (state, action) => {
  switch(action.type) {
    case "firstName":
      return {...state, firstName: action.payload};
    case "lastName":
      return {...state, lastName: action.payload};
    case "address1":
      return {...state, address1: action.payload};
    case "address2":
      return {...state, address2: action.payload};
    case "city":
      return {...state, city: action.payload};
    case "state":
      return {...state, state: action.payload};
    case "zip":
      return {...state, zip: action.payload};
    default:
      return state;
  }
}

const AccountForm = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [valid, setValid] = useState(true);
  const router = useRouter();

  const onChange = (e) => {
    let id = e.target.id
    dispatch({type: id, payload: {...state[id], value: e.target.value}});
  }

  const checker = (key, currState) => {
    if (currState.value === "" && currState.required === true) {
      let field = document.getElementById(key);
      field.classList.add("border-red-500");
      setValid(false)
    }
  }

  const submitFunction = (e) => {
    e.preventDefault();
    setValid(true);

    for (const [key, value] of Object.entries(state)) {
      checker(key, value);
    }

    if (valid) {
      router.push("/fuel_quote");
    }
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
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address1">
              Address Line 1
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address1" type="text" placeholder="ex. 12345 Sesame St." onChange={onChange}></input>
        
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address2">
              Address Line 2
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address2" type="text" placeholder="Apt 4206" onChange={onChange}></input>
     
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
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="zip">
              Zip
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="zip" type="text" placeholder="90210" onChange={onChange}></input>

          </div>
        </div>
        <div class='flex w-full justify-end items-center mt-10 mb-3'>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit" onClick={submitFunction}>
            Submit
          </button>

        </div>
      </form>
  )
}

export default AccountForm