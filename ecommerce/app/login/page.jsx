'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const login = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      })
      const data = await res.json()
      console.log(data)
      if (data.message === 'Login successful') {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userid', data.id)
        localStorage.setItem('useremail', data.email)
        router.push('/')
        alert('User loggedin successfully')
      } else alert('Email or password invalid')
    } catch (error) {
      alert('Email or password invalid')
    }
  }
  return (
    <div className="flex justify-center">
      <div className="bg-white border mt-8 rounded-2xl py-6 px-10 pb-20">
        <h1 className="text-center font-semibold text-3xl">Login</h1>
        <h2 className="text-center font-medium text-2xl mt-7">
          Welcome back to ECOMMERCE
        </h2>
        <p className="text-center mt-3">The next gen business marketplace</p>
        <form action="" className="font-normal text-base" onSubmit={login}>
          <div className="flex flex-col mt-5">
            <span>Email</span>
            <input
              required
              type="text"
              placeholder=" Enter"
              className="border placeholder:text-base placeholder:text-[#848484] h-12 w-[456px] rounded"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5">
            <span>Password</span>
            <input
              required
              type="text"
              placeholder=" Enter"
              className="border placeholder:text-base placeholder:text-[#848484] h-12 w-[456px] rounded"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="h-12 w-[456px] rounded bg-black text-white mt-5"
          >
            Login
          </button>
          <div className="flex justify-center mt-5">
            Dont have an Account?{' '}
            <p
              onClick={() => router.push('/signup')}
              className="font-bold ml-1 cursor-pointer"
            >
              SIGN UP
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
