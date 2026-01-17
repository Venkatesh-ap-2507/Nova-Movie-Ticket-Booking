import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function DatePickerComponent({ setSelectedDate }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState("Select date");
  // const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setText("selected date : " + date.toDateString());
    hideDatePicker();
  };

  return (
    <>
      <Button title={text} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
