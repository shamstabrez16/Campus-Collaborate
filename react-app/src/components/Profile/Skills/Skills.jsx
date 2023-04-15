import React, { useState, useEffect } from 'react';
import { removeById } from '../Utils';
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Skills.css';

const Skills = (props) => {
  const token = window.localStorage.getItem("token");
  const [canEdit, setCanEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (props) {
      setCanEdit(props.canEdit);
      setEmail(props.email);
      setSkills(props.skills);
    }
  }, [props]);

  const openModal = () => {
    setShowModal(true);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  const handleChange = (e) => {
    setNewSkill(e.target.value);
  }

  const closeModal = () => {
    setShowModal(false);
    setNewSkill('');
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else if (!!newSkill) {
      addSkill();
    }
    setValidated(true);
  }

  const addSkill = (e) => {
    fetch('http://localhost:8080/api/v1/skills/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        skill: newSkill,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' SKILL_ADDED !') {
          setShowModal(false);
          delete data.message;
          setSkills([...skills, data]);
          setNewSkill('');
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  const deleteSkill = (skillId) => {
    fetch('http://localhost:8080/api/v1/skills/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: skillId,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === ' SKILL_DELETED !') {
          setSkills(removeById(skills, skillId));
        } else {
          console.log(data.message);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="skills-component">
      <div className="header">
        <h2>Skills</h2>
        {canEdit &&
          <div className="edit-icons">
            <FaPlus onClick={openModal} />
          </div>
        }
      </div>
      <div className="badges">
        {skills.map(elem => (
          <Badge bg="secondary" key={elem.id}>
            <div className="badge-content" >
              {elem.skill}
              {canEdit &&
                <RxCross1 className="delete-icon" onClick={() => deleteSkill(elem.id)} />
              }
            </div>
          </Badge>
        ))}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3">
              <FloatingLabel label="Skill">
                <Form.Control required type="text" placeholder="Skill" name="newSkill" value={newSkill} onKeyPress={handleKeyPress} onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Skills;