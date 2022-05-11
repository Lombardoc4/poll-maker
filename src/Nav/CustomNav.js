import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav';
import Spinner from "react-bootstrap/Spinner";
import { DataStore } from '@aws-amplify/datastore';
import { Poll } from '../models';
import { Link, useNavigate } from "react-router-dom";
import NavLayout from "./NavLayout";
import useMobile from "../utils/isMobile";

const CustomNav = ({ color = 'white'}) => {
  const isMobile = useMobile();
  const headerFS = isMobile ? 'display-1' : 'fs-1'
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const createVariant = color === 'primary' ? 'light' : 'primary';
  const searchVariant =  color !== 'white' ? 'primary' : 'white';
  const textColor = color !== 'white' ? 'text-white' : ''

  const searchButton = loading ? (
    <Spinner animation="border" className="mx-auto"/>
  ) : (
    <Button type='submit' variant={searchVariant} className="mx-auto shadow-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
    </Button>
  )

  const inputEl = useRef();

  useEffect(() => {
    const getPoll = async () => {
      const models = await DataStore.query(Poll, p => p.edit_code("eq", loading));
      return models;
    }

    if (loading) {
      getPoll().then(models => {
        // Poll
        if (models.length > 0) {
          navigator('/edit/' + loading)
        } else {
          setLoading(false);
          inputEl.current.value = '';
          inputEl.current.placeholder = 'No Poll Found'
        }
      });
    }
  }, [loading])


  // !TODo FIX
  const submitSearch = async (e) => {
    e.preventDefault();
    setLoading(inputEl.current.value)
  }


  return (
    <NavLayout color={color} isMobile={isMobile}>
      <Nav className='h-100 p-3 d-flex flex-column flex-md-row align-items-center col-md-12'>
        <h1 className={'me-auto mt-3 my-md-0 ' + headerFS}>
          <Link to="/" className="text-reset  text-decoration-none">
            Poll <br className="d-md-none"/>Maker
          </Link>
        </h1>
        {/* <div className='order-md-3 my-auto d-flex flex-column flex-md-row col-12 col-md-3'>
            <Button className="m-2 shadow" variant="success">Log&nbsp;In</Button>
            <Button className="m-2 shadow" variant={createVariant}>Create Account</Button>
        </div> */}
        <div className="order-md-2 ms-md-auto me-md-2">

          <p className='fs-5 mb-1 mb-md-0'>Edit Existing Poll</p>
          <form onSubmit={submitSearch} className="mb-2 mb-md-0 d-flex align-items-center border-0 border-bottom ">
              <input ref={inputEl} className={"me-1 font-monospace border-0 bg-transparent outline-0 w-75 text-truncate " + textColor}
              placeholder='Poll Code' type="text"/>
              {searchButton}
          </form>
        </div>
      </Nav>
    </NavLayout>
  )
}

export default CustomNav;