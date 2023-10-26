import cors from "cors";

const allowedOrigins = ["http://localhost:3000", "https://mapet-five.vercel.app"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins or if it's undefined
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOptions;

