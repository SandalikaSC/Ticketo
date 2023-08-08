
// Function to check if a field is empty
export const isNotEmpty = (value) =>
{
    return value.trim() !== "";
};

// Function to check if a value is a positive integer
export const isPositiveInteger = (value) =>
{
    const intValue = parseInt(value);
    return Number.isInteger(intValue) && intValue >= 0;
};
