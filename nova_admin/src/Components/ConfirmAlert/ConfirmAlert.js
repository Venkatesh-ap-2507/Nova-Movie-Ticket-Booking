
import { Alert } from 'react-native';

export default function ConfirmAlert({ title, message, confirm, cancel }) {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'No',
        onPress: cancel,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: confirm,
      },
    ],
    { cancelable: false }
  );
}
