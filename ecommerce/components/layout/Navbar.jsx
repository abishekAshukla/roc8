'use client'
import { CiSearch } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('useremail')
    router.push('/login')
  }
  return (
    <nav>
      <div className="flex justify-between items-center px-7 py-3">
        <div className="logo mt-3">
          <h1 className="font-bold text-3xl">ECOMMERCE</h1>
        </div>

        <div className="options hidden lg:flex font-semibold text-base mt-3">
          <p>Categories</p>
          <p className="ml-5">Sales</p>
          <p className="ml-5">Clearance</p>
          <p className="ml-5">New Stock</p>
          <p className="ml-5">Trending</p>
        </div>

        <div className="right">
          <div className="text-xs font-normal hidden sm:block">
            <span>Help</span>
            <span className="ml-3">Orders & Returns</span>
            <span className="ml-3">Hi, John</span>
            <span
              onClick={logout}
              className="ml-3 hover:font-bold cursor-pointer"
            >
              Logout
            </span>
          </div>
          <div className="flex justify-end mt-2">
            <div className="text-xl">
              <CiSearch />
            </div>
            <div className="ml-6 mr-2 text-xl">
              <IoCartOutline />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-[#f4f4f4] py-1">
        <FaChevronLeft />
        <span className="font-medium text-sm mx-5">
          {' '}
          Get 10% off on business sign up
        </span>
        <FaChevronRight />
      </div>
    </nav>
  )
}

export default Navbar
