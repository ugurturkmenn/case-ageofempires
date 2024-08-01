import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import "./index.scss";
import { IState } from '../../models';

type CostFilterType = [number, number];

const CostRangeSlider = ({ type }:any) => {
  const dispatch = useDispatch();
  const { costFilters } = useSelector((state: IState) => state.units)
  const getCostData = costFilters[type];

  const handleCheckbox = (costFilter: React.FormEvent<HTMLInputElement>) => {
    const val = (costFilter.target as HTMLInputElement).checked
    dispatch({
      type: "SET_COST",
      payload: {
        type,
        range: getCostData.range,
        checked: val
      }
    })
  }

  const handleCostFilter = (costFilter: CostFilterType) => {
    const rangeData = { min: costFilter[0], max: costFilter[1] };
    dispatch({
      type: "COST_FILTER",
      payload: {
        type,
        range: rangeData,
        checked: getCostData.checked
      }
    })
  }

  return (
    <div className='flex justify-between items-center' data-testid={`range-slider-input-${type}`}>
      <div className='flex justify-start w-20'>
        <label htmlFor={`range-item-${type}`}>
          <input
            data-testid={`range-item-${type}`}
            id={`range-item-${type}`}
            type="checkbox"
            className="ml-2 mr-2"
            checked={getCostData?.checked}
            onChange={(costFilter) => handleCheckbox(costFilter)}
          />
          <span>{type}</span>
        </label>
      </div>
      <RangeSlider
        className={`range-slider-input range-slider-input-${type}`}
        min={0}
        max={200}
        value={[getCostData.range.min, getCostData.range.max]}
        disabled={!getCostData.checked}
        onInput={(costFilter: any) => handleCostFilter(costFilter)}
        onRangeDragEnd={(costFilter: any) => handleCostFilter(costFilter)}
      />
      <div>{getCostData.range.min} - {getCostData.range.max}</div>
    </div>
  )
}

export default CostRangeSlider
