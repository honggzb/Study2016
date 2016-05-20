var http = require('http');
var Promise = require('es6-promise').Promise;
// npm install es6-promise
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
var url = 'http://www.imooc.com/learn/348';
var videoIds = [637, 507, 30];

function filterChapeters(html) {
  var $ = cheerio.load(html);
  var chapters = $('.chapter');
  var title = $('.course-infos .hd h2').text().trim();
  var number = parseInt($('.static-item:last-child strong').text().trim(),10);
  // courseData = {
  //   title: title,
  //   number: number,
  //   videos: [{
  //     chapterTitle:'',
  //     videos: [
  //       title: '',
  //       id: ''
  //     ]
  //   }]
  // }
  var courseData = {
    title: title,
    number: number,
    videos: []
  };
  //console.log(title+number+chapters);
  chapters.each(function(item) {
    var chapter = $(this);
    var chapterTitle = chapter.find('strong').text();
    var videos = chapter.find('.video').children('li');
    var chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    };
    videos.each(function(vitem) {
      var video = $(this).find('.studyvideo');
      var videoTitle = video.text();
      var id = video.attr('href').split('video/')[1];
      chapterData.videos.push({
        title: videoTitle,
        id: id
      });
      //console.log(chapterData);
    });
    courseData.videos.push(chapterData);
  });
  return courseData;
}

function printCourseInfo(coursesData) {
  //console.log(coursesData);
  coursesData.forEach(function(courseData){
    console.log("\n\n###\n\n");
    console.log('【课程名】'+courseData.title);
    console.log('【参加人数】'+courseData.number+'\n');
    courseData.videos.forEach(function(item) {
      var chapterTitle = item.chapterTitle;
      console.log(chapterTitle+'\n');
      item.videos.forEach(function(video) {
        console.log('  【'+video.id+' 】'+ video.title+'\n');
      });
    });
  });
}

// Promise
function getPageAsync(url) {
  return new Promise(function(resolve, reject) {
    console.log('正在爬取'+url);
    http.get(url, function(res) {
      var html = '';
      res.on('data',function(data){
        html += data;
      });
      res.on('end',function() {
        resolve(html);
      });
    }).on('error',function(e){
      reject(e);
      console.log('获取课程数据出错！');
    });
  });
}

// 并行爬行多个课程
var fetchCourseArray = [];  // Promise Array

videoIds.forEach(function(id){
  fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise
  .all(fetchCourseArray)
  .then(function(pages){
    var coursesData = [];
    pages.forEach(function(html){
      var courses = filterChapeters(html);
      //console.log(courses);
      coursesData.push(courses);
    });
    coursesData.sort(function(a,b) {
      return a.number < b.number;
    });
    printCourseInfo(coursesData);
  });
  
  