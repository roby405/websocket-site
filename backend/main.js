// require('dotenv').config();
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const { sequelize, Message } = require("./models/index");

const messageRoute = require("./routes/messages");
const authRoute = require("./routes/auth");
// const { runMigrations } = require("./runMigrations");

const port = process.env.PORT || 4000;


const app = express()

app.use(express.json())

// app.use("/api/user", authRoute)

const server = http.createServer(app)

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-render-url.onrender.com']
    : ['http://localhost:5173', 'http://localhost:4000'],
  methods: ["GET", "POST", "PATCH"]
};
app.use(cors(corsOptions));


app.use("/api/messages", messageRoute);
app.use("/api", authRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../dist/")));

  // Handle client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/", "index.html"));
  });
}

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? 'https://your-render-url.onrender.com'
      : 'http://localhost:5173',
    methods: ["GET", "POST", "PATCH"]
  },
  transports: ['websocket', 'polling']
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection error:', err));

  // runMigrations(sequelize);
//   async function dropAllTables() {
//     try {
//       // Disable foreign key checks
//       await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
  
//       // Get all table names
//       const [tables] = await sequelize.query(`
//         SELECT table_name 
//         FROM information_schema.tables 
//         WHERE table_schema = DATABASE();
//       `);
  
//       // Drop each table
//       for (const table of tables) {
//         const tableName = table.TABLE_NAME;
//         await sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
//         console.log(`Dropped table ${tableName}`);
//       }
  
//       // Re-enable foreign key checks
//       await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  
//       console.log('All tables nuked!');
//     } catch (error) {
//       console.error('Failed to drop tables:', error);
//     } finally {
//       await sequelize.close();
//     }
//   }
  

// dropAllTables();

// Sync models
sequelize.sync();
// runMigrations(sequelize);
// const Message = require('./models/message_model')(sequelize, Sequelize.DataTypes);

io.on('connection', (socket) => {
  console.log("new connection")

  socket.emit("message", { authorId: 0, content: "Welcome" })

  socket.on("message", async ({ roomId, authorId, content }) => {
    try {
      const message = await Message.create({
        content,
        authorId,
        roomId
      });

      io.to(roomId).emit("message", message.get({ plain: true }));

    } catch (error) {
      console.log(`author is ${authorId}`);
      console.error("Error saving: ", error);
    }
    //     console.log("received message")
    //     io.emit("message", {...message, datetime: new Date().toISOString()})
    // })
  })

  socket.on("attachmentMessage", async ({ roomId, authorId, attachment }) => {
    try {
      const message = await Message.create({
        content: attachment.url,
        authorId,
        roomId,
        attachments: attachment,
      });

      io.to(roomId).emit("message", message.get({ plain: true }));

    } catch (error) {
      console.log(attachment);
      console.log("life sucks");
      console.log(`author is ${authorId}`);
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

server.listen(port, () => {
  console.log(`site is up on port ${port}`);
})