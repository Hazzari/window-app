const timer = (id, deadline) => {

    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getTimeRemaining = (endTime) => {
        const total = Date.parse(endTime) - Date.parse(String(new Date)),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor((total / 1000 / 60) % 60),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            days = Math.floor((total / (1000 * 60 * 60 * 24)));


        if (total <= 0) {
            return {
                total: 0,
                seconds: 0,
                minutes: 0,
                hours: 0,
                days: 0,
            };
        }
        return {
            total,
            seconds,
            minutes,
            hours,
            days,
        };

    };
    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector),
            seconds = timer.querySelector('#seconds'),
            minutes = timer.querySelector('#minutes'),
            hours = timer.querySelector('#hours'),
            days = timer.querySelector('#days'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);


            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline);
};

export default timer;
