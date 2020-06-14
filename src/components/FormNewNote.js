import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function FormNewNote(props) {
  const [form, setForm] = useState({
    text: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (form.text !== '') {
      const newNote = {
        text: form.text,
      };

      props.onFormSubmit(newNote);
      setForm({
        text: '',
      });
    }
  };

  return (
    <form>
      <label>New Note</label>
      <textarea name='text' onChange={handleChange} value={form.text} />
      <div className="material-icons send" onClick={handleSubmit}>near_me</div>
    </form>
  );
}

FormNewNote.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
