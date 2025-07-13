const express = require("express");

// Middleware de vérification du token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token manquant" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = user;
    next();
  });
}
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_PATH = path.join(__dirname, "ecommerce-data.json");

function readData() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(
      DATA_PATH,
      JSON.stringify({ customers: [], orders: [] }, null, 2)
    );
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// Create or update customer
router.post("/customer", (req, res) => {
  try {
    console.log("API /customer - body reçu:", req.body);
    const { email, firstName, lastName, phone, password } = req.body;
    const data = readData();
    if (!password || password.length < 6) {
      console.warn("API /customer: mot de passe trop court ou manquant", {
        email,
        password,
      });
      return res
        .status(400)
        .json({ error: "Mot de passe requis (min 6 caractères)" });
    }
    let customer = data.customers.find((c) => c.email === email);
    if (!customer) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      customer = {
        id: "c_" + Date.now(),
        email,
        firstName,
        lastName,
        phone,
        password: hashedPassword,
        createdAt: new Date(),
        orders: [],
      };
      data.customers.push(customer);
      writeData(data);
      console.log("API /customer: nouveau client créé", customer);
    } else {
      console.log("API /customer: client existant", customer);
    }
    // Génère un token JWT
    const customerToken = jwt.sign(
      { id: customer.id, email: customer.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("API /customer: token généré", customerToken);
    res.json({ ...customer, token: customerToken });
  } catch (error) {
    console.error("API /customer: erreur serveur", error);
    res.status(500).json({ error: error.message || "Erreur serveur" });
  }
});

// Login customer
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const loginData = readData();
  const loginCustomer = loginData.customers.find((c) => c.email === email);
  if (!loginCustomer)
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  const passwordIsValid = bcrypt.compareSync(password, loginCustomer.password);
  if (!passwordIsValid)
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  // Génère un token JWT
  const loginToken = jwt.sign(
    { id: loginCustomer.id, email: loginCustomer.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ ...loginCustomer, token: loginToken });
});

// Create order
// Protéger la création de commande par le token
router.post("/order", authenticateToken, (req, res) => {
  const { customerId, pack, maintenance, formData, totalPrice } = req.body;
  const data = readData();
  const customer = data.customers.find((c) => c.id === customerId);
  if (!customer) return res.status(404).json({ error: "Client non trouvé" });
  const order = {
    id: "o_" + Date.now(),
    pack,
    maintenance,
    formData,
    totalPrice,
    status: "pending",
    createdAt: new Date(),
  };
  customer.orders.push(order);
  data.orders.push(order);
  writeData(data);
  res.json(order);
});

// Get customer orders
// Protéger l'accès aux commandes du client par le token
router.get("/customer/:id/orders", authenticateToken, (req, res) => {
  const data = readData();
  const customer = data.customers.find((c) => c.id === req.params.id);
  if (!customer) return res.status(404).json({ error: "Client non trouvé" });
  // Vérifie que l'utilisateur authentifié correspond au client demandé
  if (req.user.id !== customer.id) {
    return res.status(403).json({ error: "Accès interdit" });
  }
  res.json(customer.orders);
});

// Get all packs and maintenance options
router.get("/catalog", (req, res) => {
  // Importe les vrais packs et options depuis le frontend
  try {
    const packs = require("../src/data/ecommerce-data").PACKS || [];
    const maintenanceOptions =
      require("../src/data/ecommerce-data").MAINTENANCE_OPTIONS || [];
    const socialOptions =
      require("../src/data/ecommerce-data").SOCIAL_OPTIONS || [];
    res.json({ packs, maintenanceOptions, socialOptions });
  } catch (e) {
    res.json({ packs: [], maintenanceOptions: [], socialOptions: [] });
  }
});

module.exports = router;
const app = express();
const ecommerceApi = require("./ecommerce-api"); // Utilise le routeur défini dans ce fichier

app.use(express.json());
app.use("/", ecommerceApi);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
