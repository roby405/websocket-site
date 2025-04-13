const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const {sequelize, Message} = require("./models/index");

const messageRoute = require("./routes/messages");
const authRoute = require("./routes/auth");


const app = express()

app.use(express.json())

// app.use("/api/user", authRoute)

const server = http.createServer(app)

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ["GET", "POST"]
};

app.use(cors(corsOptions));


sequelize.authenticate()
.then(() => console.log('Database connected'))
.catch(err => console.error('DB connection error:', err));

// Sync models
sequelize.sync();

app.use("/messages", messageRoute);
app.use("/", authRoute);
// const Message = require('./models/message_model')(sequelize, Sequelize.DataTypes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this URL
    methods: ["GET", "POST"]
  }
}) // websocket server


// let messageList = []

io.on('connection', (socket) => {
  console.log("new connection")

  socket.emit("message", { author: "system", content: "Welcome" })

  socket.on("message", async ({ roomId, author, content }) => {
    try {
      const message = await Message.create({
        content,
        author,
        roomId
      });

      io.to(roomId).emit("message", message.get({plain: true}));

    } catch(error) {
      console.error("Error saving: ", error);
    }
    //     console.log("received message")
    //     io.emit("message", {...message, datetime: new Date().toISOString()})
    // })
    })
    
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`new user joined room ${roomId}`);
    })

    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`user left room ${roomId}`);
    })
  })

  server.listen(4000, () => {
    console.log("site is up on port 4000")
  })