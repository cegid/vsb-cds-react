import React from "react";
import Box from "../../Box";
import TextField from "../../TextField";
import Typography from "../../Typography";

interface TimeSelectorProps {
  hours?: number;
  minutes?: number;
  hoursInput: string;
  minutesInput: string;
  onHoursChange: (hours: number | undefined, input: string) => void;
  onMinutesChange: (minutes: number | undefined, input: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  hours,
  minutes,
  hoursInput,
  minutesInput,
  onHoursChange,
  onMinutesChange,
}) => {
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      onHoursChange(undefined, "");
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 23) {
        onHoursChange(numValue, value);
      }
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      onMinutesChange(undefined, "");
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 59) {
        onMinutesChange(numValue, value);
      }
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      py={4}
    >
      <TextField
        label="Heure"
        placeholder="HH"
        type="number"
        value={hoursInput}
        onChange={handleHoursChange}
        inputProps={{ min: 0, max: 23 }}
      />
      <Typography variant="bodyMRegular" color="neutral/50">
        :
      </Typography>
      <TextField
        label="Minute"
        placeholder="MM"
        type="number"
        value={minutesInput}
        onChange={handleMinutesChange}
        inputProps={{ min: 0, max: 59 }}
      />
    </Box>
  );
};

export default TimeSelector;