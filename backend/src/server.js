const express = require("express");
const { json } = require("express");
const cors = require('cors');

// In-memory 'database' object
// Feel free to store the information in a different format
const db = {
  sensors: [
    {
      id: 1,
      name: "North Sensor",
      description: "The sensor in the north."
    },
    {
      id: 2,
      name: "South Sensor",
      description: "The south field sensor."
    },
    {
      id: 3,
      name: "East Sensor",
      description: "The sensor on the east side."
    },
    {
      id: 4,
      name: "West Sensor",
      description: "The western most sensor."
    }
  ]
};

// Create express app
const app = express();

app.use(function(req, res, next) {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(json());

app.get("/sensors", (req, res) => {
  // Return all sensors
  res.json(db.sensors);
});

app.get("/sensors/:sensor_id?", (req, res) => {
  const sensor_id = req.params.sensor_id;

  try {
    db.sensors.forEach((sensor, i) => {
      if (sensor.id == sensor_id) {
        return res.json(sensor);
      }
    }) 
  } catch(error) {
      console.log("Error in getSensorById--->", error.message);
      return error.message;
  }

})

app.post("/sensors/:sensor_id?/add_note", (req, res) => {
  const sensor_id = req.params.sensor_id;
  
  try {
        let sensor_noteList;
        db.sensors.map((sensor, i) => {
          const index = i + 1;
          
          if ((index) == sensor_id && sensor_id == sensor.id) {
            if (!sensor.noteList) {
              sensor.noteList = ['']; 
              sensor.noteList.push(req.body.note);
  
            } else {
              sensor.noteList.push(req.body.note);
            }
              sensor_noteList = sensor.noteList;

          } else if (!sensor.noteList) {
            sensor.noteList = [''];
          }
          return sensor_noteList;
          
        })
        res.json({
          'notes': sensor_noteList
        })
        
  } catch(error) {
    console.log("Error in posting note-->", error.message);
    return error.message;
  }

})

app.post("/sensors/:sensor_id?/delete_note/:note_id?"), (req, res) => {
  const sensor_id = req.params.sensor_id;
  const note_id = req.params.note_id;
  
} 


const PORT = 9000;
app.listen(PORT);
console.log("Express listening on port " + PORT);
