const postsContainer = document.getElementById("post__container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// fetch from api
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await res.json();
  return data;
}

// show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postELe = document.createElement("div");
    postELe.classList.add("post");
    postELe.innerHTML = `
            <div class="post__number">${post.id}</div>
            <div class="post__info">
                 <h2 class="post__title">${post.title}</h2>
                 <div class="post__body">${post.body}</div>
            </div>
    `;

    postsContainer.appendChild(postELe);
  });
}

showPosts();

// show loader and fetch more posts
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 500);
  }, 1000);
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
