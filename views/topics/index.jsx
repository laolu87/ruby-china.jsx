import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import {locales} from '../../settings'
require('./style')

const Topics=React.createClass({
  getInitialState(){
    return {
      topics: '',
      pages:new Array(98),
      digital:this.props.params.item
    }
  },

  componentDidMount() {
    if(this.state.digital===undefined){
        this.paging(1)
    let pages=this.state.pages
      for(let i=0;i<pages.length;i++){
         pages[i]=i+1
    }
    this.setState({pages:pages,digital:1})
    document.title = 'Ruby-China'
    }else{
    this.paging(this.state.digital)
    let pages=this.state.pages
      for(let i=0;i<pages.length;i++){
         pages[i]=i+1
    }
    this.setState({pages:pages})
    document.title = locales.zh_CN.topics}
  },

   paging(id,event){
    fetch('https://ruby-china.org/api/v3/topics?limit=20&offset='+(id-1)*20).then((response)=>{
      return response.json()
    }).then((json)=>{
      this.setState({
        topics:json.topics,
        digital:id
      })
    })
  },

  dateStatistics(item){
    const newDate=new Date(item)
    const year=newDate.getFullYear()
    const month=newDate.getMonth()+1
    const date=newDate.getDate()
    const hours=newDate.getHours()
    const minutes=newDate.getMinutes()
    const seconds=newDate.getSeconds()
    return (year)+'年'+(month)+'月'+(date)+'日'+(hours<10 ? '0'+hours:hours)+':'+(minutes<10 ? '0'+minutes:minutes)+':'+(seconds<10 ? '0'+seconds:seconds)
  },



  render() {
    let topics = this.state.topics
    if (topics){
      return(
        <div className='container by-container'>
          <div className='list-group'>{topics.map((item, index) => {
            return(
              <div key={index} className='list-group-item'>
                <h5><Link to={`/topic/${item.id}`}>{item.title}</Link></h5>
                <img src={item.user.avatar_url} className='headportrait'/>
                <span className='label label-pill label-info'> 发布者:{item.user.login} </span>
                <span className='label label-pill label-warning'> 最新回复:{item.last_reply_user_login? item.last_reply_user_login:'暂无回复'} </span>
                <span> 发布时间:{this.dateStatistics(item.created_at)} </span>
                <span className='label label-danger label-pill pull-xs-right'>{item.replies_count}</span>
              </div>
              )
          })}
          </div>
          <div>
           <ul className='pagination'>
           <li className={this.state.digital==1?'page-item disabled':'page-item'}><a href='/topics/1' className='page-link'>＜＜</a></li>
           {this.state.pages.map((item,id)=>{
            let digital=this.state.digital-1
            // console.log(digital)
            if(digital===0 && item<digital+8){
            return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            else if(digital===1 && item<digital+7){
            return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            else if(digital===2 && item<digital+6){
            return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            else if(item>digital-3 && item<digital+5 && item>0){
              return (
              <li className={id===digital ?'page-item disabled':'page-item'} key={id}><Link to={`/topics/${item}`} onClick={this.paging.bind(this,item)} className='page-link'
              >{item}</Link></li>
              )
            }
            })}
             <li className='page-item disabled'style={{display:this.state.digital>96 ? 'none':''}}><a href='' className='page-link'>...</a></li>
             <li className={this.state.digital==99?'page-item disabled':'page-item'}><a href='/topics/99' className='page-link'>99</a></li>
             <li className={this.state.digital==100?'page-item disabled':'page-item'}><a href='/topics/100' className='page-link'>100</a></li>
           </ul>
        </div>
      </div>
        )
    }
    return(<div><h1>请稍等......</h1></div>)
  }
})
export default Topics;
