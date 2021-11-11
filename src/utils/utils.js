const moment = require('moment');
moment.locale('zh-CN');
import LocalStorageUtils from './LocalStorageUtils';
export default {
    /**
     * 格式化时间
     * @param {number} timestamp - 13位时间戳
     */
    formatTime(timestamp) {
        const date = new Date(timestamp);
        if (date === 'Invalid Date') {
            return '';
        }
        return moment([
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
        ]).fromNow();
    },
    /**
     * 格式化日期
     * @param {string} format - 格式
     * @param {number} timestamp - 13位时间戳
     */
    formatDate(format, timestamp) {
        if (!timestamp) {
            return '';
        }
        return moment(timestamp).format(format);
    },
    /**
     * 设置登录验证信息
     */
    setAuthInfo(item, userId) {
        LocalStorageUtils.set('token', 'token');
    },

    /**
     * 移除登录验证信息
     */
    removeAuthInfo(ctx) {},

    // 检测手机号
    checkPhone(phone) {
        // console.log(phone === '');
        if (phone === '') {
            return false;
        } else if (phone.length < 11 || !/^1[3456789]\d{9}$/.test(phone)) {
            return false;
        }
        return true;
    },

    // 检测邮箱号
    checkEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
            email,
        );
        if (email === '') {
            return '邮箱不能为空';
        } else if (!reg) {
            return '请输入正确的邮箱';
        }
        return '';
    },

    // 检测account 手机 邮箱
    checkAccount(account) {
        if (/[a-zA-Z]+/.test(account)) {
            return this.checkEmail(account);
        } else {
            return this.checkPhone(account);
        }
    },

    // 检测密码
    checkPassword(password, isLogin = false) {
        if (password === '') {
            return '密码不能为空';
        } else if (!isLogin) {
            const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/;
            return !reg.test(password) ? '密码要求长度为8-16位，包含数字和字母' : '';
        }
        return '';
    },

    // 检测验证码
    checkVerification(verifyCode) {
        if (verifyCode === '') {
            return '验证码不能为空';
        }
        return '';
    },

    /**
     * 大数字转换，将大额数字转换为万、千万、亿等
     * @param value 数字值
     */
    bigNumberTransform(value) {
        if (typeof value === 'string') {
            return value;
        }
        const newValue = ['', '', ''];
        let fr = 1000;
        let num = 3;
        let text1 = '';
        let fm = 1;
        while (value / fr >= 1) {
            fr *= 10;
            num += 1;
            // console.log('数字', value / fr, 'num:', num)
        }
        if (num <= 4) {
            // 千
            newValue[0] = parseInt(value / 1000) + '';
            newValue[1] = '千';
        } else if (num <= 8) {
            // 万
            text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
            // tslint:disable-next-line:no-shadowed-variable
            fm = text1 === '万' ? 10000 : 10000000;
            if (value % fm === 0) {
                newValue[0] = parseInt(value / fm) + '';
            } else {
                newValue[0] = parseFloat(value / fm).toFixed(2) + '';
            }
            newValue[1] = text1;
        } else if (num <= 16) {
            // 亿
            text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
            text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
            text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
            // tslint:disable-next-line:no-shadowed-variable
            fm = 1;
            if (text1 === '亿') {
                fm = 100000000;
            } else if (text1 === '千亿') {
                fm = 100000000000;
            } else if (text1 === '万亿') {
                fm = 1000000000000;
            } else if (text1 === '千万亿') {
                fm = 1000000000000000;
            }
            if (value % fm === 0) {
                newValue[0] = parseInt(value / fm) + '';
            } else {
                newValue[0] = parseFloat(value / fm).toFixed(2) + '';
            }
            newValue[1] = text1;
        }
        if (value < 1000) {
            newValue[0] = value + '';
            newValue[1] = '';
        }
        return newValue.join('');
    },
    //手机号码隐藏中间四位
    hidePhoneNumber(number) {
        let tel = number;
        tel = '' + tel;
        let reg = /(\d{3})\d{4}(\d{4})/;
        let tel1 = tel.replace(reg, '$1****$2');
        return tel1;
    },
};