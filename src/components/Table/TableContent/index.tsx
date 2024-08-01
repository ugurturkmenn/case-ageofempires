import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Unit } from '../../../models'

type TableContenType = {
  data: Unit[]
}

const TableContent: FC<TableContenType> = ({ data }) => {
  return (
    <tbody className='text-center'>
      {!data ? (<tr>empty</tr>) : (data?.map((item) => (
        <tr key={item.id}>

          <td className='border border-slate-700'>{item.id}</td>
          <td className='border border-slate-700'><Link to={`/unit/${item.id}`}>{item.name}</Link></td>
          <td className='border border-slate-700'>{item.age}</td>
          <td className='border border-slate-700'>{item.cost && Object.entries(item?.cost).map(([key, value], index, array) => (
            <div key={key}>
              {key}:{value}
              {index < array.length - 1 ? ',' : ''}
            </div>))}
          </td>

        </tr>
      )))}
    </tbody>
  )
}

export default TableContent
