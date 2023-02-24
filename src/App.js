import { useEffect, useRef, useState } from "react";

function App() {

  const referenceitems = useRef();
  const referencequantity = useRef();

  const [additems, setAdditems] = useState([]);
  const [newitems, setNewitems] = useState("");
  const [newquantity, setnewQuantity] = useState("");
  const [currentindex, setCurrentindex] = useState(-1);

  useEffect(() => {
    referenceitems.current.focus();
  }, [])

  const handleitemchange = (event) => {
    setNewitems(event.target.value);
  }

  const handlequantitychange = (event) => {
    setnewQuantity(event.target.value);
  }

  function addinventory(event) {
    event.preventDefault();
    if (currentindex >= 0) {
      const updateitems = [...additems];
      updateitems[currentindex] = { item: newitems, quantity: newquantity};
      setAdditems(updateitems);
      setCurrentindex(-1);
    }
    else {
      if (referenceitems.current.value === "" || referencequantity.current.value === "") {
        alert("Please Add Items & Quantity");
      }
      else {
        setAdditems([...additems, { item: newitems, quantity: newquantity }])
      }
    }

    setNewitems("");
    setnewQuantity("");
    referenceitems.current.focus();
    
  }

  function handledelete(index){
    window.alert("Are you sure.. Delete Items ?? ");
    setAdditems(additems.filter((item, i) => i !== index));
    referenceitems.current.focus();
  }

  function handleedit(index){ 
    setCurrentindex(index)
    const {item, quantity} = additems[index];
    setNewitems(item);
    setnewQuantity(quantity);
  }

  return (
    <>
      <h1>Inventory List</h1>
      <form onSubmit={addinventory}>
        <label > Enter Items : <input ref={referenceitems} value={newitems} onChange={handleitemchange} /></label><br /><br />
        <label > Enter Quantity : <input ref={referencequantity} value={newquantity} onChange={handlequantitychange} /></label><br /><br />
        <button type="submit" > {currentindex >= 0 ? "Save" : "Add "} </button>
      </form>
      <br /><br /><hr />

      <h1>List of items</h1>

      {additems.map((item, index) => (
        <>
        
        <div key={index}> {item.item} ({item.quantity}) <button onClick={()=>handleedit(index)}>Edit</button><button onClick={()=>handledelete(index)}>X</button> <hr/> </div>
        </>))}
    </>
  );
}

export default App;



