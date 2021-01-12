const { define } = require("core-js/fn/object");

// 统一处理vmall中的所有数据接口
define(['jquery'], function ($) {
    function bannerData() {
        return $.ajax('./mock/banner.json');
    }

    return {bannerData};
})