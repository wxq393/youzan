import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'  //let url ='xxxx'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

import Foot from 'components/Foot.vue'
import Swiper from 'components/Swiper.vue'

let app = new Vue ({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,//表示可以拖动加载
    allLoaded: false,//判断是否完全加载一开始还没完全加载
    bannerLists: null
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists(){
      if(this.allLoaded) return
      this.loading = true;
      axios.post(url.hotLists,{
        pageNum: this.pageNum,
        pageSize: this.pageSize
    }).then(res =>{
        let curLists = res.data.lists
        // 所有数据是否加载完毕
        if(curLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if(this.lists) {
          this.lists = this.lists.concat(curLists)
        }else {
        // 第一次请求数据（数据初始化）
          this.lists = curLists 
        }
        this.loading = false
        this.pageNum ++
    })
    },
    getBanner(){
      axios.get(url.banner).then(res => {
         this.bannerLists = res.data.lists
      })
    }
  },
  components: {
    Foot,
    Swiper
  }
})