/* eslint-disable prettier/prettier */
import { Alert} from 'react-native';

type ModalProps = {
    title: string;
    message: string;
    onCancel?: () => void;
    onConfirm?: () => void;
};


export default function ModalMessage(props: ModalProps) {
    Alert.alert(
        props.title,
        props.message,
        [
            {
                text: 'Cancelar',
                onPress: props.onCancel,
                style: 'cancel',
            },
            { text: 'OK', onPress: props.onConfirm },
        ],
        { cancelable: false },
    );
}


