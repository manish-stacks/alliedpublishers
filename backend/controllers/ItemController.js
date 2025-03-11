const Item = require("../models/ItemSchema")
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});