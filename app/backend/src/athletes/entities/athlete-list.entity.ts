import { PaginatedResult } from '../../common/entities/paginated-result.entity';
import { AthleteEntity } from './athlete.entity';

export class AthletesList extends PaginatedResult<AthleteEntity> {
  results: AthleteEntity[];
}
