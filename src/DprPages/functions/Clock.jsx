import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const Clock = ({ setTimePeriod }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const hoursOptions = [...Array(12).keys()].map((hour) => ({ value: hour + 1, label: `${hour + 1}` }));
  const minutesOptions = [...Array(60).keys()].map((minute) => ({ value: minute, label: `${minute}` }));
  const periodOptions = [
    { value: 'AM', label: 'AM' },
    { value: 'PM', label: 'PM' },
  ];

  const handleHourChange = (selectedOption) => {
    setSelectedHour(selectedOption);
    // Call handleMinuteChange when the hour is changed
    handleMinuteChange(selectedMinute);
  };

  const handleMinuteChange = (selectedOption) => {
    // Default to 0 if not selected
    setSelectedMinute(selectedOption === null ? { value: 0, label: '0' } : selectedOption);
  };

  const handlePeriodChange = (selectedOption) => {
    setSelectedPeriod(selectedOption);
  };

  const formatTime = () => {
    if (selectedHour && selectedPeriod) {
      const formattedHour = selectedHour.value.toString().padStart(2, '0');
      const formattedMinute = selectedMinute ? selectedMinute.value.toString().padStart(2, '0') : '00';
      return `${formattedHour}:${formattedMinute} ${selectedPeriod.value}`;
    }
  };

  useEffect(() => {
    setTimePeriod(formatTime());
  }, [selectedHour, selectedMinute, selectedPeriod]);

  return (
    <div>
      <div className='d-flex' style={{ width: '30rem' }}>
        <Select
          className='mx-3'
          options={hoursOptions}
          value={selectedHour}
          onChange={handleHourChange}
          placeholder="Hour"
        />
        {' '}
        :
        {' '}
        <Select
          className='mx-3'
          options={minutesOptions}
          value={selectedMinute}
          onChange={handleMinuteChange}
          isClearable
          placeholder="Minute"
        />
        {' '}
        <Select
          options={periodOptions}
          value={selectedPeriod}
          onChange={handlePeriodChange}
          placeholder="AM/PM"
        />
      </div>
    </div>
  );
};

export default Clock;
