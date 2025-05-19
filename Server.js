import express from "express";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import Item from "./models/Items.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;


app.set("view engine", "ejs"); // or pug/hbs
app.set("Views", path.join(__dirname, "Views"));



// Middleware

app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  next();
});
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/CRUD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/items", itemRoutes);

/// Server Pages
app.get("/index", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});
//get Search id
 async function getItem(req, res, next) {
  let getItem;
  try {
    getItem = await Item.findById(req.params.id);
    if (!getItem) {
      return res.status(404).send("Item not found");
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }

  req.item = getItem; // attach the item to the request
  next(); // continue to the next middleware or route handler
}
//Add Item
app.get("/addItem", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "AddItems", "addItems.html"));
});

const router = express.Router();
//Delete 
router.delete("/delete/:id", getItem, async (req, res) => {

  

  try {
     await req.item.deleteOne();


    res.json({ success: true, message: "Item deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
//Edit
router.get("/:id/edit", getItem, (req, res) => {
  res.render("updateForm", { item: req.item });
});

router.put("/:id", getItem, async (req, res) => {
  Object.assign(req.item, req.body);
  await req.item.save();
  res.redirect(`/items/${req.item._id}`);
});

// Attach this router to /items
app.use("/items", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
