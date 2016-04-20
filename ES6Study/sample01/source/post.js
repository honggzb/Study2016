import API from './api';

let Post = {
  findAll(){
    return API.fetch("posts");
  }
}

export default Post;
