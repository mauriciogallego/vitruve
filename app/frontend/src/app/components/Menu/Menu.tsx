import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const Menu: React.FC<{ contentId: string }> = ({ contentId }) => {
  return (
    <IonMenu contentId={contentId} side="end">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuration</IonTitle>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/athletes">
            <IonLabel>Athletes</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
