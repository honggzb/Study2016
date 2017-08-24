import 'babel-polyfill';
import $ from 'jquery';

import Timer from './lottery/timer.js';
import Calculate from './lottery/caculate.js';
import Interface from './lottery/interface.js';
//base类使用了caculate类中定义的方法，所以必须放在caculate后面引入
import Base from './lottery/base.js';    

/**
 * const copeProperties - 深度拷贝
 *  
 * @param  {type} target description 
 * @param  {type} source description 
 * @return {type}        description 
 */ 
const copyProperties = function(target, source){
  for(let key of Reflect.ownKeys(source)){
    if(key!=='constructor' && key!=='prototype' && key!=='name'){
      let desc = Object.getOwnPropertyDescriptor(source,key);
      Object.defineProperty(target,key,desc);    //ES5的方法，拷贝
    }
  }
}

/**
 * const mix - 多重继承方法
 *  
 * @param  {type} ...mixins description 
 * @return {type}           description 
 */ 
const mix = function(...mixins){
  class Mix {}
  for(let mixin of mixins){
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}

/**
 * class Lottery - 多重继承，继承了Base, Calculate, Interface, Timer四个类
 *  
 */ 
class Lottery extends mix(Base, Calculate, Interface, Timer){
  
  /**  
   * constructor - description  
   *    
   * @param  {type} name='syy'   快频彩种名称   
   * @param  {type} cname='11选5' 快频彩种中文名称   
   * @param  {type} issue='**'   当前期号
   * @param  {type} state='**'   状态 
   */   
  constructor(name='syy',cname='11选5',issue='**',state='**'){
    super();
    this.name = name;
    this.cname = cname;
    this.issue = issue;
    this.state = state;
    this.el = '';             //当前选择器
    this.omit = new Map();    //遗漏
    this.open_code = new Set();       //开奖号码
    this.open_code_list = new Set();  //开奖记录
    this.play_list = new Map();       //玩法列表
    this.number = new Set();          //选号
    this.issue_el = '#curr_issue';    //当前期号的选择器
    this.countdown_el = '#countdown'; //倒计时的选择器
    this.state_el = '#state_el';      //状态的选择器
    this.cart_el = '.codelist';        //购物车的选择器
    this.omit_el='';                  //遗漏的选择器
    this.cur_play='r5';               //当前默认的玩法
    this.initPlayList();              //initPlayList(base.js) - 初始化奖金和玩法及说明 
    this.initNumber();                //initNumber(base.js) - 初始化号码：Set对象(不容许重复) -> 01，02,03,04,05,06,07,08,09,10,11
    this.updateState();
    this.initEvent();
  }
  /**
 * [updateState 状态更新]
 * @return {[type]} [description]
 */
  updateState(){
    let self=this;
    this.getState().then(function(res){
      self.issue=res.issue;
      self.end_time=res.end_time;
      self.state=res.state;
      $(self.issue_el).text(res.issue);
      self.countDown(self.end_time, function(time){    //Timer.js
        $(self.countdown_el).html(time)
        },function(){
          setTimeout(function () {
            self.updateState();
            self.getOmit(self.issue).then(function(res){

            });
            self.getOpenCode(self.issue).then(function(res){

            })
          }, 500);
      })
    })
  }
  /**
 * [initEvent 初始化事件]
 * @return {[type]} [description]
 */
  initEvent(){
    let self=this;
    $('#plays').on('click','li', self.changePlayName.bind(self));                //玩法切换,base.js
    $('.boll-list').on('click','.btn-boll', self.toggleCodeActive.bind(self));  //号码选中,base.js
    $('#confirm_sel_code').on('click', self.addCode.bind(self));                //添加号码,base.js
    $('.dxjo').on('click','li', self.assistHandle.bind(self));                  //操作区动作
    $('.qkmethod').on('click','.btn-middle', self.getRandomCode.bind(self));    //随机号码
  }
  
}

export default Lottery;