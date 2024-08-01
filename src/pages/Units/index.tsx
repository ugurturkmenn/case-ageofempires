import { useDispatch, useSelector } from 'react-redux';
import Table from '../../components/Table';
import AgesFilter from '../../components/AgesFilter';
import CostFilters from '../../components/CostFilters';
import { useEffect } from 'react';
import { fetchUnit } from '../../redux/actions';
import { IState } from '../../models';

const Units = () => {
  const dispatch = useDispatch();
  const { units, filteredUnits, loading, error, costFilters } = useSelector((state: IState) => state.units);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  useEffect(() => {
    dispatch(fetchUnit());
  }, [dispatch]);

  const filteredData = filteredUnits ? filteredUnits : units;

  return (
    <div className='flex-col flex-1 w-100'>
      <h1 className='text-center text-3xl'>Units Page</h1>
      <AgesFilter />
      <CostFilters costFilters={costFilters} />
      <Table data={filteredData} />
    </div>
  )
}

export default Units
