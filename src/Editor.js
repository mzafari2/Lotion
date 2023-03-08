import ReactQuill from "react-quill";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const currentDate = () => {
  const newDate = new Date();
  return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19);
};

function Editor() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [updateNote] = useOutletContext();
  const [, notes, deleteNote] = useOutletContext();
  let temp_title = "untitled";
  let temp_text = "";
  if (notes[Id] !== undefined) {
    temp_title = notes[Id].title;
  }
  if (notes[Id] !== undefined) {
    temp_text = notes[Id].body;
  }

  const [value, setValue] = useState(temp_text);
  const [title, setTitle] = useState(temp_title);
  const [date, setDate] = useState(currentDate(new Date()));
  function Save() {
    updateNote(title, date, value, Id);
    navigate("/notes/" + Id);
  }

  function deleteId() {
    deleteNote(Id);
  }

  return (
    <div className="editor">
      <div className="noteHead">
        <div id="titleDate">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>

          <input
            type="datetime-local"
            value={date ? date : currentDate()}
            onChange={(event) => setDate(event.target.value)}
          ></input>
        </div>
        <div id="buttons">
          <div onClick={Save}>save</div>
          <div
            onClick={() => {
              if (window.confirm("Are you sure you want to delete?")) {
                deleteId();
              }
            }}
          >
            delete
          </div>
        </div>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder={"type here"}
      />
    </div>
  );
}

export default Editor;
