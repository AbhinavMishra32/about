
document.getElementById('submit-blog-button').addEventListener('click', uploadBlog);


//TODO: add more parameters to the blog and send it to the server, then add it to the mongodb database.
async function uploadBlog(){
    const blogTitle = document.getElementById('blog-title-input').value;
    const blogAuthor = document.getElementById('blog-author-input').value;
    const blogBody = document.getElementById('blog-body').value;
    const blogData = {blogTitle, blogAuthor, blogBody};
    // console.log(blogData);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
    }
    try {
        const result = await fetch('/api/addblog', options);
    } catch (error) {
        console.log(error);
    }
}