import { query } from '../../../../lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'sushmita'

export async function POST(request) {
  const { email, password } = await request.json()
  try {
    // Retrieve the user from the database
    const result = await query('SELECT * FROM users WHERE email = $1', [email])

    if (result.rows.length === 0) {
      return new Response(JSON.stringify('Invalid email or password'), {
        status: 401,
      })
    }

    const user = result.rows[0]

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return new Response(JSON.stringify('Invalid email or password'), {
        status: 401,
      })
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '24h',
    })

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        id: user.id,
        email: user.email,
      }),
      { status: 200 }
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify('Error logging in'), { status: 500 })
  }
}
