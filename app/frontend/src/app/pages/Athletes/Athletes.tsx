import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

const Athletes: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Athletes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>Athletes</div>
      </IonContent>
    </IonPage>
  );
};

export default Athletes;
