
import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io'
import http from 'http'
import { connectSocket } from './controller/socket-connection';
import morgan from 'morgan'
import userRouter from './route/userRouter'
import { connectdb } from './config/dbConnect';
const app = express();
const port = 3000; // Or any port number you prefer


app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
// Middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
app.use(cors(corsOptions));

const server=http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials:true,
      methods: ['GET', 'POST'],
      
    }
  })
  

  connectdb()

connectSocket(io)

app.use('/',userRouter)
// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



