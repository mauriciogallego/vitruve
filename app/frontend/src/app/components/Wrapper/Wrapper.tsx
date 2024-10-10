import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ReactElement } from 'react';
import Menu from '../Menu/Menu';
import './Wrapper.css';

const Wrapper: React.FC<{
  children?: ReactElement[] | ReactElement;
  className?: string;
  title: string;
}> = ({ children, className, title }) => {
  return (
    <>
      <Menu contentId="main-content" />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Vitruve Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText color="primary">
          <h1>{title}</h1>
        </IonText>
        <IonContent className={className} fullscreen>
          {children}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Wrapper;
