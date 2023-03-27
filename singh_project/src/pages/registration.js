// registration page 

const Registration = () => {

    return (
        // <h1>Registration Page</h1>
        // <!-- component -->
        <div class = "flex h-screen w-screen">
            <div class="flex-1 bg-registration_pattern bg-cover bg-center bg-no-repeat">
            <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Register</h1>
                  
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username" /> 

                    <input 
                        
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />


                    {/* <button  

                        type = "button"
                        href = "#"
                        class="mt-4 w-full bg-orange-300 font-semibold py-2 rounded-md  tracking-wide">
                        Submit
                    
                    </button> */}


                    <a href="../#/"
                        class="rounded-lg bg-yellow-600 px-3 py-2 text-white transition hover:bg-red-700 items-center">Submit

                    </a>
                    

                    {/* <a href="../login/"
                        class="mt-4 w-full bg-orange-300 font-semibold py-2 rounded-md  tracking-wide">Submit
                               
                    </a> */}


                    <div class="text-center text-grey-dark mt-6">
                        Already have an account? 
                        <a class="no-underline border-b border-blue text-blue" href="../#/"> Log in
                        </a>.
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        
    )
}

export default Registration;