import { useTranslation } from "react-i18next";
import { useState, useContext, useEffect, useCallback } from "react";
import style from "./index.less";

let timer: any = null;
const PcFlipDown = (props: any) => {
    const { t, i18n } = useTranslation();
    const { beginTime, endTime } = props;
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);
    const [day, setDay] = useState(0);

    const calulate = () => {
        const nowTs = new Date().getTime();
        let seconds = 1;

        if (nowTs < beginTime) {
            seconds = beginTime - nowTs;
        } else if (nowTs >= beginTime && nowTs < endTime) {
            seconds = endTime - nowTs;
        } else if (nowTs >= endTime) {
            seconds = 0;
        }
        if (seconds <= 0) {
            clearInterval(timer);
            return;
        }
        const days = Math.floor(seconds / (24 * 60 * 60 * 1000));
        const hours = Math.floor((seconds - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        const minutes = Math.floor((seconds - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / (60 * 1000));
        const lastSecond = Math.floor((seconds - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);
        const hoursCopy: any = hours < 10 ? `0${hours}` : hours;
        const minutesCopy: any = minutes < 10 ? `0${minutes}` : minutes;
        const lastSecondCopy: any = lastSecond < 10 ? `0${lastSecond}` : lastSecond;
        setSecond(lastSecondCopy);
        setMinute(minutesCopy);
        setHour(hoursCopy);
        setDay(days);
    };

    useEffect(() => {
        // 初始化
        calulate();
        // 每秒执行
        timer = setInterval(calulate, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [endTime]);
    return (
        <>
            <div className={style.pcFlip}>
                <div className={style.time}>
                    <div className={style.number}>{day}</div>
                    <div className={style.text}>{t("day")}</div>
                </div>
                <div className={style.wen}>:</div>
                <div className={style.time}>
                    <div className={style.number}>{hour}</div>
                    <div className={style.text}>{t("Hour")}</div>
                </div>
                <div className={style.wen}>:</div>
                <div className={style.time}>
                    <div className={style.number}>{minute}</div>
                    <div className={style.text}>{t("Minutes")}</div>
                </div>
                <div className={style.wen}>:</div>
                <div className={style.time}>
                    <div className={style.number}>{second}</div>
                    <div className={style.text}>{t("Second")}</div>
                </div>
            </div>
        </>
    );
};

export default PcFlipDown;
