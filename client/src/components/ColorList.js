import React, { useState } from "react";
import { useHistory, useParams} from 'react-router-dom';
import { axiosWithAuth } from "../util/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("Props from Bubble Page", colors);
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);
  const history = useHistory();
  const {id} = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${e.id}`, colors)
      .then((res) => {
        console.log("PUT REQUEST", res);
        updateColors(res);
        history.push('/bubblepage');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then((res) => {
        console.log("DELETE REQUEST", res);
        history.push('/bubblepage');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Add Color 
  const addColorfunction = (e) => {
    const newColor = {
      color: e.color,
      code: { hex: e.hex }
    };
    setAddColor([newColor]);
  };

  const addSubmitHandler = (e) => {
    e.preventDefault();
    addColorfunction(addColor);
    setAddColor({
      color: "",
      code: { hex: "" }
    });

    axiosWithAuth()
      .post(`/colors`, { color: addColor.color, code: { hex: addColor.code.hex } })
      .then((res) => {
        console.log("ADDCOLOR PUT REQUEST", res);
        localStorage.setItem("token", res.data);
      })
      .catch((err) => {
        console.log(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({...colorToEdit, code: { hex: e.target.value }})
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addSubmitHandler} >
        <legend>Add color</legend>
        <label>color name:
          <input value={addColor.color} onChange={(e) => setAddColor({ ...addColor, color: e.target.value })} />
        </label>
        <label> hex code:
          <input value={addColor.code.hex} onChange={(e) => setAddColor({ ...addColor, code: { hex: e.target.value } })} />
        </label>
        <div className="button-row">
          <button type="submit">Add Color</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
