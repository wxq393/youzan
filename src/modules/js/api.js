let url = {
   hotLists: '/index/hotLists',
   banner: '/index/banner'
}

//真实环境和开发环境的切换
// let host = '' 

let host = 'https://www.easy-mock.com/mock/5d34057583a50b7abd8a8ea5/youzan'
for (const key in url) {
    if (url.hasOwnProperty(key)) {
    //console.log(url.hasOwnProperty(key)) //true
      url[key] = host + url[key]     
    }
}

export default url