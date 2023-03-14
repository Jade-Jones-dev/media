import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 400,
	height:250
  },
};

const ViewMessage = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const [message, setMessage] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const[body, setBody] = useState("")

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

	function handleSubmit(){

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
					<button className='btns'onClick={setModalOpen}>Comment</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        		<form className='signup_form' onSubmit={handleSubmit}>
			<label>
				<p>Comment</p>
				<textarea type='text' value={body} onChange={(e) => setBody(e.target.value)} />
			</label>

			<div>
			<button className='btns' onClick={() => setModalOpen(false)}>Post comment</button>
			</div>
		</form>

       
      </Modal>

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
