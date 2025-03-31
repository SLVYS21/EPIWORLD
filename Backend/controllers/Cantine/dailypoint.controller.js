const DailyPoint = require('../../models/Cantine/dailypoint.model');

const controller = ({
    getDailyPoint: async () => {
        try {
            const today = new Date();
            let dailyPoint = await DailyPoint.findOne().sort({_id: -1});
            if (!dailyPoint) {
                const dp = new DailyPoint();
                await dp.save();
                return dp;
            }
            const lastDate = dailyPoint.date;
            if (lastDate.getMonth() === today.getMonth() && 
                lastDate.getYear() === today.getYear() &&
                lastDate.getDate() === today.getDate()) {
                    return dailyPoint;
            }
            dailyPoint = new DailyPoint();
            await dailyPoint.save();
            return dailyPoint;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getDailyPoints: async(req, res) => {
        const { page = 1, limit = 10, startDate, endDate } = req.query;
        const query = {};
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
    
        try {
            const dailyPoints = await DailyPoint.find(query)
                .skip((page - 1) * limit)
                .limit(Number(limit))
                .sort({ date: -1 });    
            const total = await DailyPoint.countDocuments(query);

            res.status(200).json({
                total,
                page: Number(page),
                limit: Number(limit),
                dailyPoints,
            });
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getPointByMenu: async(req, res) => {
        const {menuId} = req.params;
        const {startDate, endDate} = req.query;

        const query = {
            'turnOverByMenu.menuId': mongoose.Types.ObjectId(menuId),
        };
        if (startDate && endDate) {    
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        try {
            const dailyPoints = await DailyPoint.find(query)
                .sort({ date: -1 });
            res.status(200).json(dailyPoints);
        } catch (error) {
            res.status(500).json({ message: error.message });    
        }
    },
    getDailyPointForSpecificDate: async (req, res) => {
        const { date } = req.params;
        try {
            const dailyPoint = await DailyPoint.findOne({ date: new Date(date) });
            if (!dailyPoint) {
                return res.status(404).json({ message: 'DailyPoint not found' });
            }
            res.status(200).json(dailyPoint);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
});

module.exports = controller;