const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const moment = require("moment");

const app = express();
const DATABASE_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mongodb.net/FormulaOneDB?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(error => console.error("MongoDB connection error:", error));

const TeamSchema = new mongoose.Schema({
  teamId: Number,
  teamName: String,
  teamCountry: String,
  teamWebsite: String,
});

const DriverSchema = new mongoose.Schema({
  driverNumber: Number,
  driverCode: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  country: String,
  profileLink: String,
  associatedTeam: String,
  teamDetails: TeamSchema,
});

const Team = mongoose.model("Team", TeamSchema);
const Driver = mongoose.model("Driver", DriverSchema);

const COUNTRY_LIST = [
  { code: "GB", name: "Great Britain" },
  { code: "ES", name: "Spain" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "MX", name: "Mexico" },
  { code: "AU", name: "Australia" },
  { code: "FI", name: "Finland" },
  { code: "NL", name: "Netherlands" },
  { code: "CA", name: "Canada" },
  { code: "MC", name: "Monaco" },
  { code: "TH", name: "Thailand" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "US", name: "United States" },
  { code: "DK", name: "Denmark" },
];

const loadCSVData = async (csvFilePath) => {
  const csvData = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => csvData.push(row))
    .on("end", async () => {
      console.log("CSV Data Loaded. Rows Count:", csvData.length);

      for (const record of csvData) {
        try {
          const teamName = record.current_team;
          let team = await Team.findOne({ teamName: teamName });

          if (!team) {
            team = new Team({
              teamId: csvData.length + 1,
              teamName: teamName,
              teamCountry: record.nationality,
              teamWebsite: record.url,
            });
            await team.save();
            console.log("New team saved:", team.teamName);
          }

          const driverNumber = record.number ? record.number.trim() : null;
          if (!driverNumber) {
            console.log("Missing driver number for record:", record);
            continue;
          }

          const existingDriver = await Driver.findOne({ driverNumber: driverNumber });

          if (!existingDriver) {
            const driver = new Driver({
              driverNumber: driverNumber,
              driverCode: record.code,
              firstName: record.forename,
              lastName: record.surname,
              birthDate: moment(record.dob, "DD/MM/YYYY").toDate(),
              country: record.nationality,
              profileLink: record.url,
              associatedTeam: teamName,
              teamDetails: team,
            });
            await driver.save();
            console.log("New driver added:", driver.firstName, driver.lastName);
          }
        } catch (error) {
          console.error("Error processing record:", record, error);
        }
      }
      console.log("CSV Data Import Completed.");
    });
};

const csvFilePath = path.join(__dirname, "public/data/drivers_2023.csv");
loadCSVData(csvFilePath);

app.get("/", async (req, res) => {
  try {
    const allDrivers = await Driver.find();
    const allTeams = await Team.find();
    res.render("dashboard", { allDrivers, moment, allTeams, COUNTRY_LIST });
  } catch (error) {
    console.error("Error fetching driver data:", error);
    res.status(500).send("Error loading drivers");
  }
});

app.get("/add-driver", async (req, res) => {
  const { driverNumber, driverCode, firstName, lastName, birthDate, profileLink, nationality, teamName } = req.query;

  const newDriver = new Driver({
    driverNumber,
    driverCode,
    firstName,
    lastName,
    birthDate: moment(birthDate).toDate(),
    country: nationality,
    profileLink,
    associatedTeam: teamName,
    teamDetails: { teamName }
  });

  try {
    await newDriver.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error saving new driver:", err);
    res.status(500).send("Failed to add driver");
  }
});

app.post("/update-driver/:id", async (req, res) => {
  const { id } = req.params;
  const { driverNumber, driverCode, firstName, lastName, birthDate, nationality, teamName } = req.body;

  try {
    await Driver.findByIdAndUpdate(id, {
      driverNumber,
      driverCode,
      firstName,
      lastName,
      birthDate: moment(birthDate).toDate(),
      country: nationality,
      associatedTeam: teamName,
    });
    res.redirect("/");
  } catch (error) {
    console.error("Error updating driver record:", error);
    res.status(500).send("Failed to update driver");
  }
});

app.listen(3000, (error) => {
  if (error) {
    console.error("Server startup error:", error);
  } else {
    console.log("Server running at http://localhost:3000");
  }
});
