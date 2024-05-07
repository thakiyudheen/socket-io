"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const socket_connection_1 = require("./controller/socket-connection");
const morgan_1 = __importDefault(require("morgan"));
const userRouter_1 = __importDefault(require("./route/userRouter"));
const dbConnect_1 = require("./config/dbConnect");
const app = (0, express_1.default)();
const port = 3000; // Or any port number you prefer
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// Middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST'],
    }
});
(0, dbConnect_1.connectdb)();
(0, socket_connection_1.connectSocket)(io);
app.use('/', userRouter_1.default);
// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
