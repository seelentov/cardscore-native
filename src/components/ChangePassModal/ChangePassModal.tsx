import { Alert, Modal, View } from 'react-native';
import Header from '../../components/ui/Header/Header';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import { useState } from 'react';
import { styles } from './ChangePassModal.stylesheet';
import Br from '../ui/Br/Br';

type IChangePassModalProps = {
    isOpen: boolean, 
    setIsOpen: any
}

export default function ChangePassModal({isOpen, setIsOpen}: IChangePassModalProps) {

    const [oldPass, setOldPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [newPassCheck, setNewPassCheck] = useState<string>("");

    const changePass = () => {
        Alert.alert('Изменение пароля', "Изменение пароля прошло успешно")
        setIsOpen(false);
    }

    return (
        <Modal
            animationType='slide'
            visible={isOpen}
            onRequestClose={() => {
                setIsOpen(false);
            }}
            style={styles.main}
            >
                <View style={styles.padding}>
                <Header>Изменение пароля</Header>
                <Input
                    value={oldPass}
                    setValue={setOldPass}
                    placeholder="Старый пароль"
                />
                <Br/>
                <Input
                    value={newPass}
                    setValue={setNewPass}
                    placeholder="Новый пароль"
                />
                <Br/>
                <Input
                    value={newPassCheck}
                    setValue={setNewPassCheck}
                    placeholder="Повторите новый пароль"
                />
                <Br/>
                <Button onPress={changePass}>Сменить пароль</Button>
                </View>
        </Modal>
    );
}
