const express = require("express");
const cors = require('cors')
require('./config/config');
const User = require('./models/User');
const Post = require('./models/Post')
const app = express();
const crypto = require('crypto');
const { initializeFirebaseApp, getFirebaseStorage, JWT_KEY_SECRET } = require('./config/config');
const multer = require('multer');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const Jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');

initializeFirebaseApp();
const storage = getFirebaseStorage();


app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
            let userData = new User({
                ...req.body,
                userpic: downloadURL  // Store the download URL in MongoDB
            });
            let user = await userData.save();
            user = user.toObject();
            delete user.password;
            Jwt.sign({ user }, JWT_KEY_SECRET, { expiresIn: "7d" }, (err, token) => {
                if (err) {
                    res.send({ result: 'Something went wrong' });
                }
                res.send({ user, auth: token });
            });
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
            Jwt.sign({ user }, JWT_KEY_SECRET, { expiresIn: "7d" }, (err, token) => {
                if (err) {
                    res.send({ result: 'Something went wrong' });
                }
                res.send({ user, auth: token });
            });
        } else {
            res.send({ result: 'No user found' });
        }
    } else {
        res.send({ result: 'Please enter both username and password' });
    }
})

app.get('/users', authenticateToken, async (req, res) => {
    const { _id } = req.query;
    if (_id) {
        let user = await User.find({ _id }).select('-password');
        if (user) {
            res.send(user);
        } else {
            res.send({ result: 'No user found' });
        }
    } else {
        res.send({ result: 'no uid found' });
    }
})

app.post('/post', authenticateToken, upload.fields([{ name: 'propics', maxCount: 6 }, { name: 'splatFile', maxCount: 1 }]), async (req, res) => {
    try {
        console.warn(req.body, req.files); // Log body and files to ensure they are being passed correctly

        if (req.body && req.files && req.files.propics && req.files.propics.length > 0 && req.files.splatFile && req.files.splatFile.length > 0) {
            // Parse the location JSON string back to an object
            req.body.location = JSON.parse(req.body.location);

            // Array to store the URLs of uploaded images
            const propicURLs = [];

            // Upload each image to Firebase and store the URL
            for (const file of req.files.propics) {
                const uniqueSuffix = crypto.randomBytes(16).toString("hex");  // Generates a 32-character hexadecimal string
                const uniqueFilename = `postpics/${uniqueSuffix}_${file.originalname}`;

                const storageRef = ref(storage, uniqueFilename);
                const snapshot = await uploadBytes(storageRef, file.buffer);
                const downloadURL = await getDownloadURL(snapshot.ref);

                propicURLs.push(downloadURL); // Store each file's download URL
            }

            // Upload the .splat file
            const splatFile = req.files.splatFile[0];  // Assuming only one .splat file
            const splatFilename = `splats/${crypto.randomBytes(16).toString("hex")}_${splatFile.originalname}`;

            const splatStorageRef = ref(storage, splatFilename);
            const splatSnapshot = await uploadBytes(splatStorageRef, splatFile.buffer);
            const splatDownloadURL = await getDownloadURL(splatSnapshot.ref);

            // Add the array of URLs and splat file URL to the post data
            req.body.propics = propicURLs;
            req.body.splatFileURL = splatDownloadURL;

            const post = new Post(req.body);  // Create a new instance of the model with req.body
            const savedPost = await post.save();  // Save the instance to the database
            res.send(savedPost);
        } else {
            res.send({ result: 'Please fill all fields' });
        }
    } catch (error) {
        console.error("Error saving document:", error.message, error.errors);
        res.status(500).send("Error saving document: " + error.message);
    }
});

app.get('/posts', authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find();
        // console.warn(posts)
        if (posts.length > 0) {
            res.send(posts);
        } else {
            res.status(200).send("No posts exists");
        }
    } catch {
        console.error('Error fetching posts:', error);
        res.status(500).send("Error fetching posts");
    }
})

app.get('/postsUser', authenticateToken, async (req, res) => {
    try {
        const { uid } = req.query; 
        const posts = await Post.find({ uid });

        if (posts.length > 0) {
            res.json(posts); 
        } else {
            // Return a 200 status with an empty array if no posts exist
            res.status(200).json([]);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send("Error fetching posts");
    }
});



app.get('/posts/:id', authenticateToken, async (req, res) => {
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
