const express = require("express");
const { json } = require("express");
const crypto = require("crypto");

function getId() {
  return crypto.randomBytes(16).toString("hex");
}

const flights = [
  {
    id: getId(),
    title: "flight to canada",
    time: "1pm",
    price: 26000,
    date: "26-06-2022",
  },
  {
    id: getId(),
    title: "flight to Ethiopia",
    time: "2pm",
    price: 26000,
    date: "26-06-2022",
  },
];

const app = express();

app.use(json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Booking Flight API, See Documentation for all APIs" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/flight", (req, res) => {
  try {
    res.status(200).json({ message: "All flights", flights });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/flight/:id", (req, res) => {
  try {
    const id = req.params.id;
    const flight = flights.find((flight) => flight.id === id);
    if (flight) {
      res.status(200).json({ message: "Flight ${id}", flight });
    } else {
      res.status(400).json({ message: `Flight ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/flight", (req, res) => {
  try {
    const { title, time, price, date } = req.body;
    const newFlight = {
      id: getId(),
      title,
      time,
      price,
      date,
    };

    flights.push(newFlight);

    res.status(200).json({ message: "New flight is added", newFlight });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.put("/flight/:id", (req, res) => {
  try {
    const id = req.params.id;
    const flight = flights.find((flight) => flight.id === id);
    const { title, time, price, date } = req.body;
    flight.title = title;
    flight.time = time;
    flight.price = price;
    flight.date = date;

    if (flight) {
      res.status(200).json({ message: `Flight ${id} updated`, flight });
    } else {
      res.status(404).json(`Flight ${id} does not exit`);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.delete("/flight/:id", (req, res) => {
  try {
    const id = req.params.id;
    let flight = flights.find((flight) => flight.id === id);

    if (flight) {
      flights.splice(flights.indexOf(flight), 1);
      res.status(200).json(`Flight ${id} is deleted`);
    } else {
      res.status(404).json(`Flight ${id} does not exit`);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
