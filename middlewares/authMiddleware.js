import JWT from 'jsonwebtoken';

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    // Verify the token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded JWT user:", req.user);
 // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 1) {
      next(); // User is an admin, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access denied, admin only' }); // User is not an admin
    }
  } catch (error) {
    console.error('Error checking admin role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}