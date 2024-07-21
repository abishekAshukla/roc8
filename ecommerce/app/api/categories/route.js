// pages/api/categories.js

import { query } from '../../../lib/db'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY
const ITEMS_PER_PAGE = 6

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page')) || 1

  if (!authHeader) {
    return new Response(JSON.stringify('No token provided'), { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET_KEY)

    // Calculate the offset for pagination
    const offset = (page - 1) * ITEMS_PER_PAGE

    // Fetch categories from the database with pagination
    const result = await query('SELECT * FROM categories LIMIT $1 OFFSET $2', [
      ITEMS_PER_PAGE,
      offset,
    ])

    // Fetch total count of categories for pagination metadata
    const countResult = await query('SELECT COUNT(*) FROM categories')
    const totalItems = parseInt(countResult.rows[0].count)
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

    return new Response(
      JSON.stringify({
        categories: result.rows,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
        },
      }),
      { status: 200 }
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify('Unauthorized'), { status: 401 })
  }
}

export async function POST(request) {
  const { user_id, category_id } = await request.json()

  if (!user_id || !category_id) {
    return new Response(
      JSON.stringify('User ID and Category ID are required'),
      { status: 400 }
    )
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new Response(JSON.stringify('No token provided'), { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET_KEY)

    // Add the category to the user in the database
    await query(
      'INSERT INTO user_categories (user_id, category_id) VALUES ($1, $2)',
      [user_id, category_id]
    )

    return new Response(JSON.stringify('Category added successfully'), {
      status: 200,
    })
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify('Unauthorized or error adding category'),
      { status: 401 }
    )
  }
}

export async function DELETE(request) {
  const { user_id, category_id } = await request.json()

  if (!user_id || !category_id) {
    return new Response(
      JSON.stringify('User ID and Category ID are required'),
      { status: 400 }
    )
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new Response(JSON.stringify('No token provided'), { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET_KEY)

    // Remove the category from the user in the database
    await query(
      'DELETE FROM user_categories WHERE user_id = $1 AND category_id = $2',
      [user_id, category_id]
    )

    return new Response(JSON.stringify('Category removed successfully'), {
      status: 200,
    })
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify('Unauthorized or error removing category'),
      { status: 401 }
    )
  }
}
