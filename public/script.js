// Initialize an empty logData array if it doesn't already exist in localStorage
let logData = JSON.parse(localStorage.getItem('logData')) || [];

// Define names for the boxes
const boxNames = [
  "Duty Keys No.1", "Duty Keys No. 2", "Duty keys No. 3", "Duty Keys No.4", "COSHH Cabinet",
  "Pallet Corral", "Sprinkler (piv)", "Masters (Front reception)", "Blue Padlock Key on blue containers",
  "Cyclocam", "Assembly Zone Managers Office", "Fire Call Point Key", "Roller Shutter 5", "Manu Pyroban Truck",
  "Corral Fire Panel", "Spare Cleaning Cupboard Rear Gents", "Pump House Double Doors", "Switch Room Door",
  "MIS Patch Cabinet (RSO)", "Engie Compactor Keys", "Auger Maintence Hatch", "Engineer Workshop",
  "Spare PYROBAN", "Dirty Overalls", "Selchip Compactor Keys", "Gas Bottle Store", "Staff Shop Till",
  "Nitrogen Generator", "Boiler House", "GAS Vale Isolate", "Emergency Lighting Key", "Strobe Light & Buzzer Key",
  "Yard Forklift", "Engineering Keypress", "QA Office Lowbay", "Reinstatement Keys", "Moved to key press 3",
  "Small Assembly Meeting Room", "Intersep Tank Key", "King Pin PPE Lockers 45/48", "King Pin 5", "King Pin 6",
  "King pin 7", "King Pin 8", "Lifting Shackle Cabinet Key", "New Front Gate Key", "Drum Baylor",
  "High bay Chiller Override", "Assembly Admin Office", "QA Comp Double Door", "Clean Machine Room",
  "Shutter Detonator Box", "Link Plant Double Door (no key)", "Engineer Ducts", "Fire Vent Panels", "Gas Tank Valves",
  "Turn-style Reset Key", "Natural Vent Panels Lo Bay", "Assembly Washroom", "Fire Door Papaiz", "Rear Turnstyle keys",
  "New Daff Plant Keys", "Conf Room Mezz Floor", "Manu Washroom Roof", "TTL Cabinet", "Repeater Fire Panel",
  "Locator Office Mezz Floor", "Mezz Floor Office", "Security Caged Pallet", "Engie Office", "DKNY Conference RM 67",
  "HR West Door", "HR East Door", "New yard truck key", "(Spare) Safeguard key", "Finance East", "Staff Shop Both Doors (no key)",
  "Inner Gate R/S 5 Stairs", "Outer Gate R/S 5 Stairs", "External Papaiz", "Cardboard Compactor Stop", "Engie Masters (does not go in door)",
  "F/D 16 Boilerhouse", "Hi Racker Guideline", "Alcohol Detect Valves", "Diesel Tank Valves", "Alcohol Spill unit",
  "Air Con Plant Mezz Floor", "Disabled Toilet", "Auxiliary Fire Panel", "Spare Callpoint Keys", "New Training Room W’house",
  "Recycling Bin", "Carousel R/S Beacons Panel", "Goods In Office", "Foam Inlet", "(Spare) COSHH Cabinet", "(Spare) Yard Truck Key",
  "Recycling Bin Rear Carpark", "L&D Training Room conf Rm2", "New Creams Room", "Label Store To Assembly", "(Spare) Compactor Padlock",
  "Test Panel+Isolate", "Engineer Milling Machine", "Caged Area (Staff Shop)", "(Spare) Paper Compactor", "External Compactor Side Gate",
  "Carousel Operation Key", "Engineering Welding Bench", "(Spare) Pallet Truck Line 1", "Motor Store Washroom Roof",
  "(Spare) Selchip Compactor Key", "'A' Aisle Flammable Cupboard", "New Fire Panel Key", "Huwan Storage Cabinet",
  "Front Staff Entrance Assembly", "X-ray Machine Line 1", "Hi-Racker", "Waste Matters", "Fire Alarm Interface", "Goods In",
  "(Spare) Compactor Key", "Liquids Fire Door", "Engineering Power Tool Store", "Q.A Lab Storage Cupboard",
  "Roller Shutter West Corridor (CV50 ACCESS)", "Flammable Cabinet Videojet", "Label Air-con Unit", "Assembly Grease Trolley",
  "Digital Monitoring Equipment", "A Aisle Carousal (Label store)", "(Spare) Recyclable Shed (no key)", "Electricians Room",
  "Compactor Control Box (Spare)", "Assembly Conference Room", "Effluent Padlock (no key)", "Effluent Tank Keys",
  "Confidential Waste Bin (Spare)", "Yard Truck key", "Pyroban EMERGENCY key", "Ops Services Overflow", "Assembly Conference Room",
  "(Spare) Keypress", "Blue Bulk Container", "Demin Plant Key", "Co2 Switch Room keys", "Consumable storage cage (T Aisle)",
  "South Ladder Grill Spare", "Goods Lift Release Key", "Paul Ellis QA Office Key", "Diesel Yard Truck", "C/I + Eng Office",
  "(Spare) Sunlight", "Gas Meter", "(Spare) Roller Shutter 5", "Pandemic PPE Cages Doo2f – Do12f", "Master to Desk drawers",
  "(Spare) Selchip Compactor Keys", "Reg Affairs Office", "SMI Mtg Room Mezz floor", "Canteen Corridor Keys", "Chillier Pump Panel",
  "(Spare) Intersep Plant", "Onsite Oil Store", "Lockers Security Cage", "Eng Consumable Cabinet", "R/BUsed Tube Containers",
  "Overall Master Keys Spares", "Bay 7 Barrier", "Potassium Nitrate Manu Fridge", "Tool board Cabinet (no key)", "DBN Old Office",
  "Sychem Washer T.S", "Hand Sanitizer R/O", "Rear Entrance External Fire Panel (no key)", "(Spare) Front Gate", "B Aisle Gate",
  "AMSSS Keys", "Manu Mezz Floor", "Flammable Cupboards Corral", "Mag Door Reset Key", "Grey Locker Men`s Room",
  "Assembly Mop and Bucket", "Assembly Washroom Spares Room", "Assembly Washroom Roller Door South Control Key",
  "Canteen Window Keys", "Red Cabinet (compactors)", "Chop Saw key", "Loading Bay Doors Docklock Override Key",
  "Security Ladies", "Shipping Office", "Glass Bin Key", "Lockout Tag Master Key", "Engineering Cabinet 1",
  "Engineering Cabinet 2", "Small Shed Corral Key", "Assembly Lockout Tag"
];

const keyGrid = document.getElementById('keyGrid');
if (keyGrid) {
  for (let i = 0; i < boxNames.length; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.boxId = i + 1;
    box.textContent = boxNames[i];
    box.addEventListener('click', () => handleBoxClick(box));
    keyGrid.appendChild(box);
  }
}

function handleBoxClick(box) {
  const boxId = box.dataset.boxId;
  const currentDate = new Date().toLocaleDateString(); // Get current date
  const currentTime = new Date().toLocaleTimeString(); // Get current time

  const name = prompt("Enter the name of the person signing out the key:");
  const securityOfficerInitials = prompt("Enter the security officer's initials:");

  if (box.classList.contains('red')) {
    // Mark the box as green if it was previously red
    box.classList.remove('red');
    box.classList.add('green');
    logAction('checked in', boxId, currentDate, currentTime, name, securityOfficerInitials);
  } else {
    // Mark the box as red and log checkout
    box.classList.remove('green');
    box.classList.add('red');
    logAction('checked out', boxId, currentDate, currentTime, name, securityOfficerInitials);
  }
}

function logAction(action, boxId, date, time, name, securityOfficerInitials) {
  logData.push({
    action: action,
    boxId: boxId,
    date: date,
    time: time,
    name: name,
    securityOfficerInitials: securityOfficerInitials
  });
  localStorage.setItem('logData', JSON.stringify(logData));
}

// Function to display log data in the table
function displayLog() {
  const logTableBody = document.getElementById('logTableBody');
  if (logTableBody) {
    logTableBody.innerHTML = '';
    logData.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.boxId}</td>
        <td>${entry.action}</td>
        <td>${entry.name}</td>
        <td>${entry.time}</td>
        <td>${entry.date}</td>
        <td>${entry.securityOfficerInitials}</td>
      `;
      logTableBody.appendChild(row);
    });
  }
}

// Function to clear log data
function clearLog() {
  if (confirm('Are you sure you want to clear the log?')) {
    localStorage.removeItem('logData');
    logData = [];
    displayLog();
  }
}

// Load and display logs when the page is loaded
window.onload = displayLog;
