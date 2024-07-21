import { query } from '../../../../lib/db'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request) {
  try {
    const body = await request.json()
    const { user_id } = body

    const result = await query(
      'SELECT * FROM user_categories WHERE user_id = $1',
      [user_id]
    )

    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify('Unauthorized'), { status: 401 })
  }
}
