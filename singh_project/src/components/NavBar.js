const NavBar = () => {

    return (
        <nav class="flex items-center justify-between flex-wrap opacity-1 p-6">
            <div class="flex items-center flex-shrink-0 text-white ml-8">
                <span class="font-bold text-2xl text-black tracking-tight">Fuel Quotes</span>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="ml-auto mr-8 hidden">
                <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
                </div>
            </div>
        </nav>
    )
}

export default NavBar