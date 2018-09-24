import React from 'react';

const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="row spaceBetween">
        <div className="row">
          <input type="search" id="primaryQuery" defaultValue="" required className="floatingLabel floatingLabel__input" onChange={props.handleChange}/>
          <label htmlFor="primaryQuery" className="floatingLabel floatingLabel__label">Search Repos</label>
        </div>
        <input type="submit" value="Search" className="floatingLabel floatingLabel__submit"/>
      </div>
    </form>
  )
}

export default Form;