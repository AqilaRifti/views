const formId = window.location.search.split("=")[1]
document.getElementById("title").innerText = `Laporan Kecurangan #${formId}`

async function getReport(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert('There was a problem with the fetch operation:', error);
  }
}

async function updateReport() { 
  const tableItem = document.querySelectorAll("#item");
  const data = await getReport(`https://anticheat.up.railway.app/get/report/${formId}`);
  tableItem.forEach(item => item.remove());
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const entry = data[key];
      if (entry.counter > 1) {
        const tableRow = document.createElement("tr")
        const tableItemName = document.createElement("td")
        const tableItemCounter = document.createElement("td")
        const tableItemDates = document.createElement("td")
        tableRow.id = "item"
        tableItemName.innerText = key
        tableItemCounter.innerHTML = `Keluar dari <i>google form</i> <b>${entry.counter}</b> kali`
        tableItemDates.innerText = entry.dates.slice(3).join(' ');
        tableRow.appendChild(tableItemName)
        tableRow.appendChild(tableItemCounter)
        tableRow.appendChild(tableItemDates)
        document.getElementById("report").appendChild(tableRow)
      }
    }
  }
}
updateReport()
var T = setInterval(updateReport, 30000);