import ReactQuill from "react-quill";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import localStorage from "localStorage";
import { useNavigate } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [, notes, deleteNote] = useOutletContext();
  let dateTime = "";
  if (notes[Id]) {
    dateTime = notes[Id].when;
  }

  const formattedDatetime = new Date(dateTime).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  function editMe() {
    navigate("edit");
  }

  function deleteMe() {
    deleteNote(Id);
  }

  return (
    <div className="editor">
      <div className="noteHead">
        <div id="titleDate">
          <h2>{notes[Id] ? notes[Id].title : ""}</h2>
          <div>{formattedDatetime}</div>
        </div>
        <div id="buttons">
          <div onClick={editMe}>edit</div>
          <div
            onClick={() => {
              if (window.confirm("Are you sure you want to delete?")) {
                deleteMe();
              }
            }}
          >
            delete
          </div>
        </div>
      </div>
      <div
        className="note-body"
        dangerouslySetInnerHTML={{ __html: notes[Id] ? notes[Id].body : "" }}
      />
    </div>
  );
}

export default Preview;
