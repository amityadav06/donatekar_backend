const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 8000;
const url = "https://testapi.donatekart.com/api/campaign ";

// LIST OF CAMPAIGN WITH SORTED DATA
app.get("/", async (req, res) => {
  try {
    const data = await fetch(url);
    const dataJson = await data.json();
    const sorted = dataJson.sort((a, b) => b.totalAmount - a.totalAmount);
    const ress = sorted.map((item) => {
      const { title, totalAmount, backersCount, endDate } = item;
      return {
        title: title,
        totalAmount: totalAmount,
        backersCount: backersCount,
        endDate: endDate
      };
    });
    res.send(ress);
  } catch (error) {
    console.log(error);
  }
});

// LIST OF ACTIVE CAMPAIGN
app.get("/active", async (req, res) => {
  try {
    const data = await fetch(url);
    const dataJson = await data.json();
    let today = new Date().toISOString().slice(0, 10);
    let lastDate = "2021-05-24";
    const activecamp = dataJson.filter(
      (item) => item.endDate >= today && item.created > lastDate
    );
    res.send(activecamp);
  } catch (error) {
    console.log(error);
  }
});

// LIST OF CLOSED CAMPAING
app.get("/closed", async (req, res) => {
  try {
    const data = await fetch(url);
    const dataJson = await data.json();
    let today = new Date().toISOString().slice(0, 10);
    const closedCamp = dataJson.filter((item) => {
      return item.endDate < today && item.procuredAmount > item.totalAmount;
    });
    ` `;
    res.send(closedCamp);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`connetion is is live from ${port}`);
});
