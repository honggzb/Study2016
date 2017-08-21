/*
 * Promise异步操作
 */
//传统回调
{
  let ajax = function(callback) {
    console.log('执行1');
    setTimeout(function() {
      callback && callback.call()
    }, 1000);
  };
  ajax(function() { //回调函数
    console.log('回调函数', 'timeout1');
  });
  //回调函数 timeout1
}
//Promise
{
  let ajax = function() {
    console.log('执行2');
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve();
      }, 1000);
    });
  };
  ajax().then(() => console.log('promise', 'timeout2'));
  //执行2
  //promise timeout2
}
//多重
{
  let ajax = function() {
    console.log('执行3');
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve();
      }, 1000);
    });
  };
  ajax()
    .then(() => {
      return new Promise((resolve, reject) => {
          setTimeout(function() {
            resolve();
          }, 2000);
        })
        .then(() => console.log('promise', 'timeout3'));
    });
}
//catch error
{
  let ajax = function(num) {
    console.log('执行4');
    return new Promise((resolve, reject) => {
      if (num > 5) {
        resolve();
      } else {
        throw new Error('Oh, wrong!')
      }
    });
  };

  ajax(4)
    .then(() => console.log('log', 6))
    .catch(err => console.log('catch', err))
}
//应用场景1 -所有图片加载完后再添加到页面
{
  function loadImg(src) {
    return new Promise((resolve,reject) => {
      let img = document.createElement('img');
      img.src = src;
      img.onload = function() {
        resolve(img);
      }
      img.onerror = function() {
        reject(err);
      }
    });
  }
  function showImgs(imgs) {
    imgs.forEach(img => {
      document.body.appendChild(img);
    })
  }
  Promise.all([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.eiimg.com/567571/2b07ee25b08930ba.png')
  ]).then(showImgs);
}
//应用场景2 -先加载好的图片先显示, 其他的不显示
{
  function loadImg(src) {
    return new Promise((resolve,reject) => {
      let img = document.createElement('img');
      img.src = src;
      img.onload = function() {
        resolve(img);
      }
      img.onerror = function() {
        reject(err);
      }
    });
  }
  function showImgs(img) {
    let p = document.createElement('p')
    p.appendChild(img);
    document.body.appendChild(p);
  }
  Promise.race([
    loadImg('http://i4.buimg.com/567571/df1ef0720bea6832.png'),
    loadImg('http://i4.eiimg.com/567571/2b07ee25b08930ba.png')
  ]).then(showImgs);
}