import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {   
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with the salt
        return hashedPassword; // Return the hashed password
    } catch (error) {
        console.log('Error hashing password:', error);
    }
}   
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt .compare(password, hashedPassword);
};