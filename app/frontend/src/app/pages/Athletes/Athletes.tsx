import Wrapper from 'app/frontend/src/app/components/Wrapper/Wrapper';
import useAthleteList from '../../queries/use-athlete-list';
import Table from '../../components/Table/Table';
import './Athletes.css';

const Athletes: React.FC = () => {
  const { list, fetchNextPage } = useAthleteList();

  return (
    <Wrapper title="Athletes">
      <div className="athletes">
        <Table
          column={[
            {
              label: 'Name',
              property: 'name',
            },
            {
              label: 'Age',
              property: 'age',
            },
            {
              label: 'Team',
              property: 'team',
            },
            {
              label: 'Active',
              property: 'active',
            },
          ]}
          data={Array(10).fill({
            name: 'mauricio',
            age: 19,
            team: 'team',
            active: 'Si',
          })}
          nextFetch={fetchNextPage}
        />
      </div>
    </Wrapper>
  );
};

export default Athletes;
