const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const pool = require('./db'); 
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json()); // => allows us to access the req.body from client
app.use(morgan('common'));

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
    // serve static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//

// get all blogs

app.get('/blogs', async (req, res) => {
    try {
        const allBlogs = await pool.query("SELECT * FROM blog");
        
        res.json(allBlogs.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a blog

app.get('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await pool.query("SELECT * FROM blog WHERE blog_id = $1", [id]);
        res.json(blog.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// create a blog

app.post('/blogs', async (req, res) => {
    try {
        const { description } = req.body;
        const newBlog = await pool.query("INSERT INTO blog (description) VALUES ($1) RETURNING *", [description]);
        res.json(newBlog.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// delete a blog

app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBlog = await pool.query ("DELETE FROM blog WHERE blog_id = $1", [id]);
        res.json("Blog was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

// catch all

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});

module.exports = app;