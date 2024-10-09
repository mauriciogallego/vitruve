import {
  IonCol,
  IonContent,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
} from '@ionic/react';
import './Table.css';

type Column = {
  label: string;
  property: string;
};

const Table: React.FC<{
  column: Column[];
  data: Record<string, string | number>[];
  nextFetch: () => void;
}> = ({ column, data, nextFetch }) => {
  return (
    <IonContent className="table">
      <IonGrid>
        <IonRow className="header">
          {column.map((col, index) => (
            <IonCol className="cell" key={`head-${index}`}>
              <strong>{col.label}</strong>
            </IonCol>
          ))}
        </IonRow>
        {data.map((item, index) => {
          return (
            <IonRow key={`row-${index}`}>
              {column.map(({ property }, index) => (
                <IonCol className="cell" key={`field-${index}`}>
                  {item[property]}
                </IonCol>
              ))}
            </IonRow>
          );
        })}
      </IonGrid>
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          console.log('sfsdf');
          nextFetch && nextFetch();
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </IonContent>
  );
};

export default Table;
