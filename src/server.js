import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import journalRoutes from './routes/journal.js'
import userRoutes from './routes/userRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
dotenv.config();

const app = express();
app.use(express.json());
app.get('/', async (req, res) => {
  res.send({
    status: 200,
    message:"Welcome to the Mental HealthCare App"
  })
})
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);
app.use('/api/profiles', userRoutes)
app.use('/api/appointment', appointmentRoutes)
app.use("/api/hotel",hotelRoutes)
app.use("/api/booking",bookingRoutes)
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
