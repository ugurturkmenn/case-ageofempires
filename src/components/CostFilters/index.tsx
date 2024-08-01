import { ICostFilter } from '../../models';
import CostRangeSlider from '../CostRangeSlider';

type CostFiltersType = {
  costFilters: {
    [key: string ]: ICostFilter;
  };
}

const CostFilters = ({ costFilters }: CostFiltersType) => {
  return (
    <div className='flex w-100 flex-col mt-5 mb-5' data-testid="costs-filter">
      <h2>Costs</h2>

      <div className='flex flex-col gap-2 justify-center'>
        {Object.entries(costFilters).map(([type, _]): any => (
          <CostRangeSlider key={type} type={type} />
        ))}
      </div>
    </div>
  )
}

export default CostFilters
