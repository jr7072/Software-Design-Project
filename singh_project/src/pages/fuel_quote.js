import Image from 'next/image'
import { useState, useReducer} from 'react';
import States from "../components/states"
import { useRouter } from "next/router"
import axios, { AxiosError, HttpStatusCode } from 'axios'

// fuel quote page
const user_id = 1;

const FuelQuote = () => {
    const [gallons, setGallons] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState(2.5);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:3080/fuel`, {gallons, address, date,price});
          setPrice(response.data.price);
        } catch (error) {
          console.error(error);
        }
    };
   
    return(


        //keep background
        //get rid of the dropdown for the address
        //change the color of the button
        <form onSubmit={handleFormSubmit}>
        <div class = "flex h-screen w-screen">
            <div class="flex-1 bg-quoteForm bg-cover bg-center bg-no-repeat">
            <div class="sm:px-12 mx-auto flex items-center justify-between p-4 ">
        <div class="flex items-center space-x-2">
          <a href="../account/">
            <img src="user.svg" alt="Logo" class="w-10"></img>
          </a>
        </div>
        <nav class="flex items-center space-x-1 text-sm font-medium text-gray-800">
         
          <a href="../fuel_quote_history/"
                        class="rounded-lg bg-yellow-600 px-3 py-2 text-white transition hover:bg-red-700">Quote History


                    </a>
        </nav>
      </div>
                <div class="bg-grey-lighter min-h-screen flex flex-col">
                    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 class="mb-8 text-3xl text-center font-inter font-bold">Request a Quote</h1>


                        <label
                            htmlFor="gallons"
                            class="block mb-2 text-sm font-inter font-bold text-gray-900 dark:text-white">
                                Number of Gallons
                            </label>
                        <input
                            id="gallons"
                            type="number"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            value={gallons}
                            name="gallons"
                            placeholder="Gallons"
                            onChange={(e) => setGallons(e.target.value)}
                        />
                       
                   
                        <label
                            htmlFor="user address"
                            class="block mb-2 text-sm font-inter font-bold text-gray-900 dark:text-white">
                                Address:
                            </label>
                        <input
                            type="address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3 mb-5 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value ={address}
                            onChange={(e) => setAddress(e.target.value)}
                       
                        ></input>
                           
                       
                        <label
                            htmlFor="date"
                            class="block mb-2 text-sm font-bold text-gray-900 font-inter dark:text-white">
                                Date of Delivery:
                        </label>
                       
                        <input
                            id='date'
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="date"
                            placeholder="Month/Day/Year"
                        />




                        <label
                            htmlFor="price"
                            name = "price"
                            // onChange={(e) => setPrice(e.target.value)}
                            class="block mb-2 text-sm font-bold text-gray-900 dark:text-white mt-9 font-inter">
                                Price:
                               
                        </label>
                        <div class="mt-1 w-full bg-gray-100 font-semibold text-center text-gray-300 py-2 rounded-md  tracking-wide">{price && <p> Price: {price}</p>}</div>


                        <button    
                            htmlFor ='price'
                            type='submit'
                            onClick={handleFormSubmit}
                            class="rounded-lg bg-yellow-600 mt-6 px-3 py-2 text-white transition hover:bg-red-700">
                                Save
                        </button>
                   
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </form>
       
    )
}


export default FuelQuote;