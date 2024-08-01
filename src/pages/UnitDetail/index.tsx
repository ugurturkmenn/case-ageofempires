import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { IState, Unit } from '../../models';
import "./index.scss";

const UnitDetail = () => {
  const { id } = useParams();
  const { units, loading, error } = useSelector((state: IState) => state.units);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const unit = units.find((u: Unit) => u.id == id);

  if (!unit) {
    return <p>Unit not found</p>;
  }

  return (
    <div className='w-100 bg-slate-400 unit-detail-wrapper'>
      <h1 className='text-center text-3xl'>Unit Detail Page</h1>
      <table className='unit-detail-table w-full border-collapse border border-slate-500'>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{unit.id ? unit.id : "No ID"}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{unit.name ? unit.name : "No Name"}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{unit.description ? unit.description : "No Description"}</td>
          </tr>
          <tr>
            <td>Min. Required Age:</td>
            <td>{unit.age ? unit.age : "No Age"}</td>
          </tr>
          <tr>
            <td>Wood Cost:</td>
            <td>{unit.cost != null && unit.cost.Wood || "No Cost"}</td>
          </tr>
          <tr>
            <td>Food Cost:</td>
            <td>{unit.cost != null && unit.cost.Food || "No Cost"}</td>
          </tr>
          <tr>
            <td>Gold Cost:</td>
            <td>{unit.cost != null && unit.cost.Gold || "No Cost"}</td>
          </tr>
          <tr>
            <td>Build Time:</td>
            <td>{unit.build_time ? unit.build_time : "Not Applicable"}</td>
          </tr>
          <tr>
            <td>Reload Time:</td>
            <td>{unit.reload_time ? unit.reload_time : "Not Applicable"}</td>
          </tr>
          <tr>
            <td>Hit Points:</td>
            <td>{unit.hit_points ? unit.hit_points : "No HP"}</td>
          </tr>
          <tr>
            <td>Attack:</td>
            <td>{unit.attack ? unit.attack : "Not Applicable"}</td>
          </tr>
          <tr>
            <td>Accuracy:</td>
            <td>{unit.accuracy ? unit.accuracy : "Not Applicable"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UnitDetail
