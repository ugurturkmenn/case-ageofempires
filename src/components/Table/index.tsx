import { FC } from 'react'
import TableHead from './TableHead'
import TableContent from './TableContent'
import { Unit } from '../../models'

type TableContenType = {
  data: Unit[]
}

const Table: FC<TableContenType> = ({ data }) => {
  return (
    <table className='w-full border-collapse border border-slate-500' data-testid="units-table">
      <TableHead />
      {data && <TableContent data={data} />}
    </table>
  )
}

export default Table
