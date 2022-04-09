import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

const Notify = () => {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState();
  const [reminderList, setReminderList] = useState([]); //storing the data from backend

  useEffect(() => {
    axios
      .get("http://localhost:9000/getAllReminder")
      .then((res) => setReminderList(res.data));
  }, []);

  const addReminder = () => {
    axios
      .post("http://localhost:9000/addReminder", { reminderMsg, remindAt })
      .then((res) => setReminderList(res.data));
    setReminderMsg("");
    setRemindAt();
  };

  const deleteReminder = (id) => {
    axios
      .post("http://localhost:9000/deleteReminder", { id })
      .then((res) => setReminderList(res.data));
  };

  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <div class="alert alert-success fade show" role="alert">
            <strong>Welcome to Notify App</strong>
            <br /> Try your first alert notification using react and express
            using twilio alerting at your whatsapp number. <br />
            enjoy 😊🤪.
          </div>
          <h1> Notify Me </h1>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Notification notes here..."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          />
          <DateTimePicker
            className="form-control"
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />
          <div className="button" onClick={addReminder}>
            Add Notification
          </div>
        </div>

        <div className="homepage_body">
          {reminderList.map((reminder) => (
            <div className="reminder_card" key={reminder._id}>
              <h2> {reminder.reminderMsg} </h2> <h3> Notify Me at: </h3>
              <p>
                {String(
                  new Date(
                    reminder.remindAt.toLocaleString(undefined, {
                      timezone: "Asia/Kolkata",
                    })
                  )
                )}
              </p>
              <div
                className="button"
                onClick={() => deleteReminder(reminder._id)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notify;
