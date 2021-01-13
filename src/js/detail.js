requirejs.config({
    paths : {
        'jquery' : '/lib/jquery-3.4.1.min'
    }
});

define(['jquery','./modules/banner','../api/server'],function($,{initBanner},{banner2Data}){
    // 让数据和功能结合
    banner2Data().then((res)=>{
        if(res.code == 0)
        {
            // console.log(res);
            
            initBanner(res.banner_list);
        }
    })
})