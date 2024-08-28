const express = require("express");
const cors = require('cors')
require('./config/config');
const User = require('./models/User');
const Post = require('./models/Post')
const app = express();
const crypto = require('crypto');
const { initializeFirebaseApp, getFirebaseStorage } = require('./config/config');
const multer = require('multer');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

initializeFirebaseApp();
const storage = getFirebaseStorage();


app.use(express.json());
app.use(cors());


const upload = multer({ storage: multer.memoryStorage() });

app.post('/signup', upload.single('userpic'), async (req, res) => {
    try {
        if (req.body && req.file) {
            const uniqueSuffix = crypto.randomBytes(16).toString("hex");  // Generates a 32-character hexadecimal string
            const uniqueFilename = `userpics/${uniqueSuffix}_${req.file.originalname}`;
            // Upload the user picture to Firebase Storage
            const storageRef = ref(storage, uniqueFilename);
            const snapshot = await uploadBytes(storageRef, req.file.buffer);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Save user data with the profile picture URL in MongoDB
            let user = new User({
                ...req.body,
                userpic: downloadURL  // Store the download URL in MongoDB
            });
            let result = await user.save();
            result = result.toObject();
            delete result.password;
            res.send(result);
        } else {
            res.send({ result: 'Please fill all fields and upload a user picture' });
        }
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).send({ error: 'An error occurred during signup' });
    }
});

app.post('/login', async (req, res) => {
    if (req.body.uname && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
        } else {
            res.send({ result: 'No user found' });
        }
    } else {
        res.send({ result: 'Please enter both username and password' });
    }
})

app.post('/post', async (req, res) => {
    try {
        console.log(req.body);
        const post = new Post(req.body);  // Create a new instance of the model with req.body
        const savedPost = await post.save();  // Save the instance to the database
        // console.warn(savedPost);
        res.send(savedPost);
    } catch (error) {
        console.error("Error saving document:", error.message, error.errors);
        res.status(500).send("Error saving document: " + error.message);
    }
});

app.get('/posts', async (req, res)=>{
    try {
        const posts = await Post.find();
        // console.warn(posts)
        if(posts.length>0){
            res.send(posts);
        }else{
            res.send("No posts exists");
        }
    }catch{
        res.status(500).send("Error fetching posts");
    }
})

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id);
  
      if (post) {
        res.send(post);
      } else {
        res.status(404).send('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).send('Error fetching post');
    }
  });
  

app.listen(8000, function () {
    console.log("Server started on http://localhost:8000/");
});
