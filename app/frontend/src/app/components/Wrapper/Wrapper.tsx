import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ReactElement } from 'react';
import Menu from '../Menu/Menu';
import './Wrapper.css';

const Wrapper: React.FC<{
  children?: ReactElement[] | ReactElement;
  title: string;
}> = ({ children, title }) => {
  return (
    <>
      <Menu contentId="main-content" />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="wrapper" fullscreen>
          {children}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Wrapper;
