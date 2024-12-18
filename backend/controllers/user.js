const registerUser = async (req, res) => {
    const { name, email, password,pic } = req.body;
    try {
      const user = await User.create({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });   
    } 
}

const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  };

module.exports={registerUser,getUserProfile};