const { getAllStations } = require("../reposiotries/station-repository");

const getStations = async () =>
{
  try
  {
    return await getAllStations();
  } catch (error)
  {
    throw new Error("An error occurred during login");
  }
}


module.exports = {
  getStations
};

