const StationMaster = require('../models/stationMaster');

exports.getStationMasters = async (req, res, next) => {
  try {
    const stationMasters = await StationMaster.findAll();
    res.status(200).json({ stationMasters });
  } catch (error) {
    console.error('Error fetching station masters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addStationMaster = async (req, res, next) => {
  const { smNumber, stationName, stationMasterName } = req.body;
  try {
    const newStationMaster = await StationMaster.create({
      smNumber,
      stationName,
      stationMasterName,
    });
    res.status(201).json({ stationMaster: newStationMaster });
  } catch (error) {
    console.error('Error adding station master:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
