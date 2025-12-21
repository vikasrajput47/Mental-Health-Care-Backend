import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const {name, email, phone, password, role } = req.body;
    const result = await authService.registerUser({
      name,
      email,
      phone,
      password,
      role,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const logout = async (req, res) => {
  try {
    // Extract token from Authorization header (Bearer <token>)
    const token = req.headers.authorization?.split(" ")[1];
    const result = await authService.logoutUser(token);
    // Clear cookies if you are using them to store the JWT
    res.clearCookie("token");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
