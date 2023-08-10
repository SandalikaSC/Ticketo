import axios from 'axios';

export const addTrain = async (trainData) =>
{
    try
    {
        console.log(trainData);
        const response = await axios.post('http://localhost:5000/api/add-train', trainData);

        return response.data;
    } catch (error)
    {
        throw error;
    }
};
