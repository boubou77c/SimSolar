// Get Html element id
const canvas = document.getElementById("solarCanvas");
const speedSlider = document.getElementById("sliderSpeed");
const sliderValueLabel = document.getElementById("sliderValueLabel");
const ctx = canvas.getContext("2d");
const playStopButton = document.getElementById("PlayStopSim");

let lastSpeed = 0;

// Stop or play simulation
playStopButton.addEventListener("click", function () {
  if (playStopButton.textContent === "Stop") {
    playStopButton.textContent = "Play";
    speedSlider.value = lastSpeed;
    sliderValueLabel.textContent = "Speed : "+lastSpeed;
  } else {
    playStopButton.textContent = "Stop";
    lastSpeed = speedSlider.value;
    speedSlider.value = 0;
    sliderValueLabel.textContent = "Speed : "+0;
  }
});

// Reset zoom and position
document.getElementById("resetPos").addEventListener("click", function () {
  zoomLevel = 1;
  offsetX = 0;
  offsetY = 0;
});

// Canvas size
canvas.width = 800;
canvas.height = 600;

// Canvas Center
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let time = 0;
let zoomLevel = 1;

let offsetX = 0;
let offsetY = 0;

let isDragging = false;
let lastMouseX = 0,
lastMouseY = 0; // Last mice position X/Y

// Mooving onto the system Solar
canvas.addEventListener("mousedown", (event) => {
  if (event.button === 2) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (isDragging) {
    let movX = event.clientX - lastMouseX;
    let movY = event.clientY - lastMouseY;

    offsetX += movX;
    offsetY += movY;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

// Buton zoomIn / Out event
document.getElementById("zoomIn").addEventListener("click", function () {
  zoomLevel *= 1.1;
});
document.getElementById("zoomOut").addEventListener("click", function () {
    zoomLevel /= 1.1;
});
 


// Slider show value event
speedSlider.addEventListener("input", function () {
  sliderValueLabel.textContent = "Speed : "+speedSlider.value;
});


// Function to draw the sun
function drawSun() {
    const x = centerX + offsetX;
    const y = centerY + offsetY;
    const sunSize = 100 * zoomLevel; 

    ctx.drawImage(sunImg, x - sunSize / 2, y - sunSize / 2, sunSize, sunSize);

    ctx.fillStyle = "white";
    ctx.font = `${20 * zoomLevel}px Arial`;
    ctx.fillText("Sun", x - sunSize /2 , y-sunSize/2);
}

// To adjust the size due to the image dimensions
const planetSizes = {
    "Mercury": 0.5,  
    "Venus": 1.6,    
    "Earth": 1.2,     
    "Mars": 1.2,     
    "Jupiter": 1.5,  
    "Saturn": 3, 
    "Uranus": 1.5,   
    "Neptune": 1.2   
};

// Function to draw planets
function drawPlanet(distance, planetImg, speed, planetName) {
    // Position 
    const x = centerX + offsetX + distance * zoomLevel * Math.cos(time * speed);
    const y = centerY + offsetY + distance * zoomLevel * Math.sin(time * speed);


    // adjust the size
    const scale = 0.09 * planetSizes[planetName];
    const planetWidth = planetImg.naturalWidth * scale * zoomLevel;
    const planetHeight = planetImg.naturalHeight * scale * zoomLevel;

    
    ctx.drawImage(planetImg, x - planetWidth / 2, y - planetHeight / 2, planetWidth, planetHeight);

   
    ctx.fillStyle = "white";
    ctx.font = `${14 * zoomLevel}px Arial`;
    ctx.fillText(planetName, x - planetWidth / 2, y - planetHeight / 2 - 10);
}

// Information for each planet
const planetsData = {
    Mercury: {
      distance: 57.9, 
      size: 4.879, 
      speed: 47.87, 
      description: "The smallest planet and closest to the Sun. It has no atmosphere, leading to extreme temperatures.",
      state: "Rocky",
      atmosphere: "None", 
      funFact: "Mercury has extreme temperature swings, from -173°C at night to 427°C during the day!",
      remarks: "Mercury's lack of atmosphere means it can't retain heat, so it experiences the most extreme temperature variations in the solar system."
    },
    
    Venus: {
      distance: 108.2,
      size: 12.104, 
      speed: 35.02,
      description: "Venus has a thick toxic atmosphere and is the hottest planet, even hotter than Mercury due to its greenhouse effect.",
      state: "Rocky", 
      atmosphere: "Thick, toxic atmosphere", 
      funFact: "Venus rotates in the opposite direction to most planets. It has a day longer than a year!",
      remarks: "The atmosphere of Venus is mostly carbon dioxide, with clouds of sulfuric acid, making it a very hostile environment."
    },
    
    Earth: {
      distance: 149.6,
      size: 12.742, 
      speed: 29.78,
      description: "The only planet known to support life. It has liquid water, a protective atmosphere, and a magnetic field.",
      state: "Rocky", 
      atmosphere: "Nitrogen, oxygen", 
      funFact: "Earth is the only known planet with liquid water on its surface.",
      remarks: "Earth's magnetic field helps protect us from harmful solar radiation, and its distance from the Sun places it in the habitable zone."
    },
  
    Mars: {
      distance: 227.9,
      size: 6.779, 
      speed: 24.077,
      description: "The Red Planet, known for its dust storms and evidence of past water. Future missions aim for human exploration.",
      state: "Rocky",
      atmosphere: "Thin, mostly carbon dioxide", 
      funFact: "Mars has the tallest volcano in the solar system, Olympus Mons, which is 3 times the height of Mount Everest!",
      remarks: "Mars is a cold, dry planet with a very thin atmosphere. Evidence suggests it once had rivers and lakes of liquid water."
    },
  
    Jupiter: {
      distance: 778.3,
      size: 139.82, 
      speed: 13.07,
      description: "The largest planet in the Solar System. It has a massive storm (the Great Red Spot) and 79 known moons.",
      state: "Gas Giant", 
      atmosphere: "Mostly hydrogen and helium", 
      funFact: "Jupiter's Great Red Spot is a giant storm that has been raging for at least 350 years!",
      remarks: "Jupiter has no solid surface, and its strong magnetic field makes it a powerful force in the solar system."
    },
  
    Saturn: {
      distance: 1427,
      size: 116.46, 
      speed: 9.69,
      description: "Famous for its stunning ring system made of ice and rock. Saturn has over 80 moons, including Titan, which has a thick atmosphere.",
      state: "Gas Giant", 
      atmosphere: "Mostly hydrogen and helium", 
      funFact: "Saturn is the least dense planet in the Solar System. It's so light that it could float in water!",
      remarks: "Saturn's rings are made of millions of ice and rock particles. Some of them are as small as a grain of sand, while others are as large as mountains!"
    },
  
    Uranus: {
      distance: 2871,
      size: 50.724, 
      speed: 6.81,
      description: "An ice giant that rotates on its side, likely due to a massive collision. Its atmosphere contains methane, giving it a blue color.",
      state: "Ice Giant", 
      atmosphere: "Mostly hydrogen, helium, and methane", 
      funFact: "Uranus is tipped over on its side, so its poles are where most planets have their equators!",
      remarks: "Uranus has a very cold atmosphere and is known for its unusual tilt, making its seasons much more extreme than other planets."
    },
  
    Neptune: {
      distance: 4495,
      size: 49.244, 
      speed: 5.43,
      description: "The farthest planet from the Sun. It has strong winds, a dark storm system, and is known as a deep-blue ice giant.",
      state: "Ice Giant",
      atmosphere: "Mostly hydrogen, helium, and methane", 
      funFact: "Neptune has the strongest winds in the solar system, with speeds reaching 2,100 kilometers per hour!",
      remarks: "Neptune is the windiest planet, and its beautiful blue color is caused by the methane in its atmosphere."
    }
  };
  
  

// Get planet list
const planetListItems = document.querySelectorAll("#planetList li");

// Apply information data for each planets
planetListItems.forEach((item) => {
  item.addEventListener("click", function () {
    const planetName = item.getAttribute("data-planet");
    const planet = planetsData[planetName];

    document.getElementById("planetInfo").innerHTML = `
    <strong><u>${planetName}</u></strong><br><br>
      <strong>Description:</strong> ${planet.description}<br>
      <strong>Distance from the Sun:</strong> ${planet.distance} million km<br>
      <strong>Size:</strong> ${planet.size} km in diameter<br>
      <strong>Speed:</strong> ${planet.speed} km/s<br>
      <strong>State:</strong> ${planet.state}<br>
      <strong>Atmosphere:</strong> ${planet.atmosphere}<br>
      <strong>Fun Fact:</strong> ${planet.funFact}<br>
      <strong>Remarks:</strong> ${planet.remarks}
    `;
  });
});


// Images planets / Sun
const sunImg = new Image();
sunImg.src = 'assets/sun.png';

const earthImg = new Image();
earthImg.src = "assets/earth.png";
const marsImg = new Image();
marsImg.src = "assets/mars.png";

const mercureImg = new Image();
mercureImg.src = "assets/mercure.png";

const jupiterImg = new Image();
jupiterImg.src = "assets/jupiter.png";

const venusImg = new Image();
venusImg.src = "assets/venus.png";

const saturneImg = new Image();
saturneImg.src = "assets/saturne.png";

const neptuneImg = new Image();
neptuneImg.src = "assets/neptune.png";

const uranusImg = new Image();
uranusImg.src = "assets/uranus.png";


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSun();
  drawPlanet(60, mercureImg, 0.015, "Mercury"); 
  drawPlanet(100, venusImg, 0.012, "Venus");   
  
  drawPlanet(150, earthImg, 0.010, "Earth");  
  drawPlanet(200, marsImg, 0.008, "Mars");   
  drawPlanet(300, jupiterImg, 0.004, "Jupiter");   
  drawPlanet(400, saturneImg, 0.003, "Saturn");   
  
  drawPlanet(500, uranusImg, 0.002, "Uranus");   
  drawPlanet(600, neptuneImg, 0.001, "Neptune");   
  

  time -= parseFloat(speedSlider.value);
  requestAnimationFrame(animate);
}

animate();


// Get the html modal and button to open
const modal = document.getElementById("infoModal");
const infoButton = document.getElementById("infoButton");

// Get the span element that closes the modal
const closeButton = document.getElementsByClassName("close")[0];

// Show the modal
infoButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


  
