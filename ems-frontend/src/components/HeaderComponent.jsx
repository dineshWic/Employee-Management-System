
  
const HeaderComponent = () => {
    return (
        <div className="mb-5"> {/* Updated style with Tailwind CSS */}
            <header>
                <nav className="text-white bg-black shadow-md navbar navbar-expand-md navbar-dark bg-dark"> {/* Added shadow-md for boxShadow with Tailwind CSS */}
                    <div className="p-3 mx-4"><a href="https://www.javaguides.net" className="text-lg font-bold navbar-brand hover:text-blue-600">Employee Management System</a></div> {/* Updated fontSize and fontWeight with Tailwind CSS */}
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent