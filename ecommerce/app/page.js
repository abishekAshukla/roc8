'use client'
import { useEffect, useState } from 'react'
import PageNumber from '@/components/PageNumber'
import GlobalLoader from '@/components/loaders/GlobarLoader'
import { TiTick } from 'react-icons/ti'

export default function Home() {
  const fetchCategories = async (page) => {
    const token = localStorage.getItem('token') // Assuming you store the token in localStorage
    setLoading(true)
    const res = await fetch(`/api/categories?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      const data = await res.json()
      setCategories(data.categories)
      console.log(data)
      setLoading(false)
    } else {
      console.error('Failed to fetch categories', await res.json())
      setLoading(false)
    }
  }

  const updatePageNo = (page) => {
    setPageNo(page)
  }

  const [pageNo, setPageNo] = useState(1)
  const [categories, setCategories] = useState([])
  const [usersCat, setUsersCat] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaderText, setLoaderText] = useState('Please wait...')

  useEffect(() => {
    fetchCategories(pageNo)
  }, [pageNo])

  useEffect(() => {
    const getUsersCat = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userid')

      const res = await fetch('/api/categories/user-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        const userCateg = data.map((cat) => cat.category_id)
        setUsersCat(userCateg)
      } else {
        console.error('Failed to fetch user categories', await res.json())
      }
    }
    getUsersCat()
  }, [])

  const addCategory = async (userId, catId) => {
    const token = localStorage.getItem('token') // Assuming you store the token in localStorage
    setLoading(true)
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        category_id: catId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsersCat([...usersCat, catId])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }

  const removeCategory = async (userId, catId) => {
    const token = localStorage.getItem('token') // Assuming you store the token in localStorage
    setLoading(true)
    const res = await fetch('/api/categories', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        category_id: catId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedCats = usersCat.filter((cat) => cat !== catId)
        setUsersCat(updatedCats)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }

  const handleCheckboxChange = (userId, catId) => {
    const isChecked = usersCat.includes(catId)
    if (!isChecked) {
      addCategory(userId, catId)
    } else {
      removeCategory(userId, catId)
    }
  }

  return (
    <main className="flex justify-center">
      {loading && (
        <GlobalLoader tag={loaderText} color="black" size={60} width={6} />
      )}
      <div className="border mt-14 w-1/3 p-10">
        <h1 className="text-center font-semibold text-3xl">
          Please mark your interests!
        </h1>
        <p className="text-center mt-3">We will keep you notified</p>
        <h2 className="mt-5 font-medium text-xl">My saved interests!</h2>
        <div className="">
          {categories.map((category) => (
            <div key={category.id} className="flex mt-3 items-center">
              {/* <input
                type="checkbox"
                className="custom-checkbox peer"
                checked={usersCat.includes(category.id)}
                onChange={(e) =>
                  handleCheckboxChange(
                    localStorage.getItem('userid'),
                    category.id,
                    e.target.checked
                  )
                }
              /> */}
              <div
                style={{
                  backgroundColor: usersCat.includes(category.id)
                    ? 'black'
                    : '#CCCCCC',
                  color: usersCat.includes(category.id) ? 'white' : '#CCCCCC',
                }}
                className="rounded-[3px] p-[1px]"
                onClick={() => {
                  handleCheckboxChange(
                    localStorage.getItem('userid'),
                    category.id
                  )
                }}
              >
                <TiTick />
              </div>
              <h3 className="ml-2">{category.name}</h3>
            </div>
          ))}
        </div>
        <PageNumber currentPageNo={pageNo} updatePageNo={updatePageNo} />
      </div>
    </main>
  )
}
