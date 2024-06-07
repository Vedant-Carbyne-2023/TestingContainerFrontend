import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import './Calculator.css';

const RevenueCalculator = ({ data, setData, lengths, revenueCard, showRevenueCard }) => {
  // console.log(revenueCard)

  const [items, setItems] = useState([
    { name: '', previousLength: '', cummulativeLength: '', length: '', rate: 0.0, total:0.0 },
  ]);

  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  useEffect(() => {
    data(items);
  }, [items]);

  useEffect(() => {
    if (lengths) {
      const initialItems = lengths.map((lengthItem, index) => {
        const existingItem = items[index] || {};
           const cummulativeLength =
          parseFloat(existingItem.cummulativeLength) +
          parseFloat(Object.values(lengthItem)[0] || 0);
        
        return {
          name: Object.keys(lengthItem)[0] || '',
          length: Object.values(lengthItem)[0] || '',
          cummulativeLength: cummulativeLength?cummulativeLength:Object.values(lengthItem)[0] || '',
          rate: 0.0,
          total: 0.0,
          previousLength: existingItem.previousLength?existingItem.previousLength:0,
        };
      });
      
      console.log(initialItems);
  
      // Set the items based on lengths
      setItems(initialItems);
    }
  }, [lengths]);
  
  useEffect(() => {
    if (revenueCard) {
      const initialItems = [...items];
      // console.log(revenueCard)
      revenueCard.forEach((revenueItem, index) => {
        console.log(revenueItem)

        if (initialItems[index]) {
          console.log(initialItems[index])
          initialItems[index].name = revenueItem.name;
          initialItems[index].previousLength = parseFloat(revenueItem.length+revenueItem.previousLength);
          initialItems[index].cummulativeLength = parseFloat(revenueItem.cummulativeLength);
        } else {
          initialItems.push({
            name: revenueItem.name,
            previousLength: parseFloat(
              revenueItem.length + revenueItem.previousLength
            ),
            cummulativeLength: parseFloat(
              revenueItem.length + revenueItem.cummulativeLength
            ),
            rate: 0.0,
            total: 0.0,
          });
        }
      });
  
      // Set the items based on revenueCard
      setItems(initialItems);
      console.log(initialItems)
    }
  }, [revenueCard]);

  useEffect(() => {
    const updateItems = async () => {
      if (showRevenueCard) {
        const initialItems = [...items];
        
        showRevenueCard.forEach((revenueItem, index) => {
          if (initialItems[index]) {
            initialItems[index].name = revenueItem.name;
            initialItems[index].previousLength = parseFloat(
              revenueItem.previousLength
            );
            initialItems[index].cummulativeLength = parseFloat(
              revenueItem.cummulativeLength
            );
          } else {
            initialItems.push({
              name: revenueItem.name,
              previousLength: parseFloat(revenueItem.previousLength),
              cummulativeLength: parseFloat(revenueItem.cummulativeLength),
              length: parseFloat(revenueItem.length),
              rate: revenueItem.rate,
              total: revenueItem.length * revenueItem.rate,
            });
          }
        });
  
        // Set the items based on revenueCard
        setItems(initialItems);
      }
    };
  
    const updateItemsPromise = new Promise((resolve, reject) => {
      updateItems();
      resolve(); // You can resolve immediately since there's no async operation inside the Promise.
    });
  
    updateItemsPromise.then(() => {
      // You can add any additional logic here that you want to execute after the update is complete.
    });
  }, [showRevenueCard]);
  

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.length || 0) * (item.rate || 0), 0);
  };

  const handleDownloadCSV = () => {
    // Calculate the total amount
    const totalAmount = calculateTotal();

    // Create a copy of the items array with a new row for the total
    const itemsWithTotal = [
      ...items,
      { name: 'Total', length: '', rate: '', total: totalAmount },
    ];

    // Convert the itemsWithTotal array to CSV
    const csvData = Papa.unparse(itemsWithTotal);

    // Create a Blob for the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // Download the CSV file
    saveAs(blob, 'items.csv');
  };

 

  return (
    <div className="calculator-container">
      <table className="item-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Previous</th>
            <th>Cummulative</th>
            <th>This Bill Quantity</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {lengths && lengths.length>0 ?
            lengths.map((item, index) => {
              let object = Object.entries(item);
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={object[0][0]}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={items[index]?items[index].previousLength:object[0][0]}
                      onChange={(e) => updateItem(index, 'previousLength', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                               value={items[index]?items[index].cummulativeLength:object[0][1]}
                      onChange={(e) => updateItem(index, 'cummulativeLength', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={object[0][1]}
                    
                      onChange={(e) => updateItem(index, 'length', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                    min={0}
                      type="number"
                      className="form-control"
                      value={items[index]?items[index].rate:0}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  <td>{(parseFloat(object[0][1] || 0) * parseFloat(items[index]?items[index].rate:0)).toFixed(2)}</td>
                </tr>
              );
            })
          
          :
          items.map((item, index) => {
           
            return (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.previousLength}
                    onChange={(e) => updateItem(index, 'previousLength', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.cummulativeLength}
                    onChange={(e) => updateItem(index, 'cummulativeLength', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.length}
                    onChange={(e) => updateItem(index, 'length', e.target.value)}
                  />
                </td>
                <td>
                  <input
                  min={0}
                    type="number"
                    className="form-control"
                    value={items[index]?items[index].rate:0}
                    onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                  />
                </td>
                {/* <td>{(parseFloat(item.length) * parseFloat(items[index]?items[index].rate:0)).toFixed(2)}</td> */}
                <td>NaN</td>
              </tr>
            );
          })

          }
        </tbody>
      </table>
      <div className="button-container">
        {/* <button className="add-button" type="button" onClick={addItem}>
          Add Item
        </button> */}
        <button className="download-button" type="button" onClick={handleDownloadCSV}>
          Download CSV
        </button>
        <p className="total-price">Total Price: {calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default RevenueCalculator;
