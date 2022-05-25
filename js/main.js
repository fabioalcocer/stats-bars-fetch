const date = new Date();
const currentDay = date.toDateString().split(" ")[0].toLowerCase();
const daysDOM = document.querySelectorAll(".stat__bar");
const amountsFloat = document.querySelectorAll(".stat__mount");
const totalMonth = document.querySelector(".total__number");

document.addEventListener("DOMContentLoaded", () => {
  getData();
  choosenDay();
});

const getData = async () => {
  try {
    const res = await fetch("../data.json");
    const data = await res.json();
    setValuesBars(data);
    setTotalMonth(data)
  } catch (err) {
    console.log(err);
  }
};

const choosenDay = () => {
  daysDOM.forEach((dayDOM) => {
    if (dayDOM.dataset.day === currentDay) {
      dayDOM.classList.add("current-day");
    }
  });
};

const setValuesBars = (data) => {
  //set Height of the bars
  daysDOM.forEach((dayDOM) => {
    const day = data.find((d) => d.day === dayDOM.dataset.day)
    dayDOM.style.height = `${Math.round(day.amount * 3)}px`;
  });

  //Set value of the tooltips
  amountsFloat.forEach(m => {
    const amounts = data.find((a) => a.day === m.dataset.day);
    m.textContent = `$${amounts.amount}`;
  });
};

const setTotalMonth = (data) => {
  const amounts = data.map(d => d.amount)
  const result = amounts.reduce((acc, curr) => acc + curr);
  totalMonth.textContent = `$${result}`
}