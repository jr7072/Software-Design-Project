// fuel quote history page

const FuelQuoteHistory = () => {

    return (
        <div class = "flex h-screen w-screen">
            <div class="flex-1 bg-quote_history bg-cover bg-center bg-no-repeat">
            <div class="sm:px-12 mx-auto flex items-center justify-between p-4 ">
        <div class="flex items-center space-x-2">
          <a href="../account/">
            <img src="user.svg" alt="Logo" class="w-10"></img>
          </a>
        </div>
        <nav class="flex items-center space-x-1 text-sm font-medium text-gray-800">
          
          <a href="../fuel_quote/"
                        class="rounded-lg bg-yellow-600 px-3 py-2 text-white transition hover:bg-red-700">Quote Form

                    </a>
        </nav>
      </div>
                <div class ="w-screen h-screen flex justify center items-center">
                    <div class="relative mx-auto my-auto shadow-md rounded-lg">
                        <table class=" text-sm text-left text-gray-500 dark:text-gray-400 justify-center"> 
                            <thead class="text-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-12 py-9">
                                        Gallons Requested
                                    </th>
                                    <th scope="col" class="px-12 py-9">
                                        Delivery Address
                                    </th>
                                    <th scope="col" class="px-12 py-9">
                                    Delivery Date
                                    </th>
                                    <th scope="col" class="px-12 py-9">
                                    Suggested Price / gallon
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        ...
                                    </th>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    
                                </tr>
                                <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        ...
                                    </th>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        ...
                                    </th>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    
                                </tr>
                                <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-lg text-gray-900 whitespace-nowrap dark:text-white">
                                        ...
                                    </th>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    <td class="px-12 py-9">
                                        ...
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>


            </div>
        </div>
        </div>
    )
}

export default FuelQuoteHistory;