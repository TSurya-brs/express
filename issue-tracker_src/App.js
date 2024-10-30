import React, { useState } from "react";
import "./App.css";

// IssueForm Component
const IssueForm = ({ addIssue }) => {
  const [description, setDescription] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("Shyam");
  const [descriptionError, setDescriptionError] = useState("");
  const [issueError, setIssueError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!description) {
      setDescriptionError("Description is required!");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!issue) {
      setIssueError("Issue is required!");
      isValid = false;
    } else {
      setIssueError("");
    }

    if (isValid) {
      addIssue({ description, issue, priority, assignedTo });
      setIssue("");
      setDescription("");
      setPriority("Medium");
      setAssignedTo("Shyam");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="issue">
      <div className="issue1">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        {descriptionError && (
          <p className="error-message">{descriptionError}</p>
        )}{" "}
        <input
          type="text"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Add new issue"
        />
        {issueError && <p className="error-message">{issueError}</p>}{" "}
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="Shyam">Shyam</option>
          <option value="Martin">Martin</option>
          <option value="Ram">Ram</option>
        </select>
        <button type="submit">Add Issue</button>
      </div>
    </form>
  );
};

// IssueItem Component
const IssueItem = ({ issue, removeIssue }) => {
  return (
    <div className="issue-item">
      <span className="issue-details">Priority: {issue.priority}</span>
      <span className="issue-details">Assigned to: {issue.assignedTo}</span>
      <div className="issue-text1">
        <strong>Description:</strong>
        <textarea readOnly value={issue.description} className="issue-text" />
      </div>
      <div className="issue-text1">
        <strong>ISSUE:</strong>
        <textarea readOnly value={issue.issue} className="issue-text" />
      </div>
      <button onClick={removeIssue} className="delete-button">
        Delete
      </button>
    </div>
  );
};

// IssueList Component
const IssueList = ({ issues, removeIssue }) => {
  return (
    <div className="issue-list">
      {issues.map((issue, index) => (
        <IssueItem
          key={index}
          issue={issue}
          removeIssue={() => removeIssue(index)}
        />
      ))}
    </div>
  );
};

// App Component
const App = () => {
  const [issues, setIssues] = useState([]);

  const addIssue = (issue) => {
    setIssues([...issues, issue]);
  };

  const removeIssue = (index) => {
    const newIssues = issues.filter((_, i) => i !== index);
    setIssues(newIssues);
  };

  return (
    <div className="App">
      <h1>Issues Tracker</h1>
      <IssueForm addIssue={addIssue} />
      <IssueList issues={issues} removeIssue={removeIssue} />
    </div>
  );
};

export default App;
