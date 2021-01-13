define(['jquery'], function ($) {
    // 初始化banner图
    var $bannerList = $('.banner-list');
    function initBanner(data) {
        $bannerList.html(`
        <ul>
            ${data.map((v, i) => {        
            return `
                    <li class="${i==0?'show':''}"><a href="${v.imgLink}"><img src=${v.imgUrl} alt="tilunboz"></a></li>
                    `
                }).join('')
            }
        </ul>
        <ol>
            ${data.map((v, i) => {
                    return `
                    <li class="${i==0?'active':''}"></li>
                    `
                }).join('')
            }
        </ol>
        `)
        bindBanner();
    }

    function bindBanner() {
        // find找到指定后代
        var $ulLi = $bannerList.find('ul li');
        $bannerList.on('mouseover','ol li',function(){
            console.log($(this).index());
            $(this).attr('class','active').siblings().attr('class','');
            $ulLi.eq($(this).index()).attr('class','show').siblings().attr('class','');
        })
    }

    return { initBanner };
})