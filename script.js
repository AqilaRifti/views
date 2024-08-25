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
        const methods = entry.methods.slice(3);

        const methodCount = {};

        for (let i = 0; i < methods.length; i++) {
            const method = methods[i];
            if (methodCount[method]) {
                methodCount[method]++;
            } else {
                methodCount[method] = 1;
            }
        }
        let tableItemCounterTexts = []
        if (methodCount.change > 0) {
          tableItemCounterTexts.push(`Keluar dari <i>google form</i> <b>${methodCount.change}</b> kali`)
        }
        if (methodCount.clipboard > 0) {
          tableItemCounterTexts.push(`Melakukan <i>Copy/Paste</i> <b>${methodCount.clipboard}</b> kali`)
        }
        if (methodCount.audio > 0) {
          tableItemCounterTexts.push(`Memplay audio/video dari sebuah sumber <b>${methodCount.audio}</b> kali`)
        }
        tableItemCounter.innerHTML = tableItemCounterTexts.join("<br>")
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
var T = setInterval(updateReport, 5000);
