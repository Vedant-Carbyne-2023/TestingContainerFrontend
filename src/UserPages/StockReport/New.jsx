const [tableData, setData] = useState([])
  const handleStock = async()=>{
    let result= await api.post('/poStockReport')
    console.log(result)
    setData(result.data.data)
  }
  
  const DataTable = ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Purchase Order ID</th>
            <th>Material Category</th>
            <th>Material Subcategory</th>
            <th>Material Description</th>
            <th>UOM</th>
            <th>MRNs Quantity</th>
            <th>Quantity Requested</th>
            <th>Status</th>
            <th>Rate</th>
            <th>SGST</th>
            <th>CGST</th>
            <th>IGST</th>
          </tr>
        </thead>
        <tbody>
          {data.map((table, index) => (

            table.map ((item, index) => 
            <tr key={index}>
              <td>{item.purchaseOrderId}</td>
              <td>{item.materialCategory}</td>
              <td>{item.materialSubCategory}</td>
              <td>{item.materialDescription}</td>
              <td>{item.uom}</td>
              <td>{item.mrnsQuantity}</td>
              <td>{item.quantityRequested}</td>
              <td>{item.status}</td>
              <td>{item.rate}</td>
              <td>{item.sgst}</td>
              <td>{item.cgst}</td>
              <td>{item.igst}</td>
            </tr>)
          ))}
        </tbody>
      </table>
    );
  };
 
  return (
    <div>Organisation

<NavLink to={'/admin/projects'}>PRoject</NavLink>
<button onClick={()=>handleStock()}>Fetch</button>
  <div className="container">
    {
      tableData &&
    <DataTable data={tableData}/>
    }
  </div>
    </div>
  )

