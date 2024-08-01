import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className='text-gray-700 body-font border-b border-gray-200'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center gap-5'>
            <Link to={'/'}>Home</Link>
            <Link to={'/units'}>Units</Link>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
