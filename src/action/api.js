// 封装接口
const api = {
    // 主页
    userDZ: {
        url: '/like/insterlike',
        method: 'post',
    },
    // 用户密码登录
    dynamicList: {
        url: '/authentication/user/loginByPass',
        method: 'post',
    },
    // 获取验证码
    hqyanzhengma: {
        url: '/authentication/user/sendNote',
        method: 'post',
    },

    // 登陆验证
    yzmyanzheng: {
        url: '/authentication/user/login',
        method: 'post',
    },
    // 显示个人信息
    personaldata: {
        url: '/authentication/user/showInf',
        method: 'post',
    },
    // 修改密码
    xiugaipassward: {
        url: '/authentication/user/change',
        method: 'post',
    },
    //  修改用户基本信息
    xiugaidata: {
        url: '/authentication/user/changeInf',
        method: 'post',
    },
    //  用户退出
    userexit: {
        url: '/authentication/user/exit',
        method: 'post',
    },
    //  上传头像
    uploadImg: {
        url: '/authentication/user/uploadImg',
        method: 'post',
    },

};

export default api;