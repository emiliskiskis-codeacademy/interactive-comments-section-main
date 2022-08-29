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
    alert("Error" + error);
  }
}

async function getComments() {
  const comments = await get(`${BASE_URL}/comments`);
  return comments.filter(comment => comment.parentId === null);
}

async function getComment(id) {
  return await get(`${BASE_URL}/comments/${id}`);
}

function displayComments(comments) {
  console.log(comments);
}

displayComments(await getComments());
