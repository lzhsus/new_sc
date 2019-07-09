module.exports = {
    // 游戏用户信息 进来请求
    // 首页
    userinfo(data){
        return request("api/userinfo",data)
    },
    info(data){
        return request("api/login",data)
    },
    login(data) {
        return request("api/index", data)
    },
    // banner
    banner(data){
        return request("api/banner", data)
    },
    // 更多
    allkind(data){
        return request("api/allkind", data)
    },
    // more
    more(data){
        return request("api/more", data)
    },
    more_right(data){
        return request("api/more_right", data)
    },
    // 修改昵称
    changeNickName(data){
        return request("api/change_userinfo",data)
    },
    // 上传图片
    uploadPictures(data){
        return request("php/api/zl/up.php", data)
    },
    // 上传文件 base64
    upfile(data){
        return request("php/api/zl/upfile.php", data,"POST")
    },
    // 获取图片 base64
    getfile(data){
        return request("php/api/zl/getimage.php", data)
    },
    // 上穿图片文件
    upfileP(data){
        return request("php/api/zl/upload_file.php", data,"post")
    },
    upfileImg(data){
        return request("php/upload_img.php", data,"post")
    },
    
    
}

function request(url, data = {},type) {
    var dtd = $.Deferred();
    vueApp.Loading.open();
    if(type){
        $.post("http://1434253600.xyz/" + url ,data)
            .done(res => {
                dtd.resolve(res)
            })
            .fail(res => {
                console.log(res)
                dtd.reject(res);
                vueApp.alert("网络错误！")
            })
            .always((res) => {
                vueApp.Loading.close();
            })
    }else{
        $.get("http://1434253600.xyz/" + url , data)
        .done(res => {
            dtd.resolve(res)
        })
        .fail(res => {
            console.log(res)
            dtd.reject(res);
            vueApp.alert("网络错误！")
        })
        .always((res) => {
            vueApp.Loading.close();
        })
    }
   
    return dtd;
}