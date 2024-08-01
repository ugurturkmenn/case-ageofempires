import { useDispatch } from 'react-redux';

const AgesFilter = () => {
  const ages = [
    {
      id: 1,
      name: "ALL",
      value: "ALL"
    },
    {
      id: 2,
      name: "DARK",
      value: "DARK"
    },
    {
      id: 3,
      name: "FEUDAL",
      value: "FEUDAL"
    },
    {
      id: 4,
      name: "CASTLE",
      value: "CASTLE"
    },
    {
      id: 5,
      name: "IMPERIAL",
      value: "IMPERIAL"
    }
  ];

  const dispatch = useDispatch();

  const handleAge = (e: React.MouseEvent<HTMLButtonElement>) => {
    const val = (e.target as HTMLButtonElement).value
    dispatch({ type: "AGE_FILTER", payload: val });
  }

  return (
    <div data-testid="ages-filter">
      <h2>Ages</h2>
      <div className='flex gap-3 mb-3 mt-3 text-white'>
        {ages && ages.map((age) => (<button key={age?.id} className='bg-slate-500 p-1' onClick={handleAge} value={age.value}>
          {age?.name}</button>))}
      </div>
    </div>
  )
}

export default AgesFilter
