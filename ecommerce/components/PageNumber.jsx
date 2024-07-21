import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PageNumber = ({ currentPageNo, updatePageNo }) => {
  const totalPages = 14
  const itemsPerPage = 7
  const [currentPageGroup, setCurrentPageGroup] = useState(0)

  const handleNext = () => {
    if ((currentPageGroup + 1) * itemsPerPage < totalPages) {
      setCurrentPageGroup(currentPageGroup + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPageGroup > 0) {
      setCurrentPageGroup(currentPageGroup - 1)
    }
  }

  const getCurrentPages = () => {
    const start = currentPageGroup * itemsPerPage
    return Array.from({ length: itemsPerPage }, (_, i) => start + i + 1).filter(
      (page) => page <= totalPages
    )
  }

  return (
    <div className="flex items-center mt-8">
      <div
        onClick={handlePrevious}
        className={`cursor-pointer ${
          currentPageGroup === 0 ? 'text-gray-300 cursor-not-allowed' : ''
        }`}
      >
        <FaChevronLeft />
      </div>
      <div className="flex ml-3">
        {getCurrentPages().map((item) => (
          <span
            style={{
              color: currentPageNo === item ? 'black' : '#d1d5db ',
            }}
            className="ml-3 cursor-pointer"
            key={item}
            onClick={() => updatePageNo(item)}
          >
            {item}
          </span>
        ))}
      </div>
      <div
        onClick={handleNext}
        className={`ml-5 cursor-pointer ${
          (currentPageGroup + 1) * itemsPerPage >= totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : ''
        }`}
      >
        <FaChevronRight />
      </div>
    </div>
  )
}

export default PageNumber
