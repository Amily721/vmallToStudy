// 统一处理vmall中的所有数据接口
define(['jquery'], function ($) {
    function bannerData() {
        return $.ajax('../api/mock/banner.json');
    }

    function banner2Data() {
        return $.ajax('../api/mock/banner2.json');
    }

    function bookData() {
        return $.ajax('../api/mock/book.json');
    }

    function padData() {
        return $.ajax('../api/mock/pad.json');
    }

    function phoneData() {
        return $.ajax('../api/mock/phone.json');
    }
    return {bannerData,banner2Data,bookData,padData,phoneData};
})