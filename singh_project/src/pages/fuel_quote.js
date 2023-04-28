import Image from 'next/image'
import { useState, useReducer, useEffect} from 'react';
import States from "../components/states"
import { useRouter } from "next/router"
import axios, { AxiosError, HttpStatusCode } from 'axios'
import { parseCookies } from '@/helpers/parseCookie';

// fuel quote page
const user_id = 1;

const FuelQuote = ( { cookies }) => {
    
    const [gallons, setGallons] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState(0.0);

    const user_id = cookies.user.slice(1, -1);


    const getUserAddress = async() => {

        const endpoint = `http://localhost:3080/users/${user_id}`;
        const response = await axios.get(endpoint);
        const addressLine1 = await response.data.addressLine1;
        const addressLine2 = await response.data.addressLine2;
        const city = await response.data.city;
        const state = await response.data.state;
        const zipCode = await response.data.zipCode;

        const address_data = `${addressLine1} ${addressLine2} ${city} ${state} ${zipCode}`;

        setAddress(address_data);

        const addressElement = document.getElementById("address");
        addressElement.value = address_data;

    }

    const upload_fuel_data = async() => {
        
        try{
            const response = await axios.post(`http://localhost:3080/fuelquote/${user_id}`, {gallons, address, date, price});
        } catch (error) {
            console.log(error);
        }
    }

    const getFuelPrice = async() => {
        setPrice(null);
        const response = await axios.post(`http://localhost:3080/fuelquote/get_price`, {gallons, address, date});
        const price_data = await response.data.price;
        setPrice(price_data);
    } 

    const getFuelQuote = (e) => {
        e.preventDefault();
        getFuelPrice();

    }

    const saveFuelQuote = (e) => {
        e.preventDefault();
        upload_fuel_data();
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("hello");
        upload_fuel_data();
    }
   

    useEffect(() => {
        getUserAddress();
    }, []);

    return(


        //keep background
        //get rid of the dropdown for the address
        //change the color of the button
        <form>
        <div className = "flex h-screen w-screen">
            <div className="flex-1 bg-quoteForm bg-cover bg-center bg-no-repeat">
            <div className="sm:px-12 mx-auto flex items-center justify-between p-4 ">
        <div className="flex items-center space-x-2">
          <a href="../account/">
            <img src="user.svg" alt="Logo" class="w-10"></img>
          </a>
        </div>
        <nav className="flex items-center space-x-1 text-sm font-medium text-gray-800">
         
          <a href="../fuel_quote_history/"
                        className="rounded-lg bg-yellow-600 px-3 py-2 text-white transition hover:bg-red-700">Quote History


                    </a>
        </nav>
      </div>
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center font-inter font-bold">Request a Quote</h1>

                        <input
                            id="gallons"
                            type="number"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            value={gallons}
                            name="gallons"
                            placeholder="Gallons"
                            onChange={(e) => setGallons(e.target.value)}
                        />
                       
                        <input
                            id="address"
                            disabled
                            type="address"
                            placeholder="Address"
                            className="mt-6 mb-6 p-3 w-full bg-gray-100 py-2 rounded-md  text-black tracking-wide"
                            value ={address}
                            onChange={(e) => setAddress(e.target.value)}
                       
                        ></input>
                           
                       
                        <input
                            id='date'
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="date"
                            placeholder="Month/Day/Year"
                        />


                        <div className="mt-1 w-full bg-gray-100 text-center text-black py-2 rounded-md tracking-wide">{price && <p> Price: {price}</p>}</div>

                    
                        <div className='flex justify-between items-center mt-6'>
                            <button    
                                htmlFor ='price'
                                onClick={saveFuelQuote}
                                className="rounded-lg bg-yellow-600 px-3 py-2 text-white transition hover:bg-red-700">
                                    Save Quote
                            </button>


                            <button    
                                htmlFor ='price'
                                onClick={getFuelQuote}
                                className="rounded-lg bg-yellow-600 px-3 py-2 text-white transition hover:bg-red-700">
                                    Get Fuel Quote
                            </button>
                        </div>
                   
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </form>
       
    )
}

FuelQuote.getInitialProps = async ({ req, res }) => {
    
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


export default FuelQuote;