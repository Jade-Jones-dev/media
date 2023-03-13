import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";

const ViewMessage = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const [message, setMessage] = useState({});

	const [isAdmin, setIsAdmin] = useState();

	useEffect(() => {
		const adminValue = localStorage.getItem("isAdmin");
		const isAdmin = JSON.parse(adminValue);
		setIsAdmin(isAdmin);
	}, []);

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/api/messages/${id}`)
			.then((response) => response.json())
			.then((data) => setMessage(data))
			.catch((error) => console.error(error));
	}, [id]);

	useEffect(() => {
		console.log(`hello the id is ${id}`);
	}, [id]);

	function handleDelete() {
		fetch(`http://127.0.0.1:8080/api/messages/${id}`, {
			method: "delete",
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
		navigate("/dashboard");
	}

	return (
		<div className='viewMessage'>
			<div className='card'>
				<h2>{message.title}</h2>
				<div className='cardtext'>{message.body}</div>
				<div className='buttons'>
					{isAdmin ? (
            <div>
						<Link className='btns' to={`/updateMessage/${message.id}`}>
							Edit
						</Link>
            <button className='btns new-button' onClick={handleDelete}>
            Delete
          </button>
          </div>
					) : null}
					<button className='btns'>Like</button>
					<button className='btns'>Comment</button>
				</div>
			</div>
      <div className="comments">
        <p>Comments</p>
        <p>This is comment 1</p>
        <p>This is comment 1</p>
        <p>This is comment 1</p>
        {/* {comments.map((comment, index) => {
							return (
								<div className='comment' key={comment.id}>
									<h3>{comment.body}</h3>
								</div>
							);
						})} */}
      </div>
		</div>
	);
};

export default ViewMessage;
