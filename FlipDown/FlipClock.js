/*
 * 翻牌时钟
 * @author： 兔子先生
 * @createDate: 2019-11-24
 */
import React, { Component } from 'react'
import Flipper from './Flipper'
import './flipClock.css'

class FlipClock extends Component {
    constructor(props) {
        super(props)
        this.timer = null
        this.flipObjs = []
        this.props = props;
        this.diffTime = 0;
    }

    render() {
        const { dayStr, hourStr, minuteStr, secondStr } = this.props;
        return (
            <div className="FlipClock">
                <div className="ClockCell">
                    <div className="base">
                        <Flipper ref="flipperDay1" />
                        <Flipper ref="flipperDay2" />
                    </div>
                    <div className="ClockTitle">{dayStr}</div>
                </div>
                {/* <em>:</em> */}
                <div className="ClockCell">
                    <div className="base">
                        <Flipper ref="flipperHour1" />
                        <Flipper ref="flipperHour2" />
                    </div>
                    <div className="ClockTitle">{hourStr}</div>
                </div>
                {/* <em>:</em> */}
                <div className="ClockCell">
                    <div className="base">
                        <Flipper ref="flipperMinute1" />
                        <Flipper ref="flipperMinute2" />
                    </div>
                    <div className="ClockTitle">{minuteStr}</div>
                </div>
                {/* <em>:</em> */}
                <div className="ClockCell">
                    <div className="base">
                        <Flipper ref="flipperSecond1" />
                        <Flipper ref="flipperSecond2" />
                    </div>
                    <div className="ClockTitle">{secondStr}</div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.flipObjs = [
            this.refs.flipperDay1,
            this.refs.flipperDay2,
            this.refs.flipperHour1,
            this.refs.flipperHour2,
            this.refs.flipperMinute1,
            this.refs.flipperMinute2,
            this.refs.flipperSecond1,
            this.refs.flipperSecond2
        ];
        this.init()
        this.run()
    }

    componentDidUpdate() {
        this.init()
        this.run()
    }

    initTimeDiff() {
        const nowTs = new Date().getTime();
        const { beginTime, endTime } = this.props;
        if (nowTs < beginTime) {
            this.diffTime = beginTime - nowTs;
        } else if (nowTs >= beginTime && nowTs < endTime) {
            this.diffTime = endTime - nowTs;
        } else if (nowTs >= endTime) {
            this.diffTime = 0;
        }
    }

    // 初始化数字
    init() {
        this.initTimeDiff();
        const dayNums = this.getDayNum();
        const hourNums = this.getHourNum();
        const miutesNums = this.getMinutesNum();
        const secondNums = this.getSeccondNum();
        this.refs.flipperDay1.setFront(dayNums[0]);
        this.refs.flipperDay2.setFront(dayNums[1]);

        this.refs.flipperHour1.setFront(hourNums[0]);
        this.refs.flipperHour2.setFront(hourNums[1]);

        this.refs.flipperMinute1.setFront(miutesNums[0]);
        this.refs.flipperMinute2.setFront(miutesNums[1]);

        this.refs.flipperSecond1.setFront(secondNums[0]);
        this.refs.flipperSecond2.setFront(secondNums[1]);
    }

    // 开始计时
    run() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.diffTime <= 1000) return;
        this.timer = setInterval(() => {
            // 获取当前时间
            // let now = new Date()
            // let nowTimeStr = this.formatDate(new Date(now.getTime() - 1000), 'ddhhiiss')
            // let nextTimeStr = this.formatDate(now, 'ddhhiiss')
            // for (let i = 0; i < this.flipObjs.length; i++) {
            //     if (nowTimeStr[i] === nextTimeStr[i]) {
            //         continue
            //     }
            //     this.flipObjs[i].flipDown(
            //         nowTimeStr[i],
            //         nextTimeStr[i]
            //     )
            // }

            const dayNums = this.getDayNum();
            const hourNums = this.getHourNum();
            const miutesNums = this.getMinutesNum();
            const secondNums = this.getSeccondNum();
            this.diffTime = this.diffTime - 1000;
            const dayNums_n = this.getDayNum();
            const hourNums_n = this.getHourNum();
            const miutesNums_n = this.getMinutesNum();
            const secondNums_n = this.getSeccondNum();
            if (dayNums_n[0] !== dayNums[0])
                this.refs.flipperDay1?.flipDown(dayNums[0], dayNums_n[0]);
            if (dayNums_n[1] !== dayNums[1])
                this.refs.flipperDay2?.flipDown(dayNums[1], dayNums_n[1]);
            if (hourNums_n[0] !== hourNums[0])
                this.refs.flipperHour1?.flipDown(hourNums[0], hourNums_n[0]);
            if (hourNums_n[1] !== hourNums[1])
                this.refs.flipperHour2?.flipDown(hourNums[0], hourNums_n[0]);
            if (miutesNums_n[0] !== miutesNums[0])
                this.refs.flipperMinute1?.flipDown(miutesNums[0], miutesNums_n[0]);
            if (miutesNums_n[1] !== miutesNums[1])
                this.refs.flipperMinute2?.flipDown(miutesNums[1], miutesNums_n[1]);
            if (secondNums_n[0] !== secondNums[0])
                this.refs.flipperSecond1?.flipDown(secondNums[0], secondNums_n[0]);
            if (secondNums_n[1] !== secondNums[1])
                this.refs.flipperSecond2?.flipDown(secondNums[1], secondNums_n[1]);
        }, 1000)
    }

    getDayNum() {
        const num = Math.floor(this.diffTime / (24 * 3600 * 1000));
        return [this.getTen(num), this.getSingle(num)];
    }

    getHourNum() {
        const hourLeft = this.diffTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        const num = Math.floor(hourLeft / (3600 * 1000));
        return [this.getTen(num), this.getSingle(num)];
    }

    getMinutesNum() {
        const hourLeft = this.diffTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        const minLeft = hourLeft % (3600 * 1000); //计算小时数后剩余的毫秒数
        const num = Math.floor(minLeft / (60 * 1000));
        return [this.getTen(num), this.getSingle(num)];
    }

    getSeccondNum() {
        const hourLeft = this.diffTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        const minLeft = hourLeft % (3600 * 1000); //计算小时数后剩余的毫秒数
        const secLeft = minLeft % (60 * 1000); //计算分钟数后剩余的毫秒数
        const num = Math.floor(secLeft / 1000);
        return [this.getTen(num), this.getSingle(num)];
    }

    getSingle(num) {
        return parseInt(num % 10);
    }

    getTen(num) {
        return parseInt((num % 100) / 10);
    }

    // 正则格式化日期
    formatDate(date, dateFormat) {
        /* 单独格式化年份，根据y的字符数量输出年份
       * 例如：yyyy => 2019
              yy => 19
              y => 9
       */
        if (/(y+)/.test(dateFormat)) {
            dateFormat = dateFormat.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            )
        }
        // 格式化月、日、时、分、秒
        let o = {
            'm+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'i+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(dateFormat)) {
                // 取出对应的值
                let str = o[k] + ''
                /* 根据设置的格式，输出对应的字符
                 * 例如: 早上8时，hh => 08，h => 8
                 * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
                 * 例如: 下午15时，hh => 15, h => 15
                 */
                dateFormat = dateFormat.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? str : this.padLeftZero(str)
                )
            }
        }
        return dateFormat
    }
    // 日期时间补零
    padLeftZero(str) {
        return ('00' + str).substr(str.length)
    }
}
export default FlipClock