const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        interaction1: "images/icon-heart.png",
        interaction2: "images/icon-comment.png",
        interaction3: "images/icon-dm.png",
        comment: "just took a few mushrooms lol",
        likes: 0
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        interaction1: "images/icon-heart.png",
        interaction2: "images/icon-comment.png",
        interaction3: "images/icon-dm.png",
        comment: "i'm feelin a bit stressed tbh",
        likes: 0
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        interaction1: "images/icon-heart.png",
        interaction2: "images/icon-comment.png",
        interaction3: "images/icon-dm.png",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 0
    }
]

function renderPosts() {
    const contentContainer = document.getElementById("content-container");
  
    for (const [index, post] of posts.entries()) {
      const postItem = document.createElement("li");
      postItem.classList.add("post-item");
  
      const postHeader = document.createElement("div");
      postHeader.classList.add("post-header");
  
      const avatarImg = document.createElement("img");
      avatarImg.src = post.avatar;
      avatarImg.alt = `${post.name}'s avatar`;
      avatarImg.classList.add("avatar");
  
      const nameElem = document.createElement("span");
      nameElem.classList.add("name");
      nameElem.textContent = post.name;
  
      const locationElem = document.createElement("span");
      locationElem.classList.add("location");
      locationElem.textContent = post.location;

      postHeader.appendChild(nameElem);
      postHeader.appendChild(locationElem);
  
      const postImage = document.createElement("img");
      postImage.src = post.post;
      postImage.alt = "Post image";
      postImage.classList.add("post-image");

      const interactionBtn = document.createElement("div");
      interactionBtn.classList.add("interactionBtn")

      const heartImage = document.createElement("img");
      heartImage.src = post.interaction1;
      heartImage.alt = "Heart image";
      heartImage.classList.add("heart-image");

      const commentImage = document.createElement("img");
      commentImage.src = post.interaction2;
      commentImage.alt = "Comment image";
      commentImage.classList.add("comment-image");

      const shareImage = document.createElement("img");
      shareImage.src = post.interaction3;
      shareImage.alt = "Share image";
      shareImage.classList.add("share-image");

      interactionBtn.appendChild(heartImage);
      interactionBtn.appendChild(commentImage);
      interactionBtn.appendChild(shareImage);
  
      const postLikes = document.createElement("span");
      postLikes.classList.add("post-likes");
      postLikes.textContent = `${post.likes} like`
    
      const userComment = document.createElement("div");
      userComment.classList.add("userComment")

      const username = document.createElement("span");
      username.classList.add("username");
      username.textContent = `${post.username}`;

      const postComment = document.createElement("p");
      postComment.classList.add("post-comment");
      postComment.textContent = post.comment;

      userComment.appendChild(username);
      userComment.appendChild(postComment);
  
      postItem.appendChild(avatarImg);
      postItem.appendChild(postHeader);       
      postItem.appendChild(postImage);
      postItem.appendChild(interactionBtn);
      postItem.appendChild(postLikes);
      postItem.appendChild(userComment);

      contentContainer.appendChild(postItem);

      const heartEL = postItem.querySelector(".heart-image");
      heartEL.addEventListener("click", () => {
        post.likes++; 
        postLikes.textContent = `${post.likes} ${post.likes === 0 ? 'like' : 'likes'}`;
      })
    }
  } 

  window.addEventListener("load", renderPosts);






