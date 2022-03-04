import { useState } from "react";

function AddDrill() {
  const [drillName, setDrillName] = useState(String);
  const [drillComment, setDrillComment] = useState(String);

  const submitDrill = async () => {
    const response = await fetch("/api/drills", {
      method: "POST",
      body: JSON.stringify({
        name: drillName,
        comment: drillComment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>add new drill</h1>
      <input
        placeholder="name"
        type="text"
        value={drillName}
        onChange={(e) => setDrillName(e.target.value)}
      />
      <br />
      <textarea
        placeholder="comment"
        value={drillComment}
        onChange={(e) => setDrillComment(e.target.value)}
      />
      <br />
      <button onClick={submitDrill}> Add drill</button>
    </div>
  );
}

export default AddDrill;
