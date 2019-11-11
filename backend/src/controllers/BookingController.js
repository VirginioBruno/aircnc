const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { date } = req.body;
        const { user_id } = req.headers;
        const { spot_id } = req.params;

        const booking = await Booking.create({
            date,
            user: user_id,
            spot: spot_id
        });

        await booking.populate('user').populate('spot').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if(ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}