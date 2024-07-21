'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const register = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          email: Email,
          password: Password,
        }),
      })
      const data = await res.json()
      if (data === 'User added successfully') {
        router.push('/login')
        alert('User registered successfully')
      } else alert('User already exists')
    } catch (error) {
      alert('User already exists')
    }
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white border mt-8 rounded-2xl py-6 px-10 pb-20">
        <h1 className="text-center font-semibold text-3xl">
          Create your account
        </h1>
        <form action="" className="font-normal text-base" onSubmit={register}>
          <div className="flex flex-col mt-5">
            <span>Name</span>
            <input
              type="text"
              required
              placeholder=" Enter"
              className="border placeholder:text-base placeholder:text-[#848484] h-12 w-[456px] rounded"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Create Account
          </button>
          <div className="flex justify-center mt-5">
            Have an Account?{' '}
            <p
              onClick={() => router.push('/login')}
              className="font-bold ml-1 cursor-pointer"
            >
              LOGIN
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
