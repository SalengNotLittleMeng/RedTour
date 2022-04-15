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
    // 搜索
    userSearch: {
        url: '/select',
        method: 'post'
    },
    //  上传头像
    uploadImg: {
        url: '/authentication/user/uploadImg',
        method: 'post',
    },
    // 旅游模式
    // 展示推荐景区
    spotShow: {
        url: '/spot/spot/show',
        method: 'get'
    },
    // 推荐详情
    spotDetail: {
        url: '/spot/spot/queryById',
        method: 'post'
    },
    // 推荐详情用户收藏
    userSC: {
        url: '/collect/instercollect',
        method: 'post',
    },
    //推荐详情判断用户是否收藏
    userItSC: {
        url: '/collect/showstatus',
        method: 'post',
    },    
    //获取评论列表
    getComment: {
        url: '/comment/commentsRoot/commentrecord',
        method: 'post',
    },
    //用户评论点赞
    userXH: {
        url:'/comment/commentsRoot/commentaddlike',
        method:'post'
    },
    //用户添加评论
    insertComment: {
        url:'/comment/commentsRoot/insertcomment',
        method:'post'
    },
    // 获取景点评论
    spotComment: {
        url: '/comment/commentsRoot/commentrecord',
        method: 'post'
    },
    // 添加评论
    addCommit: {
        url: '/comment/commentsRoot/insertcomment',
        method: 'post'
    },
    // 评论点赞
    loveCommit: {
        url: '/comment/commentsRoot/commentaddlike',
        method: 'post'
    },
    // 展示子评论
    replayCommitList: {
        url: '/comment/commentsReply/commentreplyrecord',
        method: 'post'
    },
    // 添加子评论
    replayCommitAdd: {
        url: '/comment/commentsReply/insertcommentreply',
        method: 'post'
    }

};

export default api;