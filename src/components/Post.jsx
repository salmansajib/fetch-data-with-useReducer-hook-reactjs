import { useReducer } from "react";
import { INITIAL_STATE, postReducer } from "../postReducer";

function Post() {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const handleFetch = () => {
    // Generate a random post ID between 1 to 50
    const randomPostId = Math.floor(Math.random() * 50) + 1;

    dispatch({ type: "FETCH_START" });

    fetch(`https://jsonplaceholder.typicode.com/posts/${randomPostId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(data);
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR" });
      });
  };

  return (
    <div>
      <button onClick={handleFetch}>
        {state.loading ? "Wait..." : "Fetch the post"}
      </button>
      <p>{state.post?.title}</p>
      <span>{state.error && "Something went wrong!"}</span>
    </div>
  );
}

export default Post;
