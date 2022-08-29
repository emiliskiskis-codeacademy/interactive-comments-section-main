const BASE_URL = "https://62e7e5c30e5d74566afeac9f.mockapi.io";

async function get(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(res.statusText);
    }
  } catch (error) {
    console.debug(error);
    throw error;
  }
}

async function getComments() {
  const comments = await get(`${BASE_URL}/comments`);
  return comments.filter(comment => comment.parentId === null);
}

async function getComment(id) {
  return await get(`${BASE_URL}/comments/${id}`);
}

async function getUsers() {
  return await get(`${BASE_URL}/users`);
}

async function getUser(id) {
  return await get(`${BASE_URL}/users/${id}`);
}

function createCommentElement(comment) {
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";
  commentDiv.append(
    createScoreElement(comment.score),
    createUserElement(comment),
    createContentElement(comment.content)
  );
  return commentDiv;
}

function createScoreElement(score) {
  const scoreDiv = document.createElement("div");
  scoreDiv.className = "score";

  const upvoteButton = document.createElement("button");
  upvoteButton.type = "button";
  upvoteButton.textContent = "+";
  const downvoteButton = document.createElement("button");
  downvoteButton.type = "button";
  downvoteButton.textContent = "-";
  const scoreNumberDiv = document.createElement("div");
  scoreNumberDiv.textContent = score;

  scoreDiv.append(upvoteButton, scoreNumberDiv, downvoteButton);
  return scoreDiv;
}

function createUserElement(comment) {
  const { user } = comment;

  const avatarImg = document.createElement("img");
  avatarImg.src = user.image.png;
  avatarImg.alt = `${user.username} profile picture`;

  const usernameSpan = document.createElement("span");
  usernameSpan.textContent = user.username;

  const createdAtSpan = document.createElement("span");
  createdAtSpan.className = "createdAt";
  createdAtSpan.textContent = comment.createdAt;

  const userDiv = document.createElement("div");
  userDiv.className = "user";

  userDiv.append(avatarImg, usernameSpan, createdAtSpan);
  return userDiv;
}

function createContentElement(content) {
  const contentP = document.createElement("p");
  contentP.className = "content";
  contentP.textContent = content;
  return contentP;
}

function displayComments(comments) {
  const commentsDiv = document.querySelector(".comments");
  comments.forEach(comment => {
    commentsDiv.append(createCommentElement(comment));
  });
}

const res = await fetch("/data.json");
const data = await res.json();

displayComments(data.comments);
