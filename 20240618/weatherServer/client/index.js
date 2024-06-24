/*
  FILE NAME   : index.js
  PROGRAMMER  : DC6
  LAST UPDATE : 24.06.2024
  PURPOSE     : Final project index (client-side) javascript file.
*/

import {PixelFontCanvas} from "./lib/PixelFontCanvas.js";

let socket = new WebSocket("ws://192.168.30.20:8000");
let socketReciever = new WebSocket("ws://192.168.30.18:8000");

PixelFontCanvas.loadFont("fonts/", "cg.fnt");

let lat;
let lon;
let loop;
let apiKEY;
fetch("../key.env").then(response => response.text()).then(text => {
  apiKEY = text;  
});

function restore() {
  const canv = document.getElementById("can");
  const text = document.getElementById("data");
  const endTrack = document.getElementById("endTrack");
  const but = document.createElement("input");
  const div = document.getElementById("div");
  text.disabled = false;
  endTrack.remove();
  but.type = "button";
  but.value = "Start";
  but.setAttribute("id", "track");
  but.onclick = function() {trackWeather()};
  div.appendChild(but);
  text.value = "";
  clearInterval(loop);
  if (canv != undefined) {
    canv.remove();
  }
}

function generateCanvas(data) {
  let canv = document.getElementById("can");
  if (canv != undefined) {
    canv.remove();
  }
  let img = new Image();
  canv = document.createElement("canvas");
  let ctx = canv.getContext("2d");
  canv.width = 32;
  canv.height = 16;
  canv.setAttribute("id", "can");
  ctx.fillStyle = "#000000";
  ctx.imageSmoothingEnabled = false;
  ctx.fillRect(0, 0, canv.width, canv.height);
  img.src = `../png/${data[1]}.png`;
  img.onload = () => {
    ctx.drawImage(img, 2, 2);
    PixelFontCanvas.drawText(canv, `${data[0]}'`, {
      font: 'CG',
      x: data[0] < 0 ? 17 : 19,
      y: 6,
      scale: 1,
      align: 'left',
      tint: '#FFFFFF'
    });
    document.body.insertAdjacentElement("afterend", canv);
    let imgDataRGBA = ctx.getImageData(0, 0, canv.width, canv.height).data;
    let imgDataHEX = new Array(canv.width * canv.height);
    let pos = 0;
    for (let i = 0; i < canv.width * canv.height * 4; i += 4) {
      imgDataHEX[pos++] = (imgDataRGBA[i] << 16) | (imgDataRGBA[i + 1] << 8) | (imgDataRGBA[i + 2]);
    }
    socketReciever.send(imgDataHEX);
  }
}

function trackWeather() {
  if (socket.readyState == socket.CLOSED || socket.readyState == socket.CLOSING) {
    alert(`ERROR: Server is not available.`);
    return;
  }
  if (socketReciever.readyState == socket.CLOSED || socketReciever.readyState == socket.CLOSING) {
    alert(`ERROR: Raspberry Pi is not available.`);
    return;
  }
  let oldData;
  let data;
  const text = document.getElementById("data"); 
  const array = text.value.split(", ");
  const track = document.getElementById("track");
  const div = document.getElementById("div");
  track.remove();
  const endTrack = document.createElement("button");
  endTrack.textContent = "Stop";
  endTrack.setAttribute("id", "endTrack");
  endTrack.onclick = () => {
    restore();
    socketReciever.send(`RESTORE`);
  }
  div.appendChild(endTrack);
  text.disabled = true;
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${array[0]},${array[1]}&appid=${apiKEY}&units=metric&lang=en`)
    .then(response => response.json())
    .then(json => {
      if (json.length == 0) {
        restore();
        alert(`ERROR: Failed to get location data.`);
        return;
      }
      lat = json[0].lat;
      lon = json[0].lon;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${json[0].lat}&lon=${json[0].lon}&appid=${apiKEY}&units=metric&lang=en`)
        .then(response => response.json())
        .then(json => {
          if (json.length == 0) {
            restore();
            alert(`ERROR: Failed to get location data.`);
            return;
          }
          data = [json.main.temp.toFixed(0), json.weather[0].icon];
          generateCanvas(data);
          oldData = data;
          loop = setInterval(() => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}&units=metric&lang=en`)
              .then(response => response.json())
              .then(json => {
                if (json.length == 0) {
                  restore();
                  alert(`ERROR: Failed to get weather data.`);
                  return;
                }
                data = [json.main.temp.toFixed(0), json.weather[0].icon];
                if (oldData[0] != data[0] || oldData[1] != data[1]) {
                  oldData = data;
                  generateCanvas(data);
                } 
            });
          }, 60000);
        });
      });
}

function getMessage() {
  socket.onclose = () => {
    restore();
    socketReciever.send(`RESTORE`);
    alert(`ALERT: Server was closed.`);
  }

  socket.onerror = () => {
    restore();
    socketReciever.send(`RESTORE`);
    alert(`ERROR: Failed to set connection with server.`);
  }
}

document.getElementById("track").onclick = function() {trackWeather()};

getMessage();

/* END OF 'index.js' FILE */