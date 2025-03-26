
// 📌 List all users (GET request)
router.get("/", async (req, res) => {
  console.log("🔍 Fetching all users...");
  const userRepository = AppDataSource.getRepository(User);

  try {
    const users = await userRepository.find();
    console.log("✅ Users found:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error retrieving users:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
});

// 📌 Get a single user by ID (GET request)
router.get("/:id", async (req, res) => {
  console.log(`🔍 Fetching user with ID: ${req.params.id}`);
  const userRepository = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id);

  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User found:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error retrieving user:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
});

