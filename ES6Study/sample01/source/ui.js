import xss from 'xss-filters';

let ui = {
  renderPosts(posts){
    //console.log(posts);
    let elements = posts.map((post) => {
       let {title, lastReply } = post;
       return articleTemplate(title, lastReply);
     });

    let target = document.querySelector(".container");
    target.innerHTML = elements.join("");
  },
  renderUsers(users){
    let elements = users.map((user) => {
       let {name, avatar } = user;
       return userTemplate(name, avatar);
     });

    let target = document.querySelector(".side-bar-content");
    target.innerHTML = elements.join("");
  }
}

function articleTemplate(title, lastReply) {
  let safeTitle = xss.inHTMLData(title) ;
  let safeLastReply = xss.inHTMLData(lastReply);
  let template =`
    <article class="post">
      <h2 class="post-title"> ${safeTitle} </h2>
      <p class="post-meta">${safeLastReply}</p>
    </article>`;
  return template;
}

function userTemplate(name, avatar) {
  let safeName = xss.inHTMLData(name) ;
  let safeAvatar = xss.inHTMLData(avatar);
  let template =`
    <div class="active-avatar">
      <img width="54" src="assets/images/${safeAvatar}.jpg" />
      <h5 class="post-author">${safeName}</h5>
    </div>`;
  return template;
}

export default ui;
