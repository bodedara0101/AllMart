import express from 'express'
import cors from 'cors';
import usersRouter from './routes/users.router.js'
import adminRouter from './routes/admin.router.js'
import userAuth from './middlewares/userAuth.middleware.js'
import dotenv from 'dotenv';
import { sequelize } from './models/users.model.js';
import { productSync } from './models/products.model.js';
import { upload } from './middlewares/multer.middleware.js';
import path from "path";
import { fileURLToPath } from "url";

const PORT = 8000;
const app = express();
dotenv.config();
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

productSync.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

app.use("/users",usersRouter);

app.get('/profile', userAuth.authenticate, (req, res) => {
    // Send back the user data attached to the request object
    console.log(req.user)
    res.json({user:req.user});
});

app.use('/admin/api',adminRouter);

app.post('/upload',upload.single('file'), (req, res) => {
    console.log(req.file);
    res.json({message : 'File uploaded successfully!',file : req.file})
});

app.listen(PORT,()=>{
    console.log(`Server Up on ${PORT}`)
})