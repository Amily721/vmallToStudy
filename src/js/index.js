requirejs.config({
    paths : {
        'jquery' : '/lib/jquery-3.4.1.min'
    }
});
// 绝对路径要带上后缀名
define(['jquery','./modules/banner','../api/server'],function($,{initBanner},{bannerData,bookData,padData,phoneData}){
    // 让数据和功能结合
    bannerData().then((res)=>{
        if(res.code == 0)
        {
            // console.log(res);
            
            initBanner(res.banner_list);
        }
    })

    phoneData().then((res)=>{
        if(res.code == 0)
        {
            initGoods('#phone',res);
        }
    })

    bookData().then((res)=>{
        if(res.code == 0)
        {
            initGoods('#book',res);
        }
    })

    padData().then((res)=>{
        if(res.code == 0)
        {
            initGoods('#pad',res);
        }
    })

    function initGoods(id , res) {
        $con = $(id);
        if(res.code == 0){
            $con.html(
                `
                <h2 class="goods_title">${res.title}</h2>
                <ul class="goods_list clearfix">
                    ${res.goods_list.map((v,i)=>{
                        return `
                            <li>
                                <a href="http://localhost:4000/view/detail.html?${res.type}&${v.goodsId}">
                                    <div><img src=${v.goodsImg} alt=""></div>
                                    <h3>${v.goodsName}</h3>
                                    <p>¥${v.goodsPrice}</p>
                                </a>
                            </li> 
                                `
                    }).join('').repeat(3)}                    
                </ul>
                
                `
            )
        }
    }
})