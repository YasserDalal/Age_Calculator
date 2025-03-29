const selector = '.calendar-icon';
const dateInputted = document.querySelector('.date-inputted');
const result = document.querySelector('.result');
const calculateButton = document.querySelector('.calculate-button');

const options = {
  onSelect: (instance, date) => {
    const formattedDate = luxon.DateTime.fromJSDate(date).toFormat('MMMM dd, yyyy');
    dateInputted.textContent = formattedDate;

    calculateButton.addEventListener('click', () => {
      const now = luxon.DateTime.now();
      const selectedDate = luxon.DateTime.fromJSDate(date);

      let yearDiff = now.year - selectedDate.year;
      let monthDiff = now.month - selectedDate.month;
      let dayDiff = now.day - selectedDate.day;

      if (dayDiff < 0) {
        const daysInCurrentMonth = now.daysInMonth;
        dayDiff += daysInCurrentMonth;
        monthDiff -= 1;
      }

      if (monthDiff < 0) {
        monthDiff += 12;
        yearDiff -= 1;
      }

      if (yearDiff < 0) {
        result.textContent = `You haven't been born yet!`;
      } else if (yearDiff === 0 && monthDiff === 0) {
        if(dayDiff === 0){
          result.innerHTML = `Oh Happy Birthday to you!!`;
        } else {
          result.innerHTML = `You are <b>${dayDiff === 1 ? `${dayDiff} day` : `${dayDiff} days`}</b> old`;
        }
      } else if (yearDiff === 0 && monthDiff > 0) {

        if(dayDiff === 0){
          result.innerHTML = `You are <b>${monthDiff === 1 ? `${monthDiff} month` : `${monthDiff} months`} </b> old`
        } else {
          result.innerHTML = `You are <b>${monthDiff === 1 ? `${monthDiff} month` : `${monthDiff} months`} and ${dayDiff === 1 ? `${dayDiff} day` : `${dayDiff} days`}</b> old`;
        }
        
      } else if (yearDiff > 0 && monthDiff >= 0) {
        if(monthDiff === 0){
          if(dayDiff === 0){
            result.innerHTML = `You are <b>${yearDiff === 1 ? `${yearDiff} year`: `${yearDiff} years`}</b> old`;
          } else{
            result.innerHTML = `You are <b>${yearDiff === 1 ? `${yearDiff} year`: `${yearDiff} years`} and ${dayDiff === 1 ? `${dayDiff} day` : `${dayDiff} days`}</b> old`;
          }
        } else if(monthDiff > 0) {
          if(dayDiff === 0){
            result.innerHTML = `You are <b>${yearDiff === 1 ? `${yearDiff} year`: `${yearDiff} years`}, ${monthDiff === 1 ? `${monthDiff} month` : `${monthDiff} months`}</b> old`;
          } else {
            result.innerHTML = `You are <b>${yearDiff === 1 ? `${yearDiff} year`: `${yearDiff} years`}, ${monthDiff === 1 ? `${monthDiff} month` : `${monthDiff} months`} and ${dayDiff === 1 ? `${dayDiff} day` : `${dayDiff} days`}</b> old`;
          }
        }
        
      }
    });
  },
};

datepicker(selector, options);
