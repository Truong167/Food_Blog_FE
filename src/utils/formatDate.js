import moment from "moment/moment"

export function formatDate(date) {
    let today = new Date(Date.now())
    const [dateValue, time] = date.split(" ")
    let [day, month, year] = dateValue.split('-')
    let [hours, minutes, seconds] = time.split(':')
    let date1 = new Date(year, month-1, day, hours, minutes, seconds)
    if(today.getMonth() === date1.getMonth() && today.getFullYear() === date1.getFullYear()){
        if(today.getDate() === date1.getDate()) {
            if(today.getHours() === date1.getHours()){
                return `${today.getMinutes() - minutes} phút trước`
            } else {
                return `${today.getHours() - hours} giờ trước`
            }
        } else if(today.getDate() - 1 === date1.getDate()){
            return `Hôm qua`
        } else {
            return `${date1.getDate()+ "/" + month  + "/" + date1.getFullYear()}`
        }
    } else if(today.getFullYear() === date1.getFullYear()) {
        return `${today.getMonth() - date1.getMonth()} tháng trước`
    } else {
        return `${today.getFullYear() - date1.getFullYear()} năm trước`
    }
}

export function formatTime(time) {
    let hour, minutes
    if (time > 100) {
        hour = Math.floor((time / 60))
        minutes = time % 60
        return `${hour} giờ ${minutes} phút`
    }
    hour = time
    return `${hour} phút` 
}

export function formatDate1(date) {
    const [dateValue, time] = date.split(" ")
    let [day, month, year] = dateValue.split('-')
    let tmp = `${year + '-' + month + '-' + day}`
    return tmp
}

export function formatTime1(date) {
    let today = new Date(Date.now())
    let dateFormat = "DD-MM-YYYY HH:mm:ss"
    let dateObject = moment(date, dateFormat).toDate()
    let milliseconds = dateObject.getTime() - today.getTime()
    let totalSeconds = milliseconds / 1000
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)
    return {minutes, seconds}
}