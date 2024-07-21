import { query } from '../../../../lib/db'
import bcrypt from 'bcrypt'

export async function POST(request) {
  const { name, email, password } = await request.json()
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Store the hashed password in the database
    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    )

    return new Response(JSON.stringify('User added successfully'), {
      status: 201,
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify('Error adding user'), { status: 500 })
  }
}

export async function GET(request) {
  try {
    const result = await query('SELECT * FROM users')
    return new Response(JSON.stringify(result.rows))
  } catch (err) {
    console.error(err)
  }
}
