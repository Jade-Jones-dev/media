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
	const [user_id, setUser_id] = useState();
	const [message_id, setMessage_id] = useState()

	useEffect(() => {
		const adminValue = localStorage.getItem("isAdmin");
		const isAdmin = JSON.parse(adminValue);
		setIsAdmin(isAdmin);
	}, []);

	useEffect(() => {
		const theuser = localStorage.getItem("userId");
		// const userid= JSON.parse(id);
		console.log(`this is  the user userid ${theuser}`);
		setUser_id(theuser);
	}, []);

	useEffect(() =>{
		setMessage_id(id)
	})

	

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

	function handleSubmit(e){
		// e.preventDefault();

		// const comment = {
		// 	"user_id":user_id,
		// 	"body":body,
		// 	"message_id":message_id,
		// };
 console.log(`This is user_id ${user_id}, message_id ${message_id}, body ${body}`)
		fetch("http://127.0.0.1:8080/api/comment", {
			method: "post",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({message_id, body, user_id}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((error) => console.log(error));
		setModalOpen(false)
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
        		<form className='signup_form' >
			<label>
				<p>Comment</p>
				<textarea type='text' value={body} onChange={(e) => setBody(e.target.value)} />
			</label>

			<div>
			<button className='btns'type='submit' onClick={(e) => handleSubmit(e)}>Post comment</button>
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
