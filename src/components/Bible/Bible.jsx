import { useEffect, useState } from "react";
import {
  getPostBookTranslation,
  getPostChapter,
  getWordDictionary,
} from "../services/apiCall.jsx";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteNote, saveUpdatedNote } from "../services/AllPostServices.jsx";
import { getNotesByUserId } from "../services/userService.jsx";
import { Card, InputGroup, Offcanvas } from "react-bootstrap";

export const Bible = ({ currentUser }) => {
  const [bibleBook, setBibleBook] = useState([]);
  const [chosenBook, setChosenBook] = useState("");
  const [bibleChapter, setBibleChapter] = useState(0);
  const [chapterArray, setChapterArray] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(0);
  const [selectedBookAndChapter, setSelectedBookAndChapter] = useState([]);
  const [show, setShow] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteForPage, setNoteForPage] = useState([]);
  const [render, setRender] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [showWordDef, setShowWordDef] = useState(false);
  const [word, setWord] = useState("");
  const [dictionary, setDictionary] = useState([]);

  const handleCloseSideBar = () => setShowBar(false);
  const handleShowSideBar = () => setShowBar(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getPostBookTranslation().then(setBibleBook);
  }, []);

  useEffect(() => {}, [bibleBook]);

  useEffect(() => {
    if (chosenBook && chosenBook) {
      getPostChapter(chosenBook.id, bibleChapter).then(
        setSelectedBookAndChapter
      );
    }
  }, [bibleChapter, chosenBook]);

  useEffect(() => {
    getNotesByUserId(currentUser.id).then(setNoteForPage);
  }, [currentUser, render]);

  const handleBookChange = (e) => {
    const bookId = e.target.value;
    const book = bibleBook.books.find((book) => book.id === bookId);
    setChosenBook(book);

    if (book?.numberOfChapters) {
      const chapterArray = Array.from(
        { length: book.numberOfChapters },
        (_, i) => i + 1
      );
      setChapterArray(chapterArray);
    }
  };

  const handleNoteSave = (e) => {
    e.preventDefault();

    const updatedNote = {
      userId: currentUser.id,
      verseId: selectedVerse.number,
      chapterId: bibleChapter,
      bookId: chosenBook.id,
      title: noteTitle,
      body: noteBody,
    };

    saveUpdatedNote(updatedNote).then(() => {
      setRender((prev) => !prev);
      handleClose();
    });
  };

  const handleDictionary = (e) => {
    if (e.key === "Enter") {
      getWordDictionary(word).then(setDictionary);
      setShowWordDef(true);
    }
  };


  const handleDeleteNote = (e) => {
    deleteNote(e).then(() => {
      setRender((prev) => !prev)
    })
  }

  return (
    <>
      <div className="bible-reading-container">
        <div className="bible-reading-content">
          <div className="bible-reading-selection">
            <h3>Dictionary Search</h3>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm"></InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onKeyDown={handleDictionary}
                onChange={(e) => {
                  setWord(e.target.value);
                }}
              />
            </InputGroup>
            {dictionary.length > 0
              ? dictionary.map((entry, index) => (
                  <Modal
                    key={index}
                    show={showWordDef}
                    onHide={() => setShowWordDef(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        {word || "Modal heading"}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h4>{word || "Centered Modal"}</h4>
                      {entry.meanings.map((meaning, index) => (
                        <div key={index}>
                          <h3>{meaning.partOfSpeech}</h3>
                          <p>
                            {meaning.definitions
                              .map((def, i) => def.definition)
                              .join(" ")}
                          </p>
                        </div>
                      )) || <p>Definition not available.</p>}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => setShowWordDef(false)}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                ))
              : ""}
          </div>
        </div>
      </div>
      <div className="bible-reading-container">
        <div className="bible-reading-content">
          <div className="bible-reading-selection">
            <h2>Book</h2>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleBookChange(e);
              }}
            >
              <option>Choose a Book</option>
              {bibleBook.books?.map((book) => {
                return (
                  <option value={book.id} key={book.id}>
                    {book.name}
                  </option>
                );
              })}
            </Form.Select>
            <h3>
              {" "}
              {bibleChapter ? (
                <div className="button-icon-edit-chapter">
                  <svg onClick={() => {
                    setBibleChapter(bibleChapter - 1)
                  }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
              ) : (
                ""
              )} 
              {" "}Chapter {" "}
              {bibleChapter < chapterArray.length ? (
                <div className="button-icon-edit-chapter">
                  <svg onClick={() => {
                    setBibleChapter(bibleChapter + 1)
                  }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              ) : (
                ""
              )}
            </h3>
            <Form.Select value={bibleChapter}
              aria-label="Default select example"
              onChange={(e) => {
                const chapter = e.target.value;
                setBibleChapter(parseInt(chapter));
              }}
            >
              <option>Choose a Chapter</option>
              {chapterArray.map((number) => {
                return (
                  <option key={number} value={number}>
                    {number || bibleChapter}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="bible-reading">
            <div className="book-name">{selectedBookAndChapter.book?.name}</div>
            {selectedBookAndChapter.chapter?.content
              ?.filter((verse) => verse.hasOwnProperty("number"))
              .map((verse) => (
                <p
                  value={verse.number}
                  onClick={(e) => {
                    setSelectedVerse(verse);
                    handleShow();
                  }}
                >
                  <strong>{verse.number} </strong>
                  {verse.content
                    .map((part) =>
                      typeof part === "string" ? part : part.text || ""
                    )
                    .join(" ")}
                </p>
              ))}
            {
              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Notes for Verse {selectedVerse?.number}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Notes"
                          autoFocus
                          onChange={(e) => {
                            setNoteTitle(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Add Further Details"
                          onChange={(e) => {setNoteBody(e.target.value)}}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handleNoteSave(e);
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            }

            {/* {notes displayed based on selectedBook and Chapter} */}
            <div>
              <Button variant="primary" onClick={handleShowSideBar}>
                Toggle Notes
              </Button>

              <Offcanvas
                show={showBar}
                onHide={handleCloseSideBar}
                backdrop="static"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    Notes for {chosenBook.id}: {bibleChapter}
                  </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                  {noteForPage
                    .filter(
                      (note) =>
                        note.bookId === chosenBook.id &&
                        note.chapterId === bibleChapter
                    )
                    .map((note, index) => (
                      <Card
                        key={index}
                        style={{ width: "18rem", marginBottom: "1rem" }}
                      >
                        <Card.Body>
                          <Card.Title>{note.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted" />
                          <Card.Text>{note.body}</Card.Text>
                          <Card.Text>Book: {note.bookId}</Card.Text>
                          <Card.Text>Chapter: {note.chapterId}</Card.Text>
                          <Card.Text>Verse: {note.verseId}</Card.Text>
                          <Button onClick={() => {
                            handleDeleteNote(note.id)
                          }}>Delete</Button>
                        </Card.Body>
                      </Card>
                    ))}
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
