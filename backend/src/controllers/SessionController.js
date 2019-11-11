//index, show, store, update, destroy
// req.query = Acess query params (for filters)
// req.params = Acess route params (for edition or delete)
// req.body = Acess body of requisition (for creation or edition)

const User = require('../models/User')

module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user){
            user = await User.create({ email });
        }

        //const user = await User.create({ email });

        return res.json(user);
    }
};