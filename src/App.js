import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, Outlet } from "react-router-dom";
import localStorage from "localStorage";
import { useNavigate } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
  const [showNewNotes, setShowNewNotes] = useState(true);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);

  useEffect(() => {
    // runs only once when the component is loaded on the page

    let saved = localStorage.getItem("notes")
      ? localStorage.getItem("notes")
      : [];
    if (saved.length > 0) {
      //there's something in the localStorage
      setNotes(JSON.parse(saved));
    }
  }, []);

  const navigate = useNavigate();
  const addNewNote = () => {
    setNotes([{ title: "untitled", body: "", when: "--" }, ...notes]);
    navigate(`/notes/0/edit`);
  };

  const updateNote = (noteTitle, noteTime, noteBody, idx) => {
    if (idx < 0 || idx >= notes.length) {
      return;
    }

    notes[idx] = {
      ...notes[idx],
      title: noteTitle,
      when: noteTime,
      body: noteBody,
    };

    setNotes([...notes]);
  };

  const deleteNote = (index) => {
    console.log(index);
    const indexNumber = parseInt(index);
    const tmp = [
      ...notes.slice(0, indexNumber),
      ...notes.slice(indexNumber + 1),
    ];
    setNotes(tmp);
    console.log(notes.length);
    if (notes.length == 0) {
      navigate("/");
    }
    navigate("/notes/0");
  };

  useEffect(() => {
    // runs every time "notes" changes
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const toggleNewNotes = () => {
    setShowNewNotes(!showNewNotes);
  };

  return (
    <div className="container">
      <div className="header">
        <div id="menu-left">
          <div id="expand" onClick={toggleNewNotes}>
            &#9776;
          </div>
        </div>
        <div id="title-holder">
          <h1 id="main">Lotion</h1>
          <p>Like Notion, but worse.</p>
        </div>
      </div>

      <div className="noteText">
        {showNewNotes && (
          <div className="newNotes">
            <div className="notePlus">
              <h2>Notes</h2>{" "}
              <div id="addNew" onClick={addNewNote}>
                +
              </div>
            </div>
            <div id="notesColumn">
              {notes.length > 0 ? (
                <ul className="notesList">
                  {notes.map((element, i) => (
                    <li
                      key={i}
                      onClick={() => setSelectedNoteIndex(i)}
                      className={selectedNoteIndex === i ? "selected" : ""}
                    >
                      <Link to={`/notes/${i}`}>
                        <h3>{element.title}</h3>
                        <p style={{ fontSize: "smaller" }}>
                          {element.when.substring(0, 10) +
                            " at " +
                            element.when.substring(11, 19)}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: element.body.substring(0, 50) + "...",
                          }}
                        />
                      </Link>
                      <hr />
                    </li>
                  ))}
                </ul>
              ) : (
                <p id="initialState">No notes yet</p>
              )}
            </div>
          </div>
        )}

        {selectedNoteIndex !== -1 ? (
          <Outlet context={[updateNote, notes, deleteNote]} />
        ) : (
          <p id="emptyContainer">Select a note, or create a new one</p>
        )}
      </div>
    </div>
  );
}

export default App;
