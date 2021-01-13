export default class CountdownTimer {
  constructor(settings) {
    this.isActive = false;
    this.intervalId = null;
    this.targetDate = settings.targetDate
    this.refs = {
        days: document.querySelector(
            `${settings.selector} span[data-value="days"]`,
        ),
        hours: document.querySelector(
            `${settings.selector} span[data-value="hours"]`,  
        ),
        mins: document.querySelector(
            `${settings.selector} span[data-value="mins"]`,  
        ),
        secs: document.querySelector(
            `${settings.selector} span[data-value="secs"]`,  
        ),
    };
  }

  start() {
      if(this.isActive){
          return;
      }

      this.isActive = true;
      const targetTime = this.targetDate.getTime();
      updateTimer(0, this.refs);


      const currentTime = Date.now();
      const timeDifference = targetTime - currentTime;
      updateTimer(timeDifference, this.refs);

      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timeDifference = targetTime - currentTime;
        updateTimer(timeDifference, this.refs);

      }, 1000);
  }

  stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isActive = false;
      updateTimer(0, this.refs);

  }
}

function updateTimer(time,refs) {
    /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
const secs = Math.floor((time % (1000 * 60)) / 1000);

refs.days.textContent = `${days}`
refs.hours.textContent = `${hours}`
refs.mins.textContent = `${mins}`
refs.secs.textContent = `${secs}`
}

function pad(value) {
    return String(value).padStart(2, '0')
}