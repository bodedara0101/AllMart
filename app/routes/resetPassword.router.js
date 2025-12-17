import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

async function resetPassword() {
  try {
    // Create MySQL connection
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',      // Change this
      password: '', // Change this
      database: 'myapp'   // Change this
    });

    console.log('Connected to MySQL');

    // Hash the new password
    const newPassword = 'bhajan5080@'; // Change to your desired password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update admin user
    const [result] = await connection.execute(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword,'bhajan']
    );

    console.log('Password updated:', result);
    console.log(`New password is: ${newPassword}`);
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

resetPassword();